import json
import math
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import bpy
import numpy as np
from mathutils import Matrix, Vector

from kit import austerlitz_figures as figures
from kit import austerlitz_props as props
from kit.austerlitz_terrain import (CASTLE, CORE, COURSES, DEM_LICENCE, EXTENT, OLMUTZ_ROAD, PHEASANTRY, PONDS,
                                    TRACKS, VILLAGES, WOODS, Ground, Relief, bilinear, chaikin, densify,
                                    ellipse_measure, far_ground, far_material, grid_distance, ground_materials,
                                    ice_surfaces, scatter, stream_surfaces)
from kit.geometry import TemplateLibrary, ensure_collection, new_empty, new_object, placement, unique_object
from kit.materials import principled_material
from kit.stage import configure_render, evening_world, export_glb, group_statistics, haze_volume, render_still, sun_lamp, triangles_of

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(PROJECT, ".cache", "scenes", "austerlitz")
GEO_CACHE = os.path.join(PROJECT, ".cache", "geo", "copernicus")
PREVIEWS = os.path.join(PROJECT, ".cache", "previews", "austerlitz")
TEXTURE_SIZES = ((2048, 2048), (4096, 3170))
TEMPLATE_DEPTH = -1000.0
SANTON = (106.0, 6713.0)
CHURCHES = {"telnitz": (20, -10), "sokolnitz": (-30, 20), "kobelnitz": (10, 30), "pratzen": (-20, 10),
            "schlapanitz": (40, -20), "bosenitz": (0, 0), "augezd": (10, 0), "menitz": (0, 20),
            "krzenowitz": (-20, 0), "blasowitz": (10, -10)}
SUN = {"aube": (127.0, 3.0), "matin": (141.0, 10.0), "midi": (180.0, 19.0)}
FOV = 40.0
TACTICAL_TILT = 52.0


def arguments():
    values = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    options = {"previews": "", "samples": "16", "probe": "", "reuse": ""}
    for item in values:
        key, _, value = item.partition("=")
        options[key.lstrip("-")] = value
    return options


DISTANCE_CELL = 5.0
DISTANCES = {}


def distance_grid(name, lines, reach):
    if name not in DISTANCES:
        x0, x1, y0, y1 = EXTENT
        xs = np.arange(x0, x1 + DISTANCE_CELL / 2, DISTANCE_CELL)
        ys = np.arange(y0, y1 + DISTANCE_CELL / 2, DISTANCE_CELL)
        grid = np.full((len(ys), len(xs)), np.inf)
        for line in lines:
            np.minimum(grid, grid_distance(line, xs, ys, reach), out=grid)
        DISTANCES[name] = np.minimum(grid, reach)
    return DISTANCES[name]


def road_distance(x, y):
    lines = [densify(chaikin(OLMUTZ_ROAD), 20.0)] + [densify(chaikin(np.array(t, float), 2), 20.0) for t in TRACKS]
    return bilinear(distance_grid("roads", lines, 60.0), EXTENT[0], EXTENT[2], DISTANCE_CELL, x, y)


def stream_distance(x, y):
    lines = [densify(chaikin(course), 20.0) for course in COURSES.values()]
    return bilinear(distance_grid("streams", lines, 60.0), EXTENT[0], EXTENT[2], DISTANCE_CELL, x, y)


def place_set(library, collection, parent, key, build, points, scale_range, generator, sink=0.0, shadow=True):
    matrices = [placement(px, py, pz - sink, generator.uniform(0, math.tau), generator.uniform(*scale_range))
                for px, py, pz in points]
    if matrices:
        library.place(key, build, collection, parent, matrices, cast_shadow=shadow, ground_occlusion=False)
    return len(matrices)


def in_areas(x, y, areas, margin=1.0):
    mask = np.zeros(np.asarray(x).shape, bool)
    for centre, length, width, rotation in areas:
        mask |= ellipse_measure(x, y, centre, length, width, rotation) < margin
    return mask


def near_village(x, y, scale):
    distance = np.full(np.asarray(x).shape, np.inf)
    for centre, radius, _ in VILLAGES.values():
        distance = np.minimum(distance, np.hypot(x - centre[0], y - centre[1]) / (radius * scale))
    return distance


def vegetation(relief, ground, library, collection, root):
    generator = np.random.default_rng(31)
    group = new_empty("vegetation", collection, root)
    counts = {}

    def woods(x, y, f):
        return in_areas(x, y, WOODS + [PHEASANTRY]) & (f["random"] < 0.75) & (f["pond"] > 10)

    def orchards(x, y, f):
        ring = near_village(x, y, 1.0)
        return (ring > 0.75) & (ring < 1.7) & (f["random"] < 0.5) & (f["pond"] > 10)

    def lines(x, y, f):
        road = road_distance(x, y)
        return (road < 14) & (road > 6) & (f["random"] < 0.5) & (near_village(x, y, 1.0) > 1.2)

    def banks(x, y, f):
        return (f["stream"] > 6) & (f["stream"] < 22) & (f["random"] < 0.45) & (f["pond"] > 8)

    def pines(x, y, f):
        return in_areas(x, y, WOODS[1:2]) & (f["random"] < 0.4)

    rules = [("tree_wood", lambda: props.bare_tree(1), woods, EXTENT, 24.0, (0.9, 1.3)),
             ("tree_orchard", lambda: props.bare_tree(2), orchards, CORE, 30.0, (0.6, 0.85)),
             ("tree_road", lambda: props.bare_tree(3), lines, CORE, 28.0, (0.8, 1.1)),
             ("poplar", props.poplar, banks, CORE, 45.0, (0.8, 1.2)),
             ("pine", props.pine, pines, EXTENT, 14.0, (0.8, 1.2))]
    for index, (key, build, rule, bounds, spacing, scale_range) in enumerate(rules):
        points = scatter(relief, ground, bounds, spacing, 100 + index, rule)
        counts[key] = place_set(library, collection, group, key, build, points, scale_range, generator, 0.3,
                                shadow=False)
    return counts


def settlements(relief, ground, library, collection, root):
    group = new_empty("settlements", collection, root)
    height_at = lambda x, y: float(ground.sample(np.array([x]), np.array([y]))[0])
    pond_names = list(PONDS)

    def usable(x, y):
        if any(ellipse_measure(x, y, *PONDS[name]) < 1.3 for name in pond_names):
            return False
        point = (np.array([x]), np.array([y]))
        return bool(stream_distance(*point)[0] > 12) and road_distance(*point)[0] > 9

    houses = []
    for seed, (name, (centre, radius, count)) in enumerate(VILLAGES.items()):
        houses += props.village(centre, radius, count, height_at, usable, seed + 1)
    variants = 6
    for variant in range(variants):
        matrices = [placement(x, y, z, turn) for x, y, z, turn in houses[variant::variants]]
        build = (lambda variant=variant: props.barn(variant)) if variant == 5 else (lambda variant=variant: props.house(variant + 1))
        library.place(f"house_{variant}", build, collection, group, matrices, cast_shadow=True, ground_occlusion=False)
    church_matrices = []
    for name, (dx, dy) in CHURCHES.items():
        cx, cy = VILLAGES[name][0]
        church_matrices.append(placement(cx + dx, cy + dy, height_at(cx + dx, cy + dy), math.radians(10)))
    library.place("church", lambda: props.church(), collection, group, church_matrices, cast_shadow=True,
                  ground_occlusion=False)
    x, y = CASTLE
    unique_object("sokolnitz_castle", props.chateau(), collection, group, {},
                  matrix=placement(x, y, height_at(x, y), math.radians(5)), ground_occlusion=False)
    centre, length, width, rotation = PHEASANTRY
    walls = []
    angle = math.radians(rotation)
    for k in range(36):
        a0 = k * math.tau / 36
        a1 = (k + 1) * math.tau / 36
        p0 = (length * math.cos(a0), width * math.sin(a0))
        p1 = (length * math.cos(a1), width * math.sin(a1))
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        wx = centre[0] + mx * math.cos(angle) - my * math.sin(angle)
        wy = centre[1] + mx * math.sin(angle) + my * math.cos(angle)
        heading = math.atan2(p1[1] - p0[1], p1[0] - p0[0]) + angle
        segment = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
        walls.append(placement(wx, wy, height_at(wx, wy), heading, (segment / 40.0, 1.0, 1.0)))
    library.place("pheasantry_wall", lambda: props.wall_segment(40.0), collection, group, walls, cast_shadow=False,
                  ground_occlusion=False)
    sx, sy = SANTON
    batteries = [placement(sx + dx, sy + dy, height_at(sx + dx, sy + dy), math.radians(turn))
                 for dx, dy, turn in ((-10, -40, 0), (40, 10, 70), (-50, 20, -60))]
    library.place("earthwork", lambda: props.earthwork(), collection, group, batteries, cast_shadow=False,
                  ground_occlusion=False)
    unique_object("santon_chapel_ruin", props.chapel_ruin(), collection, group, {},
                  matrix=placement(sx + 5, sy + 5, height_at(sx + 5, sy + 5), 0.3), ground_occlusion=False)
    return {"houses": len(houses), "churches": len(church_matrices), "walls": len(walls)}


def build_troops(collection, parent):
    group = new_empty("troops", collection, parent)
    report = {}
    for kind, (near, far) in figures.TROOPS.items():
        for suffix, build in (("", near), ("_far", far)):
            name = f"troop_{kind}{suffix}"
            created = unique_object(name, build(), collection, group, {}, ground_occlusion=False)
            created.location.z = TEMPLATE_DEPTH
            report[name] = triangles_of(created.data)
    return report


def seeded(index):
    value = math.sin(index * 127.1 + 311.7) * 43758.5453
    return value - math.floor(value)


def slots(count, width, depth, seed):
    columns = max(1, min(count, round(math.sqrt(count * width / depth))))
    rows = math.ceil(count / columns)
    result = []
    for index in range(count):
        key = seed * 7919 + index * 13
        result.append(((index % columns + 0.5 + (seeded(key) - 0.5) * 0.22) / columns,
                       (index // columns + 0.5 + (seeded(key + 1) - 0.5) * 0.22) / rows,
                       (seeded(key + 2) - 0.5) * 1.2, (seeded(key + 3) - 0.5) * 1.2))
    return result


def preview_units():
    return {
        "plateau": [("ligne-francaise", 300, (-150, -150), 120, 500, 60),
                    ("ligne-francaise", 300, (900, 2700), 140, 500, 60),
                    ("artillerie-francaise", 12, (-300, -250), 120, 200, 30),
                    ("infanterie-russe", 300, (500, -500), 300, 400, 60),
                    ("infanterie-autrichienne", 400, (700, 300), 270, 500, 80),
                    ("artillerie-coalisee", 12, (600, 100), 270, 220, 30)],
        "rasante": [("ligne-francaise", 250, (-150, -150), 120, 300, 60),
                    ("artillerie-francaise", 10, (-100, -230), 120, 160, 25),
                    ("garde-francaise", 120, (-400, -350), 120, 150, 40),
                    ("cuirassier-francais", 60, (-300, 100), 120, 140, 40),
                    ("infanterie-russe", 250, (250, -420), 300, 300, 60),
                    ("cosaque", 40, (380, -300), 300, 120, 40),
                    ("cavalerie-coalisee", 60, (300, -150), 300, 160, 40),
                    ("infanterie-autrichienne", 200, (260, 40), 300, 260, 60)],
    }


def place_preview_figures(ground, collection, units, scale):
    meshes = {kind: figures.TROOPS[kind][0]().to_mesh(f"preview_{kind}", {}, False) for kind in figures.TROOPS}
    group = new_empty("preview_figures", collection)
    positions = []
    for seed, (kind, count, (cx, cy), facing, width, depth) in enumerate(units, start=1):
        angle = math.radians(facing)
        for u, v, jx, jy in slots(count, width, depth, seed):
            along = (u - 0.5) * width
            ahead = depth * (0.5 - v)
            x = cx + math.cos(angle) * along + math.sin(angle) * ahead + jx
            y = cy - math.sin(angle) * along + math.cos(angle) * ahead + jy
            positions.append((kind, x, y, facing))
    xs = np.array([p[1] for p in positions])
    ys = np.array([p[2] for p in positions])
    zs = ground.engine_height(xs, ys)
    for (kind, x, y, heading), z in zip(positions, zs):
        matrix = Matrix.Translation((x, y, float(z))) @ Matrix.Rotation(math.radians(-heading), 4, "Z") @ Matrix.Scale(
            scale, 4)
        new_object(f"preview_{kind}", meshes[kind], collection, group, matrix)
    return group


def look_camera(collection, name, eye, target):
    data = bpy.data.cameras.new(name)
    data.sensor_fit = "VERTICAL"
    data.angle_y = math.radians(FOV)
    data.clip_start = 0.3
    data.clip_end = 80000.0
    rig = new_object(name, data, collection)
    rig.location = eye
    rig.rotation_euler = (Vector(target) - Vector(eye)).to_track_quat("-Z", "Y").to_euler()
    return rig


def tactical_view(ground, focus, span, yaw=0.0):
    fx, fy = focus
    distance = span / (2 * math.tan(math.radians(FOV / 2)) * 1.6)
    tilt = math.radians(TACTICAL_TILT)
    fz = float(ground.sample(np.array([fx]), np.array([fy]))[0])
    heading = math.radians(yaw)
    back = math.cos(tilt) * distance
    return (fx - math.sin(heading) * back, fy - math.cos(heading) * back, fz + math.sin(tilt) * distance), (fx, fy, fz)


def ground_eye(ground, eye, target, lift=1.7):
    ez = float(ground.sample(np.array([eye[0]]), np.array([eye[1]]))[0]) + lift
    tz = float(ground.sample(np.array([target[0]]), np.array([target[1]]))[0]) + 1.4
    return (eye[0], eye[1], ez), (target[0], target[1], tz)


def render_previews(options, ground, collection):
    shots = {
        "tactique_ensemble": ("matin", 5.0, None, None, tactical_view(ground, (-800, 1200), 13000)),
        "tactique_plateau": ("matin", 5.0, "plateau", None, tactical_view(ground, (300, 600), 3200)),
        "tactique_brouillard": ("aube", 5.0, None, 238.0, tactical_view(ground, (-600, 1000), 9000)),
        "tactique_etangs": ("midi", 5.0, None, None, tactical_view(ground, (-2600, -3600), 4200)),
        "rasante_plateau": ("matin", 1.0, "rasante", None, ground_eye(ground, (-420, -420), (200, -180))),
        "rasante_santon": ("midi", 1.0, None, None, ground_eye(ground, (-1700, 5600), (106, 6713))),
    }
    wanted = [name for name in options["previews"].split(",") if name]
    configure_render(1280, 720, int(options["samples"]), volumetric_end=12000.0)
    scene = bpy.context.scene
    scene.view_settings.view_transform = "Khronos PBR Neutral"
    scene.view_settings.look = "None"
    timings = {}
    for name in wanted:
        sun_key, scale, units, mist, (eye, target) = shots[name]
        azimuth, elevation = SUN[sun_key]
        for world in list(bpy.data.worlds):
            bpy.data.worlds.remove(world)
        for lamp in [item for item in bpy.data.objects if item.type == "LIGHT"]:
            bpy.data.objects.remove(lamp)
        evening_world(azimuth, elevation, float(options.get("sky", 0.25)), 0.8)
        sun_lamp(collection, azimuth, elevation, float(options.get("sun", 3.0)), (1.0, 0.86, 0.7), 0.53)
        haze = haze_volume(collection, 9000.0, mist, 0.004, (0.9, 0.9, 0.92), 6.0) if mist else None
        group = place_preview_figures(ground, collection, preview_units()[units], scale) if units else None
        rig = look_camera(collection, f"cam_{name}", eye, target)
        rig.data.clip_start = 20.0 if name.startswith("tactique") else 0.3
        timings[name] = round(render_still(rig, os.path.join(PREVIEWS, f"{name}.png")), 1)
        print(f"PREVIEW {name} {timings[name]} s", flush=True)
        if haze is not None:
            bpy.data.objects.remove(haze)
        if group is not None:
            for child in list(group.children):
                bpy.data.objects.remove(child)
            bpy.data.objects.remove(group)
    return timings


PROBES = {"pratzeberg": (0, 0), "pratzen": (201, 1464), "stare_vinohrady": (1700, 2300), "santon": SANTON,
          "zuran": (-1753, 5745), "telnitz": (-3254, -2918), "sokolnitz": (-3014, -1606), "kobelnitz": (-2234, 1097),
          "puntowitz": (-1468, 2676), "goldbach_kobelnitz": (-2310, 1030), "augezd": (-367, -2651),
          "blasowitz": (1703, 4177), "girzikowitz": (-287, 4333), "krzenowitz": (4874, 1564),
          "satschan_pond": PONDS["satschan"][0], "menitz_pond": PONDS["menitz"][0], "olmutz_road": (-1000, 6150)}


def main():
    options = arguments()
    started = time.perf_counter()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    principled_material("matte", color=(1.0, 1.0, 1.0), roughness=0.88)
    relief = Relief(GEO_CACHE)
    lap = lambda label: print(f"STAGE {label} {time.perf_counter() - started:.0f} s", flush=True)
    if options["probe"]:
        print("PROBE", json.dumps({name: round(float(relief.evaluate(np.array([x]), np.array([y]))[0]), 1)
                                   for name, (x, y) in PROBES.items()}), json.dumps(relief.pond_levels), flush=True)
        stats = {name: [round(float(v), 1) for v in np.percentile(relief.base, [1, 25, 50, 75, 99])] for name in ["base"]}
        print("STATS", json.dumps(stats), flush=True)
        return
    collection = ensure_collection("Austerlitz")
    root = new_empty("austerlitz", collection)
    materials = ground_materials(relief, os.path.join(CACHE, "work"), TEXTURE_SIZES, bool(options["reuse"]))
    lap("textures")
    ground = Ground(relief)
    terrain, vertices = ground.build(materials, collection, new_object)
    terrain.parent = root
    lap("ground")
    far = far_ground(relief, ground, collection, new_object, far_material())
    far.parent = root
    for item in ice_surfaces(relief, collection, new_object) + stream_surfaces(relief, collection, new_object):
        item.parent = root
    lap("water")
    library = TemplateLibrary({})
    counts = {"settlements": settlements(relief, ground, library, collection, root),
              "vegetation": vegetation(relief, ground, library, collection, root)}
    lap("props")
    print("COUNTS", json.dumps(counts), flush=True)
    troops = build_troops(collection, root)
    statistics = group_statistics([root])
    lap("statistics")
    print("STATISTICS", json.dumps(statistics["total"]), flush=True)
    glb = os.path.join(CACHE, "austerlitz.glb")
    export_seconds = export_glb(glb, [root])
    lap("export")
    probes = {name: round(float(ground.sample(np.array([x]), np.array([y]))[0]), 1) for name, (x, y) in PROBES.items()}
    report = {
        "extent": EXTENT,
        "relief": DEM_LICENCE,
        "ground_vertices": vertices,
        "pond_levels": relief.pond_levels,
        "probes": probes,
        "counts": counts,
        "troop_triangles": troops,
        "statistics": statistics,
        "export_seconds": export_seconds,
        "glb_bytes": os.path.getsize(glb),
    }
    if options["previews"]:
        report["previews"] = render_previews(options, ground, collection)
    report["total_seconds"] = time.perf_counter() - started
    with open(os.path.join(CACHE, "report.json"), "w", encoding="utf8") as handle:
        json.dump(report, handle, indent=1)
    print("REPORT", json.dumps({key: report[key] for key in ("ground_vertices", "probes", "counts", "glb_bytes",
                                                             "total_seconds")}), flush=True)
    print("STATISTICS", json.dumps(statistics["total"]), flush=True)


if __name__ == "__main__":
    main()

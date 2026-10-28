import json
import math
import os
import random
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import bpy
from mathutils import Matrix, Vector

from kit import sacre_decor as decor_kit
from kit import sacre_exterior as exterior
from kit import sacre_figures as figures
from kit import sacre_materials as materials
from kit import sacre_plan as plan
from kit.geometry import MeshBuilder, TemplateLibrary, ensure_collection, new_empty, unique_object
from kit.sacre_gothic import Cathedral
from kit.stage import camera, configure_render, export_glb, group_statistics, render_still, sun_lamp, sun_vector

SCENE_ID = "sacre-de-napoleon"
PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(PROJECT, ".cache", "scenes", SCENE_ID)
PREVIEWS = os.path.join(PROJECT, ".cache", "previews", SCENE_ID)
BLEND = os.path.join(CACHE, "work", f"{SCENE_ID}.blend")
LENS = 27.8


def arguments():
    values = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    options = {"previews": "vue-d-ensemble", "samples": "16", "export": "1"}
    for item in values:
        key, _, value = item.partition("=")
        options[key.lstrip("-")] = value
    options["samples"] = int(options["samples"])
    return options


class Scene:
    def __init__(self, tiles):
        self.tiles = tiles
        self.library = TemplateLibrary(tiles)
        self.collection = ensure_collection("Sacre")
        self.roots = {}

    def root(self, name):
        if name not in self.roots:
            self.roots[name] = new_empty(name, self.collection)
        return self.roots[name]

    def unique(self, group, name, builder, cast_shadow=True, occlusion=True):
        if not builder.polygons:
            return None
        return unique_object(name, builder, self.collection, self.root(group), self.tiles, cast_shadow=cast_shadow,
                             ground_occlusion=occlusion)

    def instances(self, group, key, build, matrices, cast_shadow=False, occlusion=True):
        if matrices:
            self.library.place(key, build, self.collection, self.root(group), matrices, cast_shadow, occlusion)
        return len(matrices)


def light_path(start, direction, plane_y):
    t = (plane_y - start.y) / direction.y
    return start + direction * t


def shafts(cathedral):
    sun = sun_vector(*plan.SUN)
    travel = -sun
    result = []
    rose = cathedral.roses_info["sud"]
    result.append((rose, light_path(rose, travel, plan.CHAPEL - 1.0), 3.0))
    picked = [w for w in cathedral.windows if w[0].z > 24 and abs(w[0].y + plan.ARCADE) < 0.2 and 12 < w[0].x < 32]
    picked.sort(key=lambda w: w[0].x)
    for centre, normal, width in picked[::2][:3]:
        result.append((centre, light_path(centre, travel, plan.ARCADE - 0.6), width * 0.32))
    result.append((Vector((30.0, -plan.ARCADE - 1.0, 24.0)), Vector((29.9, 0.0, 0.6)), 1.1))
    return result


def points_of_interest(decor, porch):
    px, py, pz = decor.anchors["pape"]
    return {
        "vue-d-ensemble": (Vector((-235.0, -150.0, 95.0)), Vector((-30.0, -5.0, 22.0))),
        "le-porche": (Vector((porch["front"] - 60.0, -22.0, 6.5)), Vector((porch["front"] + 4.0, 2.0, 13.0))),
        "la-nef": (Vector((-52.0, 0.0, 13.5)), Vector((12.0, 0.0, 6.0))),
        "le-grand-trone": (Vector((-27.0, 0.0, 9.5)), Vector((-60.0, 0.0, 9.0))),
        "la-nef-gothique": (Vector((-49.0, 5.4, 14.0)), Vector((-10.0, -5.5, 22.0))),
        "la-croisee-et-les-musiciens": (Vector((-2.0, 8.4, 4.5)), Vector((0.0, -20.0, 11.0))),
        "le-choeur": (Vector((6.0, 0.0, 4.2)), Vector((plan.PIETA[0], 0.0, 5.5))),
        "le-pape-pie-vii": (Vector((26.6, -1.0, 2.4)), Vector((px, py, pz + 0.8))),
        "le-couronnement": (Vector((27.4, -5.4, 2.9)), Vector((30.4, 0.6, 1.4))),
    }


def visibility(eyes):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    scene = bpy.context.scene

    def visible(x, y, z):
        head = Vector((x, y, z + 1.6))
        for eye in eyes:
            offset = head - eye
            distance = offset.length
            if distance < 12.0:
                return True
            hit, location, *_ = scene.ray_cast(depsgraph, eye, offset.normalized(), distance=distance - 0.4)
            if not hit:
                return True
        return False

    return visible


def place_markers(scene, points, shaft_list, decor, routes, candles):
    root = scene.root("markers")
    for key, (eye, target) in points.items():
        new_empty(f"poi_{key}", scene.collection, root, Matrix.Translation(eye))
        new_empty(f"poi_{key}_target", scene.collection, root, Matrix.Translation(target))
    for index, (start, end, radius) in enumerate(shaft_list):
        node = new_empty(f"shaft_{index + 1}", scene.collection, root, Matrix.Translation(start))
        node["radius"] = round(radius, 2)
        new_empty(f"shaft_{index + 1}_target", scene.collection, root, Matrix.Translation(end))
    for index, position in enumerate(decor.lamps):
        new_empty(f"lamp_{index + 1}", scene.collection, root, Matrix.Translation(position))
    for index, position in enumerate(candles):
        new_empty(f"candle_{index + 1}", scene.collection, root, Matrix.Translation(position))
    for name, path in routes.items():
        for index, point in enumerate(path):
            new_empty(f"walk_{name}_{index:02d}", scene.collection, root, Matrix.Translation(point))


def build(options):
    started = time.perf_counter()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    tiles = materials.build(os.path.join(CACHE, "kit"))
    scene = Scene(tiles)
    report = {}
    cathedral = Cathedral().build()
    exterior.facade(cathedral.outside, cathedral.roses)
    exterior.banners(cathedral.outside)
    outside_decor = MeshBuilder()
    porch = exterior.porch(outside_decor)
    report["gallery"] = exterior.gallery(outside_decor)
    town = MeshBuilder()
    exterior.ground(town)
    report["houses"] = len(exterior.city(town))
    decor = decor_kit.Decor().build()
    print("GEOMETRY", round(time.perf_counter() - started, 1), flush=True)
    scene.unique("cathedrale", "nef_interieur", cathedral.inside)
    scene.unique("cathedrale", "nef_exterieur", cathedral.outside)
    scene.unique("cathedrale", "dallage", cathedral.floor, cast_shadow=False)
    scene.unique("vitraux", "verrieres", cathedral.glass, cast_shadow=False, occlusion=False)
    scene.unique("vitraux", "roses", cathedral.roses, cast_shadow=False, occlusion=False)
    scene.unique("decor", "decor_or", decor.solid, cast_shadow=False)
    scene.unique("decor", "tentures", decor.cloth, cast_shadow=False)
    scene.unique("decor", "porche", outside_decor)
    scene.unique("ville", "ville", town)
    groups = {}
    for kind, matrix in decor.fixtures:
        groups.setdefault(kind, []).append(matrix)
    candles = []
    for kind, matrices in groups.items():
        solid, flames, offsets = decor_kit.fixture(kind)
        scene.instances("lustres", kind, lambda solid=solid: solid, matrices, occlusion=False)
        scene.instances("lustres", f"{kind}_flammes", lambda flames=flames: flames, matrices, occlusion=False)
        for matrix in matrices:
            candles.extend(matrix @ Vector(offset) for offset in offsets)
    report["candles"] = len(candles)
    points = points_of_interest(decor, porch)
    rng = random.Random(1804)
    keep = float(options.get("crowd", 1.0))
    bpy.context.view_layer.update()
    placed, dropped = figures.crowd(decor.zones, rng, keep, visibility([eye for eye, _ in points.values()]))
    report["crowd_culled"] = dropped
    for key, matrices in figures.principals(decor).items():
        placed.setdefault(key, []).extend(matrices)
    for key, matrices in figures.outside(rng, porch["front"]).items():
        placed.setdefault(key, []).extend(matrices)
    for key, matrices in figures.statues(porch["statues"], porch["figures"]).items():
        placed.setdefault(key, []).extend(matrices)
    counts = {}
    for key, matrices in placed.items():
        counts[key] = scene.instances("assistance", key, figures.builder_for(key), matrices)
    report["figures"] = counts
    report["figures_total"] = sum(counts.values())
    walker_root = scene.root("walkers")
    for key in figures.WALKERS:
        unique_object(key, figures.person(figures.WALKERS[key]), scene.collection, walker_root, tiles,
                      matrix=Matrix.Translation((0.0, 0.0, -60.0)), cast_shadow=False)
    shaft_list = shafts(cathedral)
    routes = figures.routes(porch["front"])
    routes = {"bas-cote-sud": routes["bas-cote-sud"], "bas-cote-nord": routes["bas-cote-nord"],
              "parvis-nord": [(x, 12.6, 0.0) for x in frange(porch["front"] - 4.0, porch["front"] - 52.0, -2.6)],
              "parvis-sud": [(x, -12.6, 0.0) for x in frange(porch["front"] - 4.0, porch["front"] - 52.0, -2.6)]}
    place_markers(scene, points, shaft_list, decor, routes, candles)
    report["shafts"] = [[list(map(lambda v: round(v, 2), a)), list(map(lambda v: round(v, 2), b)), r] for a, b, r in shaft_list]
    report["lamps"] = decor.lamps
    report["sun"] = plan.SUN
    roots = list(scene.roots.values())
    statistics = group_statistics(roots)
    for key, value in statistics.items():
        print("GROUP", key, json.dumps(value), flush=True)
    report["statistics"] = statistics
    if options["export"] == "1":
        glb = os.path.join(CACHE, f"{SCENE_ID}.glb")
        report["export_seconds"] = round(export_glb(glb, roots), 1)
        report["glb_bytes"] = os.path.getsize(glb)
        print("GLB", glb, report["glb_bytes"], flush=True)
    report["markers"] = {key: [[round(v, 2) for v in eye], [round(v, 2) for v in target]] for key, (eye, target) in points.items()}
    bpy.context.scene["preview_views"] = json.dumps({key: [list(eye), list(target)] for key, (eye, target) in points.items()})
    bpy.context.scene["lamps"] = json.dumps(decor.lamps)
    os.makedirs(os.path.dirname(BLEND), exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
    report["build_seconds"] = round(time.perf_counter() - started, 1)
    return report, points


def frange(start, stop, step):
    values = []
    value = start
    while (value > stop) if step < 0 else (value < stop):
        values.append(value)
        value += step
    return values


def sky_world(strength):
    world = bpy.data.worlds.new("WinterSky")
    bpy.context.scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    background = nodes["Background"]
    sky = nodes.new("ShaderNodeTexSky")
    sky.sky_type = "MULTIPLE_SCATTERING"
    sky.sun_elevation = math.radians(plan.SUN[1])
    sky.sun_rotation = math.radians(plan.SUN[0]) % math.tau
    sky.sun_disc = False
    sky.altitude = 100.0
    sky.aerosol_density = 1.2
    world.node_tree.links.new(sky.outputs["Color"], background.inputs["Color"])
    background.inputs["Strength"].default_value = strength
    return world


def render_previews(options, views):
    wanted = options["previews"]
    if wanted == "none":
        return {}
    names = list(views) if wanted == "all" else wanted.split(",")
    stage = ensure_collection("Stage")
    world = sky_world(float(options.get("sky", 0.12)))
    sun_lamp(stage, plan.SUN[0], plan.SUN[1], float(options.get("sun", 5.0)), (1.0, 0.9, 0.78), 0.53)
    lamps = []
    for index, position in enumerate(json.loads(bpy.context.scene.get("lamps", "[]"))):
        data = bpy.data.lights.new(f"lamp_{index}", type="POINT")
        data.energy = float(options.get("lamp", 60000.0))
        data.color = (1.0, 0.72, 0.42)
        data.shadow_soft_size = 1.5
        lamp = bpy.data.objects.new(f"lamp_{index}", data)
        stage.objects.link(lamp)
        lamp.location = position
        lamps.append(lamp)
    configure_render(int(options.get("width", 1280)), int(options.get("height", 720)), options["samples"])
    bpy.context.scene.view_settings.view_transform = "Khronos PBR Neutral"
    bpy.context.scene.view_settings.look = "None"
    timings = {}
    for name in names:
        eye, target = views[name]
        rig = camera(stage, f"cam_{name}", Vector(eye), Vector(target), lens=LENS)
        rig.data.clip_start = 0.1
        inside = abs(Vector(eye).x + 6.0) < 60 and abs(Vector(eye).y) < 24 and Vector(eye).z < 34
        world.node_tree.nodes["Background"].inputs["Strength"].default_value = (
            float(options.get("sky_inside", 0.04)) if inside else float(options.get("sky", 0.12)))
        bpy.context.scene.view_settings.exposure = float(options.get("exposure", -0.4)) + (
            float(options.get("inside_exposure", 1.2)) if inside else 0.0)
        path = os.path.join(PREVIEWS, f"{name}{options.get('tag', '')}.png")
        timings[name] = round(render_still(rig, path), 1)
        print(f"PREVIEW {path} {timings[name]} s", flush=True)
    return timings


def main():
    options = arguments()
    if options.get("reuse") == "1":
        bpy.ops.wm.open_mainfile(filepath=BLEND)
        views = {key: (Vector(eye), Vector(target)) for key, (eye, target) in
                 json.loads(bpy.context.scene["preview_views"]).items()}
        print("PREVIEWS", json.dumps(render_previews(options, views)), flush=True)
        return
    report, views = build(options)
    report["previews"] = render_previews(options, views)
    with open(os.path.join(CACHE, "build_report.json"), "w", encoding="utf8") as handle:
        json.dump(report, handle, indent=1, default=str)
    print("TOTAL", report["build_seconds"], flush=True)


if __name__ == "__main__":
    main()

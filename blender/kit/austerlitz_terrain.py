import math
import os

import bpy
import numpy as np

from .materials import baked_material, download, principled_material, save_pixels
from .terrain import GeoFrame

DEM_URL = ("https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N49_00_E016_00_DEM/"
           "Copernicus_DSM_COG_10_N49_00_E016_00_DEM.tif")
DEM_LICENCE = ("produced using Copernicus WorldDEM-30 (c) DLR e.V. 2010-2014 and (c) Airbus Defence and Space GmbH "
               "2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved")
DEM_NORTH = 50.0
DEM_WEST = 16.0
DEM_STEP = 1.0 / 3600.0
PRATZEBERG = (49.12814, 16.76244)
EXTENT = (-8000.0, 8000.0, -7000.0, 9000.0)
CORE = (-4800.0, 3600.0, -5200.0, 7800.0)
CORE_SOUTH = (-4800.0, 3600.0, -5200.0, 1300.0)
CORE_NORTH = (-4800.0, 3600.0, 1300.0, 7800.0)
RING_SPACING = 80.0
CORE_SPACING = 25.0
FAR_SPACING = 400.0
FAR_REACH = (25, 25, 17, 25)
BASE_SPACING = 10.0
SKIRT = 3.0

GOLDBACH = np.array([
    (-2672, 6835), (-2695, 6548), (-2796, 6273), (-2851, 5989), (-2869, 5699), (-3034, 5438), (-3057, 5178),
    (-2978, 4910), (-2696, 4630), (-2595, 4371), (-2345, 4086), (-2319, 3821), (-2301, 3537), (-2207, 3259),
    (-1991, 2944), (-1821, 2692), (-1840, 2410), (-1899, 2150), (-2134, 1886), (-2352, 1611), (-2364, 1295),
    (-2310, 1030), (-2294, 767), (-2459, 508), (-2426, 248), (-2410, -195), (-2457, -450), (-2560, -716),
    (-2494, -971), (-2440, -1228), (-2676, -1505), (-2882, -1829), (-3007, -2130), (-3105, -2407), (-3278, -2668),
    (-3489, -2928), (-3740, -3245), (-3950, -3520)], float)
LITTAWA = np.array([
    (7465, 1984), (7191, 1774), (6861, 1496), (6610, 1265), (6351, 84), (5854, -58), (5554, -146), (5224, -197),
    (4965, -132), (4708, 20), (4421, 33), (4021, -22), (3724, -210), (3265, -635), (3004, -920), (2738, -1090),
    (2465, -1256), (2202, -1418), (1845, -1947), (1579, -2236), (1329, -2580), (1059, -2600), (783, -2569),
    (343, -2539), (34, -2711), (-255, -2951), (-560, -3260)], float)
LITTAWA_OUT = np.array([(-4900, -4700), (-5136, -4879), (-5133, -5239), (-5184, -5558), (-5331, -6426), (-5863, -6510),
                        (-6464, -6698), (-6989, -6915), (-7532, -7418)], float)
BOSENITZ_BROOK = np.array([
    (-576, 6951), (-598, 6689), (-544, 6393), (-484, 6087), (-461, 5832), (-681, 5433), (-622, 5110), (-506, 4792),
    (-461, 4376), (-672, 4058), (-772, 3601), (-1033, 3271), (-1413, 3018), (-1784, 2752)], float)
COURSES = {"goldbach": GOLDBACH, "littawa": LITTAWA, "littawa_out": LITTAWA_OUT, "bosenitz": BOSENITZ_BROOK}
STREAMS = {"goldbach": (3.0, 1.2, 12.0), "littawa": (5.0, 1.4, 16.0), "littawa_out": (5.0, 1.4, 16.0),
           "bosenitz": (1.6, 0.8, 8.0)}
PONDS = {"satschan": ((-1650.0, -3720.0), 1150.0, 330.0, 22.0), "menitz": ((-4280.0, -4020.0), 1300.0, 480.0, 47.0),
         "kobelnitz": ((-2200.0, 1750.0), 520.0, 210.0, 50.0)}
OLMUTZ_ROAD = np.array([(-8200, 4700), (-6000, 5050), (-4000, 5450), (-2400, 5800), (-1000, 6150), (0, 6400),
                        (1200, 6750), (2600, 7150), (4200, 7650), (6000, 8150), (8200, 8700)], float)
TRACKS = [
    [(-3254, -2918), (-3014, -1606), (-2744, -1139), (-2234, 1097), (-1468, 2676), (-2562, 4533), (-2400, 5800)],
    [(-3254, -2918), (-1700, -2850), (-367, -2651), (201, 1464), (1703, 4177), (1200, 6750)],
    [(-367, -2651), (1500, -2400), (2993, -1183), (5181, 118)],
    [(-2234, 1097), (201, 1464), (3190, 351), (4874, 1564), (8000, 2900)],
    [(-1468, 2676), (-287, 4333), (1703, 4177), (4874, 1564)],
    [(-287, 4333), (-1000, 6150)],
    [(-3254, -2918), (-3100, -4100), (-2095, -4475)],
    [(-4975, -5087), (-3800, -3250), (-3254, -2918)],
    [(-367, -2651), (-1200, -3200), (-2095, -4475)],
    [(-8000, 2400), (-6200, 2064), (-4200, 1700), (-2234, 1097)],
    [(-8000, -2800), (-5500, -2900), (-3254, -2918)],
]
VILLAGES = {
    "telnitz": ((-3254.0, -2918.0), 170.0, 46),
    "sokolnitz": ((-3014.0, -1606.0), 190.0, 52),
    "kobelnitz": ((-2234.0, 1097.0), 170.0, 42),
    "pratzen": ((201.0, 1464.0), 190.0, 52),
    "puntowitz": ((-1468.0, 2676.0), 120.0, 26),
    "girzikowitz": ((-287.0, 4333.0), 150.0, 36),
    "blasowitz": ((1703.0, 4177.0), 150.0, 38),
    "schlapanitz": ((-2562.0, 4533.0), 260.0, 80),
    "bosenitz": ((661.0, 7080.0), 170.0, 42),
    "augezd": ((-367.0, -2651.0), 190.0, 50),
    "satschan": ((-2095.0, -4475.0), 160.0, 40),
    "menitz": ((-4975.0, -5087.0), 200.0, 54),
    "krzenowitz": ((4874.0, 1564.0), 200.0, 54),
    "zbeischow": ((3190.0, 351.0), 140.0, 34),
    "bellowitz": ((-3597.0, 5656.0), 140.0, 30),
    "hostieradek": ((5181.0, 118.0), 140.0, 32),
    "scharatitz": ((2993.0, -1183.0), 150.0, 34),
    "kowalowitz": ((4393.0, 7703.0), 150.0, 34),
}
PHEASANTRY = ((-2183.0, -282.0), 480.0, 300.0, 15.0)
CASTLE = (-2744.0, -1139.0)
VINEYARD = ((1700.0, 2300.0), 520.0, 280.0, 30.0)
WOODS = [((5600.0, 5200.0), 900.0, 500.0, 20.0), ((-6200.0, -900.0), 700.0, 400.0, 70.0),
         ((6600.0, -3600.0), 1200.0, 600.0, 10.0)]

PLOUGH = np.array([0.40, 0.32, 0.23])
DARK_PLOUGH = np.array([0.33, 0.26, 0.19])
STUBBLE = np.array([0.56, 0.49, 0.35])
WINTER_WHEAT = np.array([0.40, 0.41, 0.29])
FALLOW = np.array([0.50, 0.46, 0.32])
MEADOW = np.array([0.42, 0.43, 0.30])
REEDS = np.array([0.58, 0.52, 0.34])
ICE = np.array([0.72, 0.78, 0.82])
VILLAGE = np.array([0.44, 0.38, 0.30])
GARDEN = np.array([0.30, 0.32, 0.20])
TRACK = np.array([0.66, 0.58, 0.44])
ROAD = np.array([0.72, 0.66, 0.54])
VINE = np.array([0.42, 0.34, 0.24])
WOOD_FLOOR = np.array([0.24, 0.20, 0.15])


def smoothstep(edge0, edge1, value):
    t = np.clip((value - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def chaikin(points, passes=3):
    points = np.asarray(points, float)
    for _ in range(passes):
        quarter = 0.75 * points[:-1] + 0.25 * points[1:]
        three_quarter = 0.25 * points[:-1] + 0.75 * points[1:]
        middle = np.empty((2 * len(quarter), 2))
        middle[0::2] = quarter
        middle[1::2] = three_quarter
        points = np.vstack([points[:1], middle, points[-1:]])
    return points


def densify(points, step):
    result = [np.asarray(points[0], float)]
    for start, end in zip(points[:-1], points[1:]):
        start = np.asarray(start, float)
        end = np.asarray(end, float)
        pieces = max(1, int(np.linalg.norm(end - start) / step))
        result.extend(start + (end - start) * (k / pieces) for k in range(1, pieces + 1))
    return np.array(result)


def polyline_distance(points, x, y, reach=None):
    x = np.asarray(x, float)
    y = np.asarray(y, float)
    distance = np.full(x.shape, np.inf)
    along = np.zeros(x.shape)
    if reach is not None:
        near = ((x > points[:, 0].min() - reach) & (x < points[:, 0].max() + reach)
                & (y > points[:, 1].min() - reach) & (y < points[:, 1].max() + reach))
        if not near.any():
            return distance, along
        inner, inner_along = polyline_distance(points, x[near], y[near])
        distance[near] = inner
        along[near] = inner_along
        return distance, along
    travelled = 0.0
    for (x0, y0), (x1, y1) in zip(points[:-1], points[1:]):
        dx, dy = x1 - x0, y1 - y0
        length = math.hypot(dx, dy)
        t = np.clip(((x - x0) * dx + (y - y0) * dy) / max(length * length, 1e-9), 0, 1)
        current = np.hypot(x - (x0 + t * dx), y - (y0 + t * dy))
        closer = current < distance
        distance = np.where(closer, current, distance)
        along = np.where(closer, travelled + t * length, along)
        travelled += length
    return distance, along


def hashed(ix, iy, seed):
    value = np.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43758.5453
    return value - np.floor(value)


def lattice_noise(x, y, cell, seed):
    gx = np.asarray(x, float) / cell
    gy = np.asarray(y, float) / cell
    x0 = np.floor(gx)
    y0 = np.floor(gy)
    fx = gx - x0
    fy = gy - y0
    fx = fx * fx * (3 - 2 * fx)
    fy = fy * fy * (3 - 2 * fy)
    top = hashed(x0, y0, seed) * (1 - fx) + hashed(x0 + 1, y0, seed) * fx
    bottom = hashed(x0, y0 + 1, seed) * (1 - fx) + hashed(x0 + 1, y0 + 1, seed) * fx
    return top * (1 - fy) + bottom * fy


def world_noise(x, y, cell, seed, octaves=3):
    total = 0.0
    weight = 0.0
    amplitude = 1.0
    for octave in range(octaves):
        total = total + amplitude * lattice_noise(x, y, cell / 2 ** octave, seed + octave * 17)
        weight += amplitude
        amplitude *= 0.5
    return total / weight


def shifted(values, dy, dx):
    padded = np.pad(values, 2, mode="edge")
    rows, columns = values.shape
    return padded[2 + dy:2 + dy + rows, 2 + dx:2 + dx + columns]


def blur(values, passes):
    for _ in range(passes):
        values = (shifted(values, -1, 0) + shifted(values, 1, 0) + shifted(values, 0, -1) + shifted(values, 0, 1)
                  + 4 * values) / 8
    return values


def bilinear(grid, x0, y0, spacing, x, y):
    rows, columns = grid.shape
    column = np.clip((np.asarray(x, float) - x0) / spacing, 0, columns - 1.001)
    row = np.clip((np.asarray(y, float) - y0) / spacing, 0, rows - 1.001)
    c0 = column.astype(int)
    r0 = row.astype(int)
    fx = column - c0
    fy = row - r0
    top = grid[r0, c0] * (1 - fx) + grid[r0, c0 + 1] * fx
    bottom = grid[r0 + 1, c0] * (1 - fx) + grid[r0 + 1, c0 + 1] * fx
    return top * (1 - fy) + bottom * fy


def ellipse_measure(x, y, centre, semi_major, semi_minor, rotation):
    angle = math.radians(rotation)
    dx = np.asarray(x, float) - centre[0]
    dy = np.asarray(y, float) - centre[1]
    u = dx * math.cos(angle) + dy * math.sin(angle)
    v = -dx * math.sin(angle) + dy * math.cos(angle)
    return np.hypot(u / semi_major, v / semi_minor)


def pond_shape(name, x, y):
    centre, major, minor, rotation = PONDS[name]
    wobble = (world_noise(x, y, 260.0, 41 + len(name), 2) - 0.5) * 0.28
    return ellipse_measure(x, y, centre, major, minor, rotation) + wobble, minor


class Relief:
    def __init__(self, cache_dir):
        self.frame = GeoFrame(*PRATZEBERG)
        path = download(DEM_URL, os.path.join(cache_dir, "glo30_N49_E016.tif"))
        image = bpy.data.images.load(path, check_existing=True)
        image.colorspace_settings.name = "Non-Color"
        width, height = image.size
        pixels = np.empty(width * height * image.channels, dtype=np.float32)
        image.pixels.foreach_get(pixels)
        dem = pixels.reshape(height, width, image.channels)[::-1, :, 0]
        bpy.data.images.remove(image)
        north, south, west, east = 49.36, 49.0, 16.42, 17.1
        r0, r1 = int((DEM_NORTH - north) / DEM_STEP), int((DEM_NORTH - south) / DEM_STEP)
        c0, c1 = int((west - DEM_WEST) / DEM_STEP), int((east - DEM_WEST) / DEM_STEP)
        crop = dem[r0:min(r1 + 1, dem.shape[0]), c0:c1 + 1].astype(np.float32)
        self.crop_north = DEM_NORTH - r0 * DEM_STEP
        self.crop_west = DEM_WEST + c0 * DEM_STEP
        self.dem = self.despeckle(crop)
        x0, x1, y0, y1 = EXTENT
        xs = np.arange(x0, x1 + BASE_SPACING / 2, BASE_SPACING)
        ys = np.arange(y0, y1 + BASE_SPACING / 2, BASE_SPACING)
        grid_x, grid_y = np.meshgrid(xs, ys)
        self.base = blur(self.modern_far(grid_x, grid_y), 4)
        self.levels = {}
        self.pond_levels = {}
        for name, (centre, major, minor, rotation) in PONDS.items():
            inside = ellipse_measure(grid_x, grid_y, centre, major, minor, rotation) < 0.85
            self.pond_levels[name] = float(np.percentile(self.base[inside], 20)) + 0.6

    def despeckle(self, dem):
        stack = np.stack([shifted(dem, dy, dx) for dy in (-2, -1, 0, 1, 2) for dx in (-2, -1, 0, 1, 2)])
        return np.median(stack, axis=0)

    def modern_far(self, x, y):
        latitude, longitude = self.frame.to_geo(np.asarray(x, float), np.asarray(y, float))
        rows, columns = self.dem.shape
        row = np.clip((self.crop_north - latitude) / DEM_STEP, 0, rows - 1.001)
        column = np.clip((longitude - self.crop_west) / DEM_STEP, 0, columns - 1.001)
        r0 = row.astype(int)
        c0 = column.astype(int)
        fy = row - r0
        fx = column - c0
        h = self.dem
        top = h[r0, c0] * (1 - fx) + h[r0, c0 + 1] * fx
        bottom = h[r0 + 1, c0] * (1 - fx) + h[r0 + 1, c0 + 1] * fx
        return (top * (1 - fy) + bottom * fy).astype(np.float64)

    def modern(self, x, y):
        return bilinear(self.base, EXTENT[0], EXTENT[2], BASE_SPACING, x, y)

    def evaluate(self, x, y, fields=False, streams=True):
        x = np.asarray(x, float)
        y = np.asarray(y, float)
        h = self.modern(x, y)
        pond = np.full(x.shape, np.inf)
        for name in PONDS:
            measure, minor = pond_shape(name, x, y)
            level = self.pond_levels[name]
            outside = np.maximum(measure - 1.0, 0.0) * minor
            banks = level + 0.35 + outside * 0.05
            near = measure < 1.6
            h = np.where(measure < 1.0, level - 0.5, np.where(near, np.clip(h, level + 0.35, np.maximum(banks, level + 0.35)),
                                                        h))
            pond = np.minimum(pond, np.where(measure < 1.0, -(1.0 - measure) * minor, outside))
        stream = np.full(x.shape, np.inf)
        if streams:
            for name, (half, depth, bank) in STREAMS.items():
                h, distance = self.carve(name, x, y, h, half, depth, bank, pond)
                stream = np.minimum(stream, distance)
        if not fields:
            return h
        return dict(h=h, pond=pond, stream=stream)

    def stream(self, name):
        if name not in self.levels:
            path = densify(chaikin(COURSES[name]), 20.0)
            heights = self.evaluate(path[:, 0], path[:, 1], streams=False)
            level = np.minimum.accumulate(heights - 0.6)
            kernel = np.ones(9) / 9
            level = np.convolve(np.pad(level, 4, mode="edge"), kernel, "valid")
            self.levels[name] = (path, level)
        return self.levels[name]

    def carve(self, name, x, y, h, half, depth, bank, pond):
        path, level = self.stream(name)
        distance, along = polyline_distance(path, x, y, reach=half + bank + 5)
        steps = np.concatenate([[0.0], np.cumsum(np.hypot(*np.diff(path, axis=0).T))])
        surface = np.interp(along, steps, level)
        channel = surface - 0.2 - depth * (1 - (np.minimum(distance, half) / half) ** 2)
        banks = surface + 0.3 + np.maximum(distance - half, 0) * 0.3
        carved = np.where((distance < half + bank) & (pond > 0), np.minimum(h, np.where(distance < half, channel, banks)),
                          h)
        return carved, distance

    def far(self, x, y):
        return self.modern_far(x, y)


def level_grid(bounds, spacing):
    x0, x1, y0, y1 = bounds
    xs = np.arange(x0, x1 + spacing / 2, spacing)
    ys = np.arange(y0, y1 + spacing / 2, spacing)
    return xs, ys


def match_border(heights, xs, ys, ratio):
    for row in (0, -1):
        heights[row, :] = np.interp(xs, xs[::ratio], heights[row, ::ratio])
    for column in (0, -1):
        heights[:, column] = np.interp(ys, ys[::ratio], heights[::ratio, column])
    return heights


def inside(bounds, x, y):
    x0, x1, y0, y1 = bounds
    return (x > x0) & (x < x1) & (y > y0) & (y < y1)


class GroundMesh:
    def __init__(self):
        self.vertices = []
        self.faces = []
        self.materials = []
        self.count = 0

    def add_grid(self, xs, ys, heights, material, holes, skirt):
        grid_x, grid_y = np.meshgrid(xs, ys)
        rows, columns = heights.shape
        index = np.arange(rows * columns).reshape(rows, columns) + self.count
        self.vertices.append(np.column_stack([grid_x.ravel(), grid_y.ravel(), heights.ravel()]))
        quads = np.stack([index[:-1, :-1], index[:-1, 1:], index[1:, 1:], index[1:, :-1]], axis=-1)
        centre_x = (grid_x[:-1, :-1] + grid_x[:-1, 1:]) / 2
        centre_y = (grid_y[:-1, :-1] + grid_y[1:, :-1]) / 2
        keep = np.ones(centre_x.shape, bool)
        for hole in holes:
            keep &= ~inside(hole, centre_x, centre_y)
        kept = quads[keep]
        self.faces.append(kept)
        self.materials.append(np.full(len(kept), material))
        self.count += rows * columns
        if skirt:
            border = np.concatenate([index[0, :], index[1:, -1], index[-1, -2::-1], index[-2:0:-1, 0]])
            top = np.vstack(self.vertices)[border]
            lowered = top.copy()
            lowered[:, 2] -= SKIRT
            self.vertices.append(np.vstack([top, lowered]))
            start = self.count
            count = len(border)
            following = np.roll(np.arange(count), -1)
            upper = start + np.arange(count)
            strip = np.column_stack([upper[following], upper, start + count + np.arange(count),
                                     start + count + following])
            self.faces.append(strip)
            self.materials.append(np.full(len(strip), material))
            self.count += 2 * count

    def build(self, name, materials, uv_rects):
        vertices = np.vstack(self.vertices)
        faces = np.vstack(self.faces)
        material_index = np.concatenate(self.materials)
        mesh = bpy.data.meshes.new(name)
        mesh.vertices.add(len(vertices))
        mesh.vertices.foreach_set("co", vertices.astype(np.float32).ravel())
        mesh.loops.add(len(faces) * 4)
        mesh.loops.foreach_set("vertex_index", faces.astype(np.int32).ravel())
        mesh.polygons.add(len(faces))
        mesh.polygons.foreach_set("loop_start", (np.arange(len(faces)) * 4).astype(np.int32))
        mesh.polygons.foreach_set("loop_total", np.full(len(faces), 4, np.int32))
        mesh.polygons.foreach_set("material_index", material_index.astype(np.int32))
        mesh.polygons.foreach_set("use_smooth", np.ones(len(faces), bool))
        for material in materials:
            mesh.materials.append(material)
        loop_vertices = faces.ravel()
        loop_materials = np.repeat(material_index, 4)
        uv = np.zeros((len(loop_vertices), 2))
        for slot, (x0, x1, y0, y1) in enumerate(uv_rects):
            chosen = loop_materials == slot
            points = vertices[loop_vertices[chosen]]
            uv[chosen, 0] = (points[:, 0] - x0) / (x1 - x0)
            uv[chosen, 1] = (points[:, 1] - y0) / (y1 - y0)
        layer = mesh.uv_layers.new(name="UVMap")
        layer.data.foreach_set("uv", uv.astype(np.float32).ravel())
        mesh.update()
        mesh.validate()
        return mesh


class Ground:
    def __init__(self, relief):
        self.relief = relief
        self.levels = []
        self.far = None

    def heights(self, bounds, spacing, parent_spacing):
        xs, ys = level_grid(bounds, spacing)
        grid_x, grid_y = np.meshgrid(xs, ys)
        heights = self.relief.evaluate(grid_x, grid_y)
        if parent_spacing:
            heights = match_border(heights, xs, ys, int(round(parent_spacing / spacing)))
        self.levels.append((bounds, spacing, heights))
        return xs, ys, heights

    def sample(self, x, y):
        x = np.asarray(x, float)
        y = np.asarray(y, float)
        result = np.zeros(x.shape)
        for bounds, spacing, heights in self.levels:
            chosen = inside(bounds, x, y) | (bounds == EXTENT)
            if chosen.any():
                result = np.where(chosen, bilinear(heights, bounds[0], bounds[2], spacing, x, y), result)
        return result

    def engine_height(self, x, y):
        cell = 10.0
        gx = np.floor(np.asarray(x, float) / cell) * cell
        gy = np.floor(np.asarray(y, float) / cell) * cell
        fx = (np.asarray(x, float) - gx) / cell
        fy = (np.asarray(y, float) - gy) / cell
        a = self.sample(gx, gy)
        b = self.sample(gx + cell, gy)
        c = self.sample(gx, gy + cell)
        d = self.sample(gx + cell, gy + cell)
        return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy

    def build(self, materials, collection, new_object):
        mesh = GroundMesh()
        xs, ys, heights = self.heights(EXTENT, RING_SPACING, FAR_SPACING)
        mesh.add_grid(xs, ys, heights, 0, [CORE], False)
        for slot, bounds in ((1, CORE_SOUTH), (2, CORE_NORTH)):
            xs, ys, heights = self.heights(bounds, CORE_SPACING, RING_SPACING)
            mesh.add_grid(xs, ys, heights, slot, [], True)
        data = mesh.build("ground", materials, [EXTENT, CORE_SOUTH, CORE_NORTH])
        ground = new_object("ground", data, collection)
        ground["cast_shadow"] = False
        return ground, mesh.count


def far_ground(relief, ground, collection, new_object, material):
    x0, x1, y0, y1 = EXTENT
    west, east, south, north = FAR_REACH
    xs = np.arange(x0 - west * FAR_SPACING, x1 + east * FAR_SPACING + 1, FAR_SPACING)
    ys = np.arange(y0 - south * FAR_SPACING, y1 + north * FAR_SPACING + 1, FAR_SPACING)
    grid_x, grid_y = np.meshgrid(xs, ys)
    heights = relief.far(grid_x, grid_y)
    border = ((np.isclose(grid_x, x0) | np.isclose(grid_x, x1)) & (grid_y >= y0 - 1) & (grid_y <= y1 + 1)) | (
        (np.isclose(grid_y, y0) | np.isclose(grid_y, y1)) & (grid_x >= x0 - 1) & (grid_x <= x1 + 1))
    heights[border] = ground.sample(grid_x[border], grid_y[border])
    ground.far = (xs, ys, heights)
    mesh = GroundMesh()
    mesh.add_grid(xs, ys, heights, 0, [EXTENT], False)
    data = mesh.build("terrain_far", [material], [(xs[0], xs[-1], ys[0], ys[-1])])
    far = new_object("terrain_far", data, collection)
    far["cast_shadow"] = False
    return far


def mix(colour, target, weight):
    return colour + (np.asarray(target) - colour) * np.asarray(weight)[..., None]


def grid_distance(points, xs, ys, reach):
    distance = np.full((len(ys), len(xs)), np.inf)
    step_x = xs[1] - xs[0]
    step_y = ys[1] - ys[0]
    for (x0, y0), (x1, y1) in zip(points[:-1], points[1:]):
        c0 = max(0, int(np.floor((min(x0, x1) - reach - xs[0]) / step_x)))
        c1 = min(len(xs), int(np.ceil((max(x0, x1) + reach - xs[0]) / step_x)) + 1)
        r0 = max(0, int(np.floor((min(y0, y1) - reach - ys[0]) / step_y)))
        r1 = min(len(ys), int(np.ceil((max(y0, y1) + reach - ys[0]) / step_y)) + 1)
        if c0 >= c1 or r0 >= r1:
            continue
        gx, gy = np.meshgrid(xs[c0:c1], ys[r0:r1])
        dx, dy = x1 - x0, y1 - y0
        t = np.clip(((gx - x0) * dx + (gy - y0) * dy) / max(dx * dx + dy * dy, 1e-9), 0, 1)
        window = distance[r0:r1, c0:c1]
        np.minimum(window, np.hypot(gx - (x0 + t * dx), gy - (y0 + t * dy)), out=window)
    return distance


def field_colour(x, y):
    warp_x = (world_noise(x, y, 900.0, 61, 2) - 0.5) * 320.0
    warp_y = (world_noise(x, y, 900.0, 67, 2) - 0.5) * 320.0
    bx = np.floor((x + warp_x) / 700.0)
    by = np.floor((y + warp_y) / 560.0)
    angle = hashed(bx, by, 3) * math.pi
    width = 28.0 + hashed(bx, by, 5) * 40.0
    u = x * np.cos(angle) + y * np.sin(angle)
    strip = np.floor(u / width)
    palette = np.array([PLOUGH, STUBBLE, WINTER_WHEAT, FALLOW, DARK_PLOUGH, PLOUGH])
    count = len(palette)
    block_pick = np.minimum((hashed(bx, by, 11) * count).astype(int), count - 1)
    strip_pick = np.minimum((hashed(strip, bx * 31 + by, 7) * count).astype(int), count - 1)
    mixed = hashed(bx, by, 13) < 0.35
    colour = palette[np.where(mixed, strip_pick, block_pick)]
    shade = 0.94 + 0.12 * hashed(strip, bx * 17 + by, 9)
    colour = colour * shade[..., None]
    return colour


def area_mask(x, y, centre, length, width, rotation):
    return ellipse_measure(x, y, centre, length, width, rotation) < 1.0


def block_pixels(relief, xs, ys, roads, tracks, pixel):
    grid_x, grid_y = np.meshgrid(xs, ys)
    fields = relief.evaluate(grid_x, grid_y, fields=True)
    h = fields["h"]
    gradient_y, gradient_x = np.gradient(h, ys[1] - ys[0], xs[1] - xs[0])
    slope = np.hypot(gradient_x, gradient_y)
    fine = world_noise(grid_x, grid_y, 22.0, 9, octaves=2)
    medium = world_noise(grid_x, grid_y, 180.0, 5)
    colour = field_colour(grid_x, grid_y)
    colour = mix(colour, MEADOW, smoothstep(0.08, 0.2, slope) * 0.6)
    stream = fields["stream"]
    pond = fields["pond"]
    colour = mix(colour, MEADOW, smoothstep(90.0, 25.0, stream) * 0.85)
    colour = mix(colour, MEADOW, smoothstep(160.0, 40.0, pond) * 0.8)
    colour = mix(colour, REEDS, smoothstep(45.0, 6.0, pond) * smoothstep(0.35, 0.6, medium + 0.3 * fine))
    colour = mix(colour, REEDS, smoothstep(9.0, 4.0, stream) * 0.6)
    for centre, radius, _ in VILLAGES.values():
        distance = np.hypot(grid_x - centre[0], grid_y - centre[1])
        colour = mix(colour, GARDEN, smoothstep(radius * 1.7, radius * 1.15, distance) * 0.85)
        colour = mix(colour, VILLAGE, smoothstep(radius * 1.05, radius * 0.6, distance) * 0.8)
    centre, length, width, rotation = PHEASANTRY
    colour = mix(colour, WOOD_FLOOR, area_mask(grid_x, grid_y, centre, length, width, rotation) * 0.9)
    for centre, length, width, rotation in WOODS:
        colour = mix(colour, WOOD_FLOOR, area_mask(grid_x, grid_y, centre, length, width, rotation) * 0.9)
    centre, length, width, rotation = VINEYARD
    vine = area_mask(grid_x, grid_y, centre, length, width, rotation)
    rows = np.abs(((grid_x * 0.5 + grid_y * 0.87) / 3.0) % 1.0 - 0.5) * 2
    colour = mix(colour, VINE, vine * (0.6 + 0.3 * rows))
    colour = mix(colour, TRACK, smoothstep(max(3.0, pixel), 1.5, tracks) * 0.8)
    colour = mix(colour, ROAD, smoothstep(max(5.0, pixel * 1.2), 3.0, roads) * 0.9)
    colour = mix(colour, ICE, smoothstep(2.0, -6.0, pond))
    colour *= (0.9 + 0.14 * fine)[..., None]
    return np.clip(colour, 0, 1)


def ground_pixels(relief, bounds, width, height, chunk=192):
    x0, x1, y0, y1 = bounds
    xs = x0 + (np.arange(width) + 0.5) * (x1 - x0) / width
    ys = y0 + (np.arange(height) + 0.5) * (y1 - y0) / height
    roads = grid_distance(densify(chaikin(OLMUTZ_ROAD), 15.0), xs, ys, 20.0)
    tracks = np.full(roads.shape, np.inf)
    for track in TRACKS:
        np.minimum(tracks, grid_distance(densify(chaikin(np.array(track, float), 2), 15.0), xs, ys, 12.0), out=tracks)
    result = np.zeros((height, width, 3))
    for start in range(0, height, chunk):
        stop = min(height, start + chunk)
        low = max(0, start - 2)
        high = min(height, stop + 2)
        block = block_pixels(relief, xs, ys[low:high], roads[low:high], tracks[low:high], (x1 - x0) / width)
        result[start:stop] = block[start - low:start - low + stop - start]
    return result


def ground_materials(relief, work_dir, sizes, reuse=False):
    materials = []
    for name, bounds, (width, height) in (("terrain_ring", EXTENT, sizes[0]), ("terrain_core", CORE_SOUTH, sizes[1]),
                                         ("terrain_pass", CORE_NORTH, sizes[1])):
        path = os.path.join(work_dir, f"{name}.jpg")
        if reuse and os.path.exists(path):
            image = bpy.data.images.load(path)
            image.name = name
        else:
            image = save_pixels(name, ground_pixels(relief, bounds, width, height), path, quality=92)
        materials.append(baked_material(name, image, roughness=0.96))
    return materials


def far_material():
    return principled_material("terrain_far", color=(0.36, 0.31, 0.22), roughness=0.97, vertex_color=False)


def pond_outline(name, steps=256):
    centre, major, _, _ = PONDS[name]
    ring = []
    for k in range(steps):
        angle = math.tau * k / steps
        dx, dy = math.cos(angle), math.sin(angle)
        low, high = 0.0, major * 1.6
        for _ in range(24):
            middle = (low + high) / 2
            measure, _ = pond_shape(name, np.array([centre[0] + dx * middle]), np.array([centre[1] + dy * middle]))
            if measure[0] < 1.0:
                low = middle
            else:
                high = middle
        inset = max(0.0, low - 2.0)
        ring.append((centre[0] + dx * inset, centre[1] + dy * inset))
    return ring


def ice_surfaces(relief, collection, new_object):
    material = principled_material("ice", color=(0.55, 0.62, 0.68), roughness=0.18, vertex_color=False)
    created = []
    for name, (centre, _, _, _) in PONDS.items():
        level = relief.pond_levels[name] + 0.02
        ring = pond_outline(name)
        inner = [(centre[0] + (x - centre[0]) * 0.6, centre[1] + (y - centre[1]) * 0.6) for x, y in ring]
        count = len(ring)
        vertices = [(centre[0], centre[1], level)] + [(x, y, level) for x, y in inner] + [(x, y, level) for x, y in ring]
        faces = [(0, 1 + k, 1 + (k + 1) % count) for k in range(count)]
        faces += [(1 + k, 1 + count + k, 1 + count + (k + 1) % count, 1 + (k + 1) % count) for k in range(count)]
        mesh = bpy.data.meshes.new(f"ice_{name}")
        mesh.from_pydata(vertices, [], faces)
        mesh.validate()
        mesh.materials.append(material)
        surface = new_object(f"ice_{name}", mesh, collection)
        surface["cast_shadow"] = False
        created.append(surface)
    return created


def stream_surfaces(relief, collection, new_object):
    material = principled_material("river", color=(0.10, 0.17, 0.18), roughness=0.12, vertex_color=False)
    created = []
    for name, width in (("goldbach", 5.0), ("littawa", 8.0), ("littawa_out", 8.0), ("bosenitz", 2.6)):
        path, level = relief.stream(name)
        tangents = np.gradient(path, axis=0)
        tangents /= np.linalg.norm(tangents, axis=1)[:, None]
        normals = np.column_stack([-tangents[:, 1], tangents[:, 0]])
        left = path + normals * width / 2
        right = path - normals * width / 2
        count = len(path)
        vertices = [(*left[k], level[k]) for k in range(count)] + [(*right[k], level[k]) for k in range(count)]
        faces = [(k, k + 1, count + k + 1, count + k) for k in range(count - 1)]
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(vertices, [], faces)
        mesh.materials.append(material)
        stream = new_object(name, mesh, collection)
        stream["cast_shadow"] = False
        created.append(stream)
    return created


def scatter(relief, ground, bounds, spacing, seed, rule):
    generator = np.random.default_rng(seed)
    x0, x1, y0, y1 = bounds
    xs = np.arange(x0 + spacing / 2, x1, spacing)
    ys = np.arange(y0 + spacing / 2, y1, spacing)
    grid_x, grid_y = np.meshgrid(xs, ys)
    x = (grid_x + generator.uniform(-0.45, 0.45, grid_x.shape) * spacing).ravel()
    y = (grid_y + generator.uniform(-0.45, 0.45, grid_y.shape) * spacing).ravel()
    fields = relief.evaluate(x, y, fields=True)
    fields["noise"] = world_noise(x, y, 260.0, seed)
    fields["random"] = generator.random(len(x))
    chosen = rule(x, y, fields)
    z = ground.sample(x[chosen], y[chosen])
    return np.column_stack([x[chosen], y[chosen], z])

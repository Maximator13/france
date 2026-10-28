import math
import random

from mathutils import Matrix

from .austerlitz_figures import box, ellipsoid, lathe, tube
from .geometry import MATTE, MeshBuilder

BARK = (0.30, 0.25, 0.21)
TWIGS = (0.36, 0.30, 0.26)
TWIGS_DARK = (0.27, 0.23, 0.20)
PINE = (0.13, 0.20, 0.12)
LIMEWASH = (0.90, 0.88, 0.82)
OCHRE_WASH = (0.88, 0.76, 0.54)
STONE = (0.66, 0.62, 0.54)
TILE = (0.56, 0.28, 0.18)
THATCH = (0.52, 0.44, 0.30)
SHINGLE = (0.34, 0.30, 0.26)
COPPER = (0.30, 0.46, 0.40)
TIMBER = (0.38, 0.28, 0.19)
EARTH = (0.42, 0.34, 0.24)
BRICK = (0.62, 0.36, 0.26)


def bare_tree(seed):
    generator = random.Random(seed)
    builder = MeshBuilder()
    height = generator.uniform(6.5, 10.0)
    tube(builder, [(0, 0, -0.8), (0.1, 0, height * 0.35), (0.2, 0.1, height * 0.55)], [0.3, 0.22, 0.15], BARK, sides=5)
    for k in range(4):
        angle = k * math.tau / 4 + generator.uniform(-0.4, 0.4)
        reach = generator.uniform(1.4, 2.4)
        tube(builder, [(0.15, 0.05, height * 0.45), (math.cos(angle) * reach, math.sin(angle) * reach, height * 0.72)],
             [0.1, 0.04], BARK, sides=3, cap=False)
    ellipsoid(builder, (0.2, 0.1, height * 0.72), (height * 0.34, height * 0.32, height * 0.3), TWIGS, 7, 4)
    return builder


def poplar():
    builder = MeshBuilder()
    tube(builder, [(0, 0, -0.8), (0, 0, 4.0)], [0.25, 0.18], BARK, sides=5)
    ellipsoid(builder, (0, 0, 9.0), (1.3, 1.3, 6.5), TWIGS_DARK, 6, 4)
    return builder


def pine():
    builder = MeshBuilder()
    tube(builder, [(0, 0, -0.8), (0, 0, 3.0)], [0.25, 0.2], BARK, sides=5)
    lathe(builder, [(0.0, 2.0), (2.6, 3.0), (1.6, 7.0), (0.0, 12.0)], PINE, 7)
    return builder


def gable_roof(builder, length, width, eaves, rise, colour, overhang=0.4):
    first = len(builder.polygons)
    half_l = length / 2 + overhang
    half_w = width / 2 + overhang
    a, b, c, d, e, f = builder.points([(-half_l, -half_w, eaves), (half_l, -half_w, eaves), (half_l, 0.0, eaves + rise),
                                       (-half_l, 0.0, eaves + rise), (-half_l, half_w, eaves), (half_l, half_w, eaves)])
    builder.face([a, b, c, d], MATTE)
    builder.face([d, c, f, e], MATTE)
    builder.face([a, d, e], MATTE)
    builder.face([b, f, c], MATTE)
    builder.tint(first, colour)


def house(seed):
    generator = random.Random(seed)
    builder = MeshBuilder()
    length = generator.uniform(10.0, 16.0)
    width = generator.uniform(5.5, 7.0)
    eaves = generator.uniform(2.6, 3.2)
    wall = LIMEWASH if seed % 3 else OCHRE_WASH
    box(builder, (0, 0, eaves / 2 - 0.6), (length, width, eaves + 1.2), wall)
    gable_roof(builder, length, width, eaves, width * 0.75, THATCH if seed % 2 else TILE)
    if seed % 3 == 0:
        box(builder, (length / 2 + 5.0, width / 2 + 3.0, 0.6), (9.0, 6.0, 2.4), TIMBER)
    for side in (-1, 1):
        box(builder, (side * length * 0.22, -width / 2 - 0.01, eaves * 0.55), (0.9, 0.04, 0.9), (0.18, 0.16, 0.14))
    return builder


def barn(seed):
    generator = random.Random(seed)
    builder = MeshBuilder()
    length = generator.uniform(14.0, 20.0)
    width = generator.uniform(7.0, 9.0)
    box(builder, (0, 0, 1.4), (length, width, 4.0), TIMBER)
    gable_roof(builder, length, width, 3.3, width * 0.8, THATCH)
    return builder


def church(scale=1.0):
    builder = MeshBuilder()
    s = scale
    box(builder, (0, -4 * s, 3.5 * s - 1.0), (10 * s, 20 * s, 9 * s), LIMEWASH)
    first = len(builder.polygons)
    a, b, c, d, e, f = builder.points([(-5.3 * s, -14.3 * s, 8 * s), (-5.3 * s, 6.3 * s, 8 * s),
                                       (0.0, 6.3 * s, 13.5 * s), (0.0, -14.3 * s, 13.5 * s),
                                       (5.3 * s, -14.3 * s, 8 * s), (5.3 * s, 6.3 * s, 8 * s)])
    builder.face([a, b, c, d], MATTE)
    builder.face([d, c, f, e], MATTE)
    builder.face([a, d, e], MATTE)
    builder.face([b, f, c], MATTE)
    builder.tint(first, TILE)
    box(builder, (0, 9 * s, 14 * s - 1.0), (6.5 * s, 6.5 * s, 30 * s), LIMEWASH)
    lathe(builder, [(4.5 * s, 29 * s), (3.6 * s, 32 * s), (2.8 * s, 33.5 * s), (1.0 * s, 35.5 * s), (1.8 * s, 37 * s),
                    (0.4 * s, 39.5 * s), (0.0, 43 * s)], COPPER, 8, Matrix.Translation((0, 9 * s, 0)))
    return builder


def chateau():
    builder = MeshBuilder()
    box(builder, (0, 0, 5.0), (46, 14, 12), OCHRE_WASH)
    gable_roof(builder, 46, 14, 10.5, 7.0, TILE, 0.6)
    for side in (-1, 1):
        box(builder, (side * 26, 12, 4.0), (12, 34, 10), OCHRE_WASH)
        wing = MeshBuilder()
        gable_roof(wing, 34, 12, 8.5, 6.0, TILE, 0.5)
        builder.merge(wing, Matrix.Translation((side * 26, 12, 0)) @ Matrix.Rotation(math.pi / 2, 4, "Z"))
    return builder


def wall_segment(length, height=2.6, colour=BRICK):
    builder = MeshBuilder()
    box(builder, (0, 0, height / 2 - 0.5), (length, 0.6, height + 1.0), colour)
    return builder


def earthwork(length=60.0):
    builder = MeshBuilder()
    first = len(builder.polygons)
    a, b, c, d, e, f, g, h = builder.points([(-length / 2, -4.0, -0.5), (length / 2, -4.0, -0.5), (length / 2, 1.0, 1.8),
                                             (-length / 2, 1.0, 1.8), (-length / 2, 2.5, 1.8), (length / 2, 2.5, 1.8),
                                             (length / 2, 4.5, -0.5), (-length / 2, 4.5, -0.5)])
    for face in ((a, b, c, d), (d, c, f, e), (e, f, g, h), (a, d, e, h), (b, g, f, c)):
        builder.face(list(face), MATTE)
    builder.tint(first, EARTH)
    return builder


def village(centre, radius, count, height_at, slope_ok, seed):
    generator = random.Random(seed)
    placed = []
    tries = 0
    street = generator.uniform(0, math.pi)
    while len(placed) < count and tries < count * 40:
        tries += 1
        along = generator.uniform(-radius, radius)
        side = generator.choice((-1, 1)) * generator.uniform(14.0, 30.0)
        if generator.random() < 0.3:
            street_angle = street + math.pi / 2
        else:
            street_angle = street
        x = centre[0] + along * math.cos(street_angle) - side * math.sin(street_angle)
        y = centre[1] + along * math.sin(street_angle) + side * math.cos(street_angle)
        if not slope_ok(x, y) or any(math.hypot(x - px, y - py) < 15 for px, py, _ in placed):
            continue
        facing = street_angle + (0 if side > 0 else math.pi) + math.pi / 2
        placed.append((x, y, facing))
    return [(x, y, height_at(x, y), turn) for x, y, turn in placed]


def chapel_ruin():
    builder = MeshBuilder()
    for center, size in (((0.0, -4.0, 0.6), (7.0, 0.8, 2.6)), ((-3.4, 0.0, 0.2), (0.8, 8.0, 1.8)),
                         ((3.4, 1.5, -0.1), (0.8, 5.0, 1.2)), ((0.0, 4.0, 1.4), (7.0, 0.8, 4.2))):
        box(builder, center, size, STONE)
    for k in range(9):
        angle = k * 0.7
        ellipsoid(builder, (math.cos(angle) * (3 + k % 3), math.sin(angle) * (4 + k % 2), 0.1),
                  (0.9, 0.7, 0.45), STONE, 5, 2)
    return builder

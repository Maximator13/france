import math

from mathutils import Matrix, Vector

from .geometry import MATTE, MeshBuilder

TAU = 2 * math.pi
UP = Vector((0.0, 0.0, 1.0))

SKIN = (0.78, 0.58, 0.45)
HAIR = (0.20, 0.14, 0.10)
BLACK = (0.05, 0.05, 0.05)
WHITE = (0.90, 0.89, 0.85)
OFF_WHITE = (0.82, 0.80, 0.74)
FRENCH_BLUE = (0.08, 0.12, 0.34)
IMPERIAL_RED = (0.62, 0.10, 0.08)
RUSSIAN_GREEN = (0.10, 0.20, 0.13)
DRAGOON_GREEN = (0.12, 0.30, 0.16)
COSSACK_BLUE = (0.12, 0.16, 0.30)
AUSTRIAN_BROWN = (0.40, 0.29, 0.20)
STEEL = (0.70, 0.71, 0.74)
BRASS = (0.80, 0.62, 0.28)
BRONZE = (0.62, 0.45, 0.22)
WOOD = (0.42, 0.30, 0.19)
OLIVE_CARRIAGE = (0.36, 0.38, 0.22)
OCHRE_CARRIAGE = (0.72, 0.56, 0.22)
RUSSIAN_GREEN_CARRIAGE = (0.22, 0.32, 0.18)
LEATHER = (0.36, 0.24, 0.14)
CALFSKIN = (0.55, 0.40, 0.26)
BAY = (0.36, 0.22, 0.12)
DARK_BAY = (0.20, 0.13, 0.09)
GREY_HORSE = (0.62, 0.60, 0.56)
CHESTNUT = (0.48, 0.28, 0.14)
FUR = (0.10, 0.08, 0.07)
CRIMSON = (0.66, 0.12, 0.12)


def perpendicular(axis, hint=None):
    if hint is not None:
        candidate = hint - axis * hint.dot(axis)
        if candidate.length > 1e-5:
            return candidate.normalized()
    helper = UP if abs(axis.z) < 0.9 else Vector((1.0, 0.0, 0.0))
    return axis.cross(helper).normalized()


def tube(builder, path, radii, colors, sides=5, cap=True, squash=1.0):
    path = [Vector(point) for point in path]
    colors = colors if isinstance(colors, list) else [colors] * (len(path) - 1)
    rings = []
    u = None
    for index, (point, radius) in enumerate(zip(path, radii)):
        axis = (path[min(index + 1, len(path) - 1)] - path[max(index - 1, 0)]).normalized()
        u = perpendicular(axis, u)
        v = axis.cross(u).normalized()
        if radius < 1e-6:
            rings.append([builder.point(point)] * sides)
            continue
        rings.append([builder.point(point + (u * math.cos(TAU * k / sides) + v * squash * math.sin(TAU * k / sides))
                                    * radius) for k in range(sides)])
    for segment, (lower, upper) in enumerate(zip(rings[:-1], rings[1:])):
        first = len(builder.polygons)
        for k in range(sides):
            j = (k + 1) % sides
            builder.face([lower[k], lower[j], upper[j], upper[k]], MATTE, True)
        builder.tint(first, colors[segment])
    if cap and radii[-1] > 1e-6:
        first = len(builder.polygons)
        builder.face(list(rings[-1]), MATTE)
        builder.tint(first, colors[-1])


def lathe(builder, profile, color, segments=6, matrix=None):
    first = len(builder.polygons)
    builder.lathe(profile, segments, MATTE, smooth=True, matrix=matrix, caps=False)
    builder.tint(first, color)


def ellipsoid(builder, center, radii, color, segments=6, rings=4):
    profile = [(math.sin(math.pi * k / rings), -math.cos(math.pi * k / rings)) for k in range(rings + 1)]
    lathe(builder, profile, color, segments, Matrix.Translation(center) @ Matrix.Diagonal((*radii, 1.0)))


def box(builder, center, size, color, bottom=False, matrix=None):
    first = len(builder.polygons)
    builder.centered_box(center, size, MATTE, matrix=matrix, bottom=bottom)
    builder.tint(first, color)


def soldier_body(builder, coat, breeches, gaiters, facing, belts=WHITE, lift=0.0, skirts=True):
    for side in (-1, 1):
        tube(builder, [(side * 0.09, 0.0, 0.93 + lift), (side * 0.1, 0.02, 0.5 + lift), (side * 0.1, 0.0, 0.08 + lift)],
             [0.075, 0.058, 0.048], [breeches, gaiters], 5)
        box(builder, (side * 0.1, 0.05, 0.035 + lift), (0.09, 0.24, 0.07), BLACK)
    tube(builder, [(0.0, 0.0, 0.9 + lift), (0.0, 0.0, 1.15 + lift), (0.0, 0.01, 1.44 + lift)], [0.16, 0.17, 0.2], coat, 6,
         squash=0.64)
    box(builder, (0.0, 0.1, 1.22 + lift), (0.2, 0.05, 0.36), facing)
    if skirts:
        box(builder, (0.0, -0.11, 0.82 + lift), (0.26, 0.05, 0.36), coat)
    for start, end in (((-0.17, 0.0, 1.43), (0.15, 0.0, 0.92)), ((0.17, 0.0, 1.43), (-0.15, 0.0, 0.92))):
        a = Vector(start) + Vector((0.0, 0.0, lift))
        b = Vector(end) + Vector((0.0, 0.0, lift))
        tube(builder, [a + Vector((0.0, 0.115, 0.0)), b + Vector((0.0, 0.11, 0.0))], [0.025, 0.025], belts, 3, cap=False)


def arm(builder, side, hand, sleeve, lift=0.0):
    shoulder = Vector((side * 0.22, 0.0, 1.38 + lift))
    hand = Vector(hand)
    elbow = shoulder.lerp(hand, 0.5) + Vector((side * 0.06, -0.03, -0.06))
    tube(builder, [shoulder, elbow, hand], [0.062, 0.05, 0.042], [sleeve, sleeve], 4)
    ellipsoid(builder, hand, (0.04, 0.04, 0.045), SKIN, 4, 2)


def head(builder, center=(0.0, 0.01, 1.6)):
    ellipsoid(builder, center, (0.09, 0.1, 0.115), SKIN, 6, 4)
    ellipsoid(builder, (center[0], center[1] - 0.03, center[2] + 0.02), (0.094, 0.09, 0.09), HAIR, 6, 3)


def bicorne(builder, center, color=BLACK, cockade=None):
    x, y, z = center
    first = len(builder.polygons)
    a, b, c, d = builder.points([(x - 0.24, y, z + 0.04), (x + 0.24, y, z + 0.04), (x + 0.12, y, z + 0.22),
                                 (x - 0.12, y, z + 0.22)])
    builder.face([a, b, c, d], MATTE)
    builder.face([d, c, b, a], MATTE)
    builder.tint(first, color)
    box(builder, (x, y, z + 0.06), (0.36, 0.2, 0.08), color)
    if cockade is not None:
        box(builder, (x - 0.07, y + 0.012, z + 0.15), (0.06, 0.012, 0.06), cockade)


def shako(builder, center, color=BLACK, plate=BRASS, height=0.24):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.1, z - 0.02), (0.11, z + height * 0.5), (0.115, z + height),
                    (0.0, z + height)], color, 7, Matrix.Translation((x, y, 0.0)))
    box(builder, (x, y + 0.1, z + height * 0.45), (0.1, 0.03, 0.1), plate)


def bearskin(builder, center, height=0.36):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.12, z - 0.02), (0.14, z + height * 0.55), (0.11, z + height),
                    (0.0, z + height + 0.02)], FUR, 7, Matrix.Translation((x, y, 0.0)))


def grenadier_cap(builder, center):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.11, z - 0.02), (0.105, z + 0.14), (0.085, z + 0.25), (0.0, z + 0.27)], BLACK, 7,
          Matrix.Translation((x, y, 0.0)))
    box(builder, (x, y + 0.1, z + 0.12), (0.17, 0.02, 0.22), BRASS)
    tube(builder, [(x + 0.06, y - 0.02, z + 0.2), (x + 0.04, y - 0.06, z + 0.48)], [0.035, 0.05], [BLACK], 5)


def corsehut(builder, center, color=BLACK):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.1, z - 0.02), (0.1, z + 0.12), (0.0, z + 0.14)], color, 7,
          Matrix.Translation((x, y, 0.0)))
    lathe(builder, [(0.1, z), (0.2, z + 0.01), (0.2, z + 0.03), (0.1, z + 0.02)], color, 9,
          Matrix.Translation((x, y, 0.0)))
    box(builder, (x - 0.12, y, z + 0.1), (0.04, 0.3, 0.2), color)


def colpack(builder, center):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.115, z - 0.02), (0.12, z + 0.2), (0.0, z + 0.22)], FUR, 7,
          Matrix.Translation((x, y, 0.0)))
    tube(builder, [(x - 0.03, y + 0.05, z + 0.18), (x - 0.03, y + 0.04, z + 0.38)], [0.025, 0.03], [IMPERIAL_RED], 4)


def kaskett(builder, center):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.11, z - 0.02), (0.11, z + 0.12), (0.0, z + 0.16)], BLACK, 7,
          Matrix.Translation((x, y, 0.0)))
    box(builder, (x, y - 0.01, z + 0.2), (0.05, 0.22, 0.1), BLACK)
    box(builder, (x, y + 0.11, z + 0.08), (0.18, 0.02, 0.08), BRASS)


def helmet(builder, center, shell=STEEL, mane=BLACK, crest=BRASS):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.115, z - 0.02), (0.11, z + 0.1), (0.0, z + 0.17)], shell, 7,
          Matrix.Translation((x, y, 0.0)))
    box(builder, (x, y, z + 0.2), (0.04, 0.22, 0.07), crest)
    tube(builder, [(x, y + 0.02, z + 0.22), (x, y - 0.18, z + 0.12), (x, y - 0.22, z - 0.18)], [0.035, 0.05, 0.03],
         [mane, mane], 4)


def fur_cap(builder, center):
    x, y, z = center
    lathe(builder, [(0.0, z - 0.02), (0.11, z - 0.02), (0.12, z + 0.2), (0.0, z + 0.24)], FUR, 6,
          Matrix.Translation((x, y, 0.0)))


def musket(builder, butt, muzzle, bayonet=True):
    butt = Vector(butt)
    muzzle = Vector(muzzle)
    stock = butt.lerp(muzzle, 0.25)
    tube(builder, [butt, stock, muzzle], [0.035, 0.022, 0.012], [WOOD, STEEL], 3)
    if bayonet:
        direction = (muzzle - butt).normalized()
        tube(builder, [muzzle, muzzle + direction * 0.42], [0.008, 0.0], [STEEL], 3)


def knapsack(builder, color=CALFSKIN, lift=0.0):
    box(builder, (0.0, -0.2, 1.22 + lift), (0.32, 0.12, 0.3), color)
    box(builder, (0.0, -0.16, 1.4 + lift), (0.34, 0.16, 0.08), (0.62, 0.58, 0.5))


def infantryman(coat, facing, breeches, gaiters, hat, belts=WHITE, pack=CALFSKIN):
    builder = MeshBuilder()
    soldier_body(builder, coat, breeches, gaiters, facing, belts)
    arm(builder, 1, (0.24, 0.04, 1.02), coat)
    arm(builder, -1, (0.16, 0.1, 1.36), coat)
    head(builder)
    hat(builder)
    knapsack(builder, pack)
    musket(builder, (0.24, 0.02, 0.98), (0.2, 0.06, 2.0))
    return builder


def french_line():
    return infantryman(FRENCH_BLUE, WHITE, WHITE, BLACK, lambda b: bicorne(b, (0.0, 0.01, 1.66), cockade=IMPERIAL_RED))


def french_guard():
    return infantryman(FRENCH_BLUE, WHITE, WHITE, WHITE, lambda b: bearskin(b, (0.0, 0.0, 1.66)))


def russian_line():
    return infantryman(RUSSIAN_GREEN, IMPERIAL_RED, WHITE, BLACK, lambda b: bicorne(b, (0.0, 0.01, 1.66)),
                       pack=BLACK)


def russian_grenadier():
    return infantryman(RUSSIAN_GREEN, IMPERIAL_RED, WHITE, BLACK, lambda b: grenadier_cap(b, (0.0, 0.0, 1.66)),
                       pack=BLACK)


def austrian_line():
    return infantryman(WHITE, IMPERIAL_RED, OFF_WHITE, BLACK, lambda b: kaskett(b, (0.0, 0.0, 1.66)),
                       belts=OFF_WHITE, pack=CALFSKIN)


def horse(builder, color, scale=1.0, saddle=None):
    s = scale
    dark = tuple(c * 0.55 for c in color)
    body_z = 1.12 * s
    ellipsoid(builder, (0.0, 0.0, body_z), (0.27 * s, 0.8 * s, 0.33 * s), color, 6, 3)
    tube(builder, [(0.0, 0.55 * s, body_z + 0.13 * s), (0.0, 0.85 * s, body_z + 0.55 * s)], [0.17 * s, 0.11 * s],
         color, 5, cap=False)
    tube(builder, [(0.0, 0.82 * s, body_z + 0.6 * s), (0.0, 1.12 * s, body_z + 0.32 * s)], [0.1 * s, 0.06 * s], color,
         5)
    for front in (-1, 1):
        for side in (-1, 1):
            x, y = side * 0.14 * s, front * 0.5 * s
            tube(builder, [(x, y, body_z - 0.1 * s), (x, y, 0.45 * s), (x, y, 0.0)], [0.09 * s, 0.05 * s, 0.045 * s],
                 [color, dark], 4, cap=False)
    tube(builder, [(0.0, -0.78 * s, body_z + 0.15 * s), (0.0, -0.92 * s, body_z - 0.2 * s),
                   (0.0, -0.9 * s, body_z - 0.6 * s)], [0.05 * s, 0.06 * s, 0.02 * s], dark, 4, cap=False)
    if saddle is not None:
        box(builder, (0.0, -0.05 * s, body_z + 0.28 * s), (0.6 * s, 0.7 * s, 0.06), saddle)
    return body_z + 0.3 * s


def rider(builder, seat, coat, breeches, hat, weapon, cuirass=None, boots=BLACK):
    for side in (-1, 1):
        tube(builder, [(side * 0.12, 0.0, seat + 0.05), (side * 0.3, 0.25, seat - 0.25),
                       (side * 0.28, 0.12, seat - 0.68)], [0.07, 0.06, 0.05], [breeches, boots], 4)
    tube(builder, [(0.0, 0.0, seat - 0.05), (0.0, 0.0, seat + 0.2), (0.0, 0.02, seat + 0.5)], [0.17, 0.17, 0.19],
         [coat, coat], 6, squash=0.64)
    if cuirass is not None:
        tube(builder, [(0.0, 0.0, seat + 0.08), (0.0, 0.0, seat + 0.25), (0.0, 0.02, seat + 0.48)],
             [0.185, 0.19, 0.205], [cuirass, cuirass], 6, squash=0.66)
    centre = (0.0, 0.03, seat + 0.66)
    shoulder_z = seat + 0.44
    hand_right = Vector((0.27, 0.3, shoulder_z - 0.25))
    for side, hand in ((1, hand_right), (-1, Vector((-0.18, 0.32, shoulder_z - 0.3)))):
        shoulder = Vector((side * 0.21, 0.0, shoulder_z))
        elbow = shoulder.lerp(hand, 0.5) + Vector((side * 0.05, -0.03, -0.05))
        tube(builder, [shoulder, elbow, hand], [0.06, 0.05, 0.04], [coat, coat], 4)
    ellipsoid(builder, centre, (0.09, 0.1, 0.115), SKIN, 6, 4)
    hat(builder, (centre[0], centre[1], centre[2] + 0.06))
    weapon(builder, hand_right)


def sabre(builder, hand):
    tube(builder, [hand, hand + Vector((0.02, 0.25, 0.75))], [0.018, 0.006], [STEEL], 3)


def lance(builder, hand):
    tube(builder, [hand + Vector((0.0, -1.3, -0.5)), hand + Vector((0.0, 1.6, 0.6))], [0.016, 0.012], [WOOD], 3)
    tube(builder, [hand + Vector((0.0, 1.6, 0.6)), hand + Vector((0.0, 1.85, 0.7))], [0.012, 0.0], [STEEL], 3)


def cavalryman(horse_color, coat, breeches, hat, weapon, cuirass=None, saddle=None, scale=1.0):
    builder = MeshBuilder()
    seat = horse(builder, horse_color, scale, saddle)
    rider(builder, seat, coat, breeches, hat, weapon, cuirass)
    return builder


def french_cuirassier():
    return cavalryman(DARK_BAY, FRENCH_BLUE, WHITE, lambda b, c: helmet(b, c), sabre, cuirass=STEEL,
                      saddle=FRENCH_BLUE)


def french_cavalry():
    return cavalryman(CHESTNUT, DRAGOON_GREEN, WHITE, lambda b, c: helmet(b, c, BRASS, BLACK, BRASS), sabre,
                      saddle=DRAGOON_GREEN)


def french_light_cavalry():
    return cavalryman(CHESTNUT, DRAGOON_GREEN, IMPERIAL_RED, lambda b, c: colpack(b, c), sabre, saddle=IMPERIAL_RED)


def allied_cavalry():
    return cavalryman(BAY, WHITE, WHITE, lambda b, c: helmet(b, c, BLACK, BLACK, BRASS), sabre, saddle=IMPERIAL_RED)


def cossack():
    return cavalryman(GREY_HORSE, COSSACK_BLUE, COSSACK_BLUE, lambda b, c: fur_cap(b, c), lance, scale=0.9)


def wheel(builder, x, y, z, radius, color):
    transform = Matrix.Translation((x, y, z)) @ Matrix.Rotation(math.pi / 2, 4, "Y")
    first = len(builder.polygons)
    builder.lathe([(radius, -0.04), (radius, 0.04), (radius * 0.2, 0.06), (0.0, 0.06)], 10, MATTE, smooth=False,
                  matrix=transform, caps=False)
    builder.lathe([(0.0, -0.06), (radius * 0.2, -0.06), (radius, -0.04)], 10, MATTE, smooth=False,
                  matrix=transform, caps=False)
    builder.tint(first, color)


def cannon(builder, carriage, barrel=BRONZE):
    radius = 0.7
    for side in (-1, 1):
        wheel(builder, side * 0.85, 0.0, radius, radius, carriage)
    box(builder, (0.0, 0.0, radius), (1.6, 0.12, 0.12), carriage)
    for side in (-1, 1):
        tube(builder, [(side * 0.18, 0.25, radius + 0.12), (side * 0.1, -2.2, 0.08)], [0.08, 0.06], [carriage], 4)
    tube(builder, [(0.0, -0.65, radius + 0.2), (0.0, 0.3, radius + 0.28), (0.0, 1.55, radius + 0.33)],
         [0.17, 0.14, 0.11], [barrel, barrel], 7)


def gunner(builder, at, turn, coat, hat, facing=IMPERIAL_RED, pose=0):
    local = MeshBuilder()
    soldier_body(local, coat, coat, BLACK, facing, belts=WHITE, skirts=True)
    hand = (0.2, 0.35, 1.2) if pose == 0 else (0.25, 0.1, 0.95)
    arm(local, 1, hand, coat)
    arm(local, -1, (-0.2, 0.3, 1.15), coat)
    head(local)
    hat(local)
    if pose == 0:
        tube(local, [(0.2, -0.6, 0.9), (0.2, 1.4, 1.4)], [0.02, 0.02], [WOOD], 3)
    builder.merge(local, Matrix.Translation(at) @ Matrix.Rotation(turn, 4, "Z"))


def artillery(carriage, coat, hat, facing):
    builder = MeshBuilder()
    cannon(builder, carriage)
    gunner(builder, (1.3, 0.2, 0.0), 0.3, coat, hat, facing, 0)
    gunner(builder, (-1.25, -0.6, 0.0), -0.4, coat, hat, facing, 1)
    gunner(builder, (0.6, -2.5, 0.0), 0.0, coat, hat, facing, 1)
    box(builder, (-1.4, -2.6, 0.35), (0.7, 0.5, 0.5), carriage)
    return builder


def french_artillery():
    return artillery(OLIVE_CARRIAGE, FRENCH_BLUE, lambda b: bicorne(b, (0.0, 0.01, 1.66), cockade=IMPERIAL_RED),
                     IMPERIAL_RED)


def austrian_artillery():
    return artillery(OCHRE_CARRIAGE, AUSTRIAN_BROWN, lambda b: corsehut(b, (0.0, 0.01, 1.66)), IMPERIAL_RED)


def russian_artillery():
    return artillery(RUSSIAN_GREEN_CARRIAGE, RUSSIAN_GREEN, lambda b: bicorne(b, (0.0, 0.01, 1.66)), BLACK)


def far_infantry(coat, legs, hat, hat_height=0.26):
    builder = MeshBuilder()
    box(builder, (0.0, 0.0, 0.47), (0.3, 0.22, 0.94), legs)
    box(builder, (0.0, 0.0, 1.2), (0.38, 0.26, 0.52), coat)
    box(builder, (0.0, 0.0, 1.58), (0.2, 0.22, 0.2), SKIN)
    box(builder, (0.0, 0.0, 1.68 + hat_height / 2), (0.34 if hat_height < 0.25 else 0.24, 0.22, hat_height), hat)
    box(builder, (0.0, -0.2, 1.24), (0.3, 0.14, 0.32), CALFSKIN)
    box(builder, (0.22, 0.04, 1.5), (0.04, 0.04, 1.1), STEEL)
    return builder


def far_rider(horse_color, coat, hat=BLACK):
    builder = MeshBuilder()
    box(builder, (0.0, 0.0, 1.12), (0.52, 1.6, 0.62), horse_color)
    for y in (-0.5, 0.5):
        box(builder, (0.0, y, 0.42), (0.36, 0.24, 0.84), tuple(c * 0.6 for c in horse_color))
    box(builder, (0.0, 0.95, 1.6), (0.22, 0.5, 0.6), horse_color)
    box(builder, (0.0, 0.0, 1.85), (0.42, 0.3, 0.7), coat)
    box(builder, (0.0, 0.03, 2.33), (0.22, 0.24, 0.26), SKIN)
    box(builder, (0.0, 0.03, 2.55), (0.24, 0.26, 0.2), hat)
    return builder


def far_artillery(carriage, coat):
    builder = MeshBuilder()
    box(builder, (0.0, 0.0, 0.7), (1.8, 0.2, 1.4), carriage)
    box(builder, (0.0, 0.4, 1.0), (0.3, 2.2, 0.3), BRONZE)
    box(builder, (0.0, -1.2, 0.3), (0.3, 2.0, 0.2), carriage)
    for x, y in ((1.3, 0.2), (-1.25, -0.6), (0.6, -2.5)):
        box(builder, (x, y, 0.85), (0.38, 0.26, 1.7), coat)
    return builder


TROOPS = {
    "ligne-francaise": (french_line, lambda: far_infantry(FRENCH_BLUE, WHITE, BLACK, 0.18)),
    "garde-francaise": (french_guard, lambda: far_infantry(FRENCH_BLUE, WHITE, FUR, 0.38)),
    "cuirassier-francais": (french_cuirassier, lambda: far_rider(DARK_BAY, STEEL, STEEL)),
    "cavalier-francais": (french_cavalry, lambda: far_rider(CHESTNUT, DRAGOON_GREEN, BRASS)),
    "chasseur-francais": (french_light_cavalry, lambda: far_rider(CHESTNUT, DRAGOON_GREEN, FUR)),
    "artillerie-francaise": (french_artillery, lambda: far_artillery(OLIVE_CARRIAGE, FRENCH_BLUE)),
    "infanterie-russe": (russian_line, lambda: far_infantry(RUSSIAN_GREEN, WHITE, BLACK, 0.18)),
    "grenadier-russe": (russian_grenadier, lambda: far_infantry(RUSSIAN_GREEN, WHITE, BLACK, 0.3)),
    "infanterie-autrichienne": (austrian_line, lambda: far_infantry(WHITE, OFF_WHITE, BLACK, 0.2)),
    "cavalerie-coalisee": (allied_cavalry, lambda: far_rider(BAY, WHITE)),
    "cosaque": (cossack, lambda: far_rider(GREY_HORSE, COSSACK_BLUE, FUR)),
    "artillerie-autrichienne": (austrian_artillery, lambda: far_artillery(OCHRE_CARRIAGE, AUSTRIAN_BROWN)),
    "artillerie-russe": (russian_artillery, lambda: far_artillery(RUSSIAN_GREEN_CARRIAGE, RUSSIAN_GREEN)),
}

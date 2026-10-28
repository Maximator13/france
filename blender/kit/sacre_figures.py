import math
import random

from mathutils import Matrix, Vector

from .geometry import MATTE, MeshBuilder, placement
from .life import HAIR, SQUASH, limb, ring
from . import sacre_plan as plan

WHITE = (0.93, 0.92, 0.88)
BLACK = (0.08, 0.075, 0.075)
GOLD = (0.95, 0.7, 0.28)
CRIMSON = (0.55, 0.05, 0.09)
PURPLE = (0.42, 0.06, 0.2)
BLUE = (0.12, 0.17, 0.42)
GREEN = (0.1, 0.32, 0.16)
RED = (0.72, 0.08, 0.08)
ERMINE = (0.96, 0.95, 0.92)
VELVET = "velours_uni"
LOD_ZONES = {"tribune", "tribune_choeur", "galerie", "musiciens", "parvis", "conseil"}
SKIN = [(0.95, 0.80, 0.70), (0.90, 0.72, 0.60), (0.80, 0.62, 0.50)]


class Costume:
    def __init__(self, coat, legs=WHITE, skirts=True, long=None, mantle=None, train=0.0, collar=None, head=None,
                 pose="down", hair=0, skin=0, trim=None, scale=1.0, stride=0.0, sash=None, mantle_material=MATTE,
                 cape=None, detail=False):
        self.coat = coat
        self.legs = legs
        self.skirts = skirts
        self.long = long
        self.mantle = mantle
        self.train = train
        self.collar = collar
        self.head = head
        self.pose = pose
        self.hair = hair
        self.skin = skin
        self.trim = trim
        self.scale = scale
        self.stride = stride
        self.sash = sash
        self.mantle_material = mantle_material
        self.cape = cape
        self.detail = detail


ARMS = {
    "down": [((0.24, 0.0, 1.1), (0.25, 0.06, 0.86)), ((-0.24, 0.0, 1.1), (-0.25, 0.06, 0.86))],
    "joined": [((0.2, 0.12, 1.12), (0.03, 0.3, 1.2)), ((-0.2, 0.12, 1.12), (-0.03, 0.3, 1.2))],
    "raise": [((0.25, 0.18, 1.45), (0.12, 0.38, 1.72)), ((-0.25, 0.18, 1.45), (-0.12, 0.38, 1.72))],
    "hold": [((0.23, 0.1, 1.12), (0.12, 0.34, 1.18)), ((-0.24, 0.0, 1.1), (-0.25, 0.06, 0.86))],
    "bless": [((0.25, 0.14, 1.3), (0.24, 0.34, 1.5)), ((-0.22, 0.1, 1.1), (-0.08, 0.28, 1.0))],
    "swing": [((0.24, -0.1, 1.1), (0.25, -0.2, 0.88)), ((-0.24, 0.12, 1.1), (-0.25, 0.22, 0.88))],
}


def person(spec, kneel=False, seated=False, segments=8):
    builder = MeshBuilder()
    n = segments
    m = MATTE
    skin = SKIN[spec.skin]
    hair = HAIR[spec.hair]
    drop = 0.45 if (kneel or seated) else 0.0
    up = Matrix.Translation((0.0, 0.0, -drop))
    if kneel:
        for side in (-1, 1):
            limb(builder, (side * 0.1, 0.0, 0.52), (side * 0.1, 0.38, 0.12), 0.13, 0.14, spec.long or spec.legs, m)
            limb(builder, (side * 0.1, 0.38, 0.06), (side * 0.1, -0.12, 0.06), 0.11, 0.12, spec.long or spec.legs, m)
    elif seated:
        for side in (-1, 1):
            limb(builder, (side * 0.11, 0.0, 0.52), (side * 0.11, 0.46, 0.52), 0.15, 0.15, spec.long or spec.legs, m)
            limb(builder, (side * 0.11, 0.46, 0.5), (side * 0.11, 0.5, 0.04), 0.12, 0.13, spec.long or spec.legs, m)
    elif spec.long is not None:
        ring(builder, [(0.24 + spec.stride * 0.3, 0.02), (0.22, 0.4), (0.19, 0.9), (0.18, 1.0)], spec.long, n, SQUASH)
    else:
        for side in (-1, 1):
            foot = side * spec.stride
            limb(builder, (side * 0.09, foot, 0.06), (side * 0.09, foot * 0.4, 0.55), 0.1, 0.11, spec.legs, m)
            limb(builder, (side * 0.09, foot * 0.4, 0.5), (side * 0.095, 0.0, 0.98), 0.13, 0.14, spec.legs, m)
            limb(builder, (side * 0.09, foot - 0.07, 0.035), (side * 0.09, foot + 0.15, 0.035), 0.1, 0.07, BLACK, m)
    upper = MeshBuilder()
    ring(upper, [(0.17, 0.95), (0.19, 1.2), (0.205, 1.37), (0.12, 1.45), (0.0, 1.47)], spec.coat, n, SQUASH)
    if spec.skirts and spec.long is None:
        ring(upper, [(0.19, 1.0), (0.215, 0.52)], spec.coat, n, SQUASH, start=math.radians(195), sweep=math.radians(150))
    if spec.trim is not None:
        ring(upper, [(0.207, 1.1), (0.21, 1.36)], spec.trim, n, SQUASH, start=math.radians(60), sweep=math.radians(60))
    if spec.sash is not None:
        ring(upper, [(0.2, 0.98), (0.2, 1.06)], spec.sash, n, SQUASH)
    ring(upper, [(0.05, 1.44), (0.09, 1.52), (0.1, 1.6), (0.08, 1.69), (0.0, 1.73)], skin, n)
    ring(upper, [(0.07, 1.42), (0.08, 1.47)], WHITE, 6)
    if spec.head != "mitre":
        ring(upper, [(0.106, 1.6), (0.09, 1.7), (0.0, 1.748)], hair, n, Matrix.Translation((0.0, -0.012, 0.0)))
    for index, (elbow, hand) in enumerate(ARMS[spec.pose]):
        side = 1 if index == 0 else -1
        limb(upper, (side * 0.21, 0.0, 1.38), elbow, 0.085, 0.09, spec.coat, m)
        limb(upper, elbow, hand, 0.07, 0.075, skin, m)
        if spec.detail:
            ring(upper, [(0.0, -0.05), (0.045, -0.02), (0.045, 0.02), (0.0, 0.05)], skin, 6, Matrix.Translation(hand))
    if spec.detail:
        limb(upper, (0.0, 0.085, 1.63), (0.0, 0.115, 1.6), 0.03, 0.03, skin, m)
        for side in (-1, 1):
            limb(upper, (side * 0.035, 0.085, 1.645), (side * 0.035, 0.092, 1.645), 0.025, 0.012, (0.25, 0.18, 0.15), m)
    if spec.mantle is not None:
        bottom = 0.03 + drop if not seated else 0.5
        mm = spec.mantle_material
        ring(upper, [(0.12, 1.47), (0.25, 1.38), (0.3, 0.9), (0.38, bottom)], spec.mantle, n + 2, SQUASH,
             start=math.radians(185), sweep=math.radians(170), material=mm)
        if spec.train > 0:
            length = spec.train
            rows = []
            for step in range(7):
                t = step / 6
                width = 0.38 + 0.3 * t
                lift = 0.09 * (1 - t) + 0.02
                rows.append([(width, -0.12 - length * t, bottom + 0.01), (width * 0.5, -0.12 - length * t, bottom + lift),
                             (-width * 0.5, -0.12 - length * t, bottom + lift), (-width, -0.12 - length * t, bottom + 0.01)])
            first = len(upper.polygons)
            upper.surface(rows, mm, facing=(0.0, 0.0, 1.0))
            upper.tint(first, spec.mantle)
            if spec.collar is not None:
                upper.polygon([(0.68, -0.12 - length, bottom + 0.012), (-0.68, -0.12 - length, bottom + 0.012),
                               (-0.68, -0.32 - length, bottom + 0.012), (0.68, -0.32 - length, bottom + 0.012)], m,
                              color=spec.collar)
    if spec.cape is not None:
        ring(upper, [(0.12, 1.47), (0.26, 1.36), (0.25, 1.12)], spec.cape, n + 2, SQUASH)
    if spec.collar is not None:
        profile = [(0.15, 1.5), (0.36, 1.33), (0.33, 1.08)] if spec.detail else [(0.13, 1.47), (0.27, 1.36), (0.25, 1.22)]
        ring(upper, profile, spec.collar, n + 2, SQUASH)
    if spec.pose == "raise" and spec.head == "laurel":
        crown = Matrix.Translation((0.0, 0.4, 1.76))
        ring(upper, [(0.11, 0.0), (0.11, 0.06)], GOLD, 12, crown)
        for k in range(4):
            angle = math.pi * k / 4
            dx, dy = 0.11 * math.cos(angle), 0.11 * math.sin(angle)
            limb(upper, (0.4 * 0 + dx, 0.4 + dy, 1.82), (0.0, 0.4, 1.95), 0.018, 0.018, GOLD, m)
            limb(upper, (-dx, 0.4 - dy, 1.82), (0.0, 0.4, 1.95), 0.018, 0.018, GOLD, m)
        ring(upper, [(0.0, 1.95), (0.025, 1.97), (0.0, 2.02)], GOLD, 6, Matrix.Translation((0.0, 0.4, 0.0)))
    if spec.head == "mitre":
        ring(upper, [(0.1, 1.63), (0.11, 1.8), (0.06, 1.95), (0.0, 2.02)], WHITE, 6)
        ring(upper, [(0.108, 1.66), (0.111, 1.7)], GOLD, 6)
    elif spec.head == "bearskin":
        ring(upper, [(0.12, 1.62), (0.15, 1.82), (0.13, 2.0), (0.0, 2.06)], BLACK, 8)
    elif spec.head == "laurel":
        ring(upper, [(0.112, 1.66), (0.116, 1.7)], GOLD, 8)
    elif spec.head == "calotte":
        ring(upper, [(0.105, 1.68), (0.0, 1.76)], WHITE, 8, Matrix.Translation((0.0, -0.01, 0.0)))
    elif spec.head == "barrette":
        ring(upper, [(0.11, 1.66), (0.1, 1.76), (0.0, 1.8)], RED, 6)
    elif spec.head == "bun":
        limb(upper, (0.0, -0.1, 1.62), (0.0, -0.17, 1.64), 0.11, 0.1, hair, m)
        ring(upper, [(0.11, 1.68), (0.112, 1.71)], GOLD, 8)
    builder.merge(upper, up)
    if spec.scale != 1.0:
        scaled = MeshBuilder()
        scaled.merge(builder, Matrix.Scale(spec.scale, 4))
        return scaled
    return builder


def lady(gown, mantle, hair=0, skin=0, pose="down", train=0.0):
    return Costume(gown, long=gown, skirts=False, mantle=mantle, train=train, head="bun", hair=hair, skin=skin, pose=pose)


VARIANTS = {
    "fig_senateur": Costume(BLUE, trim=GOLD, hair=2),
    "fig_conseiller": Costume((0.14, 0.2, 0.45), trim=GOLD, hair=0, skin=1),
    "fig_legislateur": Costume((0.2, 0.22, 0.5), trim=(0.75, 0.75, 0.78), hair=1),
    "fig_habit_noir": Costume(BLACK, legs=BLACK, hair=3, skin=0),
    "fig_habit_brun": Costume((0.3, 0.2, 0.14), hair=1, skin=2),
    "fig_magistrat": Costume(RED, long=RED, skirts=False, hair=2, collar=ERMINE),
    "fig_juge": Costume(BLACK, long=BLACK, skirts=False, hair=0, collar=WHITE),
    "fig_general": Costume((0.1, 0.13, 0.32), trim=GOLD, sash=RED, hair=0, skin=1),
    "fig_chasseur_garde": Costume(GREEN, legs=RED, trim=GOLD, hair=1),
    "fig_dame_blanche": lady(WHITE, CRIMSON),
    "fig_dame_bleue": lady((0.82, 0.86, 0.92), BLUE, hair=1),
    "fig_dame_rose": lady((0.95, 0.8, 0.78), GREEN, hair=0, skin=1),
    "fig_dame_or": lady((0.95, 0.88, 0.7), PURPLE, hair=3),
    "fig_musicien": Costume(BLACK, legs=BLACK, hair=0, pose="hold"),
    "fig_chantre": Costume(BLACK, long=WHITE, skirts=False, hair=2, pose="hold"),
    "fig_chanoine": Costume(WHITE, long=WHITE, skirts=False, hair=2, cape=(0.45, 0.38, 0.48), pose="joined"),
    "fig_eveque": Costume(WHITE, long=WHITE, skirts=False, mantle=GOLD, head="mitre", hair=2, pose="joined"),
    "fig_cardinal": Costume(RED, long=RED, skirts=False, mantle=RED, collar=ERMINE, head="barrette", hair=2, pose="joined"),
    "fig_page": Costume(GREEN, legs=WHITE, trim=GOLD, hair=1, scale=0.9),
    "fig_prince": Costume(WHITE, long=WHITE, skirts=False, mantle=PURPLE, collar=ERMINE, hair=0, pose="hold"),
    "fig_grenadier": Costume(BLUE, legs=WHITE, trim=RED, head="bearskin", hair=0, pose="down"),
    "fig_bourgeois": Costume((0.24, 0.27, 0.22), legs=(0.55, 0.5, 0.42), hair=1, skin=1),
    "fig_bourgeoise": lady((0.55, 0.32, 0.25), (0.25, 0.22, 0.3), hair=1, skin=2),
    "fig_ouvrier": Costume((0.36, 0.3, 0.24), legs=(0.4, 0.36, 0.3), skirts=False, hair=3, skin=2),
}

PRINCIPALS = {
    "fig_napoleon": (Costume(WHITE, long=WHITE, skirts=False, mantle=(0.55, 0.05, 0.12), train=4.2, collar=ERMINE,
                             head="laurel", hair=3, pose="raise", mantle_material=VELVET, detail=True), {}),
    "fig_josephine": (Costume(WHITE, long=WHITE, skirts=False, mantle=(0.55, 0.05, 0.12), train=3.4, collar=ERMINE,
                              head="bun", hair=0, pose="joined", mantle_material=VELVET, detail=True), {"kneel": True}),
    "fig_pie_vii": (Costume(WHITE, long=WHITE, skirts=False, mantle=(0.95, 0.85, 0.55), head="calotte", hair=2,
                            pose="bless", detail=True), {"seated": True}),
    "fig_page_traine": (Costume(GREEN, legs=WHITE, trim=GOLD, hair=1, scale=0.9, pose="hold", detail=True), {}),
}

WALKERS = {
    "walker_huissier": Costume(BLACK, legs=BLACK, hair=0, stride=0.17, pose="swing", trim=(0.8, 0.8, 0.82)),
    "walker_page": Costume(GREEN, legs=WHITE, trim=GOLD, hair=1, stride=0.17, pose="swing", scale=0.9),
    "walker_bourgeois": Costume((0.22, 0.25, 0.3), legs=(0.5, 0.46, 0.4), hair=1, skin=1, stride=0.18, pose="swing"),
    "walker_bourgeoise": Costume((0.5, 0.3, 0.24), long=(0.5, 0.3, 0.24), skirts=False, mantle=(0.22, 0.2, 0.28),
                                 head="bun", hair=1, skin=2, stride=0.12, pose="swing"),
}

POOLS = {
    "nef": ["fig_senateur", "fig_conseiller", "fig_legislateur", "fig_habit_noir", "fig_magistrat", "fig_juge",
            "fig_general", "fig_habit_brun", "fig_senateur", "fig_legislateur"],
    "tribune": ["fig_dame_blanche", "fig_dame_bleue", "fig_dame_rose", "fig_dame_or", "fig_habit_noir", "fig_general",
                "fig_habit_brun", "fig_chasseur_garde", "fig_dame_blanche"],
    "tribune_choeur": ["fig_dame_blanche", "fig_dame_or", "fig_dame_bleue", "fig_general", "fig_prince",
                       "fig_dame_rose"],
    "galerie": ["fig_dame_blanche", "fig_habit_noir", "fig_dame_bleue", "fig_habit_brun", "fig_dame_rose",
                "fig_general"],
    "musiciens": ["fig_musicien", "fig_musicien", "fig_chantre", "fig_musicien", "fig_chantre"],
    "clerge": ["fig_chanoine", "fig_chanoine", "fig_eveque", "fig_cardinal", "fig_chanoine", "fig_eveque"],
    "dignitaires": ["fig_prince", "fig_general", "fig_senateur", "fig_dame_or", "fig_dame_blanche", "fig_cardinal",
                    "fig_eveque", "fig_conseiller"],
    "conseil": ["fig_conseiller", "fig_senateur", "fig_conseiller", "fig_general"],
    "parvis": ["fig_bourgeois", "fig_bourgeoise", "fig_ouvrier", "fig_bourgeois", "fig_bourgeoise"],
    "garde": ["fig_grenadier"],
}


def builder_for(key):
    if key.endswith("_lod"):
        return lambda: person(VARIANTS[key[:-4]], segments=5)
    if key in VARIANTS:
        return lambda: person(VARIANTS[key], segments=6)
    if key in WALKERS:
        return lambda: person(WALKERS[key])
    if key in STATUES:
        return lambda: person(STATUES[key])
    spec, options = PRINCIPALS[key]
    return lambda: person(spec, segments=16, **options)


def crowd(zones, rng, keep=1.0, visible=None):
    placed = {}
    dropped = 0
    for zone, spots in zones.items():
        pool = POOLS[zone]
        for x, y, z, angle in spots:
            if rng.random() > keep:
                continue
            key = pool[rng.randrange(len(pool))]
            if visible is not None and not visible(x, y, z):
                dropped += 1
                continue
            if zone in LOD_ZONES:
                key = key + "_lod"
            jitter = rng.uniform(-0.35, 0.35)
            matrix = placement(x + rng.uniform(-0.06, 0.06), y + rng.uniform(-0.06, 0.06), z, angle - math.pi / 2 + jitter,
                               rng.uniform(0.95, 1.05))
            placed.setdefault(key, []).append(matrix)
    return placed, dropped


def principals(decor):
    nx, ny = plan.NAPOLEON
    jx, jy = plan.JOSEPHINE
    px, py, pz = decor.anchors["pape"]
    placed = {
        "fig_napoleon": [placement(nx, ny, 0.54, math.pi - math.pi / 2)],
        "fig_josephine": [placement(jx, jy, 0.16, 0.0 - math.pi / 2)],
        "fig_pie_vii": [placement(px, py, pz - 0.5, -math.pi / 2 - math.pi / 2)],
        "fig_page_traine": [placement(jx - 3.7, s * 0.75, 0.0, -math.pi / 2) for s in (-1, 1)],
        "fig_prince": [],
    }
    cardinals = [(px - 1.3, py - 0.4), (px + 1.3, py - 0.4), (px - 2.2, py + 0.3), (px + 2.2, py + 0.4)]
    placed["fig_cardinal"] = [placement(x, y, 0.48, -math.pi / 2 - math.pi / 2 + 0.3 * (k - 1.5))
                              for k, (x, y) in enumerate(cardinals)]
    placed["fig_eveque"] = [placement(plan.ALTAR[0] + 1.2, s * 2.8, 0.54, math.pi / 2 * -s - math.pi / 2) for s in (-1, 1)]
    placed["fig_prince"] += [placement(27.0 + k * 0.6, 2.2 + k * 0.6, 0.0, -math.pi / 2 - 0.5) for k in range(3)]
    placed["fig_dame_blanche"] = [placement(jx - 4.4 - k * 0.6, 0.6 * (1 if k % 2 else -1), 0.0, -math.pi / 2) for k in range(4)]
    regalia = [(31.8, -2.0), (32.5, -2.5), (33.2, -2.0), (31.1, -2.9)]
    placed["fig_prince"] += [placement(x, y, 0.54, 0.6) for x, y in regalia]
    return placed


def statues(niches, figures):
    painted = {"fig_statue_rouge": [], "fig_statue_bleue": [], "fig_statue_or": []}
    for index, (x, y, z, angle) in enumerate(niches):
        key = "fig_statue_rouge" if index % 2 else "fig_statue_bleue"
        painted[key].append(placement(x, y, z, angle - math.pi / 2, 0.75))
    for x, y, z, angle in figures:
        painted["fig_statue_or"].append(placement(x, y, z, angle - math.pi / 2, 1.2))
    return painted


STATUES = {
    "fig_statue_rouge": Costume((0.7, 0.16, 0.14), long=(0.7, 0.16, 0.14), skirts=False, mantle=(0.85, 0.7, 0.4), head="laurel",
                                hair=2, pose="hold"),
    "fig_statue_bleue": Costume((0.2, 0.28, 0.6), long=(0.2, 0.28, 0.6), skirts=False, mantle=(0.85, 0.7, 0.4), head="laurel",
                                hair=1, pose="hold"),
    "fig_statue_or": Costume(GOLD, long=GOLD, skirts=False, mantle=GOLD, head="laurel", hair=2, pose="raise"),
}


def outside(rng, porch_front):
    spots = {}
    guards = []
    x = porch_front - 3.0
    while x > porch_front - 52.0:
        for sign in (-1, 1):
            guards.append(placement(x, sign * 4.6, 0.0, (math.pi / 2 if sign < 0 else -math.pi / 2) - math.pi / 2))
        x -= 1.6
    spots["fig_grenadier"] = guards
    people = {}
    for sign in (-1, 1):
        for row in range(5):
            x = porch_front - 6.0
            while x > porch_front - 54.0:
                if rng.random() < 0.82:
                    key = POOLS["parvis"][rng.randrange(len(POOLS["parvis"]))] + "_lod"
                    people.setdefault(key, []).append(
                        placement(x + rng.uniform(-0.2, 0.2), sign * (7.0 + row * 0.75 + rng.uniform(-0.15, 0.15)), 0.0,
                                  math.atan2(-sign, 0.0) - math.pi / 2 + rng.uniform(-0.6, 0.6)))
                x -= 0.62
    for key, value in people.items():
        spots.setdefault(key, []).extend(value)
    return spots


def routes(porch_front):
    aisle = (plan.AISLE + plan.OUTER) / 2
    paths = {}
    for sign, name in ((-1, "bas-cote-sud"), (1, "bas-cote-nord")):
        points = []
        x = plan.NAVE_PIERS[0] + 1.0
        while x <= plan.CROSSING[0] - 1.0:
            points.append((x, sign * aisle, 0.0))
            x += 2.5
        paths[name] = points
    points = []
    y = -24.0
    while y <= 24.0:
        points.append((porch_front - 62.0, y, 0.0))
        y += 2.6
    paths["parvis"] = points
    return paths


if __name__ == "__main__":
    total = 0
    for key in list(VARIANTS) + list(WALKERS) + list(PRINCIPALS):
        mesh = builder_for(key)()
        total += mesh.triangle_count()
        assert 80 < mesh.triangle_count() < 900, (key, mesh.triangle_count())
    print("templates", len(VARIANTS) + len(WALKERS) + len(PRINCIPALS), "triangles", total)

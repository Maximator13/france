import math

from mathutils import Matrix, Vector

from .geometry import UP, MeshBuilder
from . import sacre_plan as plan
from .sacre_gothic import STONE, Plane, arch, bar, polyline, wall

VELVET = "velours"
PLAIN = "velours_uni"
GREEN = "velours_vert"
BLUE_CARPET = "tapis_bleu"
BLUE = "toile"
SILK = "soie_blanche"
GOLD = "or"
WOOD = "bois"
MARBLE = "marbre"
TIN = "etain"
WAX = "cire"
FLAME = "flamme"
DARK_WOOD = (0.62, 0.55, 0.5)
CRIMSON = (0.62, 0.05, 0.1)
RED = (0.78, 0.1, 0.1)
VIOLET = (0.38, 0.12, 0.42)
PINK = (0.95, 0.74, 0.72)


def panel(builder, corners, normal, material, tint=None):
    first = len(builder.polygons)
    builder.oriented(corners, normal, material)
    if tint is not None:
        builder.tint(first, tint)


def tinted_box(builder, minimum, maximum, material, tint, bottom=True):
    first = len(builder.polygons)
    builder.box(minimum, maximum, material, bottom=bottom)
    builder.tint(first, tint)


def wreath(builder, centre, normal, radius=0.5):
    normal = Vector(normal).normalized()
    across = Vector((-normal.y, normal.x, 0.0)).normalized()
    ring = [Vector(centre) + across * radius * math.cos(math.tau * k / 12) + UP * radius * math.sin(math.tau * k / 12)
            for k in range(12)]
    for first, second in zip(ring, ring[1:] + ring[:1]):
        bar(builder, first, second, 0.11, 0.1, normal, GOLD)
    c = Vector(centre) + normal * 0.03
    h, w = radius * 0.55, radius * 0.38
    bar(builder, c - across * w - UP * h, c - across * w + UP * h, 0.08, 0.06, normal, GOLD)
    bar(builder, c - across * w + UP * h, c + across * w - UP * h, 0.08, 0.06, normal, GOLD)
    bar(builder, c + across * w - UP * h, c + across * w + UP * h, 0.08, 0.06, normal, GOLD)


def eagle(builder, matrix, size=1.0):
    piece = MeshBuilder()
    piece.lathe([(0.0, 0.0), (0.22, 0.15), (0.18, 0.6), (0.1, 0.8), (0.0, 0.9)], 8, GOLD)
    for sign in (-1, 1):
        wing = [(0.0, sign * 0.1, 0.65), (0.05, sign * 0.95, 1.25), (0.05, sign * 1.1, 0.8), (0.0, sign * 0.2, 0.3)]
        piece.polygon(wing, GOLD)
        piece.polygon(list(reversed(wing)), GOLD)
    builder.merge(piece, matrix @ Matrix.Scale(size, 4))


def globe_eagle(builder, x, y, z, normal):
    builder.lathe([(0.0, z), (0.22, z + 0.22), (0.0, z + 0.44)], 8, GOLD, matrix=Matrix.Translation((x, y, 0.0)))
    eagle(builder, Matrix.Translation((x, y, z + 0.42)) @ Matrix.Rotation(math.atan2(normal[1], normal[0]), 4, "Z"), 0.55)


def tieback(builder, x_edge, x_inner, y, top, bottom, sign, material, tint=None):
    tied = bottom + (top - bottom) * 0.35
    corners = [(x_edge, y, top), (x_inner, y, top), (x_edge + (x_inner - x_edge) * 0.25, y, tied), (x_edge, y, bottom)]
    panel(builder, corners, (0, -sign, 0), material, tint)


class Decor:
    def __init__(self):
        self.solid = MeshBuilder()
        self.cloth = MeshBuilder()
        self.zones = {}
        self.fixtures = []
        self.lamps = []
        self.anchors = {}

    def zone(self, name, spots):
        self.zones.setdefault(name, []).extend(spots)

    def stand(self, x0, x1, sign, rows=5, start=7.6, depth=0.76, rise=0.45, first=0.9, crowd="tribune"):
        y_front = sign * (start - 0.35)
        a, b = x0 + 0.85, x1 - 0.85
        spots = []
        for k in range(rows):
            y0 = sign * (start + k * depth)
            y1 = sign * (start + (k + 1) * depth)
            z = first + k * rise
            lo, hi = sorted((y0, y1))
            tinted_box(self.solid, (a, lo, 0.0), (b, hi, z), WOOD, DARK_WOOD, bottom=False)
            count = max(2, int((b - a) / 0.62))
            for j in range(count):
                spots.append((a + (j + 0.5) * (b - a) / count, (y0 + y1) / 2, z, math.atan2(-sign, 0.0)))
        panel(self.cloth, [(a, y_front, 0.0), (b, y_front, 0.0), (b, y_front, 1.95), (a, y_front, 1.95)], (0, -sign, 0), VELVET)
        bar(self.solid, (a, y_front - sign * 0.04, 1.95), (b, y_front - sign * 0.04, 1.95), 0.16, 0.08, (0, -sign, 0), GOLD)
        self.zone(crowd, spots)

    def arcade_hangings(self, first, second, sign, choir=False):
        margin = 0.95 if choir else plan.COLUMN_RADIUS * 1.15
        a, b = first + margin, second - margin
        y = sign * (plan.ARCADE - (0.75 if choir else 0.55))
        top = 7.9 if choir else 9.4
        panel(self.cloth, [(a, y, top - 0.9), (b, y, top - 0.9), (b, y, top), (a, y, top)], (0, -sign, 0), PLAIN, CRIMSON)
        bar(self.solid, (a, y - sign * 0.03, top - 0.92), (b, y - sign * 0.03, top - 0.92), 0.14, 0.05, (0, -sign, 0), GOLD)
        if choir:
            for edge, inner in ((a, a + 1.1), (b, b - 1.1)):
                tieback(self.cloth, edge, inner, y + sign * 0.02, top - 0.9, 0.0, sign, GREEN)
        else:
            gap = 0.38
            width = (second - first - 2.2 - 2 * gap) / 3
            ty = sign * (plan.ARCADE - 0.56)
            left, right = first + 1.1, first + 1.1 + 3 * width + 2 * gap
            tieback(self.cloth, left - 0.15, left + 0.75, ty, 18.6, 12.9, sign, BLUE)
            tieback(self.cloth, right + 0.15, right - 0.75, ty, 18.6, 12.9, sign, BLUE)

    def pier_ornaments(self, x, sign, choir=False):
        face = sign * (plan.ARCADE - (0.75 if choir else 0.72))
        if not choir:
            globe_eagle(self.solid, x, face, plan.CAPITAL + 0.3, (0, -sign))
        self.fixtures.append(("girandole", Matrix.Translation((x, face - sign * 0.1, plan.TRIBUNE_FLOOR - 1.4))
                              @ Matrix.Rotation(math.atan2(-sign, 0.0) - math.pi / 2, 4, "Z")))

    def tribune_drape(self, x0, x1, sign):
        y = sign * (plan.ARCADE - 0.53)
        a, b = x0 + 0.4, x1 - 0.4
        panel(self.cloth, [(a, y, plan.TRIBUNE_FLOOR - 0.5), (b, y, plan.TRIBUNE_FLOOR - 0.5), (b, y, plan.TRIBUNE_FLOOR + 1.2),
                           (a, y, plan.TRIBUNE_FLOOR + 1.2)], (0, -sign, 0), VELVET)
        bar(self.solid, (a, y - sign * 0.03, plan.TRIBUNE_FLOOR - 0.5), (b, y - sign * 0.03, plan.TRIBUNE_FLOOR - 0.5), 0.14, 0.05,
            (0, -sign, 0), GOLD)
        wreath(self.solid, ((x0 + x1) / 2, y - sign * 0.08, plan.TRIBUNE_FLOOR + 0.35), (0, -sign, 0), 0.4)
        spots = []
        for k in range(2):
            ys = sign * (plan.ARCADE + 0.9 + k * 0.85)
            count = int((x1 - x0 - 1.2) / 0.6)
            for j in range(count):
                spots.append((x0 + 0.6 + (j + 0.5) * (x1 - x0 - 1.2) / count, ys, plan.TRIBUNE_FLOOR, math.atan2(-sign, 0.0)))
        self.zone("galerie", spots)

    def nave(self, stairs_end):
        piers = plan.NAVE_PIERS
        choir = plan.CHOIR_PIERS
        for sign in (-1, 1):
            for x0, x1 in zip(piers, piers[1:]):
                self.stand(x0, x1, sign)
                self.arcade_hangings(x0, x1, sign)
                self.tribune_drape(x0, x1, sign)
            for x in piers[1:-1]:
                self.pier_ornaments(x, sign)
            for x0, x1 in zip(choir, choir[1:]):
                self.stand(x0, x1, sign, crowd="tribune_choeur")
                self.arcade_hangings(x0, x1, sign, choir=True)
                self.tribune_drape(x0, x1, sign)
            for x in choir[1:-1]:
                self.pier_ornaments(x, sign, choir=True)
        self.solid.polygon([(stairs_end, -1.8, 0.02), (plan.CROSSING[1], -1.8, 0.02), (plan.CROSSING[1], 1.8, 0.02),
                            (stairs_end, 1.8, 0.02)], BLUE_CARPET)
        self.solid.polygon([(plan.CROSSING[1], -1.8, 0.02), (29.7, -1.8, 0.02), (29.7, 1.8, 0.02), (plan.CROSSING[1], 1.8, 0.02)],
                           GREEN)
        spots = []
        rail_start = stairs_end + 1.0
        for sign in (-1, 1):
            for k in range(int((plan.CROSSING[0] - 1.5 - rail_start) / 3.0) + 1):
                x = rail_start + k * 3.0
                bar(self.solid, (x, sign * 2.05, 0.0), (x, sign * 2.05, 1.0), 0.07, 0.07, (1, 0, 0), GOLD)
            bar(self.solid, (rail_start, sign * 2.05, 1.0), (plan.CROSSING[0] - 1.5, sign * 2.05, 1.0), 0.08, 0.08, (0, 1, 0), GOLD)
            for row in range(5):
                y = sign * (2.55 + row * 0.66)
                x = rail_start + 0.3
                while x < plan.CROSSING[0] - 1.2:
                    spots.append((x + (row % 2) * 0.28, y, 0.0, 0.0 if row < 3 else math.atan2(-sign, 0.3)))
                    x += 0.6
        self.zone("nef", spots)
        self.lamps += [(-38.0, 0.0, 5.5), (-14.0, 0.0, 5.5)]

    def transept_stands(self):
        for sign in (-1, 1):
            spots = []
            for k in range(8):
                y0 = sign * (9.0 + k * 1.0)
                y1 = sign * (10.0 + k * 1.0)
                z = 0.6 + k * 0.55
                lo, hi = sorted((y0, y1))
                tinted_box(self.solid, (-6.0, lo, 0.0), (6.0, hi, z), WOOD, DARK_WOOD, bottom=False)
                for j in range(17):
                    spots.append((-5.6 + (j + 0.5) * 11.2 / 17 + (k % 2) * 0.2, (y0 + y1) / 2, z, math.atan2(-sign, 0.0)))
            y = sign * 8.7
            panel(self.cloth, [(-6.0, y, 0.0), (6.0, y, 0.0), (6.0, y, 1.3), (-6.0, y, 1.3)], (0, -sign, 0), VELVET)
            for x in (-5.0, 5.0):
                self.fixtures.append(("torchere", Matrix.Translation((x, sign * 8.2, 0.0))))
            self.zone("musiciens", spots)
        self.lamps.append((0.0, 0.0, 7.0))

    def stalls(self):
        x0, x1 = plan.CHOIR_PIERS[0] + 1.0, 25.4
        spots = []
        for sign in (-1, 1):
            back = sign * 5.5
            first_polygon = len(self.solid.polygons)
            self.solid.box((x0, min(back, back - sign * 0.3), 0.0), (x1, max(back, back - sign * 0.3), 3.8), WOOD)
            self.solid.box((x0, min(back, back - sign * 1.1), 3.6), (x1, max(back, back - sign * 1.1), 4.0), WOOD)
            for tier, (inner, z) in enumerate(((3.9, 0.0), (4.7, 0.45))):
                y0, y1 = sorted((sign * inner, sign * (inner + 0.8)))
                self.solid.box((x0, y0, 0.0), (x1, y1, z + 0.45), WOOD, bottom=False)
                count = int((x1 - x0) / 0.7)
                for j in range(count):
                    spots.append((x0 + (j + 0.5) * (x1 - x0) / count, sign * (inner + 0.4), z + 0.45 if tier else 0.45,
                                  math.atan2(-sign, 0.0)))
            self.solid.tint(first_polygon, (0.8, 0.7, 0.6))
            for k in range(int((x1 - x0) / 1.4)):
                x = x0 + 0.7 + k * 1.4
                bar(self.solid, (x, back - sign * 0.32, 3.9), (x, back - sign * 0.32, 4.4), 0.12, 0.12, (1, 0, 0), GOLD)
        self.zone("clerge", spots)

    def sanctuary(self):
        x0, x1 = 29.7, plan.APSE_CENTRE - 1.0
        for step in range(3):
            inset = step * 0.4
            self.solid.box((x0 + inset, -5.0 + inset, 0.0), (x1, 5.0 - inset, 0.18 * (step + 1)), MARBLE, bottom=False)
        top = 0.54
        self.solid.polygon([(x0 + 0.8, -4.2, top + 0.01), (x1, -4.2, top + 0.01), (x1, 4.2, top + 0.01),
                            (x0 + 0.8, 4.2, top + 0.01)], GREEN)
        ax, ay = plan.ALTAR
        for step in range(2):
            self.solid.box((ax - 1.6 + step * 0.35, -2.6, top), (ax + 0.9, 2.6, top + 0.17 * (step + 1)), MARBLE)
        altar_base = top + 0.34
        self.solid.box((ax - 0.65, -1.9, altar_base), (ax + 0.65, 1.9, altar_base + 1.0), MARBLE)
        self.solid.box((ax - 0.72, -1.98, altar_base + 1.0), (ax + 0.72, 1.98, altar_base + 1.1), MARBLE)
        panel(self.solid, [(ax - 0.66, -1.5, altar_base + 0.15), (ax - 0.66, 1.5, altar_base + 0.15),
                           (ax - 0.66, 1.5, altar_base + 0.85), (ax - 0.66, -1.5, altar_base + 0.85)], (-1, 0, 0), GOLD)
        for k in range(2):
            self.solid.box((ax + 0.2 + k * 0.25, -1.7 + k * 0.2, altar_base + 1.1 + k * 0.22),
                           (ax + 0.72, 1.7 - k * 0.2, altar_base + 1.32 + k * 0.22), GOLD)
        table = altar_base + 1.1
        for y in (-1.5, -0.9, -0.3, 0.3, 0.9, 1.5):
            self.fixtures.append(("chandelier_autel", Matrix.Translation((ax + 0.45, y, table + 0.22 + (0.22 if abs(y) < 1 else 0.0)))))
        bar(self.solid, (ax + 0.55, 0.0, table + 0.44), (ax + 0.55, 0.0, table + 1.9), 0.06, 0.06, (1, 0, 0), GOLD)
        bar(self.solid, (ax + 0.55, -0.32, table + 1.5), (ax + 0.55, 0.32, table + 1.5), 0.06, 0.06, (1, 0, 0), GOLD)
        self.anchors["autel"] = (ax, ay, table)
        jx = plan.JOSEPHINE[0]
        tinted_box(self.cloth, (jx - 0.45, -0.4, 0.0), (jx + 0.25, 0.4, 0.16), PLAIN, VIOLET)
        px, py = plan.PIETA
        self.solid.box((px - 1.2, -2.0, 0.0), (px + 1.0, 2.0, 2.4), MARBLE)
        self.solid.box((px - 1.35, -2.15, 2.4), (px + 1.15, 2.15, 2.6), MARBLE)
        pieta = MeshBuilder()
        pieta.lathe([(0.0, 0.0), (0.95, 0.05), (0.85, 0.8), (0.45, 1.5), (0.32, 2.0), (0.18, 2.35), (0.0, 2.5)], 12,
                    MARBLE, matrix=Matrix.Translation((px, 0.0, 2.6)))
        pieta.box((px - 0.95, -1.05, 3.0), (px - 0.55, 1.05, 3.35), MARBLE)
        pieta.box((px - 1.0, 0.85, 3.0), (px - 0.6, 1.2, 3.55), MARBLE)
        self.solid.merge(pieta)
        bar(self.solid, (px + 0.85, 0.0, 2.6), (px + 0.85, 0.0, 11.5), 0.3, 0.26, (-1, 0, 0), GOLD)
        bar(self.solid, (px + 0.85, -1.5, 9.6), (px + 0.85, 1.5, 9.6), 0.3, 0.26, (-1, 0, 0), GOLD)
        for y in (-1.4, 1.4):
            self.fixtures.append(("cierge", Matrix.Translation((px - 1.5, y, 0.54))))
        canopy = (ax - 1.0, 0.0, 8.2)
        tinted_box(self.cloth, (canopy[0] - 1.9, -2.6, canopy[2]), (canopy[0] + 1.9, 2.6, canopy[2] + 0.6), PLAIN, CRIMSON)
        for dx in (-1.9, 1.9):
            for dy in (-2.6, 2.6):
                self.solid.lathe([(0.0, canopy[2] + 0.6), (0.18, canopy[2] + 0.75), (0.12, canopy[2] + 1.2), (0.0, canopy[2] + 1.5)],
                                 6, SILK, matrix=Matrix.Translation((canopy[0] + dx, dy, 0.0)))
                bar(self.solid, (canopy[0] + dx * 0.8, dy * 0.8, canopy[2] + 0.6), (canopy[0], dy * 0.2, plan.VAULT_CROWN - 1.5),
                    0.04, 0.04, (0, 1, 0), GOLD)
        for dx, dy in ((-1.9, 0.0), (1.9, 0.0), (0.0, -2.6), (0.0, 2.6)):
            start = (canopy[0] + dx - (0.0 if dx == 0 else 0.0), dy, canopy[2] - 0.02)
            length = Vector((0.0, 1.0, 0.0)) if dx != 0 else Vector((1.0, 0.0, 0.0))
            span = 2.6 if dx != 0 else 1.9
            a = Vector(start) - length * span
            b = Vector(start) + length * span
            bar(self.solid, a, b, 0.14, 0.05, (1, 0, 0) if dx else (0, 1, 0), GOLD)
        self.lamps.append((ax - 3.0, 0.0, 5.5))
        self.lamps.append((29.6, -3.5, 6.5))
        spots = []
        for sign in (-1, 1):
            for row in range(3):
                for k in range(8):
                    spots.append((17.0 + k * 0.7, sign * (1.6 + row * 0.75), 0.0,
                                  math.atan2(-sign, 0.0) if row == 0 else math.atan2(-sign * 0.5, 1.0)))
        self.zone("dignitaires", spots)

    def papal_throne(self):
        x, y = plan.POPE
        for step in range(3):
            inset = step * 0.3
            self.solid.box((x - 1.6 + inset, y - 1.2 + inset * 0.5, 0.0), (x + 1.6 - inset, y + 1.4, 0.16 * (step + 1)), MARBLE)
        z = 0.48
        self.solid.box((x - 0.55, y + 0.1, z), (x + 0.55, y + 0.7, z + 0.55), GOLD)
        tinted_box(self.cloth, (x - 0.5, y + 0.1, z + 0.55), (x + 0.5, y + 0.6, z + 0.62), PLAIN, CRIMSON)
        self.solid.box((x - 0.6, y + 0.6, z), (x + 0.6, y + 0.75, z + 2.2), GOLD)
        panel(self.cloth, [(x - 1.3, y + 1.25, z), (x + 1.3, y + 1.25, z), (x + 1.3, y + 1.25, z + 4.2), (x - 1.3, y + 1.25, z + 4.2)],
              (0, -1, 0), SILK)
        keys = Vector((x, y + 1.22, z + 3.0))
        for sign in (-1, 1):
            bar(self.solid, keys + Vector((-0.55 * sign, 0, -0.55)), keys + Vector((0.55 * sign, 0, 0.55)), 0.09, 0.03, (0, -1, 0), GOLD)
        self.solid.lathe([(0.0, z + 3.75), (0.2, z + 3.8), (0.17, z + 4.0), (0.0, z + 4.1)], 8, GOLD,
                         matrix=Matrix.Translation((x, y + 1.18, 0.0)))
        for k in range(14):
            sx = x - 1.1 + (k % 7) * 0.37
            sz = z + 0.9 + (k // 7) * 1.7
            self.solid.box((sx - 0.04, y + 1.2, sz - 0.04), (sx + 0.04, y + 1.22, sz + 0.04), GOLD)
        for dx in (-1.3, 1.3):
            for dy in (-1.0, 1.25):
                bar(self.solid, (x + dx, y + dy, z), (x + dx, y + dy, z + 4.2), 0.12, 0.12, (1, 0, 0), GOLD)
        for dy in (-1.15, 1.4):
            panel(self.cloth, [(x - 1.45, y + dy, z + 3.6), (x + 1.45, y + dy, z + 3.6), (x + 1.45, y + dy, z + 4.3),
                               (x - 1.45, y + dy, z + 4.3)], (0, math.copysign(1, dy), 0), PLAIN, CRIMSON)
        for dx in (-1.45, 1.45):
            panel(self.cloth, [(x + dx, y - 1.15, z + 3.6), (x + dx, y + 1.4, z + 3.6), (x + dx, y + 1.4, z + 4.3),
                               (x + dx, y - 1.15, z + 4.3)], (math.copysign(1, dx), 0, 0), PLAIN, CRIMSON)
        first = len(self.cloth.polygons)
        self.cloth.lathe([(2.05, z + 4.3), (1.8, z + 4.9), (1.1, z + 5.5), (0.0, z + 5.75)], 4, PLAIN,
                         matrix=Matrix.Translation((x, y + 0.12, 0.0)) @ Matrix.Rotation(math.pi / 4, 4, "Z"))
        self.cloth.tint(first, CRIMSON)
        for k, (radius, height) in enumerate(((0.26, 0.0), (0.23, 0.22), (0.2, 0.44))):
            self.solid.lathe([(radius, z + 5.75 + height), (radius * 0.95, z + 5.95 + height)], 8, GOLD,
                             matrix=Matrix.Translation((x, y + 0.12, 0.0)))
        self.solid.lathe([(0.18, z + 6.39), (0.0, z + 6.6)], 8, GOLD, matrix=Matrix.Translation((x, y + 0.12, 0.0)))
        self.anchors["pape"] = (x, y + 0.35, z + 0.55)

    def faldstools(self):
        x, y = plan.FALDSTOOLS
        half_y = 1.1
        for step in range(2):
            inset = step * 0.25
            self.solid.box((x - 1.2 + inset, y - half_y + inset, 0.0), (x + 1.2 - inset, y + half_y - inset, 0.18 * (step + 1)), MARBLE)
        z = 0.36
        for dy in (-0.5, 0.5):
            cy = y + dy
            self.solid.box((x - 0.3, cy - 0.32, z), (x + 0.28, cy + 0.32, z + 0.48), GOLD)
            tinted_box(self.cloth, (x - 0.4, cy - 0.32, z + 0.48), (x - 0.28, cy + 0.32, z + 1.5), PLAIN, CRIMSON)
            tinted_box(self.cloth, (x + 0.45, cy - 0.26, z), (x + 0.85, cy + 0.26, z + 0.16), PLAIN, VIOLET)
        x0, x1, y0, y1 = x - 1.25, x + 1.25, y - half_y - 0.05, y + half_y + 0.05
        for px in (x0, x1):
            for py in (y0, y1):
                bar(self.solid, (px, py, 0.36), (px, py, 3.5), 0.09, 0.09, (1, 0, 0), GOLD)
        self.cloth.box((x0 - 0.1, y0 - 0.1, 3.5), (x1 + 0.1, y1 + 0.1, 3.62), GREEN)
        for px in (x0 - 0.1, x1 + 0.1):
            panel(self.cloth, [(px, y0 - 0.1, 3.05), (px, y1 + 0.1, 3.05), (px, y1 + 0.1, 3.62), (px, y0 - 0.1, 3.62)],
                  (math.copysign(1, px - x), 0, 0), GREEN)
            bar(self.solid, (px, y0 - 0.1, 3.03), (px, y1 + 0.1, 3.03), 0.1, 0.05, (1, 0, 0), GOLD)
        for py in (y0 - 0.1, y1 + 0.1):
            panel(self.cloth, [(x0 - 0.1, py, 3.05), (x1 + 0.1, py, 3.05), (x1 + 0.1, py, 3.62), (x0 - 0.1, py, 3.62)],
                  (0, math.copysign(1, py - y), 0), GREEN)
            bar(self.solid, (x0 - 0.1, py, 3.03), (x1 + 0.1, py, 3.03), 0.1, 0.05, (0, 1, 0), GOLD)

    def great_throne(self):
        top = plan.THRONE_PLATFORM
        x_back, x_front = plan.FACADE_BACK + 0.2, plan.THRONE[0]
        self.cloth.box((x_back, -5.2, 0.0), (x_front, 5.2, top), VELVET, bottom=False)
        self.solid.polygon([(x_back, -5.2, top + 0.01), (x_front, -5.2, top + 0.01), (x_front, 5.2, top + 0.01),
                            (x_back, 5.2, top + 0.01)], PLAIN, color=RED)
        rise = top / plan.THRONE_STEPS
        run = 0.28
        for step in range(plan.THRONE_STEPS):
            z = top - (step + 1) * rise
            x = x_front + step * run
            tinted_box(self.cloth, (x, -3.6, 0.0), (x + run, 3.6, z + rise), PLAIN, CRIMSON, bottom=False)
            self.solid.polygon([(x, -1.5, z + rise + 0.01), (x + run, -1.5, z + rise + 0.01), (x + run, 1.5, z + rise + 0.01),
                                (x, 1.5, z + rise + 0.01)], PLAIN, color=RED)
        stairs_end = x_front + plan.THRONE_STEPS * run
        for sign in (-1, 1):
            bar(self.solid, (x_front, sign * 3.7, top + 0.9), (stairs_end, sign * 3.7, 0.9), 0.09, 0.09, (0, 1, 0), GOLD)
            for k in range(7):
                x = x_front + 0.3 + k * 0.95
                z = top - (x - x_front) / run * rise
                bar(self.solid, (x, sign * 3.7, max(z, 0.0)), (x, sign * 3.7, max(z, 0.0) + 0.9), 0.05, 0.05, (1, 0, 0), GOLD)
        spots = []
        for sign in (-1, 1):
            for row in range(4):
                inner = 4.1 + row * 0.6
                lo, hi = sorted((sign * inner, sign * (inner + 0.6)))
                z = 0.5 + row * 0.5
                tinted_box(self.solid, (x_front + 0.4, lo, 0.0), (stairs_end - 0.3, hi, z), WOOD, DARK_WOOD, bottom=False)
                count = int((stairs_end - x_front - 0.9) / 0.62)
                for j in range(count):
                    spots.append((x_front + 0.6 + j * 0.62 + (row % 2) * 0.2, sign * (inner + 0.3), z, math.atan2(-sign, 0.25)))
            panel(self.cloth, [(x_front + 0.4, sign * 4.05, 0.0), (stairs_end - 0.3, sign * 4.05, 0.0), (stairs_end - 0.3, sign * 4.05, 0.5),
                               (x_front + 0.4, sign * 4.05, 0.5)], (0, -sign, 0), VELVET)
        self.zone("conseil", spots)
        tx = plan.THRONE[0] - 3.0
        for step in range(3):
            tinted_box(self.cloth, (tx - 1.2 + step * 0.25, -1.5 + step * 0.25, top),
                       (tx + 1.3 - step * 0.25, 1.5 - step * 0.25, top + 0.16 * (step + 1)), PLAIN, CRIMSON)
        seat = top + 0.48
        self.throne_chair(tx, 0.0, seat, 1.0)
        jx, jy = tx + 0.5, -2.5
        tinted_box(self.cloth, (jx - 0.8, jy - 0.8, top), (jx + 0.9, jy + 0.8, top + 0.16), PLAIN, CRIMSON)
        self.throne_chair(jx, jy, top + 0.16, 0.85)
        back = x_back + 0.1
        panel(self.cloth, [(back, -3.6, top), (back, 3.6, top), (back, 3.6, 10.1), (back, -3.6, 10.1)], (1, 0, 0), BLUE)
        dome = (tx + 0.2, 0.0, 8.4)
        first = len(self.cloth.polygons)
        self.cloth.lathe([(1.9, dome[2]), (1.9, dome[2] + 0.5), (1.5, dome[2] + 1.1), (0.7, dome[2] + 1.5), (0.0, dome[2] + 1.6)], 12,
                         PLAIN, matrix=Matrix.Translation((dome[0], dome[1], 0.0)))
        self.cloth.tint(first, CRIMSON)
        for k in range(12):
            angle = math.tau * k / 12
            start = Vector((dome[0] + 1.92 * math.cos(angle), 1.92 * math.sin(angle), dome[2] + 0.5))
            end = Vector((dome[0] + 0.4 * math.cos(angle), 0.4 * math.sin(angle), dome[2] + 1.55))
            bar(self.solid, start, end, 0.07, 0.05, Vector((math.cos(angle), math.sin(angle), 0.4)), GOLD)
        bar(self.solid, (dome[0] - 1.9, 0.0, dome[2]), (dome[0] + 1.9, 0.0, dome[2]), 0.05, 0.05, (0, 1, 0), GOLD)
        for sign in (-1, 1):
            rows = [[(dome[0] - 1.6, sign * 1.0, dome[2]), (dome[0] + 1.6, sign * 1.0, dome[2])],
                    [(dome[0] - 1.5, sign * 1.9, top + 2.2), (dome[0] + 1.2, sign * 2.0, top + 2.6)],
                    [(dome[0] - 1.4, sign * 2.1, top), (dome[0] + 0.9, sign * 2.4, top)]]
            first = len(self.cloth.polygons)
            self.cloth.surface(rows, PLAIN, facing=(0.3, sign, 0))
            self.cloth.tint(first, CRIMSON)
        self.solid.lathe([(0.25, dome[2] + 1.6), (0.3, dome[2] + 1.9), (0.0, dome[2] + 2.1)], 8, GOLD,
                         matrix=Matrix.Translation((dome[0], 0.0, 0.0)))
        self.anchors["trone"] = (tx, 0.0, seat)
        self.anchors["trone_imperatrice"] = (jx, jy, top + 0.16)
        ax = x_front - 0.5
        width = 2.8
        for sign in (-1, 1):
            for y in (sign * 3.15, sign * 4.0):
                for cx in (ax, ax - 0.9):
                    self.solid.box((cx - 0.38, y - 0.38, top), (cx + 0.38, y + 0.38, top + 0.5), MARBLE)
                    self.solid.lathe([(0.34, top + 0.5), (0.28, top + 0.75)], 12, GOLD, matrix=Matrix.Translation((cx, y, 0.0)))
                    self.solid.lathe([(0.27, top + 0.75), (0.24, top + 7.3)], 12, MARBLE, matrix=Matrix.Translation((cx, y, 0.0)),
                                     caps=False)
                    self.solid.lathe([(0.25, top + 7.3), (0.36, top + 7.8), (0.42, top + 8.0), (0.0, top + 8.01)], 12, GOLD,
                                     matrix=Matrix.Translation((cx, y, 0.0)))
        entablature = top + 8.0
        self.solid.box((ax - 1.3, -4.5, entablature), (ax + 0.45, 4.5, entablature + 1.0), MARBLE)
        bar(self.solid, (ax + 0.47, -4.4, entablature + 0.5), (ax + 0.47, 4.4, entablature + 0.5), 0.45, 0.04, (1, 0, 0), GOLD)
        plane = Plane((ax + 0.2, -width), (0.0, 1.0), 0.5)
        if plane.n.x < 0:
            plane.n = -plane.n
        opening = (0.15, 2 * width - 0.15, [(0.15, top + 5.3), (2 * width - 0.15, top + 5.3)],
                   arch(0.15, 2 * width - 0.15, top + 5.3, top + 5.3 + width - 0.15, 10))
        wall(self.solid, plane, 2 * width, top + 5.3, entablature, [opening], MARBLE)
        polyline(self.solid, plane, arch(0.1, 2 * width - 0.1, top + 5.3, top + 5.3 + width - 0.1, 12), 0.22, 0.2, GOLD, offset=1.2)
        attic = entablature + 1.0
        self.solid.box((ax - 1.2, -4.3, attic), (ax + 0.3, 4.3, attic + 2.0), MARBLE)
        for sign in (-1, 1):
            victory = [(ax + 0.32, sign * 1.2, attic + 0.3), (ax + 0.32, sign * 3.8, attic + 0.3), (ax + 0.32, sign * 3.8, attic + 1.7),
                       (ax + 0.32, sign * 1.2, attic + 1.7)]
            panel(self.solid, victory, (1, 0, 0), GOLD)
        wreath(self.solid, (ax + 0.36, 0.0, attic + 1.0), (1, 0, 0), 0.7)
        crest = attic + 2.0
        self.solid.lathe([(0.0, crest), (0.9, crest + 0.4), (0.9, crest + 1.6), (0.0, crest + 2.4)], 12, GOLD,
                         matrix=Matrix.Translation((ax - 0.6, 0.0, 0.0)) @ Matrix.Scale(0.4, 4, (1, 0, 0)))
        self.solid.lathe([(0.0, crest + 2.3), (0.35, crest + 2.55), (0.0, crest + 2.9)], 8, GOLD,
                         matrix=Matrix.Translation((ax - 0.6, 0.0, 0.0)))
        for sign in (-1, 1):
            eagle(self.solid, Matrix.Translation((ax - 0.6, sign * 2.1, crest)), 1.0)
        for sign in (-1, 1):
            for dx in (0.0, 3.0):
                self.fixtures.append(("torchere", Matrix.Translation((stairs_end - 0.2 - dx, sign * 3.25, 0.0))))
        self.lamps.append((stairs_end + 1.5, 0.0, 7.0))
        self.anchors["arc"] = (ax, 0.0, 8.0)
        return stairs_end

    def throne_chair(self, x, y, z, scale):
        s = scale
        self.solid.box((x - 0.42 * s, y - 0.5 * s, z), (x + 0.42 * s, y + 0.5 * s, z + 0.45 * s), GOLD)
        tinted_box(self.cloth, (x - 0.38 * s, y - 0.44 * s, z + 0.45 * s), (x + 0.4 * s, y + 0.44 * s, z + 0.56 * s), PLAIN, CRIMSON)
        self.solid.box((x - 0.52 * s, y - 0.56 * s, z), (x - 0.4 * s, y + 0.56 * s, z + 1.7 * s), GOLD)
        tinted_box(self.cloth, (x - 0.4 * s, y - 0.44 * s, z + 0.6 * s), (x - 0.36 * s, y + 0.44 * s, z + 1.6 * s), PLAIN, CRIMSON)
        self.solid.lathe([(0.0, 0.0), (0.56 * s, 0.0), (0.5 * s, 0.35 * s), (0.25 * s, 0.6 * s), (0.0, 0.66 * s)], 10, GOLD,
                         matrix=Matrix.Translation((x - 0.46 * s, y, z + 1.68 * s)) @ Matrix.Scale(0.2, 4, (1, 0, 0)))
        for dy in (-0.56, 0.5):
            self.solid.box((x - 0.42 * s, y + dy * s, z + 0.45 * s), (x + 0.42 * s, y + (dy + 0.06) * s, z + 0.95 * s), GOLD)
            self.solid.lathe([(0.07 * s, z + 0.95 * s), (0.0, z + 1.07 * s)], 6, GOLD,
                             matrix=Matrix.Translation((x + 0.38 * s, y + (dy + 0.03) * s, 0.0)))

    def organ(self):
        x0, x1 = plan.FACADE_BACK, plan.FACADE_BACK + 4.2
        self.solid.box((x0, -plan.ARCADE + 0.5, 10.3), (x1, plan.ARCADE - 0.5, 10.9), STONE)
        bar(self.solid, (x1 + 0.05, -5.8, 11.6), (x1 + 0.05, 5.8, 11.6), 0.15, 0.12, (1, 0, 0), GOLD)
        for k in range(17):
            y = -5.6 + k * 0.7
            bar(self.solid, (x1 + 0.05, y, 10.9), (x1 + 0.05, y, 11.6), 0.07, 0.07, (1, 0, 0), GOLD)
        tinted_box(self.solid, (x0 + 0.1, -5.4, 10.9), (x0 + 2.6, 5.4, 19.5), WOOD, (0.85, 0.7, 0.55))
        tinted_box(self.solid, (x0 + 0.1, -5.6, 19.5), (x0 + 2.9, 5.6, 20.1), WOOD, (0.85, 0.7, 0.55))
        for index, y in enumerate((-4.5, -2.25, 0.0, 2.25, 4.5)):
            height = 7.2 if index in (0, 2, 4) else 5.6
            base = 12.2
            for k in range(7):
                angle = math.pi * (0.15 + 0.7 * k / 6)
                px = x0 + 2.75 + 0.55 * math.sin(angle)
                py = y + 0.8 * math.cos(angle)
                pipe = height - abs(k - 3) * 0.45
                self.solid.lathe([(0.13, base), (0.13, base + pipe), (0.0, base + pipe + 0.05)], 8, TIN,
                                 matrix=Matrix.Translation((px, py, 0.0)))
            self.solid.lathe([(0.95, base + height + 0.2), (1.05, base + height + 0.6), (0.0, base + height + 0.7)], 8,
                             GOLD, matrix=Matrix.Translation((x0 + 2.6, y, 0.0)))
            self.solid.lathe([(0.0, base - 0.9), (0.95, base - 0.1), (0.95, base)], 8, GOLD,
                             matrix=Matrix.Translation((x0 + 2.6, y, 0.0)))

    def build(self):
        stairs_end = self.great_throne()
        self.nave(stairs_end)
        self.transept_stands()
        self.stalls()
        self.sanctuary()
        self.papal_throne()
        self.faldstools()
        self.organ()
        self.anchors["escalier"] = (stairs_end, 0.0, 0.0)
        for x in (plan.ALTAR[0] - 3.6, plan.ALTAR[0] - 1.8):
            self.fixtures.append(("torchere", Matrix.Translation((x, -4.6, 0.54))))
        return self


def girandole():
    solid, flames, offsets = MeshBuilder(), MeshBuilder(), []
    solid.box((-0.12, -0.08, -0.4), (0.12, 0.0, 0.4), GOLD)
    for k in range(5):
        angle = math.pi * (0.1 + 0.8 * k / 4)
        point = (0.55 * math.cos(angle), 0.35 + 0.2 * math.sin(angle), 0.15 + 0.25 * math.sin(angle))
        bar(solid, (0.0, 0.0, 0.0), point, 0.04, 0.04, UP, GOLD)
        solid.lathe([(0.06, point[2] - 0.04), (0.04, point[2])], 6, GOLD, matrix=Matrix.Translation((point[0], point[1], 0.0)))
        solid.lathe([(0.03, point[2]), (0.03, point[2] + 0.28), (0.0, point[2] + 0.29)], 6, WAX,
                    matrix=Matrix.Translation((point[0], point[1], 0.0)))
        flames.lathe([(0.0, point[2] + 0.3), (0.03, point[2] + 0.35), (0.0, point[2] + 0.44)], 4, FLAME,
                     matrix=Matrix.Translation((point[0], point[1], 0.0)))
        offsets.append((point[0], point[1], point[2] + 0.36))
    return solid, flames, offsets


def torchere(kind):
    solid, flames, offsets = MeshBuilder(), MeshBuilder(), []
    if kind == "chandelier_autel":
        solid.lathe([(0.12, 0.0), (0.1, 0.05), (0.04, 0.12), (0.035, 0.75), (0.07, 0.8)], 8, GOLD)
        solid.lathe([(0.032, 0.8), (0.032, 1.35), (0.0, 1.36)], 6, WAX)
        flames.lathe([(0.0, 1.37), (0.03, 1.43), (0.0, 1.53)], 4, FLAME)
        return solid, flames, [(0.0, 0.0, 1.44)]
    if kind == "cierge":
        solid.lathe([(0.3, 0.0), (0.25, 0.1), (0.08, 0.3), (0.07, 1.6), (0.14, 1.7)], 8, GOLD)
        solid.lathe([(0.06, 1.7), (0.06, 3.6), (0.0, 3.61)], 8, WAX)
        flames.lathe([(0.0, 3.62), (0.045, 3.7), (0.0, 3.84)], 4, FLAME)
        return solid, flames, [(0.0, 0.0, 3.72)]
    solid.lathe([(0.35, 0.0), (0.3, 0.12), (0.08, 0.3), (0.06, 1.9), (0.12, 2.0), (0.1, 2.1)], 8, GOLD)
    for k in range(5):
        angle = math.tau * k / 5
        point = (0.32 * math.cos(angle), 0.32 * math.sin(angle), 2.3) if k else (0.0, 0.0, 2.45)
        bar(solid, (0.0, 0.0, 2.05), point, 0.04, 0.04, UP, GOLD)
        solid.lathe([(0.045, point[2]), (0.045, point[2] + 0.35), (0.0, point[2] + 0.36)], 6, WAX,
                    matrix=Matrix.Translation((point[0], point[1], 0.0)))
        flames.lathe([(0.0, point[2] + 0.37), (0.035, point[2] + 0.43), (0.0, point[2] + 0.53)], 4, FLAME,
                     matrix=Matrix.Translation((point[0], point[1], 0.0)))
        offsets.append((point[0], point[1], point[2] + 0.44))
    return solid, flames, offsets


def fixture(kind):
    return girandole() if kind == "girandole" else torchere(kind)

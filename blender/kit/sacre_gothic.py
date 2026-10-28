import math

from mathutils import Matrix, Vector

from .geometry import UP, MeshBuilder
from . import sacre_plan as plan

STONE = "chaux"
OUTSIDE = "pierre"
LEAD = "plomb"
GLASS = "verre"
ROSE = "rosace"
VOID = "shadow_void"
DOOR = "bois"
FLOOR = "dallage"
MARBLE_FLOOR = "marbre_sol"
MARBLE = "marbre"
TRACERY = "remplage"
PINK = (0.97, 0.72, 0.7)


def arch(a, b, spring, apex, steps=6):
    width = b - a
    rise = max(apex - spring, width / 2 + 1e-4)
    radius = (rise * rise + width * width / 4) / width
    top = math.acos(max(-1.0, 1 - width / (2 * radius)))
    left = [(a + radius - radius * math.cos(top * k / steps), spring + radius * math.sin(top * k / steps))
            for k in range(steps + 1)]
    return left + [(a + b - u, z) for u, z in reversed(left[:-1])]


def pointed(a, b, sill, spring, apex, steps=6):
    return a, b, [(a, sill), (b, sill)], arch(a, b, spring, apex, steps)


def circle(centre_u, centre_z, radius, steps=12):
    lower = [(centre_u - radius * math.cos(math.pi * k / steps), centre_z - radius * math.sin(math.pi * k / steps))
             for k in range(steps + 1)]
    upper = [(centre_u - radius * math.cos(math.pi * k / steps), centre_z + radius * math.sin(math.pi * k / steps))
             for k in range(steps + 1)]
    return centre_u - radius, centre_u + radius, lower, upper


def level_at(points, u):
    for (u0, z0), (u1, z1) in zip(points, points[1:]):
        if u0 <= u <= u1 + 1e-9:
            return z0 if u1 - u0 < 1e-9 else z0 + (z1 - z0) * (u - u0) / (u1 - u0)
    return points[-1][1]


class Plane:
    def __init__(self, origin, direction, thickness):
        self.origin = Vector((origin[0], origin[1], 0.0))
        self.u = Vector((direction[0], direction[1], 0.0)).normalized()
        self.n = Vector((-self.u.y, self.u.x, 0.0))
        self.thickness = thickness

    def at(self, u, z, side=0.0):
        return self.origin + self.u * u + self.n * (side * self.thickness / 2) + Vector((0.0, 0.0, z))


def wall(builder, plane, length, z0, z1, openings, material, inner=None, ends=False, top=True, faces=(1, -1)):
    inner = inner or material
    regions = []
    cursor = 0.0
    for a, b, bottom, upper in sorted(openings, key=lambda item: item[0]):
        if a > cursor + 1e-6:
            regions.append([(cursor, z0), (a, z0), (a, z1), (cursor, z1)])
        for (u0, w0), (u1, w1) in zip(bottom, bottom[1:]):
            if max(w0, w1) > z0 + 1e-6:
                regions.append([(u0, z0), (u1, z0), (u1, w1), (u0, w0)])
        for (u0, w0), (u1, w1) in zip(upper, upper[1:]):
            if z1 > min(w0, w1) + 1e-6:
                regions.append([(u0, w0), (u1, w1), (u1, z1), (u0, z1)])
        cursor = b
    if cursor < length - 1e-6:
        regions.append([(cursor, z0), (length, z0), (length, z1), (cursor, z1)])
    for side in faces:
        normal = plane.n * side
        target = material if side > 0 else inner
        for region in regions:
            builder.oriented([plane.at(u, z, side) for u, z in region], normal, target)
    for a, b, bottom, upper in openings:
        middle = Vector(((a + b) / 2, (bottom[0][1] + upper[-1][1]) / 2))
        for curve in (bottom, upper):
            for (u0, w0), (u1, w1) in zip(curve, curve[1:]):
                centre = Vector(((u0 + u1) / 2, (w0 + w1) / 2))
                facing = middle - centre
                normal = plane.u * facing.x + UP * facing.y
                builder.oriented([plane.at(u0, w0, 1), plane.at(u1, w1, 1), plane.at(u1, w1, -1), plane.at(u0, w0, -1)],
                                 normal, inner)
        for u, sign in ((a, 1), (b, -1)):
            low, high = level_at(bottom, u), level_at(upper, u)
            if high - low > 1e-3:
                builder.oriented([plane.at(u, low, 1), plane.at(u, high, 1), plane.at(u, high, -1), plane.at(u, low, -1)],
                                 plane.u * sign, inner)
    if top:
        builder.oriented([plane.at(0, z1, 1), plane.at(length, z1, 1), plane.at(length, z1, -1), plane.at(0, z1, -1)],
                         UP, material)
    if ends:
        for u, sign in ((0.0, -1), (length, 1)):
            builder.oriented([plane.at(u, z0, 1), plane.at(u, z1, 1), plane.at(u, z1, -1), plane.at(u, z0, -1)],
                             plane.u * sign, material)


def bar(builder, start, end, width, depth, normal, material):
    start, end = Vector(start), Vector(end)
    direction = end - start
    if direction.length < 1e-4:
        return
    side = Vector(normal).cross(direction).normalized() * (width / 2)
    out = Vector(normal).normalized() * (depth / 2)
    corners = [start - side - out, start + side - out, start + side + out, start - side + out]
    corners += [corner + direction for corner in corners]
    indices = builder.points(corners)
    for quad in ((0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)):
        builder.face([indices[k] for k in quad], material)


def polyline(builder, plane, points, width, depth, material, offset=0.0, closed=False):
    path = points + ([points[0]] if closed else [])
    for (u0, z0), (u1, z1) in zip(path, path[1:]):
        bar(builder, plane.at(u0, z0, offset), plane.at(u1, z1, offset), width, depth, plane.n, material)


def glass(builder, plane, opening, material=GLASS, offset=0.0):
    a, b, bottom, upper = opening
    outline = bottom + [point for point in reversed(upper) if point not in bottom]
    corners = [plane.at(u, z, offset) for u, z in outline]
    builder.oriented(corners, -plane.n, material)


def rose_glass(builder, plane, centre_u, centre_z, radius, steps=24, offset=0.0):
    ring = [(centre_u + radius * math.cos(math.tau * k / steps), centre_z + radius * math.sin(math.tau * k / steps))
            for k in range(steps)]
    uvs = [(0.5 + 0.5 * math.cos(math.tau * k / steps), 0.5 + 0.5 * math.sin(math.tau * k / steps)) for k in range(steps)]
    front = builder.points([plane.at(u, z, offset) for u, z in ring])
    back = builder.points([plane.at(u, z, offset) for u, z in ring])
    builder.face(front, ROSE, uvs=uvs)
    builder.face(list(reversed(back)), ROSE, uvs=list(reversed(uvs)))


def rose_tracery(builder, plane, centre_u, centre_z, radius, material, spokes=16):
    ring = lambda r, n: [(centre_u + r * math.cos(math.tau * k / n), centre_z + r * math.sin(math.tau * k / n))
                         for k in range(n)]
    polyline(builder, plane, ring(radius * 0.98, 32), 0.22, 0.5, material, closed=True)
    polyline(builder, plane, ring(radius * 0.62, 24), 0.16, 0.4, material, closed=True)
    polyline(builder, plane, ring(radius * 0.22, 12), 0.16, 0.4, material, closed=True)
    for k in range(spokes):
        angle = math.tau * k / spokes
        start = (centre_u + radius * 0.22 * math.cos(angle), centre_z + radius * 0.22 * math.sin(angle))
        end = (centre_u + radius * 0.98 * math.cos(angle), centre_z + radius * 0.98 * math.sin(angle))
        polyline(builder, plane, [start, end], 0.11 if k % 2 else 0.16, 0.35, material)


def tracery(builder, plane, opening, material, spring, apex):
    a, b, bottom, upper = opening
    middle = (a + b) / 2
    sill = bottom[0][1]
    height = apex - spring
    head = spring + height * 0.42
    polyline(builder, plane, [(middle, sill), (middle, head)], 0.2, 0.3, material)
    polyline(builder, plane, arch(a, middle, spring, head, 5), 0.14, 0.26, material)
    polyline(builder, plane, arch(middle, b, spring, head, 5), 0.14, 0.26, material)
    radius = min((b - a) * 0.22, (apex - head) * 0.42)
    centre = (middle, head + (apex - head) * 0.45)
    ring = [(centre[0] + radius * math.cos(math.tau * k / 10), centre[1] + radius * math.sin(math.tau * k / 10))
            for k in range(10)]
    polyline(builder, plane, ring, 0.13, 0.26, material, closed=True)


def column(builder, x, y, radius, capital, material=STONE, base=0.0):
    profile = [(radius * 1.32, base), (radius * 1.32, base + 0.3), (radius * 1.08, base + 0.48), (radius, base + 0.6),
               (radius, capital - 0.55), (radius * 1.06, capital - 0.5), (radius * 1.38, capital - 0.18),
               (radius * 1.42, capital)]
    builder.lathe(profile, 12, material, smooth=True, matrix=Matrix.Translation((x, y, 0.0)))
    side = radius * 1.55
    builder.box((x - side, y - side, capital), (x + side, y + side, capital + 0.28), material)


def web_rows(start, end, crown, spring_z, apex, s_steps, t_steps):
    span = (Vector(end[:2]) - Vector(start[:2]))
    width = span.length
    curve = arch(0.0, width, spring_z, apex, max(2, s_steps // 2))
    rows = []
    for t_index in range(t_steps + 1):
        t = t_index / t_steps
        lift = math.sin(t * math.pi / 2)
        row = []
        for u, z in curve:
            base = Vector(start[:2]) + span * (u / width)
            xy = base.lerp(Vector(crown[:2]), t)
            row.append((xy.x, xy.y, z + (crown[2] - z) * lift))
        rows.append(row)
    return rows


def rib(builder, points, width, depth, material):
    points = [Vector(point) for point in points]
    rings = []
    for index, point in enumerate(points):
        following = points[min(index + 1, len(points) - 1)]
        previous = points[max(index - 1, 0)]
        tangent = (following - previous).normalized()
        side = tangent.cross(UP)
        side = side.normalized() if side.length > 1e-5 else Vector((1.0, 0.0, 0.0))
        normal = side.cross(tangent).normalized()
        if normal.z < 0:
            normal = -normal
        rings.append(builder.points([point - side * width / 2, point + side * width / 2,
                                     point + side * width / 2 - normal * depth, point - side * width / 2 - normal * depth]))
    for first, second in zip(rings, rings[1:]):
        for k in range(4):
            builder.face([first[k], first[(k + 1) % 4], second[(k + 1) % 4], second[k]], material)


def vault(builder, corners, spring_z, crown_z, apexes, material=STONE, crown_xy=None, s_steps=8, t_steps=6,
          ribs=True, boundary_ribs=(), rib_width=0.32):
    if crown_xy is None:
        crown_xy = (sum(c[0] for c in corners) / len(corners), sum(c[1] for c in corners) / len(corners))
    crown = (crown_xy[0], crown_xy[1], crown_z)
    count = len(corners)
    for index in range(count):
        start, end = corners[index], corners[(index + 1) % count]
        rows = web_rows(start, end, crown, spring_z, apexes[index], s_steps, t_steps)
        builder.surface(rows, material, smooth=True, facing=(0.0, 0.0, -1.0))
        if index in boundary_ribs:
            rib(builder, rows[0], rib_width * 1.4, 0.4, material)
    if ribs:
        for corner in corners:
            path = []
            for t_index in range(t_steps + 3):
                t = t_index / (t_steps + 2)
                xy = Vector(corner[:2]).lerp(Vector(crown_xy), t)
                path.append((xy.x, xy.y, spring_z + (crown_z - spring_z) * math.sin(t * math.pi / 2) - 0.02))
            rib(builder, path, rib_width, 0.34, material)


class Station:
    def __init__(self, point, outward, depth=1.0):
        self.p = Vector((point[0], point[1], 0.0))
        self.o = Vector((outward[0], outward[1], 0.0)).normalized()
        self.depth = depth

    def at(self, offset):
        return self.p + self.o * (offset * (self.depth if offset > 0.6 else 1.0))


def side_stations(xs, sign):
    return [Station((x, sign * plan.ARCADE), (0.0, sign)) for x in xs]


def apse_stations():
    stations = []
    for k in range(plan.APSE_SIDES + 1):
        angle = -math.pi / 2 + math.pi * k / plan.APSE_SIDES
        direction = (math.cos(angle), math.sin(angle))
        stations.append(Station((plan.APSE_CENTRE + plan.ARCADE * direction[0], plan.ARCADE * direction[1]), direction,
                                plan.APSE_DEPTH))
    return stations


def segment_plane(first, second, offset, thickness):
    a, b = first.at(offset), second.at(offset)
    return Plane(a, b - a, thickness), (b - a).length


class Cathedral:
    def __init__(self):
        self.inside = MeshBuilder()
        self.outside = MeshBuilder()
        self.glass = MeshBuilder()
        self.roses = MeshBuilder()
        self.floor = MeshBuilder()
        self.windows = []
        self.roses_info = {}

    def window(self, builder, plane, opening, spring, apex, glazed=True, tracery_material=STONE):
        if glazed:
            glass(self.glass, plane, opening)
            tracery(builder, plane, opening, tracery_material, spring, apex)
            a, b, _, _ = opening
            self.windows.append((plane.at((a + b) / 2, (spring + apex) / 2), Vector(plane.n), b - a))

    def bay(self, first, second, kind="nave"):
        thickness = plan.WALL
        arcade, length = segment_plane(first, second, 0.0, thickness)
        inward = -(first.o + second.o).normalized()
        if arcade.n.dot(inward) < 0:
            arcade = Plane(second.at(0.0), first.at(0.0) - second.at(0.0), thickness)
        if kind == "choir":
            margin = 0.75
            span = length - 2 * margin
            wall(self.inside, arcade, length, 0.0, plan.TRIBUNE_FLOOR,
                 [pointed(margin, length - margin, 0.0, 8.0, 8.0 + span / 2, 8)], MARBLE)
        else:
            margin = plan.COLUMN_RADIUS * 1.1
            wall(self.inside, arcade, length, plan.CAPITAL + 0.28, plan.TRIBUNE_FLOOR,
                 [pointed(margin, length - margin, plan.CAPITAL + 0.28, plan.CAPITAL + 0.28, plan.ARCADE_APEX)], STONE)
        if length > 5.0:
            gap = 0.38
            width = (length - 2.2 - 2 * gap) / 3
            tribune = [pointed(1.1 + k * (width + gap), 1.1 + k * (width + gap) + width, plan.TRIBUNE_FLOOR + 0.9,
                               16.5, 18.3, 4) for k in range(3)]
        else:
            tribune = [pointed(0.7, length - 0.7, plan.TRIBUNE_FLOOR + 0.9, 16.5, 18.6, 4)]
        wall(self.inside, arcade, length, plan.TRIBUNE_FLOOR, 21.2, tribune, STONE)
        half = min(2.0, length / 2 - 0.55)
        clerestory = pointed(length / 2 - half, length / 2 + half, 21.8, 25.6, 29.8)
        wall(self.inside, arcade, length, 21.2, plan.WALL_TOP, [clerestory], STONE, top=True, faces=(1,))
        wall(self.outside, arcade, length, 21.2, plan.WALL_TOP, [clerestory], OUTSIDE, top=False, faces=(-1,))
        self.window(self.inside, arcade, clerestory, 25.6, 29.8)
        aisle_plane, aisle_length = segment_plane(first, second, plan.AISLE - plan.ARCADE, 0.8)
        aisle_margin = plan.AISLE_COLUMN_RADIUS * 1.15
        wall(self.inside, aisle_plane, aisle_length, plan.CAPITAL + 0.2, plan.TRIBUNE_FLOOR,
             [pointed(aisle_margin, aisle_length - aisle_margin, plan.CAPITAL + 0.2, plan.CAPITAL + 0.2, 10.8)], STONE)
        tribune_window = pointed(aisle_length / 2 - min(1.3, aisle_length / 2 - 0.6),
                                 aisle_length / 2 + min(1.3, aisle_length / 2 - 0.6), 14.0, 16.4, 18.7)
        wall(self.inside, aisle_plane, aisle_length, plan.TRIBUNE_FLOOR, 20.4, [tribune_window], STONE, faces=(1,))
        wall(self.outside, aisle_plane, aisle_length, plan.TRIBUNE_FLOOR, 20.4, [tribune_window], OUTSIDE, faces=(-1,))
        self.window(self.inside, aisle_plane, tribune_window, 16.4, 18.7)
        inner, outer = 0.5, plan.AISLE - plan.ARCADE - 0.45
        quad = [first.at(inner), second.at(inner), second.at(outer), first.at(outer)]
        vault(self.inside, quad, plan.CAPITAL + 0.25, plan.AISLE_CROWN, [11.2] * 4, s_steps=6, t_steps=4, rib_width=0.24)
        self.inside.oriented([(p.x, p.y, plan.TRIBUNE_FLOOR) for p in quad], UP, FLOOR)
        vault(self.inside, quad, plan.TRIBUNE_SPRING, plan.TRIBUNE_CROWN, [19.0] * 4, s_steps=6, t_steps=4,
              rib_width=0.22)
        chapel = plan.CHAPEL - plan.ARCADE
        far_inner = plan.AISLE - plan.ARCADE + 0.4
        quad_outer = [first.at(far_inner), second.at(far_inner), second.at(chapel - 0.5), first.at(chapel - 0.5)]
        vault(self.inside, quad_outer, plan.CAPITAL + 0.25, plan.AISLE_CROWN - 0.4, [10.8, 10.6, 10.4, 10.6],
              s_steps=6, t_steps=4, rib_width=0.24)
        outer_plane, outer_length = segment_plane(first, second, chapel, plan.WALL)
        side_window = pointed(outer_length / 2 - min(1.7, outer_length / 2 - 0.7),
                              outer_length / 2 + min(1.7, outer_length / 2 - 0.7), 3.0, 6.6, 9.8)
        wall(self.inside, outer_plane, outer_length, 0.0, 12.6, [side_window], STONE, faces=(1,), top=False)
        wall(self.outside, outer_plane, outer_length, 0.0, 12.6, [side_window], OUTSIDE, faces=(-1,), top=False)
        self.window(self.inside, outer_plane, side_window, 6.6, 9.8)
        self.floor.oriented([(p.x, p.y, 0.0) for p in (first.at(0.0), second.at(0.0), second.at(chapel), first.at(chapel))],
                            UP, MARBLE_FLOOR if kind == "choir" else FLOOR)
        lead = [first.at(0.5), second.at(0.5), second.at(plan.AISLE - plan.ARCADE + 0.45), first.at(plan.AISLE - plan.ARCADE + 0.45)]
        self.outside.oriented([(lead[0].x, lead[0].y, 21.2), (lead[1].x, lead[1].y, 21.2), (lead[2].x, lead[2].y, 20.4),
                               (lead[3].x, lead[3].y, 20.4)], UP, LEAD)
        low = [first.at(plan.AISLE - plan.ARCADE + 0.4), second.at(plan.AISLE - plan.ARCADE + 0.4),
               second.at(chapel + 0.6), first.at(chapel + 0.6)]
        self.outside.oriented([(low[0].x, low[0].y, 14.2), (low[1].x, low[1].y, 14.2), (low[2].x, low[2].y, 12.4),
                               (low[3].x, low[3].y, 12.4)], UP, LEAD)

    def station(self, point, kind="nave", flyer=True):
        p = point.at(0.0)
        shaft_base = plan.CAPITAL + 0.28
        if kind == "choir":
            shaft_base = plan.TRIBUNE_FLOOR
            centre = point.at(-0.52)
            side = Vector((-point.o.y, point.o.x, 0.0))
            for offset, width, z0, z1, tint in ((0.0, 0.5, 0.0, 8.0, None), (-0.02, 0.36, 1.2, 6.8, PINK)):
                c = centre - point.o * (0.08 - offset)
                first = len(self.inside.polygons)
                self.inside.oriented([c - side * width + Vector((0, 0, z0)), c + side * width + Vector((0, 0, z0)),
                                      c + side * width + Vector((0, 0, z1)), c - side * width + Vector((0, 0, z1))], -point.o, MARBLE)
                if tint:
                    self.inside.tint(first, tint)
            c = centre - point.o * 0.12
            self.inside.box((c.x - 0.3, c.y - 0.3, 8.0), (c.x + 0.3, c.y + 0.3, 8.35), "or")
        else:
            column(self.inside, p.x, p.y, plan.COLUMN_RADIUS, plan.CAPITAL)
        shaft = point.at(-0.62)
        self.inside.lathe([(0.19, shaft_base), (0.19, plan.VAULT_SPRING - 0.4), (0.3, plan.VAULT_SPRING)], 8,
                          STONE, matrix=Matrix.Translation((shaft.x, shaft.y, 0.0)), caps=False)
        aisle = point.at(plan.AISLE - plan.ARCADE)
        column(self.inside, aisle.x, aisle.y, plan.AISLE_COLUMN_RADIUS, plan.CAPITAL - 0.08)
        column(self.inside, aisle.x, aisle.y, 0.3, plan.TRIBUNE_SPRING, base=plan.TRIBUNE_FLOOR)
        divider_start, divider_end = point.at(plan.AISLE - plan.ARCADE + 5.6), point.at(plan.CHAPEL - plan.ARCADE - 0.45)
        side = Vector((-point.o.y, point.o.x, 0.0))
        plane = Plane(divider_start, divider_end - divider_start, 1.1)
        length = (divider_end - divider_start).length
        wall(self.inside, plane, length, 0.0, 9.0, [], STONE, ends=True)
        if flyer:
            foot = point.at(plan.CHAPEL - plan.ARCADE + 0.45)
            base = Plane(foot, point.o, 1.5)
            wall(self.outside, base, 1.95, 0.0, 12.4, [], OUTSIDE, ends=True)
            outer = point.at(plan.CHAPEL - plan.ARCADE + 2.4)
            pier = Plane(foot, outer - foot, 1.5)
            wall(self.outside, pier, (outer - foot).length, 12.4, 26.0, [], OUTSIDE, ends=True)
            tip = (outer + foot) / 2
            self.outside.lathe([(1.0, 26.0), (0.0, 30.5)], 4, OUTSIDE, smooth=False,
                               matrix=Matrix.Translation((tip.x, tip.y, 0.0)))
            head = point.at(0.6)
            bar(self.outside, (foot.x, foot.y, 25.2), (head.x, head.y, 30.2), 0.9, 1.2, side, OUTSIDE)
            bar(self.outside, (foot.x, foot.y, 24.0), (head.x, head.y, 28.6), 0.7, 0.8, side, OUTSIDE)

    def main_vaults(self):
        half = plan.ARCADE - 0.5
        transverse = [33.0, 33.0]
        units = [(plan.FACADE_BACK, plan.TOWER_BAY_EAST)]
        nave = plan.NAVE_PIERS
        units += [(nave[k], nave[k + 2]) for k in range(0, 8, 2)]
        choir = plan.CHOIR_PIERS
        units += [(choir[0], choir[1]), (choir[1], choir[3]), (choir[3], choir[5])]
        for x0, x1 in units:
            if x1 - x0 > 9.0:
                xm = (x0 + x1) / 2
                corners = [(x0, -half), (xm, -half), (x1, -half), (x1, half), (xm, half), (x0, half)]
                apexes = [plan.WALL_ARCH_APEX, plan.WALL_ARCH_APEX, transverse[0], plan.WALL_ARCH_APEX,
                          plan.WALL_ARCH_APEX, transverse[1]]
                vault(self.inside, corners, plan.VAULT_SPRING, plan.VAULT_CROWN, apexes, boundary_ribs=(2, 5))
            else:
                corners = [(x0, -half), (x1, -half), (x1, half), (x0, half)]
                vault(self.inside, corners, plan.VAULT_SPRING, plan.VAULT_CROWN,
                      [plan.WALL_ARCH_APEX, 33.0, plan.WALL_ARCH_APEX, 33.0], boundary_ribs=(1, 3))
        c0, c1 = plan.CROSSING
        vault(self.inside, [(c0, -half), (c1, -half), (c1, half), (c0, half)], plan.VAULT_SPRING, plan.VAULT_CROWN,
              [33.0] * 4, boundary_ribs=(0, 1, 2, 3))
        for sign in (-1, 1):
            for y0, y1 in ((half, 15.25), (15.25, plan.CHAPEL - 0.6)):
                ys = (sign * y0, sign * y1)
                corners = [(c0, ys[0]), (c1, ys[0]), (c1, ys[1]), (c0, ys[1])]
                if sign < 0:
                    corners = list(reversed(corners))
                vault(self.inside, corners, plan.VAULT_SPRING, plan.VAULT_CROWN, [33.0, 31.0, 33.0, 31.0],
                      boundary_ribs=(0, 2))
        apse = [station.at(-0.5) for station in apse_stations()]
        corners = [(p.x, p.y) for p in apse]
        vault(self.inside, corners, plan.VAULT_SPRING, plan.VAULT_CROWN, [plan.WALL_ARCH_APEX] * 5 + [33.0],
              crown_xy=(plan.APSE_CENTRE, 0.0))

    def crossing_piers(self):
        for x in plan.CROSSING:
            for y in (-plan.ARCADE, plan.ARCADE):
                column(self.inside, x, y, 1.05, plan.CAPITAL)
                for dx, dy in ((0.0, -0.95 * math.copysign(1, y)), (-0.95 * math.copysign(1, x), 0.0)):
                    self.inside.lathe([(0.24, plan.CAPITAL + 0.28), (0.24, plan.VAULT_SPRING - 0.4),
                                       (0.36, plan.VAULT_SPRING)], 8, STONE,
                                      matrix=Matrix.Translation((x + dx, y + dy, 0.0)), caps=False)

    def transept(self):
        c0, c1 = plan.CROSSING
        for x, sign_x in ((c0, -1), (c1, 1)):
            for sign in (-1, 1):
                start = Vector((x + sign_x * 0.5, sign * plan.ARCADE, 0.0))
                end = Vector((x + sign_x * 0.5, sign * (plan.CHAPEL + 0.6), 0.0))
                plane = Plane(start, end - start, plan.WALL)
                if plane.n.x * sign_x > 0:
                    plane.n = -plane.n
                length = (end - start).length
                openings = [pointed(0.55, plan.AISLE - plan.ARCADE - 0.45, 0.0, plan.CAPITAL, plan.ARCADE_APEX + 0.3),
                            pointed(plan.AISLE - plan.ARCADE + 0.45, plan.OUTER - plan.ARCADE + 0.2, 0.0, plan.CAPITAL,
                                    plan.ARCADE_APEX)]
                wall(self.inside, plane, length, 0.0, plan.TRIBUNE_FLOOR, openings, STONE, faces=(1,), top=False)
                trib = [pointed(0.6, plan.AISLE - plan.ARCADE - 0.5, plan.TRIBUNE_FLOOR + 0.9, 16.5, 18.6)]
                wall(self.inside, plane, length, plan.TRIBUNE_FLOOR, 21.2, trib, STONE, faces=(1,), top=False)
                lights = [pointed(2.6, 6.6, 21.8, 25.6, 29.8), pointed(10.4, 14.4, 21.8, 25.6, 29.8)]
                wall(self.inside, plane, length, 21.2, plan.WALL_TOP, lights, STONE, faces=(1,))
                wall(self.outside, plane, length, 12.6, plan.WALL_TOP, lights, OUTSIDE, faces=(-1,), top=False)
                for opening in lights:
                    self.window(self.inside, plane, opening, 25.6, 29.8)
            for sign in (-1, 1):
                if sign_x < 0:
                    continue
                y = sign * (plan.CHAPEL + 0.1)
                start = Vector((c0 - 0.5, y, 0.0))
                end = Vector((c1 + 0.5, y, 0.0))
                plane = Plane(start, end - start, 1.2)
                if plane.n.y * sign > 0:
                    plane.n = -plane.n
                length = (end - start).length
                rose_z, rose_r = plan.TRANSEPT_ROSE
                portal = pointed(length / 2 - 2.6, length / 2 + 2.6, 0.0, 5.0, 9.0)
                wall(self.inside, plane, length, 0.0, 14.2, [portal], STONE, faces=(1,), top=False, ends=True)
                wall(self.outside, plane, length, 0.0, 14.2, [portal], OUTSIDE, faces=(-1,), top=False)
                self.inside.oriented([plane.at(portal[0], 0.0, -0.6), plane.at(portal[1], 0.0, -0.6),
                                      plane.at(portal[1], 5.0, -0.6), plane.at(portal[0], 5.0, -0.6)], plane.n, DOOR)
                rose = circle(length / 2, rose_z, rose_r, 12)
                wall(self.inside, plane, length, 14.2, plan.WALL_TOP, [rose], STONE, faces=(1,))
                wall(self.outside, plane, length, 14.2, plan.WALL_TOP, [rose], OUTSIDE, faces=(-1,), top=False)
                rose_glass(self.roses, plane, length / 2, rose_z, rose_r)
                rose_tracery(self.inside, plane, length / 2, rose_z, rose_r, TRACERY)
                rose_tracery(self.outside, plane, length / 2, rose_z, rose_r, OUTSIDE)
                self.roses_info["sud" if sign < 0 else "nord"] = plane.at(length / 2, rose_z)
                gable = [plane.at(0.0, plan.WALL_TOP, -1), plane.at(length, plan.WALL_TOP, -1),
                         plane.at(length / 2, plan.RIDGE, -1)]
                self.outside.oriented(gable, -plane.n, OUTSIDE)
                self.floor.oriented([(c0, y, 0.0), (c1, y, 0.0), (c1, sign * plan.ARCADE, 0.0),
                                     (c0, sign * plan.ARCADE, 0.0)], UP, FLOOR)
        self.floor.oriented([(c0, -plan.ARCADE, 0.0), (c1, -plan.ARCADE, 0.0), (c1, plan.ARCADE, 0.0),
                             (c0, plan.ARCADE, 0.0)], UP, FLOOR)

    def tower_bay(self):
        x0, x1 = plan.FACADE_BACK, plan.TOWER_BAY_EAST
        for sign in (-1, 1):
            start = Vector((x0, sign * plan.ARCADE, 0.0))
            end = Vector((x1, sign * plan.ARCADE, 0.0))
            plane = Plane(start, end - start, plan.WALL)
            if plane.n.y * sign > 0:
                plane.n = -plane.n
            opening = pointed(1.2, 8.8, 0.0, 9.0, 15.5)
            wall(self.inside, plane, 10.0, 0.0, plan.WALL_TOP, [opening], STONE, faces=(1,), top=False)
            back = Plane(start + plane.n * -1.6, end - start, 0.2)
            self.inside.oriented([back.at(1.2, 0.0), back.at(8.8, 0.0), back.at(8.8, 15.5), back.at(1.2, 15.5)],
                                 plane.n, VOID)
            self.floor.oriented([(x0, sign * plan.ARCADE, 0.0), (x1, sign * plan.ARCADE, 0.0), (x1, 0.0, 0.0),
                                 (x0, 0.0, 0.0)], UP, FLOOR)
            aisle_end = Plane((x1 - 0.5, sign * (plan.ARCADE + 0.5)), (0.0, sign), 1.0)
            if aisle_end.n.x < 0:
                aisle_end.n = -aisle_end.n
            wall(self.inside, aisle_end, plan.CHAPEL - plan.ARCADE, 0.0, 21.2, [], STONE, faces=(1,), top=False)
        start = Vector((x0 - 1.5, -plan.ARCADE, 0.0))
        end = Vector((x0 - 1.5, plan.ARCADE, 0.0))
        plane = Plane(start, end - start, 3.0)
        if plane.n.x < 0:
            plane.n = -plane.n
        rose_z, rose_r = plan.WEST_ROSE
        portal = pointed(4.4, 8.6, 0.0, 6.0, 10.5)
        rose = circle(6.5, rose_z, rose_r, 12)
        wall(self.inside, plane, 13.0, 0.0, plan.WALL_TOP, [portal, rose], STONE, faces=(1,), top=False)
        rose_glass(self.roses, plane, 6.5, rose_z, rose_r, offset=0.6)
        rose_tracery(self.inside, plane, 6.5, rose_z, rose_r, TRACERY, spokes=12)
        self.inside.oriented([plane.at(4.4, 0.0, 0.2), plane.at(8.6, 0.0, 0.2), plane.at(8.6, 6.0, 0.2),
                              plane.at(4.4, 6.0, 0.2)], plane.n, DOOR)
        self.roses_info["ouest"] = plane.at(6.5, rose_z)

    def roofs(self):
        half = plan.ARCADE + 1.0
        x0, x1 = plan.FACADE_BACK - 0.5, plan.APSE_CENTRE
        for sign in (-1, 1):
            self.outside.oriented([(x0, sign * half, plan.WALL_TOP), (x1, sign * half, plan.WALL_TOP),
                                   (x1, 0.0, plan.RIDGE), (x0, 0.0, plan.RIDGE)], (0.0, sign, 1.0), LEAD)
        c0, c1 = plan.CROSSING
        for sign_x, x in ((-1, c0 - 0.5), (1, c1 + 0.5)):
            for sign in (-1, 1):
                far = sign * (plan.CHAPEL + 0.6)
                self.outside.oriented([(x, sign * half, plan.WALL_TOP), (x, far, plan.WALL_TOP), (0.0, far, plan.RIDGE),
                                       (0.0, sign * half, plan.RIDGE)], (sign_x, 0.0, 1.0), LEAD)
        apse = apse_stations()
        for first, second in zip(apse, apse[1:]):
            a, b = first.at(1.0), second.at(1.0)
            self.outside.oriented([(a.x, a.y, plan.WALL_TOP), (b.x, b.y, plan.WALL_TOP),
                                   (plan.APSE_CENTRE, 0.0, plan.RIDGE)], (a + b) / 2 - Vector((plan.APSE_CENTRE, 0, 0)) + Vector((0, 0, 3)), LEAD)

    def build(self):
        south = side_stations(plan.NAVE_PIERS, -1)
        north = side_stations(list(reversed(plan.NAVE_PIERS)), 1)
        choir_south = side_stations(plan.CHOIR_PIERS, -1)
        choir_north = side_stations(list(reversed(plan.CHOIR_PIERS)), 1)
        apse = apse_stations()
        for chain, kind in ((south, "nave"), (north, "nave"), (choir_south, "choir"), (choir_north, "choir")):
            for first, second in zip(chain, chain[1:]):
                self.bay(first, second, kind)
            for station in chain:
                if abs(abs(station.p.x) - plan.CROSSING[1]) > 0.1:
                    self.station(station, kind)
        for first, second in zip(apse, apse[1:]):
            self.bay(first, second, "choir")
        for station in apse[1:-1]:
            self.station(station, "choir")
        self.floor.oriented([(plan.NAVE_PIERS[0], -plan.ARCADE, 0.0), (plan.NAVE_PIERS[-1], -plan.ARCADE, 0.0),
                             (plan.NAVE_PIERS[-1], plan.ARCADE, 0.0), (plan.NAVE_PIERS[0], plan.ARCADE, 0.0)], UP, FLOOR)
        choir_floor = [(plan.CHOIR_PIERS[0], -plan.ARCADE), (plan.CHOIR_PIERS[-1], -plan.ARCADE)]
        choir_floor += [(s.p.x, s.p.y) for s in apse[1:-1]]
        choir_floor += [(plan.CHOIR_PIERS[-1], plan.ARCADE), (plan.CHOIR_PIERS[0], plan.ARCADE)]
        self.floor.oriented([(x, y, 0.0) for x, y in choir_floor], UP, MARBLE_FLOOR)
        self.main_vaults()
        self.crossing_piers()
        self.transept()
        self.tower_bay()
        self.roofs()
        return self

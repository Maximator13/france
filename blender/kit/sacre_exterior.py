import math

from mathutils import Matrix, Vector

from .geometry import UP, MeshBuilder
from . import sacre_plan as plan
from .sacre_gothic import OUTSIDE, ROSE, VOID, Plane, arch, bar, circle, pointed, polyline, rose_glass, rose_tracery, wall

GOLD = "or"
CANVAS = "toile"
VELVET = "velours"
GROUND = "ground_parvis"
PLAIN = "velours_uni"
WOOD = "bois"
CRIMSON = (0.62, 0.05, 0.1)
OCHRE = (0.98, 0.9, 0.74)


def facade(outside, glass):
    front = plan.FACADE_FRONT
    half = plan.FACADE_HALF
    plane = Plane((front + 0.6, half), (0.0, -1.0), 1.2)
    if plane.n.x > 0:
        plane.n = -plane.n
    length = 2 * half
    centre = half
    rose_z, rose_r = plan.WEST_ROSE
    side = 14.25
    openings = [pointed(centre - 3.3, centre + 3.3, 0.0, 7.0, 13.0), pointed(centre - side - 2.8, centre - side + 2.8, 0.0,
                                                                         6.5, 11.8),
                pointed(centre + side - 2.8, centre + side + 2.8, 0.0, 6.5, 11.8), circle(centre, rose_z, rose_r, 12),
                pointed(centre - side - 2.2, centre - side + 2.2, 24.0, 28.5, 32.0),
                pointed(centre + side - 2.2, centre + side + 2.2, 24.0, 28.5, 32.0)]
    wall(outside, plane, length, 0.0, plan.FACADE_TOP, openings, OUTSIDE, faces=(1,), top=True)
    for a, b, bottom, upper in openings:
        if bottom[0][1] == rose_z:
            continue
        back = [plane.at(u, z, -1.0) for u, z in bottom + list(reversed(upper))]
        outside.oriented(back, plane.n, "bois" if bottom[0][1] == 0.0 else VOID)
        for step in range(4):
            inset = 0.35 * (step + 1)
            polyline(outside, plane, arch(a - inset, b + inset, upper[0][1], upper[len(upper) // 2][1] + inset, 6),
                     0.25, 0.3, OUTSIDE, offset=1.0)
    rose_tracery(outside, plane, centre, rose_z, rose_r, OUTSIDE, spokes=12)
    for z0, z1 in ((17.2, 17.9), (21.2, 21.8), (32.6, 33.3), (44.4, 45.6)):
        outside.box((front - 0.5, -half, z0), (front + 0.2, half, z1), OUTSIDE)
    for k in range(28):
        u = 1.2 + k * (length - 2.4) / 27
        y = half - u
        outside.box((front - 0.12, y - 0.55, 17.9), (front + 0.05, y + 0.55, 21.0), VOID)
    for k in range(30):
        y = -half + 0.9 + k * (length - 1.8) / 29
        outside.box((front - 0.35, y - 0.12, 33.3), (front - 0.15, y + 0.12, 41.5), OUTSIDE)
    outside.box((front + 0.6, -half, 33.3), (front + 0.7, half, 41.5), VOID)
    for y in (-half, -plan.TOWER_INNER - 0.6, plan.TOWER_INNER + 0.6, half):
        sign = 1 if y > 0 else -1
        outside.box((front - 1.6, y - 1.0, 0.0), (front, y + 1.0, 44.4), OUTSIDE)
        outside.lathe([(1.0, 44.4), (0.0, 47.5)], 4, OUTSIDE, smooth=False, matrix=Matrix.Translation((front - 0.8, y, 0.0)))
    for sign in (-1, 1):
        y0, y1 = sorted((sign * plan.TOWER_INNER, sign * half))
        outside.box((front + 1.2, y0, 0.0), (plan.TOWER_BAY_EAST, y1, plan.FACADE_TOP), OUTSIDE, bottom=False)
        tower(outside, front, plan.TOWER_BAY_EAST, y0, y1)
    outside.box((plan.FACADE_BACK - 0.5, -plan.TOWER_INNER, plan.WALL_TOP), (plan.TOWER_BAY_EAST, plan.TOWER_INNER,
                                                                         plan.FACADE_TOP), OUTSIDE, bottom=False)
    rose_glass(glass, plane, centre, rose_z, rose_r, offset=-0.4)


def tower(outside, x0, x1, y0, y1):
    base = plan.FACADE_TOP
    top = plan.TOWER_TOP - 2.0
    corners = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
    for index in range(4):
        start, end = Vector(corners[index]), Vector(corners[(index + 1) % 4])
        plane = Plane(start, end - start, 1.0)
        centre = Vector(((x0 + x1) / 2, (y0 + y1) / 2))
        middle = (start + end) / 2 - centre
        if plane.n.dot(Vector((middle.x, middle.y, 0.0))) < 0:
            plane.n = -plane.n
        length = (end - start).length
        lancets = [pointed(length * 0.25 - 1.3, length * 0.25 + 1.3, base + 2.0, base + 12.5, base + 17.0),
                   pointed(length * 0.75 - 1.3, length * 0.75 + 1.3, base + 2.0, base + 12.5, base + 17.0)]
        wall(outside, plane, length, base, top, lancets, OUTSIDE, faces=(1,), top=False)
        for a, b, bottom, upper in lancets:
            outside.oriented([plane.at(u, z, -1.6) for u, z in bottom + list(reversed(upper))], plane.n, VOID)
            for k in range(6):
                z = base + 3.0 + k * 1.6
                bar(outside, plane.at(a, z, 0.0), plane.at(b, z, 0.0), 0.12, 0.5, UP, OUTSIDE)
    outside.box((x0, y0, top - 0.2), (x1, y1, top), OUTSIDE, bottom=False)
    for x, y in corners:
        outside.box((x - 0.9, y - 0.9, base), (x + 0.9, y + 0.9, plan.TOWER_TOP), OUTSIDE)
    for index in range(4):
        start, end = Vector(corners[index]), Vector(corners[(index + 1) % 4])
        for k in range(17):
            point = start.lerp(end, k / 16)
            outside.box((point.x - 0.1, point.y - 0.1, top), (point.x + 0.1, point.y + 0.1, top + 1.3), OUTSIDE)
        bar(outside, (start.x, start.y, top + 1.35), (end.x, end.y, top + 1.35), 0.25, 0.25, UP, OUTSIDE)


def banners(outside):
    for sign in (-1, 1):
        x = (plan.FACADE_FRONT + plan.TOWER_BAY_EAST) / 2
        y = sign * (plan.TOWER_INNER + plan.FACADE_HALF) / 2
        base = plan.TOWER_TOP
        outside.lathe([(0.12, base), (0.08, base + 14.0), (0.0, base + 14.2)], 6, WOOD, matrix=Matrix.Translation((x, y, 0.0)))
        outside.lathe([(0.0, base + 14.2), (0.25, base + 14.45), (0.0, base + 14.7)], 6, GOLD, matrix=Matrix.Translation((x, y, 0.0)))
        top, drop, length = base + 13.6, 2.4, 12.0
        flag = [(x, y, top), (x - length, y + sign * 0.6, top - 0.8), (x - length * 0.82, y + sign * 0.5, top - drop * 0.6),
                (x - length, y + sign * 0.6, top - drop - 0.6), (x, y, top - drop)]
        first = len(outside.polygons)
        outside.polygon(flag, PLAIN)
        outside.polygon(list(reversed(flag)), PLAIN)
        outside.tint(first, CRIMSON)
        centre = Vector((x - 2.2, y + sign * 0.12, top - drop / 2))
        for side in (-1, 1):
            outside.lathe([(0.0, -0.5), (0.5, 0.0), (0.0, 0.5)], 8, GOLD,
                          matrix=Matrix.Translation(centre + Vector((0, side * 0.03, 0))) @ Matrix.Rotation(math.pi / 2, 4, "X")
                          @ Matrix.Scale(0.2, 4, (0, 0, 1)))


def porch(decor):
    front = plan.FACADE_FRONT
    x0, x1 = front - 12.0, front - 0.2
    half = 13.0
    lower, upper, top = 10.5, 17.0, 17.0
    info = {"front": x0, "half": half, "statues": [], "figures": []}
    faces = [(Plane((x0, half), (0.0, -1.0), 0.8), 2 * half, Vector((-1.0, 0.0, 0.0)))]
    for sign in (-1, 1):
        start = Vector((x1, sign * half, 0.0)) if sign > 0 else Vector((x0, sign * half, 0.0))
        end = Vector((x0, sign * half, 0.0)) if sign > 0 else Vector((x1, sign * half, 0.0))
        faces.append((Plane(start, end - start, 0.8), (end - start).length, Vector((0.0, sign, 0.0))))
    for plane, length, outward in faces:
        if plane.n.dot(outward) < 0:
            plane.n = -plane.n
        middle = length / 2
        if length > 20:
            openings = [pointed(middle - 3.6, middle + 3.6, 0.0, 5.6, 10.0, 8), pointed(2.0, 6.0, 0.0, 4.4, 7.4),
                        pointed(length - 6.0, length - 2.0, 0.0, 4.4, 7.4)]
        else:
            openings = [pointed(middle - 2.4, middle + 2.4, 0.0, 4.4, 8.0)]
        wall(decor, plane, length, 0.0, lower, openings, OUTSIDE, inner=CANVAS, ends=True)
        for a, b, bottom, upper_curve in openings:
            for step in range(2):
                inset = 0.3 * (step + 1)
                polyline(decor, plane, arch(a - inset, b + inset, upper_curve[0][1], upper_curve[len(upper_curve) // 2][1] + inset, 6),
                         0.2, 0.25, GOLD if step == 0 else OUTSIDE, offset=1.2)
        if length > 20:
            a, b, bottom, upper_curve = openings[0]
            decor.oriented([plane.at(u, z, -3.0) for u, z in bottom + list(reversed(upper_curve))], plane.n, CANVAS)
        count = 7 if length > 20 else 4
        niches = []
        for k in range(count):
            centre = (k + 0.5) * length / count
            niches.append(pointed(centre - 0.75, centre + 0.75, lower + 1.2, lower + 4.2, lower + 5.2, 4))
        wall(decor, plane, length, lower, upper, niches, OUTSIDE, ends=True)
        for a, b, bottom, upper_curve in niches:
            decor.oriented([plane.at(u, z, -1.0) for u, z in bottom + list(reversed(upper_curve))], plane.n, VOID)
            spot = plane.at((a + b) / 2, lower + 1.2, -0.4)
            info["statues"].append((spot.x, spot.y, spot.z, math.atan2(plane.n.y, plane.n.x)))
        bar(decor, plane.at(0.0, lower, 1.3), plane.at(length, lower, 1.3), 0.35, 0.4, UP, GOLD)
        bar(decor, plane.at(0.0, upper, 1.3), plane.at(length, upper, 1.3), 0.3, 0.4, UP, OUTSIDE)
        for k in range(int(length / 0.55)):
            u = 0.3 + k * 0.55
            bar(decor, plane.at(u, upper + 0.15, 0.6), plane.at(u, upper + 1.0, 0.6), 0.12, 0.12, plane.n, OUTSIDE)
        bar(decor, plane.at(0.0, upper + 1.05, 0.6), plane.at(length, upper + 1.05, 0.6), 0.22, 0.3, UP, OUTSIDE)
    decor.polygon([(x0, -half, top), (x1, -half, top), (x1, half, top), (x0, half, top)], "plomb")
    for x in (x0, x1):
        for y in (-half, half):
            decor.lathe([(0.95, 0.0), (0.95, 18.0), (0.75, 18.4), (0.0, 22.0)], 8, OUTSIDE, smooth=False,
                        matrix=Matrix.Translation((x, y, 0.0)))
            decor.lathe([(0.35, 22.0), (0.3, 22.3)], 8, GOLD, matrix=Matrix.Translation((x, y, 0.0)))
            info["figures"].append((x, y, 22.3, math.atan2(-y, -1.0)))
    decor.oriented([(x0 + 0.5, -half, 0.02), (x1, -half, 0.02), (x1, half, 0.02), (x0 + 0.5, half, 0.02)], UP, "tapis_bleu")
    wreath_at = Vector((x0 - 0.65, 0.0, 12.5))
    ring = [wreath_at + Vector((0.0, 1.0 * math.cos(math.tau * k / 14), 1.0 * math.sin(math.tau * k / 14))) for k in range(14)]
    for first, second in zip(ring, ring[1:] + ring[:1]):
        bar(decor, first, second, 0.16, 0.12, Vector((-1.0, 0.0, 0.0)), GOLD)
    for sign in (-1, 1):
        y0, y1 = sorted((sign * (half + 0.5), sign * (plan.FACADE_HALF - 0.2)))
        plane = Plane((front - 3.5, y0), (0.0, 1.0), 0.5)
        if plane.n.x > 0:
            plane.n = -plane.n
        length = y1 - y0
        count = max(2, int(length / 2.2))
        arches = [pointed(k * length / count + 0.25, (k + 1) * length / count - 0.25, 0.0, 3.2, 4.4, 4) for k in range(count)]
        wall(decor, plane, length, 0.0, 5.6, arches, OUTSIDE, ends=True)
        for a, b, bottom, upper_curve in arches:
            first = len(decor.polygons)
            decor.oriented([plane.at(u, z, -2.0) for u, z in bottom + list(reversed(upper_curve))], plane.n, PLAIN)
            decor.tint(first, CRIMSON)
            centre = plane.at((a + b) / 2, 4.9, 1.1)
            decor.lathe([(0.0, -0.32), (0.32, 0.0), (0.0, 0.32)], 8, GOLD,
                        matrix=Matrix.Translation(centre) @ Matrix.Rotation(math.pi / 2, 4, "Y") @ Matrix.Scale(0.25, 4, (0, 0, 1)))
        decor.polygon([(front - 3.75, y0, 5.6), (front, y0, 5.6), (front, y1, 5.6), (front - 3.75, y1, 5.6)], "plomb")
    return info


def gallery(decor):
    front = plan.FACADE_FRONT
    path = [(front - 6.0, -13.4), (front - 6.0, -29.0), (24.0, -29.0)]
    width, height = 4.6, 6.0
    for start, end in zip(path, path[1:]):
        start, end = Vector(start), Vector(end)
        direction = (end - start).normalized()
        normal = Vector((-direction.y, direction.x))
        normal3 = Vector((normal.x, normal.y, 0.0))
        length = (end - start).length
        for sign in (-1, 1):
            plane = Plane(start + normal * sign * width / 2, end - start, 0.25)
            if plane.n.dot(normal3 * sign) < 0:
                plane.n = -plane.n
            count = max(1, int(length / 4.0))
            windows = [pointed(k * length / count + 0.9, (k + 1) * length / count - 0.9, 2.2, 3.6, 4.8, 3) for k in range(count)]
            first = len(decor.polygons)
            wall(decor, plane, length, 0.0, height, windows, OUTSIDE, inner="tapisserie")
            decor.tint(first, OCHRE)
            for a, b, bottom, upper_curve in windows:
                decor.oriented([plane.at(u, z, -1.0) for u, z in bottom + list(reversed(upper_curve))], plane.n, VOID)
        for sign in (-1, 1):
            left = start + normal * sign * (width / 2 + 0.4)
            right = end + normal * sign * (width / 2 + 0.4)
            decor.oriented([(left.x, left.y, height), (right.x, right.y, height), (end.x, end.y, height + 2.0),
                            (start.x, start.y, height + 2.0)], (normal.x * sign, normal.y * sign, 1.0), "plomb")
    centre = (32.0, -37.0)
    first = len(decor.polygons)
    decor.lathe([(9.0, 0.0), (9.0, 7.0)], 24, "tapisserie", smooth=False, matrix=Matrix.Translation((*centre, 0.0)), caps=False)
    decor.lathe([(9.4, 7.0), (9.4, 7.6), (0.0, 11.5)], 24, "plomb", smooth=False, matrix=Matrix.Translation((*centre, 0.0)), caps=False)
    for k in range(24):
        angle = math.tau * k / 24
        bar(decor, (centre[0] + 9.05 * math.cos(angle), centre[1] + 9.05 * math.sin(angle), 0.0),
            (centre[0] + 9.05 * math.cos(angle), centre[1] + 9.05 * math.sin(angle), 7.0), 0.25, 0.15,
            Vector((math.cos(angle), math.sin(angle), 0.0)), GOLD)
    decor.lathe([(0.25, 11.5), (0.25, 12.6), (0.0, 13.2)], 6, GOLD, matrix=Matrix.Translation((*centre, 0.0)))
    return {"path": path, "rotonde": centre}


def ground(builder):
    x0, x1, y0, y1 = -400.0, 300.0, -300.0, 300.0
    builder.polygon([(x0, y0, 0.0), (x1, y0, 0.0), (x1, y1, 0.0), (x0, y1, 0.0)], GROUND)
    for low, high in ((-150.0, -112.0), (98.0, 136.0)):
        builder.polygon([(x0, low, 0.05), (x1, low, 0.05), (x1, high, 0.05), (x0, high, 0.05)], "water")
        for edge in (low, high):
            builder.box((x0, edge - 0.6, -1.0), (x1, edge + 0.6, 0.6), OUTSIDE)
    first = len(builder.polygons)
    builder.polygon([(-142.0, -3.8, 0.02), (plan.FACADE_FRONT - 12.0, -3.8, 0.02), (plan.FACADE_FRONT - 12.0, 3.8, 0.02),
                     (-142.0, 3.8, 0.02)], "dallage")
    builder.tint(first, (0.62, 0.6, 0.58))
    return (x0, x1, y0, y1)


TONES = [(0.86, 0.80, 0.68), (0.80, 0.78, 0.74), (0.88, 0.84, 0.76), (0.76, 0.72, 0.66)]


def house(builder, x0, y0, x1, y1, height, front_axis, seed):
    tone = TONES[seed % len(TONES)]
    first = len(builder.polygons)
    ground_floor = 3.6
    builder.box((x0, y0, 0.0), (x1, y1, ground_floor), "maisons_rdc", bottom=False, top=False)
    builder.box((x0, y0, ground_floor), (x1, y1, height), "maisons", bottom=False, top=False)
    builder.box((x0 - 0.3, y0 - 0.3, height), (x1 + 0.3, y1 + 0.3, height + 0.4), "pierre", bottom=True, top=False)
    builder.tint(first, tone)
    roof_base = height + 0.4
    ridge = roof_base + 4.5 + (seed % 3)
    gable_first = len(builder.polygons)
    if front_axis == "x":
        middle = (y0 + y1) / 2
        builder.oriented([(x0, y0 - 0.3, roof_base), (x1, y0 - 0.3, roof_base), (x1, middle, ridge), (x0, middle, ridge)], (0, -1, 1), "toits")
        builder.oriented([(x1, y1 + 0.3, roof_base), (x0, y1 + 0.3, roof_base), (x0, middle, ridge), (x1, middle, ridge)], (0, 1, 1), "toits")
        gable_first = len(builder.polygons)
        builder.oriented([(x0, y0, roof_base), (x0, middle, ridge), (x0, y1, roof_base)], (-1, 0, 0), "pierre")
        builder.oriented([(x1, y0, roof_base), (x1, middle, ridge), (x1, y1, roof_base)], (1, 0, 0), "pierre")
        street = [(x, y0 - 0.3, 1) for x in frange(x0 + 2.0, x1 - 1.0, 4.0)]
        chimneys = [(x0 + 0.6, middle), (x1 - 0.6, middle)] + ([((x0 + x1) / 2, middle)] if x1 - x0 > 14 else [])
        slope = (ridge - roof_base) / max(middle - y0, 0.1)
    else:
        middle = (x0 + x1) / 2
        builder.oriented([(x0 - 0.3, y0, roof_base), (x0 - 0.3, y1, roof_base), (middle, y1, ridge), (middle, y0, ridge)], (-1, 0, 1), "toits")
        builder.oriented([(x1 + 0.3, y1, roof_base), (x1 + 0.3, y0, roof_base), (middle, y0, ridge), (middle, y1, ridge)], (1, 0, 1), "toits")
        gable_first = len(builder.polygons)
        builder.oriented([(x0, y0, roof_base), (middle, y0, ridge), (x1, y0, roof_base)], (0, -1, 0), "pierre")
        builder.oriented([(x0, y1, roof_base), (middle, y1, ridge), (x1, y1, roof_base)], (0, 1, 0), "pierre")
        street = [(x1 + 0.3, y, 0) for y in frange(y0 + 2.0, y1 - 1.0, 4.0)]
        chimneys = [(middle, y0 + 0.6), (middle, y1 - 0.6)]
        slope = (ridge - roof_base) / max(middle - x0, 0.1)
    builder.tint(gable_first, tone)
    for cx, cy in chimneys:
        first = len(builder.polygons)
        builder.box((cx - 0.4, cy - 0.25, ridge - 1.2), (cx + 0.4, cy + 0.25, ridge + 1.3), "pierre", bottom=False)
        builder.tint(first, (0.7, 0.6, 0.52))
    for a, b, along_x in street:
        if along_x:
            depth = 1.4
            z = roof_base + slope * 0.4
            builder.box((a - 0.6, b, z), (a + 0.6, b + depth, z + 1.6), "maisons", bottom=False)
            builder.oriented([(a - 0.7, b - 0.1, z + 1.6), (a + 0.7, b - 0.1, z + 1.6), (a + 0.7, b + depth, z + 2.3),
                              (a - 0.7, b + depth, z + 2.3)], (0, -1, 1), "toits")
        else:
            depth = 1.4
            z = roof_base + slope * 0.4
            builder.box((a - depth, b - 0.6, z), (a, b + 0.6, z + 1.6), "maisons", bottom=False)
            builder.oriented([(a + 0.1, b - 0.7, z + 1.6), (a + 0.1, b + 0.7, z + 1.6), (a - depth, b + 0.7, z + 2.3),
                              (a - depth, b - 0.7, z + 2.3)], (1, 0, 1), "toits")


def frange(start, stop, step):
    values = []
    value = start
    while value < stop:
        values.append(value)
        value += step
    return values


def city(builder):
    blocks = []
    x = -140.0
    seed = 0
    while x < -84.0:
        width = 9.0 + (seed * 7) % 6
        blocks.append((x, 34.0, x + width, 46.0, 15.0 + (seed * 5) % 7, "x"))
        x += width + 0.4
        seed += 1
    y = -44.0
    while y < 33.0:
        depth = 9.0 + (seed * 5) % 5
        blocks.append((-154.0, y, -142.0, y + depth, 16.0 + (seed * 3) % 6, "y"))
        y += depth + 0.4
        seed += 1
    x = -140.0
    while x < -84.0:
        width = 11.0 + (seed * 3) % 7
        blocks.append((x, -62.0, x + width, -44.0, 17.0, "x"))
        x += width + 0.3
        seed += 1
    blocks.append((-80.0, -95.0, -30.0, -72.0, 10.0, "x"))
    blocks.append((-70.0, 52.0, 40.0, 70.0, 14.0, "x"))
    blocks.append((10.0, -70.0, 70.0, -46.0, 16.0, "x"))
    for index, (x0, y0, x1, y1, height, axis) in enumerate(blocks):
        house(builder, x0, y0, x1, y1, height, axis, index)
    return blocks

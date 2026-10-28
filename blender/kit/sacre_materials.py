import math
import os

import bpy
import numpy as np

from .materials import generated_image, linear_color, principled_material, roof_flat_pixels

SIZE = 512


def noise(size, cells, seed, octaves=4):
    generator = np.random.default_rng(seed)
    total = np.zeros((size, size))
    amplitude = 1.0
    for octave in range(octaves):
        count = cells * 2 ** octave
        coarse = generator.random((count + 1, count + 1))
        coarse[-1, :] = coarse[0, :]
        coarse[:, -1] = coarse[:, 0]
        axis = np.linspace(0, count, size, endpoint=False)
        index = axis.astype(int)
        fraction = axis - index
        fraction = fraction * fraction * (3 - 2 * fraction)
        rows = coarse[index] * (1 - fraction)[:, None] + coarse[index + 1] * fraction[:, None]
        total += amplitude * (rows[:, index] * (1 - fraction)[None, :] + rows[:, index + 1] * fraction[None, :])
        amplitude *= 0.5
    return (total - total.min()) / max(total.max() - total.min(), 1e-6)


def coloured(colour, shade):
    return np.dstack([np.clip(colour[channel] * shade, 0, 1) for channel in range(3)])


def ashlar_pixels(colour, courses, blocks, joint, contrast, seed, spread=(0.94, 1.05)):
    grid = np.arange(SIZE)
    shade = 1.0 + (noise(SIZE, 6, seed) - 0.5) * contrast
    rows = (grid[:, None] * courses / SIZE)
    row_index = rows.astype(int)
    columns = grid[None, :] * blocks / SIZE + 0.5 * (row_index % 2)
    near_row = np.minimum(rows % 1.0, 1 - rows % 1.0) * SIZE / courses
    near_column = np.minimum(columns % 1.0, 1 - columns % 1.0) * SIZE / blocks
    mortar = (near_row < joint) | (near_column < joint)
    tone = np.random.default_rng(seed + 1).uniform(spread[0], spread[1], (courses + 1, blocks + 2))
    block_tone = tone[row_index % (courses + 1), (columns.astype(int)) % (blocks + 2)]
    shade = shade * block_tone * np.where(mortar, 0.86, 1.0)
    return coloured(colour, shade)


def bees_pixels(ground, gold, per_tile, seed=5, border=False):
    field = np.ones((SIZE, SIZE))
    pile = 1.0 + (noise(SIZE, 8, seed, 3) - 0.5) * 0.18
    image = coloured(ground, field * pile)
    step = SIZE / per_tile
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    mask = np.zeros((SIZE, SIZE))
    for row in range(per_tile):
        for column in range(per_tile):
            cx = (column + 0.5 * (row % 2) + 0.25) * step
            cy = (row + 0.5) * step
            for dx in (-SIZE, 0, SIZE):
                px, py = xx - cx - dx, yy - cy
                body = (px / (step * 0.07)) ** 2 + (py / (step * 0.16)) ** 2 < 1
                head = (px / (step * 0.06)) ** 2 + ((py + step * 0.17) / (step * 0.06)) ** 2 < 1
                wing_left = ((px + step * 0.1) / (step * 0.1)) ** 2 + ((py + step * 0.04) / (step * 0.06)) ** 2 < 1
                wing_right = ((px - step * 0.1) / (step * 0.1)) ** 2 + ((py + step * 0.04) / (step * 0.06)) ** 2 < 1
                mask = np.maximum(mask, (body | head | wing_left | wing_right).astype(float))
    if border:
        edge = np.minimum(yy, SIZE - 1 - yy)
        mask = np.maximum(mask, (edge < SIZE * 0.035).astype(float))
    for channel in range(3):
        image[..., channel] = image[..., channel] * (1 - mask) + gold[channel] * mask * pile
    return image


def checker_pixels():
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    squares = ((xx * 2 // SIZE) + (yy * 2 // SIZE)) % 2
    veins = noise(SIZE, 4, 21)
    marble = 0.9 + 0.1 * np.sin(veins * 22.0)
    white = coloured((0.93, 0.91, 0.87), marble)
    black = coloured((0.12, 0.11, 0.11), 0.8 + 0.4 * noise(SIZE, 5, 22))
    image = np.where(squares[..., None] == 0, white, black)
    joint = (np.minimum(xx % (SIZE // 2), SIZE // 2 - xx % (SIZE // 2)) < 1) | (
        np.minimum(yy % (SIZE // 2), SIZE // 2 - yy % (SIZE // 2)) < 1)
    return image * np.where(joint, 0.7, 1.0)[..., None]


def marble_pixels(colour, vein, seed):
    field = noise(SIZE, 3, seed, 5)
    pattern = np.abs(np.sin(field * 18.0 + noise(SIZE, 2, seed + 3) * 6.0))
    shade = np.clip(pattern ** 0.35, 0, 1)
    image = coloured(colour, 0.92 + 0.08 * shade)
    lines = (1 - shade) ** 6
    for channel in range(3):
        image[..., channel] = image[..., channel] * (1 - lines) + vein[channel] * lines
    return image


def quarries_pixels():
    yy, xx = np.mgrid[0:SIZE, 0:SIZE] / SIZE
    u, v = (xx + yy) * 4, (xx - yy) * 4
    lead = (np.minimum(u % 1, 1 - u % 1) < 0.035) | (np.minimum(v % 1, 1 - v % 1) < 0.035)
    tint = 1.0 + (noise(SIZE, 8, 31, 2) - 0.5) * 0.25
    image = coloured((0.88, 0.9, 0.86), tint)
    image[lead] = (0.12, 0.12, 0.13)
    return image


def rose_pixels():
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    x, y = (xx - SIZE / 2) / (SIZE / 2), (yy - SIZE / 2) / (SIZE / 2)
    radius = np.hypot(x, y)
    angle = (np.arctan2(y, x) / math.tau) % 1.0
    blue = np.array((0.05, 0.08, 0.32))
    image = np.zeros((SIZE, SIZE, 3)) + blue
    lead = np.zeros((SIZE, SIZE), dtype=bool)
    rings = [(0.0, 0.2, 1), (0.2, 0.42, 12), (0.42, 0.66, 24), (0.66, 0.86, 24), (0.86, 1.0, 48)]
    colours = [(0.75, 0.5, 0.12), (0.55, 0.04, 0.07), (0.1, 0.14, 0.45), (0.45, 0.05, 0.1), (0.35, 0.06, 0.3)]
    for index, (inner, outer, count) in enumerate(rings):
        band = (radius >= inner) & (radius < outer)
        cell = (angle * count) % 1.0
        middle = (inner + outer) / 2
        centre_distance = np.hypot((cell - 0.5) * math.tau * middle / count, (radius - middle))
        medallion = band & (centre_distance < (outer - inner) * 0.36)
        image[band] = blue * (0.85 + 0.3 * (index % 2))
        image[medallion] = colours[index]
        lead |= band & (np.abs(centre_distance - (outer - inner) * 0.36) < 0.016)
        lead |= band & (np.minimum(cell, 1 - cell) * math.tau * radius / count < 0.012) & (count > 1)
        lead |= np.abs(radius - outer) < 0.016
    cells = noise(SIZE, 32, 33, 1)
    image = image * (0.6 + 0.8 * cells)[..., None]
    image[lead] = (0.02, 0.02, 0.025)
    return np.clip(image, 0, 1)


def facade_pixels(ground=False):
    yy, xx = np.mgrid[0:SIZE, 0:SIZE] / SIZE
    yy = 1.0 - yy
    if ground:
        image = coloured((0.72, 0.68, 0.62), 0.88 + 0.12 * noise(SIZE, 4, 43))
        door = (np.abs(xx - 0.5) < 0.24) & (yy < 0.78)
        image[door] = (0.16, 0.12, 0.1)
        image[door & (yy > 0.62) & (np.abs(xx - 0.5) < 0.2)] = (0.12, 0.13, 0.15)
        band = np.abs(yy - 0.85) < 0.025
        image[band] = image[band] * 0.7
        return image
    image = coloured((0.92, 0.9, 0.86), 0.9 + 0.12 * noise(SIZE, 4, 41))
    window = (np.abs(xx - 0.5) < 0.16) & (yy > 0.2) & (yy < 0.78)
    frame = (np.abs(xx - 0.5) < 0.19) & (yy > 0.17) & (yy < 0.81) & ~window
    shutters = (np.abs(xx - 0.5) > 0.19) & (np.abs(xx - 0.5) < 0.3) & (yy > 0.2) & (yy < 0.78)
    sill = (yy > 0.12) & (yy < 0.17) & (np.abs(xx - 0.5) < 0.24)
    image[frame] = image[frame] * 0.78
    image[sill] = image[sill] * 0.75
    image[window] = (0.08, 0.09, 0.11)
    image[window & (np.abs(xx - 0.5) < 0.012)] = (0.6, 0.58, 0.54)
    image[window & (np.abs(yy - 0.52) < 0.01)] = (0.6, 0.58, 0.54)
    image[shutters] = (0.34, 0.38, 0.36)
    return image


def snow_roof_pixels():
    base = roof_flat_pixels((0.34, 0.35, 0.38))
    snow = noise(base.shape[0], 6, 71, 3)
    amount = np.clip((snow - 0.35) * 2.0, 0, 1)[..., None] * 0.6
    return base * (1 - amount) + np.array((0.88, 0.9, 0.94)) * amount


def snow_paving_pixels():
    base = ashlar_pixels((0.6, 0.58, 0.55), 6, 4, 1.8, 0.25, 13)
    snow = noise(SIZE, 5, 73, 4)
    amount = np.clip((snow - 0.45) * 2.5, 0, 1)[..., None] * 0.85
    return base * (1 - amount) + np.array((0.85, 0.87, 0.9)) * amount


def tapestry_pixels():
    field = noise(SIZE, 6, 81, 4)
    palette = np.array([(0.22, 0.3, 0.2), (0.45, 0.38, 0.24), (0.55, 0.2, 0.15), (0.28, 0.32, 0.42), (0.6, 0.52, 0.36)])
    index = np.clip((field * len(palette)).astype(int), 0, len(palette) - 1)
    image = palette[index] * (0.85 + 0.3 * noise(SIZE, 40, 82, 1))[..., None]
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    border = (np.minimum(xx, SIZE - 1 - xx) < 18) | (np.minimum(yy, SIZE - 1 - yy) < 18)
    image[border] = (0.62, 0.48, 0.22)
    return np.clip(image, 0, 1)


def plain_velvet_pixels():
    return coloured((1.0, 1.0, 1.0), 0.86 + 0.14 * noise(SIZE, 10, 91, 3))


def emissive(material, strength, image=None):
    shader = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    if image is not None:
        texture = next(node for node in material.node_tree.nodes if node.type == "TEX_IMAGE")
        material.node_tree.links.new(texture.outputs["Color"], shader.inputs["Emission Color"])
    else:
        shader.inputs["Emission Color"].default_value = shader.inputs["Base Color"].default_value
    shader.inputs["Emission Strength"].default_value = strength
    return material


def glow(material, colour, amount):
    shader = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Emission Color"].default_value = (*[c * amount for c in colour], 1.0)
    shader.inputs["Emission Strength"].default_value = 1.0
    return material


def textured(name, texture_dir, version, build, colour, roughness, tile, tiles, vertex_color=True, metallic=0.0):
    image = generated_image(name, os.path.join(texture_dir, f"{name}_{version}.jpg"), build)
    material = principled_material(name, linear_color(colour), roughness, metallic, image, vertex_color=vertex_color)
    tiles[name] = tile
    return material, image


def build(cache_dir):
    texture_dir = os.path.join(cache_dir, "textures")
    os.makedirs(texture_dir, exist_ok=True)
    tiles = {}
    textured("chaux", texture_dir, "v1", lambda: ashlar_pixels((0.92, 0.89, 0.81), 4, 2, 1.2, 0.08, 3),
             (0.92, 0.89, 0.81), 0.85, 2.0, tiles)
    textured("pierre", texture_dir, "v3", lambda: ashlar_pixels((0.84, 0.80, 0.72), 4, 2, 1.6, 0.12, 7, (0.97, 1.03)),
             (0.84, 0.80, 0.72), 0.9, 2.2, tiles)
    textured("remplage", texture_dir, "v1", lambda: ashlar_pixels((0.3, 0.28, 0.26), 4, 2, 1.2, 0.1, 5),
             (0.3, 0.28, 0.26), 0.9, 2.0, tiles)
    textured("dallage", texture_dir, "v1", lambda: ashlar_pixels((0.78, 0.74, 0.66), 3, 3, 1.4, 0.18, 11),
             (0.78, 0.74, 0.66), 0.7, 2.4, tiles)
    textured("ground_parvis", texture_dir, "v2", snow_paving_pixels, (0.75, 0.75, 0.75), 0.9, 4.0, tiles)
    textured("marbre_sol", texture_dir, "v1", checker_pixels, (1.0, 1.0, 1.0), 0.25, 1.4, tiles)
    textured("marbre", texture_dir, "v1", lambda: marble_pixels((0.93, 0.90, 0.86), (0.55, 0.42, 0.38), 51),
             (0.93, 0.90, 0.86), 0.3, 1.6, tiles)
    velvet, _ = textured("velours", texture_dir, "v2",
                         lambda: bees_pixels((0.50, 0.03, 0.07), (0.95, 0.72, 0.25), 2, 61),
                         (0.50, 0.03, 0.07), 0.75, 1.0, tiles)
    velvet.use_backface_culling = False
    plain, _ = textured("velours_uni", texture_dir, "v1", plain_velvet_pixels, (1.0, 1.0, 1.0), 0.8, 1.0, tiles)
    plain.use_backface_culling = False
    green, _ = textured("velours_vert", texture_dir, "v2",
                        lambda: bees_pixels((0.04, 0.24, 0.12), (0.95, 0.72, 0.25), 3, 62),
                        (0.04, 0.24, 0.12), 0.8, 1.6, tiles)
    green.use_backface_culling = False
    textured("tapis_bleu", texture_dir, "v1", lambda: bees_pixels((0.06, 0.12, 0.42), (0.95, 0.72, 0.25), 5, 64, border=True),
             (0.06, 0.12, 0.42), 0.8, 3.6, tiles)
    blue, _ = textured("toile", texture_dir, "v2", lambda: bees_pixels((0.08, 0.14, 0.42), (0.95, 0.75, 0.3), 2, 63),
                       (0.08, 0.14, 0.42), 0.8, 1.2, tiles)
    blue.use_backface_culling = False
    silk = principled_material("soie_blanche", linear_color((0.95, 0.93, 0.88)), 0.5)
    silk.use_backface_culling = False
    tiles["soie_blanche"] = 1.0
    textured("tapisserie", texture_dir, "v1", tapestry_pixels, (1.0, 1.0, 1.0), 0.9, 2.5, tiles)
    textured("maisons", texture_dir, "v2", facade_pixels, (1.0, 1.0, 1.0), 0.9, 3.2, tiles)
    textured("maisons_rdc", texture_dir, "v1", lambda: facade_pixels(True), (1.0, 1.0, 1.0), 0.9, 3.6, tiles)
    roof = generated_image("toits", os.path.join(texture_dir, "toits_v2.jpg"), snow_roof_pixels)
    principled_material("toits", linear_color((0.62, 0.63, 0.66)), 0.7, 0.0, roof)
    tiles["toits"] = 3.0
    principled_material("water", linear_color((0.16, 0.22, 0.24)), 0.1, vertex_color=False)
    tiles["water"] = 4.0
    glass, image = textured("verre", texture_dir, "v2", lambda: quarries_pixels() * np.array((0.86, 0.9, 0.95)) / 0.9,
                            (1.0, 1.0, 1.0), 0.2, 1.1, tiles, vertex_color=False)
    emissive(glass, 0.9, image)
    glass.use_backface_culling = False
    rose, image = textured("rosace", texture_dir, "v3", rose_pixels, (1.0, 1.0, 1.0), 0.2, 1.0, tiles,
                           vertex_color=False)
    emissive(rose, 1.8, image)
    rose.use_backface_culling = False
    gold = principled_material("or", linear_color((1.0, 0.74, 0.34)), 0.3, 1.0)
    glow(gold, linear_color((1.0, 0.74, 0.34)), 0.18)
    tiles["or"] = 1.0
    principled_material("plomb", linear_color((0.46, 0.50, 0.56)), 0.5, 0.35)
    tiles["plomb"] = 2.0
    principled_material("bois", linear_color((0.32, 0.20, 0.11)), 0.6)
    tiles["bois"] = 1.5
    principled_material("etain", linear_color((0.80, 0.81, 0.84)), 0.3, 1.0)
    tiles["etain"] = 1.0
    wax = principled_material("cire", linear_color((0.98, 0.95, 0.86)), 0.5)
    glow(wax, linear_color((1.0, 0.85, 0.6)), 0.35)
    flame = principled_material("flamme", linear_color((1.0, 0.62, 0.25)), 0.6, vertex_color=False)
    emissive(flame, 14.0)
    principled_material("matte", (1.0, 1.0, 1.0), 0.88)
    principled_material("shadow_void", linear_color((0.05, 0.045, 0.04)), 1.0)
    for name in ("matte", "shadow_void", "flamme", "cire", "plomb", "bois", "etain"):
        tiles.setdefault(name, 2.0)
    return tiles

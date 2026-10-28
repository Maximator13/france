import type { Era, EraId } from '../data/schema.ts'

export type Rgb = [number, number, number]

export interface Grading {
  exposure: number
  contrast: number
  saturation: number
  lift: Rgb
  gain: Rgb
  skyTop: Rgb
  skyHorizon: Rgb
  fog: Rgb
  sun: Rgb
  sunElevation: number
  accent: Rgb
}

export const ERA_GRADING: Record<EraId, Grading> = {
  merovingiens: {
    exposure: 0.94,
    contrast: 1.12,
    saturation: 1.18,
    lift: [0.04, 0.02, 0.0],
    gain: [1.14, 0.98, 0.8],
    skyTop: [0.18, 0.24, 0.42],
    skyHorizon: [0.96, 0.66, 0.36],
    fog: [0.62, 0.46, 0.32],
    sun: [1.0, 0.72, 0.42],
    sunElevation: 0.12,
    accent: [0.86, 0.62, 0.24],
  },
  carolingiens: {
    exposure: 0.98,
    contrast: 1.1,
    saturation: 1.2,
    lift: [0.03, 0.02, 0.01],
    gain: [1.1, 0.98, 0.84],
    skyTop: [0.2, 0.3, 0.52],
    skyHorizon: [0.94, 0.72, 0.46],
    fog: [0.7, 0.56, 0.42],
    sun: [1.0, 0.78, 0.5],
    sunElevation: 0.2,
    accent: [0.8, 0.5, 0.86],
  },
  capetiens: {
    exposure: 1.04,
    contrast: 1.1,
    saturation: 1.3,
    lift: [0.0, 0.01, 0.05],
    gain: [1.0, 1.0, 1.06],
    skyTop: [0.12, 0.3, 0.78],
    skyHorizon: [0.8, 0.84, 0.94],
    fog: [0.72, 0.78, 0.9],
    sun: [1.0, 0.94, 0.8],
    sunElevation: 0.45,
    accent: [0.4, 0.6, 0.98],
  },
  valois: {
    exposure: 1.02,
    contrast: 1.12,
    saturation: 1.28,
    lift: [0.04, 0.0, 0.01],
    gain: [1.1, 0.96, 0.9],
    skyTop: [0.22, 0.42, 0.78],
    skyHorizon: [0.98, 0.84, 0.66],
    fog: [0.84, 0.76, 0.66],
    sun: [1.0, 0.88, 0.66],
    sunElevation: 0.32,
    accent: [0.92, 0.36, 0.34],
  },
  bourbons: {
    exposure: 1.1,
    contrast: 1.08,
    saturation: 1.26,
    lift: [0.02, 0.01, 0.0],
    gain: [1.08, 1.02, 0.9],
    skyTop: [0.14, 0.44, 0.92],
    skyHorizon: [0.92, 0.9, 0.82],
    fog: [0.84, 0.86, 0.86],
    sun: [1.0, 0.94, 0.78],
    sunElevation: 0.7,
    accent: [0.95, 0.78, 0.32],
  },
  revolution: {
    exposure: 0.96,
    contrast: 1.2,
    saturation: 1.22,
    lift: [0.01, 0.01, 0.03],
    gain: [1.04, 0.98, 1.0],
    skyTop: [0.16, 0.22, 0.38],
    skyHorizon: [0.82, 0.62, 0.52],
    fog: [0.56, 0.54, 0.58],
    sun: [1.0, 0.8, 0.62],
    sunElevation: 0.22,
    accent: [0.95, 0.38, 0.36],
  },
  empire: {
    exposure: 1.08,
    contrast: 1.14,
    saturation: 1.3,
    lift: [0.0, 0.02, 0.01],
    gain: [1.1, 1.0, 0.86],
    skyTop: [0.16, 0.38, 0.82],
    skyHorizon: [1.0, 0.86, 0.56],
    fog: [0.86, 0.8, 0.66],
    sun: [1.0, 0.9, 0.62],
    sunElevation: 0.38,
    accent: [0.36, 0.8, 0.5],
  },
  exil: {
    exposure: 0.9,
    contrast: 1.12,
    saturation: 1.1,
    lift: [0.0, 0.02, 0.03],
    gain: [1.0, 0.98, 0.94],
    skyTop: [0.14, 0.26, 0.5],
    skyHorizon: [0.78, 0.7, 0.62],
    fog: [0.6, 0.62, 0.66],
    sun: [1.0, 0.82, 0.6],
    sunElevation: 0.15,
    accent: [0.56, 0.72, 0.6],
  },
}

export const SCENE_LOOK = { exposure: 1 }

const TRANSITION_YEARS = 20

function mix(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]
}

export function mixGrading(a: Grading, b: Grading, t: number): Grading {
  return {
    exposure: mix(a.exposure, b.exposure, t),
    contrast: mix(a.contrast, b.contrast, t),
    saturation: mix(a.saturation, b.saturation, t),
    lift: mixRgb(a.lift, b.lift, t),
    gain: mixRgb(a.gain, b.gain, t),
    skyTop: mixRgb(a.skyTop, b.skyTop, t),
    skyHorizon: mixRgb(a.skyHorizon, b.skyHorizon, t),
    fog: mixRgb(a.fog, b.fog, t),
    sun: mixRgb(a.sun, b.sun, t),
    sunElevation: mix(a.sunElevation, b.sunElevation, t),
    accent: mixRgb(a.accent, b.accent, t),
  }
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export function gradingAt(year: number, eras: Era[]): Grading {
  const ordered = [...eras].sort((a, b) => a.start - b.start)
  let grading = ERA_GRADING[ordered[0]!.id]
  for (const era of ordered.slice(1)) {
    const window = Math.min(TRANSITION_YEARS, (era.end - era.start) / 4)
    const t = smoothstep(era.start - window, era.start + window, year)
    grading = mixGrading(grading, ERA_GRADING[era.id], t)
  }
  return grading
}

export function rgbToCss([r, g, b]: Rgb): string {
  const channel = (value: number) => Math.round(Math.min(1, Math.max(0, value)) * 255)
  return `rgb(${channel(r)} ${channel(g)} ${channel(b)})`
}

export const BACKGROUND: Rgb = [0.047, 0.071, 0.098]

function relativeLuminance([r, g, b]: Rgb): number {
  const linear = (value: number) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (light! + 0.05) / (dark! + 0.05)
}

export function readableAccent(accent: Rgb): Rgb {
  return mixRgb(accent, [1, 1, 1], 0.4)
}

import { describe, expect, it } from 'vitest'
import { FIRST_YEAR, LAST_YEAR } from '../core/dates.ts'
import { eras } from '../data/eras.ts'
import { BACKGROUND, ERA_GRADING, contrastRatio, gradingAt, mixGrading, readableAccent, rgbToCss } from './grading.ts'

describe('gradingAt', () => {
  it('uses the era grading well inside an era', () => {
    expect(gradingAt(600, eras)).toEqual(ERA_GRADING.merovingiens)
    expect(gradingAt(1200, eras)).toEqual(ERA_GRADING.capetiens)
    expect(gradingAt(1690, eras)).toEqual(ERA_GRADING.bourbons)
  })

  it('blends two eras halfway at their boundary', () => {
    const boundary = gradingAt(1589, eras)
    const halfway = mixGrading(ERA_GRADING.valois, ERA_GRADING.bourbons, 0.5)
    expect(boundary.exposure).toBeCloseTo(halfway.exposure)
    expect(boundary.accent[0]).toBeCloseTo(halfway.accent[0])
  })

  it('moves monotonically across a boundary', () => {
    const values = [1550, 1570, 1589, 1605, 1625].map((year) => gradingAt(year, eras).exposure)
    const rising = values.every((value, index) => index === 0 || value >= values[index - 1]!)
    expect(rising).toBe(true)
  })
})

describe('rgbToCss', () => {
  it('clamps channels', () => {
    expect(rgbToCss([1.2, 0.5, -0.1])).toBe('rgb(255 128 0)')
  })
})

describe('readableAccent', () => {
  it('keeps text and markers readable on the dark background in every era and transition', () => {
    for (let year = FIRST_YEAR; year <= LAST_YEAR; year += 7) {
      const accent = readableAccent(gradingAt(year, eras).accent)
      expect(contrastRatio(accent, BACKGROUND)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('computes the reference contrast of black on white', () => {
    expect(contrastRatio([1, 1, 1], [0, 0, 0])).toBeCloseTo(21)
  })
})

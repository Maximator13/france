import { describe, expect, it } from 'vitest'
import { isJulianDate, republicanLabel, toRepublican } from './republican.ts'

describe('republican calendar', () => {
  it('starts on 22 September 1792', () => {
    expect(toRepublican(1792, 9, 22)).toEqual({ year: 1, month: 1, day: 1 })
    expect(toRepublican(1792, 9, 21)).toBeNull()
  })

  it('converts the reference dates', () => {
    expect(republicanLabel(1793, 1, 21)).toBe('2 pluviôse an I')
    expect(republicanLabel(1799, 11, 9)).toBe('18 brumaire an VIII')
    expect(republicanLabel(1802, 5, 20)).toBe('30 floréal an X')
    expect(republicanLabel(1804, 12, 2)).toBe('11 frimaire an XIII')
    expect(republicanLabel(1805, 12, 2)).toBe('11 frimaire an XIV')
    expect(republicanLabel(1794, 7, 27)).toBe('9 thermidor an II')
    expect(republicanLabel(1805, 12, 31)).toBe('10 nivôse an XIV')
  })

  it('handles the sixth complementary day of the year III', () => {
    expect(republicanLabel(1795, 9, 17)).toBe('jour de la Vertu an III')
    expect(republicanLabel(1795, 9, 22)).toBe('jour de la Révolution an III')
    expect(republicanLabel(1795, 9, 23)).toBe('1er vendémiaire an IV')
  })

  it('stops after 31 December 1805', () => {
    expect(republicanLabel(1806, 1, 1)).toBeNull()
  })

  it('needs a day', () => {
    expect(republicanLabel(1799, 11)).toBeNull()
  })
})

describe('julian dates', () => {
  it('switches after 9 December 1582', () => {
    expect(isJulianDate(1415, 10, 25)).toBe(true)
    expect(isJulianDate(1582, 12, 9)).toBe(true)
    expect(isJulianDate(1582, 12, 20)).toBe(false)
    expect(isJulianDate(1598, 4)).toBe(false)
  })
})

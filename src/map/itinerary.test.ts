import { describe, expect, it } from 'vitest'
import { itineraries } from '../data/itineraries.ts'
import { MAP_BOUNDS } from './geo.ts'
import { isItineraryShown, waypointTime } from './itinerary.ts'
import { LABEL_PRIORITY, resolveLabels, type LabelClaim } from './labelSpace.ts'

describe('waypoint time', () => {
  it('places a dated waypoint inside its day and an undated one mid-month or mid-year', () => {
    expect(waypointTime({ year: 1805, month: 12, day: 2 })).toBeCloseTo(1805 + (11 + 1.5 / 31) / 12)
    expect(waypointTime({ year: 1812, month: 6 })).toBeCloseTo(1812 + 5.5 / 12)
    expect(waypointTime({ year: 1799 })).toBe(1799.5)
    expect(waypointTime({ year: 1812, month: 11, day: 26 })).toBeLessThan(waypointTime({ year: 1812, month: 12, day: 5 }))
  })

  it('shows a campaign shortly before it starts and for a year after it ends', () => {
    expect(isItineraryShown(1805.6, 1806, 1805.2)).toBe(true)
    expect(isItineraryShown(1805.6, 1806, 1805)).toBe(false)
    expect(isItineraryShown(1805.6, 1806, 1806.9)).toBe(true)
    expect(isItineraryShown(1805.6, 1806, 1807.1)).toBe(false)
  })
})

describe('Napoleonic itineraries', () => {
  it('covers the five campaigns of the brief', () => {
    expect(itineraries.map((itinerary) => itinerary.id)).toEqual([
      'premiere-campagne-d-italie',
      'expedition-d-egypte',
      'campagne-de-1805',
      'campagne-de-russie',
      'vol-de-l-aigle',
    ])
  })

  it('keeps every itinerary dated in order, inside the map and within its years', () => {
    for (const itinerary of itineraries) {
      const times = itinerary.waypoints.map(waypointTime)
      times.forEach((time, index) => expect(time, `${itinerary.id} ${index}`).toBeGreaterThanOrEqual(times[index - 1] ?? -Infinity))
      for (const waypoint of itinerary.waypoints) {
        expect(waypoint.lon).toBeGreaterThanOrEqual(MAP_BOUNDS.west)
        expect(waypoint.lon).toBeLessThanOrEqual(MAP_BOUNDS.east)
        expect(waypoint.lat).toBeGreaterThanOrEqual(MAP_BOUNDS.south)
        expect(waypoint.lat).toBeLessThanOrEqual(MAP_BOUNDS.north)
        expect(waypoint.year).toBeGreaterThanOrEqual(itinerary.from)
        expect(waypoint.year).toBeLessThanOrEqual(itinerary.to)
        expect(waypoint.month, `${itinerary.id} ${waypoint.label}`).toBeDefined()
        expect(waypoint.label !== undefined || waypoint.certainty === 'debated', `${itinerary.id} unlabeled point must be marked approximate`).toBe(true)
      }
      expect(itinerary.sources.length).toBeGreaterThanOrEqual(3)
    }
  })

})

describe('label collisions', () => {
  const claim = (priority: number, order: number, left: number, top: number, right: number, bottom: number): LabelClaim => ({ priority, order, rect: { left, top, right, bottom } })

  it('hides the lower priority label of an overlapping pair and keeps distant ones', () => {
    const claims = new Map([
      ['city:poitiers', claim(LABEL_PRIORITY.city, 0, 100, 100, 160, 120)],
      ['territory:royaume', claim(LABEL_PRIORITY.territory, 1, 120, 110, 200, 130)],
      ['city:lyon', claim(LABEL_PRIORITY.city, 2, 400, 100, 440, 120)],
    ])
    expect([...resolveLabels(claims)]).toEqual(['city:poitiers'])
  })

  it('hides labels that fall under the interface panels', () => {
    const claims = new Map([['city:brest', claim(LABEL_PRIORITY.majorCity, 0, 10, 100, 60, 120)]])
    expect([...resolveLabels(claims, [{ left: 0, top: 0, right: 500, bottom: 900 }])]).toEqual(['city:brest'])
  })
})

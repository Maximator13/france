import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { tracks } from '../../src/data/tracks.ts'
import { MAP_BOUNDS } from '../../src/map/geo.ts'
import {
  HAND_DRAWN_FILE,
  HANSEATIC_ANNEXED,
  HOLLAND_ANNEXED,
  SIZE_TARGET,
  TERRITORIES_FILE,
  byTrackThenStart,
  handDrawnSchema,
  labelBox,
  placeLabel,
  planHandDrawn,
  cleanRing,
  mergedRuns,
  planTrack,
  sourceRows,
  territoriesSchema,
  toAstronomical,
  uncoveredYears,
  withAnnexations,
  withBridgedGaps,
  wrapLines,
} from './territories.ts'
import type { Plan, Row, Slice } from './territories.ts'

const text = readFileSync(TERRITORIES_FILE, 'utf8')
const { attribution, slices } = territoriesSchema.parse(JSON.parse(text))
const square: Row['geometry'] = { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] }
const row = (polity: string, from: number, to: number): Row => ({ polity, from, to, geometry: square })

describe('Cliopatria years', () => {
  it('reads negative years as historical BCE years and the filler year 0 as 1 BCE', () => {
    expect(toAstronomical(-753)).toBe(-752)
    expect(toAstronomical(-31)).toBe(-30)
    expect(toAstronomical(-1)).toBe(0)
    expect(toAstronomical(0)).toBe(0)
    expect(toAstronomical(1)).toBe(1)
    expect(toAstronomical(1453)).toBe(1453)
  })
})

describe('slice planning', () => {
  it('lets the later row win from its start and stretches the edges to the track span', () => {
    const plans = planTrack(
      'royaume',
      [{ start: -649, end: -167 }],
      [row('Argead', -646, -400), row('Argead', -399, -380), row('Antigonid', -399, -170)],
      [],
    )
    expect(plans.map(({ polity, from, to }) => [polity, from, to])).toEqual([
      ['Argead', -649, -400],
      ['Antigonid', -399, -167],
    ])
  })

  it('clamps rows to every span and leaves edges far from the span alone', () => {
    const plans = planTrack(
      'angleterre',
      [
        { start: -799, end: -500 },
        { start: -400, end: -85 },
      ],
      [row('Athens', -780, -499), row('Athens', -498, -480), row('Athens', -380, -60)],
      [],
    )
    expect(plans.map(({ from, to }) => [from, to])).toEqual([
      [-780, -500],
      [-380, -85],
    ])
  })

  it('moves the nearest row into a span that no row reaches', () => {
    const latest = { ...row('Thebans', -340, -338), geometry: { ...square } }
    const plans = planTrack('bourgogne', [{ start: -337, end: -334 }], [row('Thebans', -350, -345), latest], [])
    expect(plans.map(({ from, to }) => [from, to])).toEqual([[-337, -334]])
    expect(plans[0]?.rows[0]?.geometry).toBe(latest.geometry)
  })

  it('bridges gaps of at most ten years between rows of one polity with identical geometry', () => {
    const larger: Row = { ...row('Rhodes', -170, -165), geometry: { type: 'Polygon', coordinates: [[[0, 0], [2, 0], [2, 2], [0, 0]]] } }
    const rows = [row('Pergamon', -280, -250), row('Pergamon', -244, -230), row('Pergamon', -219, -200), row('Pergamon', -188, -180), row('Rhodes', -178, -175), larger]
    expect(withBridgedGaps(rows).map(({ polity, from, to }) => [polity, from, to])).toEqual([
      ['Pergamon', -280, -200],
      ['Pergamon', -188, -180],
      ['Rhodes', -178, -175],
      ['Rhodes', -170, -165],
    ])
    expect(rows[0]?.to).toBe(-250)
  })

  it('bridges such gaps on every track', () => {
    const rows = [row('Seleucid Empire', -311, -200), row('Seleucid Empire', -194, -62)]
    expect(planTrack('naples', [{ start: -311, end: -62 }], rows, []).map(({ from, to }) => [from, to])).toEqual([[-311, -62]])
  })

  it('splits a slice where merged territory joins it', () => {
    const plans = planTrack('espagne', [{ start: -335, end: -300 }], [row('Macedonian Empire', -335, -300)], [row('Ptolemaic Kingdom', -330, -323)])
    expect(plans.map(({ from, to, rows }) => [from, to, rows.map((part) => part.polity)])).toEqual([
      [-335, -331, ['Macedonian Empire']],
      [-330, -323, ['Macedonian Empire', 'Ptolemaic Kingdom']],
      [-322, -300, ['Macedonian Empire']],
    ])
  })
})

describe('hand-drawn territories', () => {
  it('unions the drawn shapes active together and cuts where one starts or ends', () => {
    const plans = planHandDrawn('angleterre', [row('Attique', -799, -85), row('Empire athénien', -477, -404)])
    expect(plans.map(({ polity, from, to }) => [polity, from, to])).toEqual([
      ['Attique', -799, -478],
      ['Attique et Empire athénien', -477, -404],
      ['Attique', -403, -85],
    ])
  })

  it('keeps every drawn shape inside its track span with sources', () => {
    if (!existsSync(HAND_DRAWN_FILE)) return
    const { features } = handDrawnSchema.parse(JSON.parse(readFileSync(HAND_DRAWN_FILE, 'utf8')))
    for (const { properties } of features) {
      const track = tracks.find((candidate) => candidate.id === properties.track)
      expect(track?.spans.some((span) => span.start <= properties.from && properties.to <= span.end), `${properties.track} ${properties.from}`).toBe(true)
    }
  })
})

describe('geometry cleaning', () => {
  it('rounds to two decimals, drops repeated points and closes the ring', () => {
    expect(cleanRing([[1.234, 2.001], [3.001, 2.004], [3.004, 4], [1.2, 4.001]])).toEqual([
      [1.23, 2],
      [3, 2],
      [3, 4],
      [1.2, 4],
      [1.23, 2],
    ])
  })

  it('rejects rings that collapse when rounded', () => {
    expect(cleanRing([[1, 1], [1.001, 1.001], [1.002, 1], [1, 1]])).toBeNull()
    expect(cleanRing([[0, 0], [1, 1], [2, 2], [0, 0]])).toBeNull()
  })

  it('joins consecutive identical slices of the same polity', () => {
    const base: Slice = { track: 'royaume', polity: 'Argead', from: -649, to: -600, bounds: [0, 0, 1, 1], label: [0.5, 0.5], polygons: [] }
    expect(mergedRuns([base, { ...base, from: -599, to: -400 }, { ...base, polity: 'Antigonid', from: -399, to: -380 }])).toEqual([
      { ...base, to: -400 },
      { ...base, polity: 'Antigonid', from: -399, to: -380 },
    ])
  })
})

describe('territories file', () => {
  it('credits Cliopatria under CC BY 4.0 and states the changes', () => {
    for (const part of ['J. S. Bennett, E. Mutch, A. Tollefson et al.', 'v0.2.1', 'https://github.com/Seshat-Global-History-Databank/cliopatria', 'CC BY 4.0', 'modifié']) {
      expect(attribution).toContain(part)
    }
  })

  it('stays within the size target', () => {
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(SIZE_TARGET)
  })

  it('keeps every slice inside the spans of a known track', () => {
    for (const slice of slices) {
      const track = tracks.find((candidate) => candidate.id === slice.track)
      expect(track, slice.track).toBeDefined()
      expect(slice.from).toBeLessThanOrEqual(slice.to)
      expect(track?.spans.some((span) => span.start <= slice.from && slice.to <= span.end), `${slice.track} ${slice.from}`).toBe(true)
    }
  })

  it('sorts slices by track then start and never overlaps two slices of one polity', () => {
    slices.forEach((slice, index) => {
      const previous = slices[index - 1]
      if (previous) expect(byTrackThenStart(previous, slice), `${slice.track} ${slice.from}`).toBeLessThanOrEqual(0)
      const twins = slices.filter((other) => other !== slice && other.track === slice.track && other.polity === slice.polity)
      const overlapping = twins.some((other) => (other.start ?? other.from) < (slice.end ?? slice.to + 1) && (slice.start ?? slice.from) < (other.end ?? other.to + 1))
      expect(overlapping, `${slice.track} ${slice.polity} ${slice.from}`).toBe(false)
    })
  })

  it('draws France over its whole span', () => {
    for (const track of tracks.filter((candidate) => candidate.id === 'royaume')) {
      const uncovered = track.spans.flatMap((span) => uncoveredYears(slices, [track.id], span.start, span.end))
      expect(uncovered, track.id).toEqual([])
    }
  })

  it('stores closed rings of at least four points inside the map bounds', () => {
    for (const slice of slices) {
      expect(slice.polygons.length, `${slice.track} ${slice.from}`).toBeGreaterThan(0)
      const [west, south, east, north] = slice.bounds
      for (const ring of slice.polygons.flat()) {
        expect(ring.length).toBeGreaterThanOrEqual(4)
        expect(ring.at(-1)).toEqual(ring[0])
        for (const [lon, lat] of ring) {
          expect(lon >= MAP_BOUNDS.west && lon <= MAP_BOUNDS.east && lat >= MAP_BOUNDS.south && lat <= MAP_BOUNDS.north).toBe(true)
          expect(lon >= west && lon <= east && lat >= south && lat <= north).toBe(true)
        }
      }
      expect(slice.label[0] >= west && slice.label[0] <= east && slice.label[1] >= south && slice.label[1] <= north).toBe(true)
    }
  })
})

const insideRing = ([lon, lat]: [number, number], ring: [number, number][]) => {
  let inside = false
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [x0, y0] = ring[index]!
    const [x1, y1] = ring[previous]!
    if (y0 > lat !== y1 > lat && lon < ((x1 - x0) * (lat - y0)) / (y1 - y0) + x0) inside = !inside
  }
  return inside
}

const tracksAt = (time: number, point: [number, number]) =>
  slices
    .filter((slice) => time >= (slice.start ?? slice.from) && time < (slice.end ?? slice.to + 1))
    .filter((slice) => slice.polygons.some((polygon) => polygon.filter((ring) => insideRing(point, ring)).length % 2 === 1))
    .map((slice) => slice.track)

describe('Napoleonic map corrections', () => {
  it('annexes Holland in July 1810 and the Hanseatic towns in December 1810', () => {
    const amsterdam: [number, number] = [4.9, 52.37]
    const hamburg: [number, number] = [9.99, 53.55]
    expect(tracksAt(1810.4, amsterdam)).toEqual(['hollande'])
    expect(tracksAt(HOLLAND_ANNEXED + 0.01, amsterdam)).toEqual(['royaume'])
    expect(tracksAt(HOLLAND_ANNEXED + 0.01, hamburg)).toEqual([])
    expect(tracksAt(HANSEATIC_ANNEXED + 0.01, hamburg)).toEqual(['royaume'])
    expect(tracksAt(1811.5, [10.69, 53.87])).toEqual(['royaume'])
  })

  it('keeps occupied countries out of the Empire and adds Catalonia in 1812', () => {
    const occupied: [number, number][] = [[16.37, 48.21], [13.4, 52.52], [37.62, 55.75], [-3.7, 40.42], [-8.61, 41.15]]
    for (const time of [1806.5, 1808.5, 1810.2, 1811.5, 1812.5]) {
      for (const point of occupied) expect(tracksAt(time, point), `${time} ${point.join(',')}`).not.toContain('royaume')
    }
    expect(tracksAt(1811.5, [2.25, 41.93])).toEqual(['espagne'])
    expect(tracksAt(1812.5, [2.25, 41.93])).toEqual(['royaume'])
  })

  it('draws the Confederation of the Rhine over southern and central Germany', () => {
    const members: [number, number][] = [[11.58, 48.14], [9.18, 48.78], [13.74, 51.05]]
    for (const member of members) expect(tracksAt(1808.5, member), member.join(',')).toContain('rhin')
    expect(tracksAt(1808.5, [20.5, 54.7])).not.toContain('rhin')
  })

  it('shows France whole in 1814', () => {
    expect(tracksAt(1814.5, [5.4, 48.6])).toEqual(['royaume'])
  })
})

describe('Napoleonic slice planning', () => {
  const other: Row['geometry'] = { type: 'Polygon', coordinates: [[[5, 5], [6, 5], [6, 6], [5, 5]]] }

  it('borrows the geometry of a chosen year and tags the rows with their cut', () => {
    const rows: Row[] = [
      { polity: 'Kingdom of Spain', from: 1803, to: 1808, geometry: square },
      { polity: 'Kingdom of Spain', from: 1809, to: 1810, geometry: other },
    ]
    const cut = { name: 'test' }
    const result = sourceRows(rows, { polity: 'Kingdom of Spain', track: 'espagne', from: 1808, to: 1810, shape: { polity: 'Kingdom of Spain', year: 1808 }, cut })
    expect(result.map((part) => [part.from, part.to, part.geometry === square, part.cut === cut])).toEqual([
      [1808, 1808, true, true],
      [1809, 1810, true, true],
    ])
  })

  it('cuts the 1810 slices at the dates of the annexations', () => {
    const plan = (track: Plan['track'], from: number, to: number): Plan => ({ track, polity: track, from, to, rows: [row(track, from, to)] })
    const result = withAnnexations([plan('royaume', 1809, 1810), plan('royaume', 1811, 1811), plan('hollande', 1809, 1810)])
    expect(result.map(({ track, from, start, end, rows }) => [track, from, start, end, rows.length])).toEqual([
      ['royaume', 1809, undefined, HOLLAND_ANNEXED, 1],
      ['royaume', 1811, undefined, undefined, 1],
      ['hollande', 1809, undefined, HOLLAND_ANNEXED, 1],
      ['royaume', 1810, HOLLAND_ANNEXED, HANSEATIC_ANNEXED, 2],
      ['royaume', 1810, HANSEATIC_ANNEXED, 1811, 1],
    ])
  })

  it('joins a dated slice with the identical next one and keeps the later end', () => {
    const base: Slice = { track: 'royaume', polity: 'Empire', from: 1810, to: 1810, start: 1810.95, end: 1811, bounds: [0, 0, 1, 1], label: [0.5, 0.5], polygons: [] }
    const next: Slice = { track: 'royaume', polity: 'Empire', from: 1811, to: 1811, bounds: [0, 0, 1, 1], label: [0.5, 0.5], polygons: [] }
    const [merged, ...rest] = mergedRuns([base, next])
    expect(rest).toEqual([])
    expect([merged?.start, merged?.to, merged?.end]).toEqual([1810.95, 1811, undefined])
  })
})

describe('territory labels', () => {
  it('wraps long names on lines of thirteen characters', () => {
    expect(wrapLines('ESPAGNE DE JOSEPH BONAPARTE')).toEqual(['ESPAGNE DE', 'JOSEPH', 'BONAPARTE'])
    expect(wrapLines('FRANCE')).toEqual(['FRANCE'])
  })

  it('moves a label off a city name while staying inside its territory', () => {
    const polygons: [number, number][][][] = [[[[-4, 43], [8, 43], [8, 51], [-4, 51], [-4, 43]]]]
    const poitiers: [number, number, number, number] = [-0.5, 46.4, 1.2, 47.4]
    const label = placeLabel(polygons, [0.3, 46.8], { text: 'FRANCE', obstacles: [poitiers], scale: 1, frame: [-5, 41, 10, 52] })
    const box = labelBox(label, 'FRANCE', 1)
    expect(box[2] <= poitiers[0] || box[0] >= poitiers[2] || box[3] <= poitiers[1] || box[1] >= poitiers[3]).toBe(true)
    expect(label[0] > -4 && label[0] < 8 && label[1] > 43 && label[1] < 51).toBe(true)
  })
})

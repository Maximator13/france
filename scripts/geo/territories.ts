import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { z } from 'zod'
import { fromHistorical } from '../../src/core/dates.ts'
import { TRACK_IDS } from '../../src/data/schema.ts'
import type { Track, TrackId } from '../../src/data/schema.ts'
import { tracks } from '../../src/data/tracks.ts'
import { cities } from '../../src/data/cities.ts'
import { frameAt } from '../../src/map/camera.ts'
import { MAP_BOUNDS } from '../../src/map/geo.ts'

const RELEASE = 'v0.2.1'
const REPOSITORY = 'https://github.com/Seshat-Global-History-Databank/cliopatria'
const ARCHIVE_URL = `https://raw.githubusercontent.com/Seshat-Global-History-Databank/cliopatria/${RELEASE}/cliopatria.geojson.zip`
const ARCHIVE_SHA256 = 'e10a4e429fca708788ff9e7572a95fce801fae55852d217cffabc1c59cd4eed4'
const CACHE = `.cache/geo/cliopatria-${RELEASE}`
export const TERRITORIES_FILE = 'public/geo/territories.json'
export const HAND_DRAWN_FILE = 'scripts/geo/hand-drawn.json'
export const SIZE_TARGET = 900_000
const ALIGN_YEARS = 5
const BRIDGE_YEARS = 10
const SIMPLIFY_METERS = 9_000
const SMALL_RING_METERS = 4_000
const SMALL_RING_AREA = 5e9
const MIN_ISLAND = '100km2'
const CUT_MIN_ISLAND = '1500km2'

interface Mapshaper {
  applyCommands(commands: string, input?: Record<string, string>): Promise<Record<string, string | Uint8Array>>
}

const mapshaper: Mapshaper = createRequire(import.meta.url)('mapshaper')

export const ATTRIBUTION = `J. S. Bennett, E. Mutch, A. Tollefson et al., Cliopatria ${RELEASE} (Seshat Global History Databank), ${REPOSITORY}, licence CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), modifié (extraction des entités franques, françaises, anglaises, bourguignonnes et napoléoniennes, simplification, dates alignées sur le projet, royaume de Naples napoléonien coupé avant 1806, Angleterre normande jointe à l'Empire angevin de 1147 à 1168, République batave et République italienne prises pour les royaumes de Hollande et d'Italie qui leur succèdent, Empire réduit aux départements annexés (sans les pays occupés : péninsule Ibérique, Hanovre, Autriche, Prusse, Russie), annexions de la Hollande et des villes hanséatiques datées au jour en 1810, Catalogne annexée en 1812, Confédération du Rhin recomposée à partir de ses États membres, royaume d'Espagne de Joseph Bonaparte tracé sur les frontières de 1808)`

type Box = [west: number, south: number, east: number, north: number]
type LonLatRing = [number, number][]

export interface Cut {
  name: string
  boxes?: Box[]
  rings?: LonLatRing[]
  shapes?: { polity: string; year: number }[]
  except?: LonLatRing
}

interface Source {
  polity: string
  track: TrackId
  merge?: boolean
  from?: number
  to?: number
  cut?: Cut
  shape?: { polity: string; year: number }
}

const SPAIN_1808 = { polity: 'Kingdom of Spain', year: 1808 }
const IBERIA = [
  SPAIN_1808,
  { polity: 'Kingdom of Portugal', year: 1806 },
]
const CATALONIA: LonLatRing = [
  [0.72, 42.86], [0.66, 42.5], [0.45, 42.1], [0.35, 41.8], [0.33, 41.5], [0.4, 41.25], [0.25, 41.05], [0.18, 40.75],
  [0.52, 40.52], [2.5, 40.3], [4.5, 41.2], [4.5, 43.4], [0.72, 43.4], [0.72, 42.86],
]
const EAST_OF_LIGURIA: Box = [10.6, 27, 40, 58]
const EAST_OF_TUSCANY: Box = [12.5, 27, 40, 58]
const RIGHT_BANK: Box = [8.6, 47.6, 40, 58]
const HANOVER: Box = [7.2, 51.87, 40, 58]
const HANOVER_AFTER_HOLLAND: Box = [8.0, 51.87, 40, 58]
const AUSTRIA: Box = [10.6, 47.0, 40, 58]
const BALTIC_AND_RUSSIA: Box = [11.5, 47.2, 40, 58]
const EMPIRE_1805: Cut = { name: 'empire-1805', boxes: [EAST_OF_LIGURIA, HANOVER, RIGHT_BANK] }
const EMPIRE_1807: Cut = { name: 'empire-1807', boxes: [EAST_OF_TUSCANY, HANOVER, RIGHT_BANK] }
const EMPIRE_1809: Cut = { name: 'empire-1809', boxes: [AUSTRIA, HANOVER_AFTER_HOLLAND, RIGHT_BANK], shapes: IBERIA }
const EMPIRE_1811: Cut = { name: 'empire-1811', boxes: [BALTIC_AND_RUSSIA], shapes: IBERIA }
const EMPIRE_1812: Cut = { name: 'empire-1812', boxes: [BALTIC_AND_RUSSIA], shapes: IBERIA, except: CATALONIA }
const RESTORATION: Cut = { name: 'restoration', boxes: [[12, 27, 40, 58]] }
const SPAIN_AFTER_CATALONIA: Cut = { name: 'spain-1812', rings: [CATALONIA] }
const BERG_BOXES: Box[] = [[8.75, 27, 40, 58], [-12, 52.5, 40, 58], [-12, 27, 40, 50.5], [-12, 27, 6.2, 58]]
const BERG: Cut = { name: 'berg', boxes: BERG_BOXES }
const BERG_1811: Cut = { name: 'berg-1811', boxes: [...BERG_BOXES, [-12, 51.55, 40, 58]] }
const RHINE_MEMBERS = [
  'Kingdom of Württemberg',
  'Kingdom of Saxony',
  'Grand Duchy of Baden',
  'Grand Duchy of Hesse',
  'Grand Duchy of Würzburg',
  'Duchy of Nassau',
  'Grand Duchy of Saxe-Weimar-Eisenach',
  'Saxe-Altenburg',
  'Duchy of Anhalt',
  'Principality of Lippe',
  'Principality of Waldeck and Pyrmont',
  'Principality of Reuss-Gera',
  'Principality of Hohenzollern-Sigmaringen',
  'Duchy of Mecklenburg',
  'Principality of Regensberg',
]
export const HOLLAND_ANNEXED = 1810 + 189 / 365
export const HANSEATIC_ANNEXED = 1810 + 346 / 365

const SOURCES: Source[] = [
  { polity: 'Kingdom of the Franks', track: 'royaume', to: 849 },
  { polity: 'West Franks', track: 'royaume' },
  { polity: '(Kingdom of France)', track: 'royaume' },
  { polity: 'French First Republic', track: 'royaume' },
  { polity: 'French Directory', track: 'royaume' },
  { polity: 'French Consulate', track: 'royaume' },
  { polity: 'First French Empire', track: 'royaume', to: 1806, cut: EMPIRE_1805 },
  { polity: 'First French Empire', track: 'royaume', from: 1807, to: 1808, cut: EMPIRE_1807 },
  { polity: 'First French Empire', track: 'royaume', from: 1809, to: 1810, cut: EMPIRE_1809 },
  { polity: 'First French Empire', track: 'royaume', from: 1811, to: 1811, cut: EMPIRE_1811 },
  { polity: 'First French Empire', track: 'royaume', from: 1812, to: 1813, cut: EMPIRE_1812 },
  { polity: 'First French Empire', track: 'royaume', from: 1814, shape: { polity: 'Bourbon Kingdom of France', year: 1815 }, cut: RESTORATION },
  { polity: 'Bourbon Kingdom of France', track: 'royaume', cut: RESTORATION },
  { polity: 'Norman England', track: 'angleterre', to: 1146 },
  { polity: 'Norman England', track: 'angleterre', merge: true, from: 1147 },
  { polity: 'Angevin Empire', track: 'angleterre' },
  { polity: 'Kingdom of England', track: 'angleterre', from: 1210 },
  { polity: 'Duchy of Burgundy', track: 'bourgogne', from: 1363 },
  { polity: 'Italian Republic', track: 'italie', from: 1805 },
  { polity: 'Kingdom of Naples (Napoleonic)', track: 'naples', from: 1806 },
  { polity: 'Batavian Republic', track: 'hollande', from: 1806 },
  { polity: 'Kingdom of Bavaria', track: 'rhin', from: 1806, to: 1813 },
  ...RHINE_MEMBERS.map((polity): Source => ({ polity, track: 'rhin', merge: true, from: 1806, to: 1813 })),
  { polity: 'Grand Duchy of Berg', track: 'rhin', merge: true, from: 1806, to: 1810, cut: BERG },
  { polity: 'Grand Duchy of Berg', track: 'rhin', merge: true, from: 1811, to: 1813, shape: { polity: 'Grand Duchy of Berg', year: 1810 }, cut: BERG_1811 },
  { polity: 'Kingdom of Westphalia', track: 'westphalie' },
  { polity: 'Duchy of Warsaw', track: 'varsovie' },
  { polity: 'Kingdom of Spain', track: 'espagne', from: 1808, to: 1811, shape: SPAIN_1808 },
  { polity: 'Kingdom of Spain', track: 'espagne', from: 1812, to: 1813, shape: SPAIN_1808, cut: SPAIN_AFTER_CATALONIA },
]

const position = z.tuple([z.number(), z.number()]).rest(z.number())
const geometrySchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('Polygon'), coordinates: z.array(z.array(position)) }),
  z.object({ type: z.literal('MultiPolygon'), coordinates: z.array(z.array(z.array(position))) }),
])
const cliopatriaSchema = z.object({
  features: z.array(
    z.object({
      properties: z.object({ Name: z.string(), FromYear: z.number().int(), ToYear: z.number().int(), Type: z.string() }),
      geometry: geometrySchema,
    }),
  ),
})
export const handDrawnSchema = z.object({
  features: z.array(
    z.object({
      properties: z.strictObject({
        track: z.enum(TRACK_IDS),
        polity: z.string().min(1),
        from: z.number().int(),
        to: z.number().int(),
        sources: z.array(z.string().min(1)).min(1),
        note: z.string().min(1),
      }),
      geometry: geometrySchema,
    }),
  ),
})
const simplifiedSchema = z.object({ features: z.array(z.object({ geometry: geometrySchema.nullable() })) })
const pointSchema = z.object({ features: z.array(z.object({ geometry: z.object({ type: z.literal('Point'), coordinates: position }) })).min(1) })

const lonLat = z.tuple([z.number(), z.number()])
export const territoriesSchema = z.strictObject({
  attribution: z.string(),
  slices: z.array(
    z.strictObject({
      track: z.enum(TRACK_IDS),
      polity: z.string(),
      from: z.number().int(),
      to: z.number().int(),
      start: z.number().optional(),
      end: z.number().optional(),
      bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]),
      label: lonLat,
      polygons: z.array(z.array(z.array(lonLat))),
    }),
  ),
})

type Geometry = z.infer<typeof geometrySchema>
type LonLat = z.infer<typeof lonLat>
export type Slice = z.infer<typeof territoriesSchema>['slices'][number]

export interface Row {
  polity: string
  from: number
  to: number
  geometry: Geometry
  cut?: Cut
}

export interface Plan {
  track: TrackId
  polity: string
  from: number
  to: number
  rows: Row[]
  drawn?: boolean
  start?: number
  end?: number
}

interface Span {
  start: number
  end: number
}

export function toAstronomical(cliopatriaYear: number): number {
  return cliopatriaYear < 0 ? fromHistorical(-cliopatriaYear, 'bc') : cliopatriaYear
}

function windowed(rows: Row[], { from = -Infinity, to = Infinity }: { from?: number; to?: number }): Row[] {
  return rows.map((row) => ({ ...row, from: Math.max(row.from, from), to: Math.min(row.to, to) })).filter((row) => row.from <= row.to)
}

function withoutOverlaps(rows: Row[]): Row[] {
  const sorted = rows.toSorted((a, b) => a.from - b.from)
  return sorted
    .map((row, index) => ({ ...row, to: Math.min(row.to, (sorted[index + 1]?.from ?? Infinity) - 1) }))
    .filter((row) => row.from <= row.to)
}

function distance(row: Row, span: Span): number {
  return Math.max(span.start - row.to, row.from - span.end)
}

function alignedToSpan(rows: Row[], span: Span): Row[] {
  const inside = rows
    .filter((row) => row.to >= span.start && row.from <= span.end)
    .map((row) => ({ ...row, from: Math.max(row.from, span.start), to: Math.min(row.to, span.end) }))
  const first = inside[0]
  const last = inside.at(-1)
  if (!first || !last) {
    const nearest = rows.filter((row) => distance(row, span) <= ALIGN_YEARS).toSorted((a, b) => distance(a, span) - distance(b, span))[0]
    return nearest ? [{ ...nearest, from: span.start, to: span.end }] : []
  }
  if (first.from - span.start <= ALIGN_YEARS) first.from = span.start
  if (span.end - last.to <= ALIGN_YEARS) last.to = span.end
  return inside
}

function splitByMerges(track: TrackId, row: Row, merges: Row[]): Plan[] {
  const overlapping = merges.filter((merge) => merge.to >= row.from && merge.from <= row.to)
  const cuts = [...new Set([row.from, ...overlapping.flatMap((merge) => [merge.from, merge.to + 1])])]
    .filter((year) => year >= row.from && year <= row.to)
    .sort((a, b) => a - b)
  return cuts.map((from, index) => ({
    track,
    polity: row.polity,
    from,
    to: (cuts[index + 1] ?? row.to + 1) - 1,
    rows: [row, ...overlapping.filter((merge) => merge.from <= from && merge.to >= from)],
  }))
}

export function withBridgedGaps(rows: Row[]): Row[] {
  const result: Row[] = []
  for (const row of rows) {
    const previous = result.at(-1)
    const bridged =
      previous &&
      previous.polity === row.polity &&
      previous.cut === row.cut &&
      row.from - previous.to - 1 <= BRIDGE_YEARS &&
      JSON.stringify(previous.geometry) === JSON.stringify(row.geometry)
    if (bridged) previous.to = row.to
    else result.push({ ...row })
  }
  return result
}

export function planTrack(track: TrackId, spans: Span[], primary: Row[], merges: Row[]): Plan[] {
  const resolved = withoutOverlaps(primary)
  return spans
    .map((span) => alignedToSpan(resolved, span))
    .flatMap(withBridgedGaps)
    .flatMap((row) => splitByMerges(track, row, merges))
}

export function rowAt(rows: Row[], polity: string, year: number): Row {
  const found = rows.find((row) => row.polity === polity && row.from <= year && row.to >= year)
  if (!found) throw new Error(`No ${polity} row in ${year}`)
  return found
}

export function sourceRows(rows: Row[], source: Source): Row[] {
  const own = rows.filter((row) => row.polity === source.polity)
  const frozen = source.shape ? own.map((row) => ({ ...row, geometry: rowAt(rows, source.shape!.polity, source.shape!.year).geometry })) : own
  return windowed(frozen, source).map((row) => (source.cut ? { ...row, cut: source.cut } : row))
}

export function planSlices(rows: Row[]): Plan[] {
  const plan = (track: Track) => {
    const sourcesOf = (merge: boolean) =>
      SOURCES.filter((source) => source.track === track.id && (source.merge ?? false) === merge).flatMap((source) => sourceRows(rows, source))
    return planTrack(track.id, track.spans, sourcesOf(false), sourcesOf(true))
  }
  return tracks.flatMap(plan)
}

function planAt(plans: Plan[], track: TrackId, year: number): Plan {
  const found = plans.find((plan) => plan.track === track && plan.from <= year && plan.to >= year)
  if (!found) throw new Error(`No ${track} slice in ${year}`)
  return found
}

export function withAnnexations(plans: Plan[]): Plan[] {
  const empire = planAt(plans, 'royaume', 1810)
  const holland = planAt(plans, 'hollande', 1810)
  const enlarged = planAt(plans, 'royaume', 1811)
  if (empire.to !== 1810 || holland.to !== 1810) throw new Error('The 1810 annexations expect slices ending in 1810')
  empire.end = HOLLAND_ANNEXED
  holland.end = HOLLAND_ANNEXED
  return [
    ...plans,
    { track: 'royaume', polity: empire.polity, from: 1810, to: 1810, start: HOLLAND_ANNEXED, end: HANSEATIC_ANNEXED, rows: [...empire.rows, ...holland.rows] },
    { track: 'royaume', polity: enlarged.polity, from: 1810, to: 1810, start: HANSEATIC_ANNEXED, end: 1811, rows: enlarged.rows },
  ]
}

export function planHandDrawn(track: TrackId, rows: Row[]): Plan[] {
  const cuts = [...new Set(rows.flatMap((row) => [row.from, row.to + 1]))].sort((a, b) => a - b)
  return cuts.slice(0, -1).flatMap((from, index) => {
    const to = (cuts[index + 1] ?? from + 1) - 1
    const active = rows.filter((row) => row.from <= from && row.to >= to)
    return active.length === 0 ? [] : [{ track, polity: active.map((row) => row.polity).join(' et '), from, to, rows: active, drawn: true }]
  })
}

function readHandDrawn(): Plan[] {
  if (!existsSync(HAND_DRAWN_FILE)) return []
  const { features } = handDrawnSchema.parse(JSON.parse(readFileSync(HAND_DRAWN_FILE, 'utf8')))
  return tracks.flatMap((track) =>
    planHandDrawn(
      track.id,
      features
        .filter((feature) => feature.properties.track === track.id)
        .map(({ properties, geometry }) => ({ polity: properties.polity, from: properties.from, to: properties.to, geometry })),
    ),
  )
}

export function byTrackThenStart(a: Pick<Slice, 'track' | 'from' | 'start'>, b: Pick<Slice, 'track' | 'from' | 'start'>): number {
  return TRACK_IDS.indexOf(a.track) - TRACK_IDS.indexOf(b.track) || (a.start ?? a.from) - (b.start ?? b.from)
}

const round = (value: number) => Math.round(value * 100) / 100
const round4 = (value: number) => Math.round(value * 10_000) / 10_000

function ringArea(ring: LonLat[]): number {
  let sum = 0
  for (let index = 0; index + 1 < ring.length; index++) {
    const [x0, y0] = ring[index] ?? [0, 0]
    const [x1, y1] = ring[index + 1] ?? [0, 0]
    sum += x0 * y1 - x1 * y0
  }
  return sum / 2
}

export function cleanRing(ring: number[][]): LonLat[] | null {
  const points: LonLat[] = []
  for (const [lon = 0, lat = 0] of ring) {
    const point: LonLat = [round(lon), round(lat)]
    const last = points.at(-1)
    if (!last || last[0] !== point[0] || last[1] !== point[1]) points.push(point)
  }
  const first = points[0]
  const last = points.at(-1)
  if (first && last && (first[0] !== last[0] || first[1] !== last[1])) points.push([first[0], first[1]])
  return points.length >= 4 && ringArea(points) !== 0 ? points : null
}

function cleanPolygons(geometry: Geometry): LonLat[][][] {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  return polygons.flatMap(([outer = [], ...holes]) => {
    const shell = cleanRing(outer)
    return shell ? [[shell, ...holes.map(cleanRing).filter((hole) => hole !== null)]] : []
  })
}

function boundsOf(polygons: LonLat[][][]): Slice['bounds'] {
  const points = polygons.flatMap(([outer = []]) => outer)
  const lons = points.map(([lon]) => lon)
  const lats = points.map(([, lat]) => lat)
  return [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]
}

export function mergedRuns(slices: Slice[]): Slice[] {
  const result: Slice[] = []
  for (const slice of slices) {
    const previous = result.at(-1)
    const continues =
      previous &&
      previous.track === slice.track &&
      previous.polity === slice.polity &&
      (previous.end ?? previous.to + 1) === (slice.start ?? slice.from) &&
      JSON.stringify(previous.polygons) === JSON.stringify(slice.polygons)
    if (!continues) result.push({ ...slice })
    else {
      previous.to = slice.to
      if (slice.end === undefined) delete previous.end
      else previous.end = slice.end
    }
  }
  return result
}

export function uncoveredYears(slices: Pick<Slice, 'track' | 'from' | 'to'>[], trackIds: TrackId[], start: number, end: number): number[] {
  const relevant = slices.filter((slice) => trackIds.includes(slice.track))
  const years: number[] = []
  for (let year = start; year <= end; year++) {
    if (!relevant.some((slice) => slice.from <= year && slice.to >= year)) years.push(year)
  }
  return years
}

async function cachedArchive(): Promise<string> {
  const file = `${CACHE}/cliopatria.geojson.zip`
  if (!existsSync(file)) {
    console.log(`Downloading ${ARCHIVE_URL}`)
    const response = await fetch(ARCHIVE_URL)
    if (!response.ok) throw new Error(`${ARCHIVE_URL} answered ${response.status}`)
    mkdirSync(CACHE, { recursive: true })
    writeFileSync(file, new Uint8Array(await response.arrayBuffer()))
  }
  const digest = createHash('sha256').update(readFileSync(file)).digest('hex')
  if (digest !== ARCHIVE_SHA256) throw new Error(`${file} has SHA-256 ${digest}, expected ${ARCHIVE_SHA256}`)
  return file
}

async function mapshaperOutput(commands: string, input?: Record<string, string>): Promise<unknown> {
  const output = await mapshaper.applyCommands(`${commands} -o result.json format=geojson geojson-type=FeatureCollection`, input)
  const result = output['result.json']
  return result === undefined ? null : JSON.parse(typeof result === 'string' ? result : new TextDecoder().decode(result))
}

async function readRows(archive: string): Promise<Row[]> {
  const shapes = SOURCES.flatMap((source) => source.cut?.shapes ?? []).map((shape) => shape.polity)
  const polities = [...new Set([...SOURCES.map((source) => source.polity), ...shapes])]
  const extract = await mapshaperOutput(`-i ${archive} -filter '${JSON.stringify(polities)}.includes(Name)'`)
  const { features } = cliopatriaSchema.parse(extract)
  const missing = polities.filter((polity) => !features.some((feature) => feature.properties.Name === polity))
  if (missing.length > 0) throw new Error(`Cliopatria ${RELEASE} has no rows for ${missing.join(', ')}`)
  return features
    .filter((feature) => feature.properties.Type === 'POLITY')
    .map(({ properties, geometry }) => ({
      polity: properties.Name,
      from: toAstronomical(properties.FromYear),
      to: toAstronomical(properties.ToYear),
      geometry,
    }))
}

function boxRing([west, south, east, north]: Box): LonLatRing {
  return [[west, south], [east, south], [east, north], [west, north], [west, south]]
}

function collection(geometries: Geometry[]): string {
  return JSON.stringify({ type: 'FeatureCollection', features: geometries.map((geometry) => ({ type: 'Feature', properties: {}, geometry })) })
}

function geometriesOf(output: unknown): Geometry[] {
  return output === null ? [] : simplifiedSchema.parse(output).features.flatMap((feature) => feature.geometry ?? [])
}

const cutCache = new Map<Geometry, Map<string, Geometry | null>>()

async function cutGeometry(geometry: Geometry, cut: Cut, rows: Row[]): Promise<Geometry | null> {
  const cached = cutCache.get(geometry)?.get(cut.name)
  if (cached !== undefined) return cached
  const erasers: Geometry[] = [
    ...[...(cut.boxes ?? []).map(boxRing), ...(cut.rings ?? [])].map((ring): Geometry => ({ type: 'Polygon', coordinates: [ring] })),
    ...(cut.shapes ?? []).map((shape) => rowAt(rows, shape.polity, shape.year).geometry),
  ]
  let eraser = collection(erasers)
  if (cut.except) {
    const except = collection([{ type: 'Polygon', coordinates: [cut.except] }])
    eraser = collection(geometriesOf(await mapshaperOutput('-i eraser.json -dissolve -erase except.json', { 'eraser.json': eraser, 'except.json': except })))
  }
  const [result = null] = geometriesOf(await mapshaperOutput(`-i target.json -erase eraser.json -explode -filter-islands min-area=${CUT_MIN_ISLAND} -dissolve`, { 'target.json': collection([geometry]), 'eraser.json': eraser }))
  const own = cutCache.get(geometry) ?? new Map<string, Geometry | null>()
  own.set(cut.name, result)
  cutCache.set(geometry, own)
  return result
}

async function cutRows(plan: Plan, rows: Row[]): Promise<Plan> {
  const kept: Row[] = []
  for (const row of plan.rows) {
    const geometry = row.cut ? await cutGeometry(row.geometry, row.cut, rows) : row.geometry
    if (geometry) kept.push({ ...row, geometry })
  }
  return { ...plan, rows: kept }
}

async function simplified(plan: Plan): Promise<Geometry[]> {
  const { west, south, east, north } = MAP_BOUNDS
  const collection = JSON.stringify({
    type: 'FeatureCollection',
    features: plan.rows.map((row) => ({ type: 'Feature', properties: { track: plan.track }, geometry: row.geometry })),
  })
  const output = await mapshaperOutput(
    `-i plan.json -clip bbox=${west},${south},${east},${north} -dissolve track -filter-islands min-area=${MIN_ISLAND} -explode${plan.drawn ? '' : ` -simplify visvalingam variable interval='this.area < ${SMALL_RING_AREA} ? ${SMALL_RING_METERS} : ${SIMPLIFY_METERS}' keep-shapes`}`,
    { 'plan.json': collection },
  )
  return geometriesOf(output)
}

async function labelPoint(polygons: LonLat[][][]): Promise<LonLat> {
  const shape = JSON.stringify({
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: {}, geometry: { type: 'MultiPolygon', coordinates: polygons } }],
  })
  const [lon = 0, lat = 0] = pointSchema.parse(await mapshaperOutput('-i shape.json -points inner', { 'shape.json': shape })).features[0]!.geometry.coordinates
  return [round(lon), round(lat)]
}

export type Rect = [west: number, south: number, east: number, north: number]

export interface LabelSetting {
  text: string
  obstacles: Rect[]
  scale: number
  frame: Rect
}

const TRACK_LETTER = 0.45
const TRACK_HEIGHT = 0.9
const LABEL_LINE_CHARACTERS = 13
const CITY_LETTER = 0.32
const CITY_HEIGHT = 0.8
const FRANCE_FRAME_WIDTH = 15.5
const WIDE_FRAME_SCALE = 1.25
const PANEL_SHARE = 0.12

function overlap(a: Rect, b: Rect): number {
  const width = Math.min(a[2], b[2]) - Math.max(a[0], b[0])
  const height = Math.min(a[3], b[3]) - Math.max(a[1], b[1])
  return width > 0 && height > 0 ? width * height : 0
}

function insideRing([lon, lat]: LonLat, ring: LonLat[]): boolean {
  let inside = false
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [x0, y0] = ring[index]!
    const [x1, y1] = ring[previous]!
    if (y0 > lat !== y1 > lat && lon < ((x1 - x0) * (lat - y0)) / (y1 - y0) + x0) inside = !inside
  }
  return inside
}

function insidePolygons(point: LonLat, polygons: LonLat[][][]): boolean {
  return polygons.some((polygon) => polygon.filter((ring) => insideRing(point, ring)).length % 2 === 1)
}

function insideRect([lon, lat]: LonLat, [west, south, east, north]: Rect): boolean {
  return lon >= west && lon <= east && lat >= south && lat <= north
}

export function labelObstacles(from: number, to: number, scale: number): Rect[] {
  const shown = scale >= WIDE_FRAME_SCALE ? 1 : 2
  return cities
    .filter((city) => city.importance <= shown && city.from <= to && (city.to ?? Infinity) >= from)
    .map((city) => {
      const half = (city.name.length * CITY_LETTER * scale) / 2
      return [city.lon - half, city.lat - 0.1 * scale, city.lon + half, city.lat + CITY_HEIGHT * scale]
    })
}

export function wrapLines(text: string, width = LABEL_LINE_CHARACTERS): string[] {
  const lines: string[] = []
  for (const word of text.split(' ')) {
    const last = lines.at(-1)
    if (last !== undefined && last.length + 1 + word.length <= width) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines
}

export function labelBox([lon, lat]: LonLat, text: string, scale: number): Rect {
  const lines = wrapLines(text)
  const halfWidth = (Math.max(...lines.map((line) => line.length)) * TRACK_LETTER * scale) / 2
  const halfHeight = (lines.length * TRACK_HEIGHT * scale) / 2
  return [lon - halfWidth, lat - halfHeight, lon + halfWidth, lat + halfHeight]
}

export function placeLabel(polygons: LonLat[][][], anchor: LonLat, { text, obstacles, scale, frame }: LabelSetting): LonLat {
  const [west, south, east, north] = boundsOf(polygons)
  const step = Math.max(0.05, Math.min(east - west, north - south) / 30)
  const score = ([lon, lat]: LonLat) => {
    const box = labelBox([lon, lat], text, scale)
    const corners: LonLat[] = [[box[0], box[1]], [box[2], box[1]], [box[0], box[3]], [box[2], box[3]], [lon, box[1]], [lon, box[3]]]
    const outside = corners.filter((corner) => !insidePolygons(corner, polygons)).length
    const offFrame = corners.filter((corner) => !insideRect(corner, frame)).length
    const covered = obstacles.reduce((sum, obstacle) => sum + overlap(box, obstacle), 0)
    return -covered / (scale * scale) - outside * 0.4 - offFrame * 1.5 - Math.hypot(lon - anchor[0], lat - anchor[1]) / (4 * scale)
  }
  let best = anchor
  let bestScore = score(anchor)
  for (let lon = west; lon <= east; lon += step) {
    for (let lat = south; lat <= north; lat += step) {
      const point: LonLat = [round(lon), round(lat)]
      if (!insidePolygons(point, polygons)) continue
      const value = score(point)
      if (value > bestScore + 1e-9) {
        best = point
        bestScore = value
      }
    }
  }
  return best
}

interface PlacedLabel {
  track: TrackId
  start: number
  end: number
  box: Rect
}

function labelSetting(plan: Plan, placed: PlacedLabel[]): LabelSetting {
  const start = plan.start ?? plan.from
  const end = plan.end ?? plan.to + 1
  const [west, south, east, north] = frameAt(start)
  const frame: Rect = [west + (east - west) * PANEL_SHARE, south, east, north]
  const scale = Math.max(1, ((east - west) / FRANCE_FRAME_WIDTH) ** 0.4)
  const text = (tracks.find((candidate) => candidate.id === plan.track)?.name ?? plan.track).replace(/\s*\(.*\)$/, '').toUpperCase()
  const others = placed.filter((label) => label.track !== plan.track && label.start < end && start < label.end).map((label) => label.box)
  return { text, obstacles: [...labelObstacles(plan.from, plan.to, scale), ...others], scale, frame }
}

function serialize(slices: Slice[]): string {
  return `{"attribution":${JSON.stringify(ATTRIBUTION)},"slices":[\n${slices.map((slice) => JSON.stringify(slice)).join(',\n')}\n]}\n`
}

async function main() {
  const rows = await readRows(await cachedArchive())
  const plans = [...withAnnexations(planSlices(rows)), ...readHandDrawn()].toSorted(byTrackThenStart)
  const geometries: Geometry[][] = []
  for (const plan of plans) geometries.push(await simplified(await cutRows(plan, rows)))
  const drafts: Slice[] = []
  const placed: PlacedLabel[] = []
  for (const [index, plan] of plans.entries()) {
    const polygons = (geometries[index] ?? []).flatMap(cleanPolygons)
    if (polygons.length === 0) {
      console.warn(`No geometry left for ${plan.track} ${plan.polity} from ${plan.from} to ${plan.to}`)
      continue
    }
    const timing = { ...(plan.start === undefined ? {} : { start: round4(plan.start) }), ...(plan.end === undefined ? {} : { end: round4(plan.end) }) }
    const setting = labelSetting(plan, placed)
    const label = placeLabel(polygons, await labelPoint(polygons), setting)
    placed.push({ track: plan.track, start: plan.start ?? plan.from, end: plan.end ?? plan.to + 1, box: labelBox(label, setting.text, setting.scale) })
    drafts.push({ track: plan.track, polity: plan.polity, from: plan.from, to: plan.to, ...timing, bounds: boundsOf(polygons), label, polygons })
  }
  const slices = mergedRuns(drafts)
  const text = serialize(slices)
  mkdirSync(dirname(TERRITORIES_FILE), { recursive: true })
  writeFileSync(TERRITORIES_FILE, text)
  const size = Buffer.byteLength(text)
  for (const id of TRACK_IDS) {
    const own = slices.filter((slice) => slice.track === id)
    console.log(`${id}: ${own.length} slices, ${[...new Set(own.map((slice) => slice.polity))].join(', ')}`)
  }
  for (const track of tracks) {
    const uncovered = track.spans.flatMap((span) => uncoveredYears(slices, [track.id], span.start, span.end))
    if (uncovered.length > 0) console.log(`${track.id}: ${uncovered.length} years without territory, from ${uncovered[0]} to ${uncovered.at(-1)}`)
  }
  console.log(`${TERRITORIES_FILE}: ${slices.length} slices, ${size} bytes${size > SIZE_TARGET ? `, above the ${SIZE_TARGET} byte target` : ''}`)
}

if (import.meta.main) await main()

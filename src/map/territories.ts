import type { TrackId } from '../data/schema.ts'

export type Ring = [number, number][]
export type Polygon = Ring[]
export type Bounds = [west: number, south: number, east: number, north: number]

export interface TerritorySlice {
  track: TrackId
  polity: string
  from: number
  to: number
  start?: number
  end?: number
  bounds: Bounds
  label: [number, number]
  polygons: Polygon[]
}

export interface TerritoryData {
  attribution: string
  slices: TerritorySlice[]
}

export function isActiveAt(slice: Pick<TerritorySlice, 'from' | 'to' | 'start' | 'end'>, time: number): boolean {
  return time >= (slice.start ?? slice.from) && time < (slice.end ?? slice.to + 1)
}

export function calendarTime(center: number): number {
  return center + 0.5
}

export function activeSlices(slices: TerritorySlice[], center: number): TerritorySlice[] {
  return slices.filter((slice) => isActiveAt(slice, calendarTime(center)))
}

export function sliceKey(slices: TerritorySlice[]): string {
  return slices.map((slice) => `${slice.track}:${slice.start ?? slice.from}`).join('|')
}

import type { Waypoint } from '../data/schema.ts'

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const ITINERARY_LEAD = 0.5
export const ITINERARY_LINGER = 1

export function waypointTime(waypoint: Pick<Waypoint, 'year' | 'month' | 'day'>): number {
  if (waypoint.month === undefined) return waypoint.year + 0.5
  const month = waypoint.month - 1
  const fraction = waypoint.day === undefined ? 0.5 : (waypoint.day - 0.5) / DAYS_IN_MONTH[month]!
  return waypoint.year + (month + fraction) / 12
}

export function isItineraryShown(start: number, end: number, time: number): boolean {
  return time >= start - ITINERARY_LEAD && time <= end + ITINERARY_LINGER
}

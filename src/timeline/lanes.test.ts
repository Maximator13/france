import { describe, expect, it } from 'vitest'
import type { Track, TrackId } from '../data/schema.ts'
import { assignLanes, MAX_SECONDARY_LANES } from './lanes.ts'

function track(id: TrackId, start: number, end: number): Track {
  return { id, name: id, color: '#ffffff', spans: [{ start, end }] }
}

describe('assignLanes', () => {
  it('keeps the first track on the main lane', () => {
    expect(assignLanes([track('royaume', -1099, -29)], -2000, 0).get('royaume')).toBe(0)
  })

  it('lets tracks that follow each other share a lane', () => {
    const lanes = assignLanes([track('royaume', -1099, -29), track('angleterre', -1599, -1099), track('bourgogne', -799, -85)], -2000, 0, 10)
    expect(lanes.get('angleterre')).toBe(1)
    expect(lanes.get('bourgogne')).toBe(1)
  })

  it('stacks overlapping tracks and leaves the overflow to the main lane', () => {
    const overlapping: TrackId[] = ['bourgogne', 'italie', 'naples', 'hollande', 'rhin', 'westphalie']
    const lanes = assignLanes([track('royaume', -1099, -29), ...overlapping.map((id) => track(id, -500, -400))], -600, -300)
    expect(overlapping.map((id) => lanes.get(id))).toEqual([1, 2, 3, 4, undefined, undefined])
    expect(MAX_SECONDARY_LANES).toBe(4)
  })

  it('ignores tracks outside the visible window', () => {
    expect(assignLanes([track('royaume', -1099, -29), track('egypte', -1949, -1449)], -500, -300).has('egypte')).toBe(false)
  })
})

import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { scenes } from '../../data/scenes.ts'
import { AUSTERLITZ } from '../austerlitz/battle.ts'
import { rasterize, heightAt } from './heightfield.ts'
import { parseBattle, type Unit } from './schema.ts'
import {
  deathTimes,
  figureCount,
  isShown,
  lerpAngle,
  mistAt,
  placeFigure,
  pointForTime,
  slotsFor,
  stateAt,
  sunAt,
  timeForPoint,
  trackOf,
  type UnitState,
} from './timeline.ts'

const unit: Unit = {
  id: 'essai',
  label: 'Essai',
  side: 'a',
  troop: 'ligne-francaise',
  soldiers: 200,
  start: { at: [0, 0], facing: 180, width: 100, depth: 20 },
  moves: [
    { phase: 1, at: [0, -100], action: 'march' },
    { phase: 2 },
    { phase: 3, via: [[100, -100]], at: [100, 0], facing: 90, losses: 0.5, action: 'fight' },
  ],
}

describe('battle timeline', () => {
  it('interpolates between keyframes and holds in between', () => {
    const track = trackOf(unit)
    const state = {} as UnitState
    expect(stateAt(track, 0, state).y).toBe(0)
    expect(stateAt(track, 0.5, state).y).toBeCloseTo(-50)
    expect(stateAt(track, 0.5, state).action).toBe('march')
    expect(stateAt(track, 1.5, state).y).toBeCloseTo(-100)
    expect(stateAt(track, 1.5, state).action).toBe('stand')
    expect(stateAt(track, 3, state)).toMatchObject({ x: 100, y: 0, facing: 90, losses: 0.5, action: 'fight' })
    expect(stateAt(track, 2.5, state).x).toBeCloseTo(100, 0)
  })

  it('keeps every figure inside its formation', () => {
    const slots = slotsFor(10, 100, 20, 1)
    const state = stateAt(trackOf(unit), 0, {} as UnitState)
    for (const slot of slots) {
      const placed = placeFigure(state, slot, { x: 0, y: 0, heading: 0 })
      expect(Math.abs(placed.x)).toBeLessThan(52)
      expect(Math.abs(placed.y)).toBeLessThan(12)
    }
  })

  it('kills the expected share of figures by the end', () => {
    const times = deathTimes(trackOf(unit), 100, 3, 1)
    const dead = [...times].filter((time) => time <= 3).length
    expect(dead).toBe(50)
    expect(Math.min(...times)).toBeGreaterThan(2)
  })

  it('maps time and scene points both ways', () => {
    expect(pointForTime(0, 8)).toBe(0)
    expect(pointForTime(0.01, 8)).toBe(1)
    expect(pointForTime(3, 8)).toBe(4)
    expect(pointForTime(8, 8)).toBe(8)
    expect(pointForTime(timeForPoint(5, false), 8)).toBe(5)
    expect(pointForTime(timeForPoint(5, true) - 1e-4, 8)).toBe(5)
  })

  it('turns by the shortest way', () => {
    expect(lerpAngle(350, 10, 0.5)).toBeCloseTo(360)
    expect((lerpAngle(90, 270, 1) + 360) % 360).toBeCloseTo(270)
  })

  it('places the summer sun of Cannae', () => {
    const noon = sunAt(12, 41.3, 21)
    expect(noon.azimuth).toBeCloseTo(180)
    expect(noon.elevation).toBeCloseTo(69.7, 0)
    expect(sunAt(8, 41.3, 21).azimuth).toBeGreaterThan(85)
    expect(sunAt(8, 41.3, 21).azimuth).toBeLessThan(100)
  })
})

describe('battle columns and camps', () => {
  const column: Unit = {
    id: 'colonne',
    label: 'Colonne',
    side: 'b',
    troop: 'infanterie-russe',
    soldiers: 100,
    start: { at: [0, 0], facing: 90, width: 20, depth: 20, action: 'camp' },
    moves: [
      { phase: 1 },
      { phase: 2, via: [[1000, 0]], at: [1000, 1000], width: 4, depth: 600, action: 'march', column: true },
      { phase: 3, at: [1000, 1500] },
      { phase: 4, at: [1000, 1500], width: 50, depth: 20, action: 'surrender', column: false },
    ],
  }

  it('strings a column along its route behind the head', () => {
    const track = trackOf(column)
    const state = stateAt(track, 2, {} as UnitState)
    expect(state).toMatchObject({ x: 1000, y: 1000, column: 1 })
    const head = placeFigure(state, { u: 0.5, v: 0, rank: 0, jitterX: 0, jitterY: 0, phase: 0 }, { x: 0, y: 0, heading: 0 })
    const tail = placeFigure(state, { u: 0.5, v: 1, rank: 1, jitterX: 0, jitterY: 0, phase: 0 }, { x: 0, y: 0, heading: 0 })
    expect(head.x).toBeCloseTo(1000)
    expect(head.y).toBeCloseTo(1000)
    expect(tail.x).toBeCloseTo(1000)
    expect(tail.y).toBeCloseTo(400)
    expect(tail.heading).toBeCloseTo(0)
  })

  it('extends the route when a column keeps marching', () => {
    const state = stateAt(trackOf(column), 3, {} as UnitState)
    const tail = placeFigure(state, { u: 0.5, v: 1, rank: 1, jitterX: 0, jitterY: 0, phase: 0 }, { x: 0, y: 0, heading: 0 })
    expect(state.head).toBeCloseTo(2500)
    expect(tail.x).toBeCloseTo(1000)
    expect(tail.y).toBeCloseTo(900)
  })

  it('hides camped units and holds a surrender', () => {
    const track = trackOf(column)
    expect(isShown(stateAt(track, 0.5, {} as UnitState))).toBe(false)
    expect(isShown(stateAt(track, 1.5, {} as UnitState))).toBe(true)
    expect(stateAt(track, 4, {} as UnitState)).toMatchObject({ action: 'surrender', column: 0 })
    expect(parseBattle({ ...AUSTERLITZ, units: [...AUSTERLITZ.units, column] }).units.at(-1)!.moves[1]!.column).toBe(true)
  })
})

describe('height field', () => {
  it('rasterizes a sloping square', () => {
    const positions = [0, 0, 0, 10, 10, 0, 10, 10, 10, 0, 0, 10]
    const field = rasterize(positions, [0, 3, 1, 1, 3, 2], 1)
    expect(heightAt(field, 5, 5)).toBeCloseTo(5)
    expect(heightAt(field, 2.5, 7)).toBeCloseTo(2.5)
  })
})

describe('morning mist', () => {
  it('holds before the battle and lifts between phases', () => {
    const phases = [{ mist: 1 }, { mist: 0.4 }, {}]
    expect(mistAt(phases, 0)).toBe(1)
    expect(mistAt(phases, 0.5)).toBe(1)
    expect(mistAt(phases, 1)).toBe(1)
    expect(mistAt(phases, 1.3)).toBeCloseTo(0.7)
    expect(mistAt(phases, 1.9)).toBeCloseTo(0.4)
    expect(mistAt(phases, 3)).toBe(0)
    expect(mistAt([], 1)).toBe(0)
  })
})

describe('Austerlitz data', () => {
  const kinds = [...readFileSync(new URL('../../../blender/kit/austerlitz_figures.py', import.meta.url), 'utf8').matchAll(/^ {4}"([a-z-]+)": \(/gm)].map((match) => match[1])
  const scene = scenes.find((item) => item.id === 'austerlitz')

  it('is a valid battle', () => {
    expect(() => parseBattle(AUSTERLITZ)).not.toThrow()
  })

  it.runIf(scene?.points !== undefined)('has one scene point per phase, in the same order', () => {
    expect(scene?.points?.map((point) => point.id)).toEqual(AUSTERLITZ.phases.map((phase) => phase.id))
  })

  it('uses only figurines made in Blender', () => {
    expect(kinds).toContain('ligne-francaise')
    for (const item of AUSTERLITZ.units) expect(kinds).toContain(item.troop)
  })

  it('fields 72 000 French and 89 000 allies', () => {
    const total = (side: Unit['side']) => AUSTERLITZ.units.filter((item) => item.side === side).reduce((sum, item) => sum + item.soldiers, 0)
    expect(total('a')).toBe(72000)
    expect(total('b')).toBe(89000)
  })

  it('lifts the fog over the Pratzen between dawn and the plateau fight', () => {
    expect(mistAt(AUSTERLITZ.phases, 0.5)).toBe(1)
    expect(mistAt(AUSTERLITZ.phases, 3.9)).toBeLessThan(0.15)
    expect(mistAt(AUSTERLITZ.phases, 5)).toBe(0)
  })

  it('keeps every ground view on a unit that is on the field', () => {
    AUSTERLITZ.phases.forEach((phase, index) => {
      const ground = phase.ground
      if (!('unit' in ground)) return
      const unit = AUSTERLITZ.units.find((item) => item.id === ground.unit)!
      expect(isShown(stateAt(trackOf(unit), index + 0.5, {} as UnitState))).toBe(true)
    })
  })

  it('draws about 8 000 figurines at one figurine for 20 soldiers', () => {
    const count = AUSTERLITZ.units.reduce((sum, item) => sum + figureCount(item, AUSTERLITZ.scale), 0)
    expect(count).toBe(8051)
    const phases = AUSTERLITZ.phases.length
    for (const [index, item] of AUSTERLITZ.units.entries()) {
      const deaths = deathTimes(trackOf(item), figureCount(item, AUSTERLITZ.scale), phases, index + 1)
      expect(Math.min(...deaths)).toBeGreaterThan(0)
    }
  })
})

import { Group, Mesh, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { castsShadow, pairShafts } from './model.ts'

describe('castsShadow', () => {
  it('follows the nearest cast_shadow flag exported from Blender', () => {
    const group = new Group()
    group.userData.cast_shadow = false
    const mesh = new Mesh()
    group.add(mesh)
    expect(castsShadow(mesh)).toBe(false)
    mesh.userData.cast_shadow = true
    expect(castsShadow(mesh)).toBe(true)
  })

  it('casts shadows by default', () => {
    expect(castsShadow(new Mesh())).toBe(true)
  })
})

describe('pairShafts', () => {
  it('pairs each shaft marker with its target and keeps the exported radius', () => {
    const nodes = new Map([
      ['shaft_1', { position: new Vector3(0, 20, 0), radius: 4 }],
      ['shaft_1_target', { position: new Vector3(0, 5, 30), radius: undefined }],
      ['shaft_2', { position: new Vector3(1, 1, 1), radius: undefined }],
    ])
    const shafts = pairShafts(nodes)
    expect(shafts).toHaveLength(1)
    expect(shafts[0]?.radius).toBe(4)
    expect(shafts[0]?.to.toArray()).toEqual([0, 5, 30])
  })
})

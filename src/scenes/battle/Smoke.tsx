import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { Color, InstancedBufferAttribute, InstancedMesh, Matrix4, PlaneGeometry, Quaternion, ShaderMaterial, UniformsLib, UniformsUtils, Vector3 } from 'three'
import { useDeferredDispose } from './ground.ts'
import { heightAt, type HeightField } from './heightfield.ts'
import type { Battle } from './schema.ts'
import { useBattle, type SmokeLevel } from './store.ts'
import { isShown, placeFigure, seeded, stateAt, type Placement, type Slot, type UnitState, type UnitTrack } from './timeline.ts'

export interface SmokeSettings {
  infantry: string[]
  artillery: string[]
  wind: [number, number]
}

const MAX_PUFFS = 1600
const LEVEL: Record<SmokeLevel, number> = { off: 0, light: 0.45, dense: 1 }
const DEGREES = Math.PI / 180
const KINDS = {
  infantry: { spacing: 45, max: 10, period: 3.2, size: [4, 26], rise: 12, drift: 30, opacity: 0.5 },
  artillery: { spacing: 22, max: 14, period: 4.6, size: [7, 46], rise: 22, drift: 55, opacity: 0.72 },
} as const

const VERTEX = `
attribute float smokeFade;
varying vec2 vSmokeUv;
varying float vSmokeFade;
varying float vSmokeDepth;
#include <fog_pars_vertex>
void main() {
  vSmokeUv = uv;
  vSmokeFade = smokeFade;
  vec4 centre = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float size = length(instanceMatrix[0].xyz);
  vec4 mvPosition = viewMatrix * centre;
  mvPosition.xy += position.xy * size;
  vSmokeDepth = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`

const FRAGMENT = `
uniform vec3 smokeColor;
varying vec2 vSmokeUv;
varying float vSmokeFade;
varying float vSmokeDepth;
#include <fog_pars_fragment>
float smokeHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float smokeNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(smokeHash(i), smokeHash(i + vec2(1.0, 0.0)), f.x), mix(smokeHash(i + vec2(0.0, 1.0)), smokeHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  vec2 p = vSmokeUv - 0.5;
  float n = smokeNoise(vSmokeUv * 5.0 + vSmokeFade * 3.0) * 0.6 + smokeNoise(vSmokeUv * 11.0) * 0.4;
  float alpha = smoothstep(0.5, 0.12, length(p) + (n - 0.5) * 0.4) * vSmokeFade * smoothstep(15.0, 60.0, vSmokeDepth);
  if (alpha < 0.004) discard;
  gl_FragColor = vec4(smokeColor * (0.82 + 0.3 * n), alpha);
  #include <fog_fragment>
}`

interface Source {
  unit: number
  kind: keyof typeof KINDS
}

function smokeMesh(): InstancedMesh {
  const geometry = new PlaneGeometry(1, 1)
  geometry.setAttribute('smokeFade', new InstancedBufferAttribute(new Float32Array(MAX_PUFFS), 1))
  const material = new ShaderMaterial({
    uniforms: UniformsUtils.merge([UniformsLib.fog, { smokeColor: { value: new Color('#e4e2dc') } }]),
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    fog: true,
  })
  const mesh = new InstancedMesh(geometry, material, MAX_PUFFS)
  mesh.frustumCulled = false
  mesh.renderOrder = 7
  mesh.count = 0
  return mesh
}

type Scratch = {
  state: UnitState
  placement: Placement
  slot: Slot
  matrix: Matrix4
  quaternion: Quaternion
  position: Vector3
  size: Vector3
}

function updateSmoke(mesh: InstancedMesh, sources: Source[], battle: Battle, tracks: UnitTrack[], field: HeightField, settings: SmokeSettings, scratch: Scratch, seconds: number) {
  const { time, smoke, view } = useBattle.getState()
  const level = LEVEL[smoke] * (view === 'ground' ? 0.5 : 1)
  mesh.visible = level > 0
  if (!mesh.visible) return
  const enlarge = view === 'tactical' ? 1 + (battle.tacticalScale - 1) * 0.5 : 1
  const fade = mesh.geometry.getAttribute('smokeFade') as InstancedBufferAttribute
  let count = 0
  for (const source of sources) {
    const state = stateAt(tracks[source.unit]!, time, scratch.state)
    if (!isShown(state) || state.column > 0.5 || (state.action !== 'fight' && state.action !== 'skirmish')) continue
    const kind = KINDS[source.kind]
    const puffs = Math.max(2, Math.min(kind.max, Math.round(state.width / kind.spacing)))
    const forward = state.facing * DEGREES
    for (let puff = 0; puff < puffs && count < MAX_PUFFS; puff += 1) {
      const key = source.unit * 131 + puff
      scratch.slot.u = (puff + 0.5) / puffs
      const placed = placeFigure(state, scratch.slot, scratch.placement)
      const age = ((seconds + seeded(key) * kind.period) / kind.period) % 1
      const ahead = 6 + age * 10
      const x = placed.x + Math.sin(forward) * ahead + settings.wind[0] * kind.drift * age
      const y = placed.y + Math.cos(forward) * ahead + settings.wind[1] * kind.drift * age
      const z = -y
      const size = (kind.size[0] + (kind.size[1] - kind.size[0]) * Math.sqrt(age)) * enlarge
      scratch.position.set(x, heightAt(field, x, z) + size * 0.35 + kind.rise * age, z)
      scratch.size.setScalar(size)
      scratch.matrix.compose(scratch.position, scratch.quaternion, scratch.size)
      mesh.setMatrixAt(count, scratch.matrix)
      const life = Math.min(1, age / 0.08) * Math.pow(1 - age, 1.4)
      fade.setX(count, life * kind.opacity * level)
      count += 1
    }
  }
  mesh.count = count
  mesh.instanceMatrix.needsUpdate = true
  fade.needsUpdate = true
}

export function Smoke({
  battle,
  tracks,
  field,
  settings,
  reducedMotion,
}: {
  battle: Battle
  tracks: UnitTrack[]
  field: HeightField
  settings: SmokeSettings
  reducedMotion: boolean
}) {
  const mesh = useMemo(() => smokeMesh(), [])
  const sources = useMemo<Source[]>(
    () =>
      battle.units.flatMap((unit, index): Source[] => {
        if (settings.artillery.includes(unit.troop)) return [{ unit: index, kind: 'artillery' }]
        if (settings.infantry.includes(unit.troop)) return [{ unit: index, kind: 'infantry' }]
        return []
      }),
    [battle, settings],
  )
  const scratch = useMemo(
    (): Scratch => ({
      state: {} as UnitState,
      placement: {} as Placement,
      slot: { u: 0, v: 0, rank: 0, jitterX: 0, jitterY: 0, phase: 0 } as Slot,
      matrix: new Matrix4(),
      quaternion: new Quaternion(),
      position: new Vector3(),
      size: new Vector3(),
    }),
    [],
  )

  const dispose = useMemo(
    () => () => {
      mesh.geometry.dispose()
      ;(mesh.material as ShaderMaterial).dispose()
      mesh.dispose()
    },
    [mesh],
  )
  useDeferredDispose(dispose)

  useFrame(({ clock }) => updateSmoke(mesh, sources, battle, tracks, field, settings, scratch, reducedMotion ? 1.3 : clock.elapsedTime))

  return <primitive object={mesh} />
}

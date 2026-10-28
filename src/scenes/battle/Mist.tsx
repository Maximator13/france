import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { Color, DataTexture, DoubleSide, FloatType, Mesh, NearestFilter, PlaneGeometry, RedFormat, ShaderMaterial, UniformsLib, UniformsUtils, Vector3 } from 'three'
import { sunDirection, type SunSettings } from '../kit/Atmosphere.tsx'
import { useDeferredDispose } from './ground.ts'
import type { HeightField } from './heightfield.ts'
import type { Battle } from './schema.ts'
import { useBattle } from './store.ts'
import { mistAt } from './timeline.ts'

export interface MistSettings {
  floor: number
  top: number
  color: string
  fog: number
}

const LAYERS = 7
const LAYER_OPACITY = 0.13
const SUN_REFERENCE = 3

const VERTEX = `
varying vec3 vMistWorld;
#include <fog_pars_vertex>
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vMistWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`

const FRAGMENT = `
uniform vec3 mistColor;
uniform vec3 mistSunColor;
uniform vec3 mistSunDirection;
uniform float mistSunAmount;
uniform float mistOpacity;
uniform float mistTime;
uniform float mistLayer;
uniform float mistWarmth;
uniform vec4 mistBounds;
uniform sampler2D mistGround;
varying vec3 vMistWorld;
#include <fog_pars_fragment>
float mistHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float mistNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mistHash(i), mistHash(i + vec2(1.0, 0.0)), f.x), mix(mistHash(i + vec2(0.0, 1.0)), mistHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  vec2 p = vMistWorld.xz / 1800.0 + vec2(mistTime * 0.002, mistTime * 0.0008) + mistLayer * 3.7;
  float n = mistNoise(p) * 0.55 + mistNoise(p * 2.3) * 0.3 + mistNoise(p * 5.1) * 0.15;
  vec2 uv = (vMistWorld.xz - mistBounds.xy) / (mistBounds.zw - mistBounds.xy);
  float ground = texture2D(mistGround, uv).r;
  vec2 inset = min(vMistWorld.xz - mistBounds.xy, mistBounds.zw - vMistWorld.xz);
  float edge = smoothstep(0.0, 1500.0, min(inset.x, inset.y));
  float alpha = mistOpacity * edge * smoothstep(0.05, 0.9, n);
  alpha *= smoothstep(0.0, 25.0, vMistWorld.y - ground);
  alpha *= smoothstep(3.0, 40.0, abs(cameraPosition.y - vMistWorld.y));
  if (alpha < 0.003) discard;
  float mu = dot(normalize(vMistWorld - cameraPosition), mistSunDirection);
  float hg = (1.0 - 0.36) / pow(1.0 + 0.36 - 1.2 * mu, 1.5) / 12.566;
  vec3 base = mix(mistColor, mistColor * mistSunColor, mistWarmth * mistLayer / 6.0);
  gl_FragColor = vec4(base * (0.78 + mistSunColor * hg * 2.5 * mistSunAmount), alpha);
  #include <fog_fragment>
}`

function groundTexture(field: HeightField): DataTexture {
  const texture = new DataTexture(field.heights, field.columns, field.rows, RedFormat, FloatType)
  texture.minFilter = NearestFilter
  texture.magFilter = NearestFilter
  texture.needsUpdate = true
  return texture
}

function mistLayers(field: HeightField, settings: MistSettings, ground: DataTexture): Mesh[] {
  const width = field.columns * field.cell
  const depth = field.rows * field.cell
  const geometry = new PlaneGeometry(width, depth).rotateX(-Math.PI / 2)
  return Array.from({ length: LAYERS }, (_, layer) => {
    const material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib.fog,
        {
          mistColor: { value: new Color(settings.color) },
          mistSunColor: { value: new Color('#ffffff') },
          mistSunDirection: { value: new Vector3(0, 1, 0) },
          mistSunAmount: { value: 1 },
          mistOpacity: { value: 0 },
          mistTime: { value: 0 },
          mistLayer: { value: layer },
          mistWarmth: { value: 0 },
          mistBounds: { value: [field.x0, field.z0, field.x0 + width, field.z0 + depth] },
          mistGround: { value: null },
        },
      ]),
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      fog: true,
    })
    material.uniforms.mistGround!.value = ground
    const mesh = new Mesh(geometry, material)
    mesh.position.set(field.x0 + width / 2, settings.floor, field.z0 + depth / 2)
    mesh.renderOrder = 4
    mesh.frustumCulled = false
    mesh.visible = false
    return mesh
  })
}

function updateMist(layers: Mesh[], settings: MistSettings, mist: number, sun: SunSettings, direction: Vector3, seconds: number) {
  const top = settings.floor + (settings.top - settings.floor) * Math.sqrt(mist)
  const amount = sun.intensity / SUN_REFERENCE
  layers.forEach((layer, index) => {
    const material = layer.material as ShaderMaterial
    const uniforms = material.uniforms
    layer.position.y = settings.floor + ((top - settings.floor) * (index + 0.5)) / LAYERS
    uniforms.mistOpacity!.value = Math.min(1, mist * 2) * LAYER_OPACITY
    uniforms.mistTime!.value = seconds
    uniforms.mistSunAmount!.value = amount
    uniforms.mistWarmth!.value = Math.min(1, amount)
    ;(uniforms.mistSunColor!.value as Color).set(sun.color)
    ;(uniforms.mistSunDirection!.value as Vector3).copy(direction)
    layer.visible = mist > 0.01
  })
}

export function Mist({ battle, field, settings, sun }: { battle: Battle; field: HeightField; settings: MistSettings; sun: SunSettings }) {
  const ground = useMemo(() => groundTexture(field), [field])
  const layers = useMemo(() => mistLayers(field, settings, ground), [field, settings, ground])
  const direction = useMemo(() => sunDirection(sun), [sun])

  const dispose = useMemo(
    () => () => {
      layers[0]?.geometry.dispose()
      for (const layer of layers) (layer.material as ShaderMaterial).dispose()
      ground.dispose()
    },
    [layers, ground],
  )
  useDeferredDispose(dispose)

  useFrame(({ clock }) => updateMist(layers, settings, mistAt(battle.phases, useBattle.getState().time), sun, direction, clock.elapsedTime))

  return (
    <>
      {layers.map((layer) => (
        <primitive key={layer.uuid} object={layer} />
      ))}
    </>
  )
}

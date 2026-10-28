import { ModelScene, type ModelSceneConfig } from '../kit/ModelScene.tsx'
import type { SceneProps } from '../registry.ts'

const SACRE: ModelSceneConfig = {
  model: 'scenes/sacre-de-napoleon/sacre-de-napoleon.glb',
  sun: { azimuth: 170.6, elevation: 18, color: '#fff0dc', intensity: 2.6 },
  haze: { color: '#c3c9d0', density: 0.0012 },
  overview: { azimuth: 240, elevation: 25 },
  interior: { center: [-6, 0, 0], radius: 66, height: 45, ambientScale: 0.28, sunScale: 0.05 },
  sky: { turbidity: 2.2, rayleigh: 1.8 },
  lamps: { color: '#ffb877', intensity: 60, distance: 22 },
  look: { saturation: 0.78, gain: [1, 0.99, 0.95] },
  shaftStrength: 0.17,
  exposure: 1,
}

export default function SacreDeNapoleon(props: SceneProps) {
  return <ModelScene {...props} config={SACRE} />
}

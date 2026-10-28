import { Battlefield, type BattleConfig } from '../battle/Battlefield.tsx'
import type { SceneProps } from '../registry.ts'
import { AUSTERLITZ } from './battle.ts'

const CONFIG: BattleConfig = {
  model: 'scenes/austerlitz/austerlitz.glb',
  battle: AUSTERLITZ,
  haze: { color: '#cfd6dc', density: 0.00007 },
  sunColor: '#ffd9b0',
  sunIntensity: 3,
  sky: { turbidity: 6, rayleigh: 0.9 },
  mist: { floor: 192, top: 258, color: '#e4e6e8', fog: 0.3 },
  smoke: {
    infantry: ['ligne-francaise', 'garde-francaise', 'infanterie-russe', 'grenadier-russe', 'infanterie-autrichienne'],
    artillery: ['artillerie-francaise', 'artillerie-autrichienne', 'artillerie-russe'],
    wind: [0.6, -0.3],
  },
}

export default function Austerlitz(props: SceneProps) {
  return <Battlefield {...props} config={CONFIG} />
}

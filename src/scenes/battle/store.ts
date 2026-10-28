import { create } from 'zustand'

export type BattleView = 'tactical' | 'ground'
export type SmokeLevel = 'off' | 'light' | 'dense'

interface BattleState {
  time: number
  playing: boolean
  view: BattleView
  smoke: SmokeLevel
  controlsHeight: number
  setControlsHeight: (controlsHeight: number) => void
  setTime: (time: number) => void
  setPlaying: (playing: boolean) => void
  setView: (view: BattleView) => void
  setSmoke: (smoke: SmokeLevel) => void
  reset: () => void
}

export const useBattle = create<BattleState>()((set) => ({
  time: 0,
  playing: false,
  view: 'tactical',
  smoke: 'light',
  controlsHeight: 0,
  setControlsHeight: (controlsHeight) => set({ controlsHeight }),
  setTime: (time) => set({ time }),
  setPlaying: (playing) => set({ playing }),
  setView: (view) => set({ view }),
  setSmoke: (smoke) => set({ smoke }),
  reset: () => set({ time: 0, playing: false, view: 'tactical' }),
}))

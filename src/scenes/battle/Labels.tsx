import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Vector3, type Camera, type Group } from 'three'
import type { UiInsets } from '../../map/MapStage.tsx'
import { heightAt, type HeightField } from './heightfield.ts'
import type { Battle } from './schema.ts'
import { useBattle } from './store.ts'
import { isShown, stateAt, type UnitState, type UnitTrack } from './timeline.ts'

const LABEL_LIFT = 60
const LABEL_MARGIN = 12
const LABEL_GAP = 4
const OBSTACLES = '.battle, .header'

interface Box {
  left: number
  top: number
  right: number
  bottom: number
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right + LABEL_GAP && b.left < a.right + LABEL_GAP && a.top < b.bottom + LABEL_GAP && b.top < a.bottom + LABEL_GAP
}

function obstacleBoxes(canvas: Box): Box[] {
  return [...document.querySelectorAll(OBSTACLES)].map((element) => {
    const rect = element.getBoundingClientRect()
    return { left: rect.left - canvas.left, top: rect.top - canvas.top, right: rect.right - canvas.left, bottom: rect.bottom - canvas.top }
  })
}

interface Frame {
  battle: Battle
  tracks: UnitTrack[]
  field: HeightField
  insets: UiInsets
  labelled: number[]
  anchors: (Group | null)[]
  elements: (HTMLDivElement | null)[]
  projected: Vector3
  scratch: UnitState
}

function placeLabels(frame: Frame, camera: Camera, size: { width: number; height: number }, canvas: HTMLCanvasElement) {
  const { time, controlsHeight } = useBattle.getState()
  const { insets } = frame
  const rect = canvas.getBoundingClientRect()
  const placed = obstacleBoxes(rect)
  const order = frame.labelled
    .map((unit, slot) => ({ unit, slot, state: { ...stateAt(frame.tracks[unit]!, time, frame.scratch) } }))
    .sort((a, b) => Number(b.state.action !== 'stand') - Number(a.state.action !== 'stand'))
  for (const { slot, state } of order) {
    const anchor = frame.anchors[slot]
    const element = frame.elements[slot]
    if (!anchor || !element) continue
    anchor.position.set(state.x, heightAt(frame.field, state.x, -state.y) + LABEL_LIFT, -state.y)
    frame.projected.copy(anchor.position).project(camera)
    const x = ((frame.projected.x + 1) / 2) * size.width
    const y = ((1 - frame.projected.y) / 2) * size.height
    const width = element.offsetWidth
    const height = element.offsetHeight
    const box = { left: x - width / 2, right: x + width / 2, top: y - height / 2, bottom: y + height / 2 }
    const outside =
      box.left < insets.left || box.right > size.width - insets.right || box.top < insets.top || box.bottom > size.height - insets.bottom - controlsHeight - LABEL_MARGIN
    const hidden = !isShown(state) || frame.projected.z > 1 || outside || placed.some((other) => overlaps(box, other))
    if (!hidden) placed.push(box)
    element.style.visibility = hidden ? 'hidden' : 'visible'
  }
}

export function Labels({ battle, tracks, field, insets }: { battle: Battle; tracks: UnitTrack[]; field: HeightField; insets: UiInsets }) {
  const view = useBattle((state) => state.view)
  const labelled = useMemo(() => battle.units.flatMap((unit, index) => (unit.labelled ? [index] : [])), [battle])
  const anchors = useRef<(Group | null)[]>([])
  const elements = useRef<(HTMLDivElement | null)[]>([])
  const projected = useMemo(() => new Vector3(), [])
  const scratch = useMemo(() => ({}) as UnitState, [])

  useFrame(({ camera, size, gl }) =>
    placeLabels({ battle, tracks, field, insets, labelled, anchors: anchors.current, elements: elements.current, projected, scratch }, camera, size, gl.domElement),
  )

  if (view !== 'tactical') return null
  return (
    <>
      {labelled.map((unit, order) => {
        const item = battle.units[unit]!
        return (
          <group
            key={item.id}
            ref={(node) => {
              anchors.current[order] = node
            }}
          >
            <Html
              center
              zIndexRange={[0, 0]}
              className="battle-label"
              style={{ borderBottomColor: battle.sides[item.side].color }}
              ref={(node) => {
                elements.current[order] = node
              }}
            >
              {item.label}
            </Html>
          </group>
        )
      })}
    </>
  )
}

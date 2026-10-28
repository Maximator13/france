import { Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MeshBasicMaterial, Vector3, type Group, type Object3D } from 'three'
import displayFontUrl from '@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff?url'
import { prefersReducedMotion } from '../core/motion.ts'
import type { Track } from '../data/schema.ts'
import { tracks } from '../data/tracks.ts'
import { useApp } from '../store.ts'
import { project } from './geo.ts'
import { claimLabel, isLabelHidden, LABEL_PRIORITY, releaseLabel } from './labelSpace.ts'
import type { HeightSampler } from './reliefSampler.ts'
import { calendarTime, isActiveAt, type TerritorySlice } from './territories.ts'

const LABEL_SCALE = 0.02
const LIFT = 0.25
const FADE_SECONDS = 0.8
const LABEL_WRAP_WIDTH = 7.5

function TrackLabel({ track, rank, slices, height }: { track: Track; rank: number; slices: TerritorySlice[]; height: HeightSampler }) {
  const group = useRef<Group>(null)
  const label = useRef<Object3D & { fillOpacity: number; outlineOpacity: number }>(null)
  const shown = useRef(0)
  const id = `territory:${track.id}`
  const opacity = useRef(0)
  const target = useMemo(() => new Vector3(), [])
  const reducedMotion = useMemo(() => prefersReducedMotion(), [])
  const material = useMemo(() => new MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false }), [])

  useEffect(() => () => releaseLabel(id), [id])

  useEffect(() => () => material.dispose(), [material])

  useFrame(({ camera, size }, delta) => {
    const current = group.current
    if (!current) return
    const time = calendarTime(useApp.getState().view.center)
    const slice = slices.find((candidate) => isActiveAt(candidate, time))
    if (slice) {
      const [lon, lat] = slice.label
      const point = project(lon, lat)
      target.set(point.x, height(lon, lat) + LIFT, point.z)
      if (opacity.current < 0.01) current.position.copy(target)
      else current.position.lerp(target, reducedMotion ? 1 : Math.min(1, delta * 3))
    }
    const step = reducedMotion ? 1 : delta / FADE_SECONDS
    opacity.current = slice ? Math.min(1, opacity.current + step) : Math.max(0, opacity.current - step)
    if (slice) claimLabel(id, LABEL_PRIORITY.territory + rank / 100, label.current, camera, size.width, size.height)
    else releaseLabel(id)
    const wanted = slice && !isLabelHidden(id) ? 1 : 0
    shown.current = wanted > shown.current ? Math.min(wanted, shown.current + step) : Math.max(wanted, shown.current - step)
    current.visible = opacity.current > 0.01
    current.scale.setScalar(camera.position.distanceTo(current.position) * LABEL_SCALE)
    if (label.current) {
      label.current.fillOpacity = opacity.current * shown.current * 0.95
      label.current.outlineOpacity = opacity.current * shown.current * 0.7
    }
  })

  return (
    <group ref={group} visible={false}>
      <Billboard>
        <Text
          ref={label}
          font={displayFontUrl}
          fontSize={0.62}
          letterSpacing={0.18}
          maxWidth={LABEL_WRAP_WIDTH}
          textAlign="center"
          lineHeight={1.05}
          color={track.color}
          outlineWidth={0.05}
          outlineColor="#0b1117"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0}
          outlineOpacity={0}
          material={material}
          renderOrder={5}
        >
          {track.name.replace(/\s*\(.*\)$/, '').toUpperCase()}
        </Text>
      </Billboard>
    </group>
  )
}

export function TerritoryLabels({ slices, height }: { slices: TerritorySlice[]; height: HeightSampler }) {
  const byTrack = useMemo(
    () => tracks.map((track) => ({ track, slices: slices.filter((slice) => slice.track === track.id) })).filter((entry) => entry.slices.length > 0),
    [slices],
  )
  return (
    <>
      {byTrack.map(({ track, slices: own }, rank) => (
        <TrackLabel key={track.id} track={track} rank={rank} slices={own} height={height} />
      ))}
    </>
  )
}

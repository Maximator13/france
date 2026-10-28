import { useEffect, useMemo } from 'react'
import { AdditiveBlending, BufferGeometry, CanvasTexture, Float32BufferAttribute, Points, PointsMaterial, type Vector3 } from 'three'

const GLOW_SIZE = 0.35

function glowTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext('2d')
  if (context) {
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,230,180,1)')
    gradient.addColorStop(0.25, 'rgba(255,176,96,0.6)')
    gradient.addColorStop(1, 'rgba(255,140,60,0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)
  }
  return new CanvasTexture(canvas)
}

export function candleGeometry(positions: Vector3[]): BufferGeometry {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions.flatMap((point) => [point.x, point.y, point.z]), 3))
  return geometry
}

export function CandleGlow({ positions }: { positions: Vector3[] }) {
  const points = useMemo(() => {
    const material = new PointsMaterial({
      map: glowTexture(),
      color: '#ffb060',
      size: GLOW_SIZE,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: AdditiveBlending,
      toneMapped: false,
    })
    const cloud = new Points(candleGeometry(positions), material)
    cloud.renderOrder = 3
    cloud.frustumCulled = false
    return cloud
  }, [positions])
  useEffect(
    () => () => {
      points.geometry.dispose()
      points.material.map?.dispose()
      points.material.dispose()
    },
    [points],
  )
  return <primitive object={points} />
}

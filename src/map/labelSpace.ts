import { Vector3, type Camera, type Object3D } from 'three'

export interface ScreenRect {
  left: number
  top: number
  right: number
  bottom: number
}

export interface LabelClaim {
  priority: number
  order: number
  rect: ScreenRect
}

export const LABEL_PRIORITY = { selected: 0, itinerary: 1, territory: 2, majorCity: 3, city: 4, pin: 5 } as const

const PADDING = 4

function overlaps(a: ScreenRect, b: ScreenRect): boolean {
  return a.left < b.right + PADDING && b.left < a.right + PADDING && a.top < b.bottom + PADDING && b.top < a.bottom + PADDING
}

export function resolveLabels(claims: Map<string, LabelClaim>, blocked: ScreenRect[] = []): Set<string> {
  const placed = [...blocked]
  const hidden = new Set<string>()
  const ordered = [...claims].sort(([, a], [, b]) => a.priority - b.priority || a.order - b.order)
  for (const [id, claim] of ordered) {
    if (placed.some((rect) => overlaps(rect, claim.rect))) hidden.add(id)
    else placed.push(claim.rect)
  }
  return hidden
}

const claims = new Map<string, LabelClaim>()
let hidden = new Set<string>()
let order = 0

export function isLabelHidden(id: string): boolean {
  return hidden.has(id)
}

export function releaseLabel(id: string) {
  claims.delete(id)
}

export function settleLabels(blocked: ScreenRect[]) {
  hidden = resolveLabels(claims, blocked)
}

interface TextBlock extends Object3D {
  textRenderInfo?: { blockBounds: [number, number, number, number]; visibleBounds?: [number, number, number, number] } | null
}

const corner = new Vector3()

export function claimLabel(id: string, priority: number, text: TextBlock | null, camera: Camera, width: number, height: number) {
  const bounds = text?.textRenderInfo?.visibleBounds ?? text?.textRenderInfo?.blockBounds
  if (!text || !bounds) {
    releaseLabel(id)
    return
  }
  const xs: number[] = []
  const ys: number[] = []
  for (const [x, y] of [[bounds[0], bounds[1]], [bounds[2], bounds[1]], [bounds[0], bounds[3]], [bounds[2], bounds[3]]] as const) {
    corner.set(x, y, 0)
    text.localToWorld(corner).project(camera)
    xs.push(((corner.x + 1) / 2) * width)
    ys.push(((1 - corner.y) / 2) * height)
  }
  const existing = claims.get(id)
  claims.set(id, {
    priority,
    order: existing?.order ?? order++,
    rect: { left: Math.min(...xs), top: Math.min(...ys), right: Math.max(...xs), bottom: Math.max(...ys) },
  })
}

import type { PointerEvent } from 'react'
import { frenchSpacing } from '../core/typography.ts'
import { ERA_SHORT, KIND_LABEL, RARITY_LABEL } from '../data/collectionUi.ts'
import type { CardKind } from '../data/schema.ts'
import { SITE } from '../site.ts'
import type { CardView } from './catalog.ts'
import { rank } from './game.ts'

const KIND_ICON: Record<CardKind, string> = {
  person: 'M12 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8zm-7 18c0-4 3.1-7 7-7s7 3 7 7z',
  place: 'M3 21h18v-2H3zm2-3h2v-7H5zm4 0h2v-7H9zm4 0h2v-7h-2zm4 0h2v-7h-2zM2 10h20L12 3z',
  relic: 'M9 2h6v2l-1 1v2c3 1 5 4 5 8c0 4-3 7-7 7s-7-3-7-7c0-4 2-7 5-8V5L9 4z',
  unit: 'M12 2l8 3v6c0 5-3.4 9.4-8 11c-4.6-1.6-8-6-8-11V5zm0 4l-3 3l3 3l3-3z',
  work: 'M2 4h7c1.5 0 2.5.7 3 1.6c.5-.9 1.5-1.6 3-1.6h7v15h-7c-1.3 0-2.3.6-3 1.6c-.7-1-1.7-1.6-3-1.6H2zm2 2v11h5c.7 0 1.4.2 2 .5V7.5C10.6 6.6 9.9 6 9 6zm11 0c-.9 0-1.6.6-2 1.5v10c.6-.3 1.3-.5 2-.5h5V6z',
}

export function KindIcon({ kind }: { kind: CardKind }) {
  return (
    <svg className="kind-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={KIND_ICON[kind]} />
    </svg>
  )
}

const FRIEZE_UNITS = 12

const FRIEZE_PATH = [
  `M0 1H${FRIEZE_UNITS * 10}M0 9H${FRIEZE_UNITS * 10}`,
  ...Array.from({ length: FRIEZE_UNITS }, (_, index) => {
    const x = index * 10 + 5
    return `M${x} 2.4L${x + 3} 5L${x} 7.6L${x - 3} 5Z`
  }),
].join('')

export function Frieze({ className }: { className?: string }) {
  return (
    <svg className={className ? `frieze ${className}` : 'frieze'} viewBox={`0 0 ${FRIEZE_UNITS * 10} 10`} aria-hidden="true" focusable="false">
      <path d={FRIEZE_PATH} />
    </svg>
  )
}

export function Lys({ className }: { className?: string }) {
  return (
    <svg className={className ? `lys ${className}` : 'lys'} viewBox="6 4 52 56" aria-hidden="true" focusable="false">
      <path d="M32 6c-6 7-8 14-5 22 1 3 3 5 5 7 2-2 4-4 5-7 3-8 1-15-5-22z" />
      <path d="M27 36c-6-10-15-11-19-6-3 4-1 10 5 10-3-3-2-7 1-8 4-1 8 2 10 6z" />
      <path d="M37 36c6-10 15-11 19-6 3 4 1 10-5 10 3-3 2-7-1-8-4-1-8 2-10 6z" />
      <rect x="20" y="36" width="24" height="5" rx="2" />
      <path d="M28 41h8l-1 9c-1 3-2 5-3 7-1-2-2-4-3-7z" />
    </svg>
  )
}

export function cardImage(id: string, size: 'small' | 'large'): string {
  return `${SITE.base}cards/${id}${size === 'small' ? '-s' : ''}.webp`
}

function trackPointer(event: PointerEvent<HTMLDivElement>) {
  const element = event.currentTarget
  const box = element.getBoundingClientRect()
  const x = (event.clientX - box.left) / box.width
  const y = (event.clientY - box.top) / box.height
  element.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
  element.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  element.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
  element.style.setProperty('--ry', `${((x - 0.5) * 18).toFixed(2)}deg`)
  element.style.setProperty('--hover', '1')
}

const POINTER_PROPERTIES = ['--mx', '--my', '--rx', '--ry', '--hover']

function resetPointer(event: PointerEvent<HTMLDivElement>) {
  const element = event.currentTarget
  POINTER_PROPERTIES.forEach((name) => element.style.removeProperty(name))
}

export function FranceCard({ card, size = 'small', interactive = true }: { card: CardView; size?: 'small' | 'large'; interactive?: boolean }) {
  const pips = rank(card.rarity) + 1
  return (
    <div
      className={`rcard rcard--${card.rarity} rcard--${size} rcard--kind-${card.kind}`}
      onPointerMove={interactive ? trackPointer : undefined}
      onPointerLeave={interactive ? resetPointer : undefined}
    >
      <div className="rcard__frame">
        <div className="rcard__window">
          {card.art ? (
            <img
              className="rcard__art"
              src={cardImage(card.id, size)}
              alt=""
              loading="lazy"
              decoding="async"
              width={size === 'small' ? 320 : 640}
              height={size === 'small' ? 448 : 896}
            />
          ) : (
            <div className="rcard__placeholder">
              <Frieze className="rcard__frieze" />
              <KindIcon kind={card.kind} />
            </div>
          )}
          <div className="rcard__shade" />
        </div>
        <div className="rcard__top">
          <span className="rcard__kind">
            <KindIcon kind={card.kind} />
            {KIND_LABEL[card.kind].one}
          </span>
          <span className="rcard__pips" aria-label={RARITY_LABEL[card.rarity]}>
            {Array.from({ length: pips }, (_, index) => (
              <span key={index} className="rcard__pip" />
            ))}
          </span>
        </div>
        <div className="rcard__plate">
          <p className="rcard__name">{card.name}</p>
          <p className="rcard__subtitle">{frenchSpacing(card.subtitle)}</p>
          <p className="rcard__meta">
            <span>{RARITY_LABEL[card.rarity]}</span>
            <span aria-hidden="true">·</span>
            <span>{ERA_SHORT[card.era]}</span>
          </p>
        </div>
        <div className="rcard__foil" />
        <div className="rcard__glare" />
      </div>
    </div>
  )
}

export function CardBack({ rarity }: { rarity?: CardView['rarity'] }) {
  return (
    <div className={rarity ? `rcard rcard--back rcard--hint-${rarity}` : 'rcard rcard--back'}>
      <div className="rcard__frame">
        <div className="rcard__backface">
          <Frieze className="rcard__frieze" />
          <Lys className="rcard__lys" />
          <span className="rcard__emblem" aria-hidden="true">
            FRANCIA
          </span>
          <Frieze className="rcard__frieze rcard__frieze--low" />
        </div>
      </div>
    </div>
  )
}

import type { HistoricalEvent } from './schema.ts'
import { events as royaume } from './events-royaume.ts'
import { events as empire } from './events-empire.ts'

export const events: HistoricalEvent[] = [...royaume, ...empire].toSorted((a, b) => a.start - b.start)

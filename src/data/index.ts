import { cities } from './cities.ts'
import { eras } from './eras.ts'
import { events } from './events.ts'
import { people } from './people.ts'
import { places } from './places.ts'
import { itineraries } from './itineraries.ts'
import { scenes } from './scenes.ts'
import type { Card, CardArt } from './schema.ts'
import { tracks } from './tracks.ts'

const cards: Card[] = []
const cardArt: CardArt[] = []

export { cities, eras, events, itineraries, people, places, scenes, tracks }

export const dataset = { eras, tracks, events, places, people, scenes, cities, itineraries, cards, cardArt }

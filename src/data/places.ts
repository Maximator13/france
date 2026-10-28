import type { Place } from './schema.ts'
import { places as royaume } from './places-royaume.ts'
import { places as empire } from './places-empire.ts'

const core: Place[] = [
  {
    "id": "paris",
    "name": "Paris",
    "ancientName": "Lutetia",
    "lat": 48.8534,
    "lon": 2.3488,
    "wikidataId": "Q90"
  },
  {
    "id": "reims",
    "name": "Reims (Marne)",
    "lat": 49.2583,
    "lon": 4.0317,
    "wikidataId": "Q41876"
  },
  {
    "id": "versailles",
    "name": "Château de Versailles (Yvelines)",
    "lat": 48.8049,
    "lon": 2.1204,
    "wikidataId": "Q2946"
  },
  {
    "id": "notre-dame-de-paris",
    "name": "Cathédrale Notre-Dame de Paris",
    "lat": 48.853,
    "lon": 2.3499,
    "wikidataId": "Q2981"
  }
]

export const places: Place[] = [...core, ...royaume, ...empire]

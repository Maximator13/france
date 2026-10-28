import type { Card } from './schema.ts'
import { cards as hautMoyenAge } from './cards-haut-moyen-age.ts'
import { cards as capetiens } from './cards-capetiens.ts'
import { cards as valois } from './cards-valois.ts'
import { cards as bourbons } from './cards-bourbons.ts'
import { cards as revolution } from './cards-revolution.ts'
import { cards as empire } from './cards-empire.ts'

export const cards: Card[] = [...hautMoyenAge, ...capetiens, ...valois, ...bourbons, ...revolution, ...empire]

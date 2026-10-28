import type { Person } from './schema.ts'
import { people as royaume } from './people-royaume.ts'
import { people as empire } from './people-empire.ts'

const core: Person[] = [
  {
    "id": "louis-xiv",
    "name": "Louis XIV",
    "role": "Roi de France de 1643 à 1715, qui gouverne seul à partir de 1661 et installe la cour à Versailles en 1682",
    "born": 1638,
    "died": 1715,
    "certainty": "attested"
  },
  {
    "id": "louis-xvi",
    "name": "Louis XVI",
    "role": "Roi de France de 1774 à 1792, puis « roi des Français » sous la monarchie constitutionnelle, guillotiné le 21 janvier 1793",
    "born": 1754,
    "died": 1793,
    "certainty": "attested"
  },
  {
    "id": "napoleon-bonaparte",
    "name": "Napoléon Bonaparte",
    "role": "Général de la Révolution, Premier consul de 1799 à 1804, empereur des Français de 1804 à 1814 et pendant les Cent-Jours de 1815, mort en exil à Sainte-Hélène",
    "born": 1769,
    "died": 1821,
    "certainty": "attested"
  }
]

export const people: Person[] = [...core, ...royaume, ...empire]

import type { Person } from './schema.ts'

export const people: Person[] = [
  {
    "id": "bertrand-du-guesclin",
    "name": "Bertrand du Guesclin",
    "role": "Chevalier breton né vers 1320, vainqueur à Cocherel en 1364, connétable de France de 1370 à sa mort en 1380 au service de Charles V",
    "died": 1380,
    "certainty": "attested"
  },
  {
    "id": "christine-de-pizan",
    "name": "Christine de Pizan",
    "role": "Femme de lettres née à Venise vers 1364, élevée à la cour de Charles V, veuve en 1390, qui vit de sa plume et meurt vers 1430",
    "certainty": "attested"
  },
  {
    "id": "jacques-coeur",
    "name": "Jacques Cœur",
    "role": "Marchand de Bourges né vers 1400, argentier de Charles VII, enrichi par le commerce du Levant, disgracié en 1451 et mort à Chios en 1456",
    "died": 1456,
    "certainty": "attested"
  },
  {
    "id": "francois-ier",
    "name": "François Ier",
    "role": "Roi de France de 1515 à 1547, vainqueur à Marignan, prisonnier à Pavie, bâtisseur de Chambord et protecteur des lettres et des arts",
    "born": 1494,
    "died": 1547,
    "certainty": "attested"
  }
]

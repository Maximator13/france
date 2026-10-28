export const SITE = {
  origin: 'https://maximator13.github.io',
  base: '/france/',
  name: 'France',
  title: 'France, de Clovis à Napoléon',
  description:
    "Frise chronologique et carte interactives de l'histoire de France, du royaume de Clovis (481) à la chute de l'Empire de Napoléon : rois, batailles, révolutions, dates, niveau de certitude et sources.",
  repository: 'https://github.com/Maximator13/france',
  publisher: 'Maximator13',
} as const

export const SITE_URL = `${SITE.origin}${SITE.base}`

export const ANALYTICS: { goatcounterCode: string | null } = {
  goatcounterCode: null,
}

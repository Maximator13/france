import type { PageId } from '../core/route.ts'
import type { Category, Certainty } from './schema.ts'

export const CERTAINTY: Record<Certainty, { label: string; description: string }> = {
  attested: {
    label: 'Attesté',
    description: 'Fait rapporté par des sources contemporaines ou jugées fiables.',
  },
  traditional: {
    label: 'Traditionnel',
    description: 'Transmis par la tradition : plausible, mais sans source contemporaine.',
  },
  legendary: {
    label: 'Légendaire',
    description: 'Récit légendaire, sans fondement historique établi.',
  },
  debated: {
    label: 'Débattu',
    description: 'Date ou fait discuté par les historiens.',
  },
}

export const CATEGORY: Record<Category, string> = {
  politics: 'Politique',
  war: 'Guerre',
  building: 'Construction',
  religion: 'Religion',
  society: 'Société',
  culture: 'Culture',
  nature: 'Nature',
}

export const UI = {
  brand: 'France',
  subtitle: 'de Clovis à Napoléon',
  tagline:
    "Treize siècles d'histoire de France, du petit royaume franc de Clovis à l'Empire de Napoléon, qui couvre l'Europe en 1811 avant de s'effondrer. Parcourez la frise : chaque événement a sa date, son niveau de certitude et ses sources, et la carte montre le royaume puis l'Empire à l'année près.",
  startCta: 'Commencer en 481',
  timelineLabel: 'Frise chronologique',
  timelineHelp:
    'Molette ou pincement : zoom. Glisser ou flèches : déplacement. Page précédente ou suivante : époque. 0 : vue entière.',
  currentYear: 'Année au centre de la frise',
  close: 'Fermer',
  certainty: 'Certitude',
  category: 'Catégorie',
  era: 'Époque',
  place: 'Lieu',
  people: 'Personnes',
  primarySources: "Sources d'époque",
  republicanDate: 'Calendrier républicain',
  julianNote: "Date du calendrier julien, en usage en France jusqu'en décembre 1582.",
  modernSources: 'Ouvrages de référence',
  openSource: 'consulter',
  legend: 'Certitude',
  notFoundTitle: 'Page introuvable',
  notFoundText: 'Cette adresse ne correspond à aucun contenu du site.',
  backHome: 'Revenir à la frise',
  footerLabel: 'Informations sur le site',
  consentText:
    "Ce site peut mesurer sa fréquentation avec GoatCounter, sans cookie et de façon anonyme, si vous l'acceptez.",
  consentAccept: 'Accepter',
  consentRefuse: 'Refuser',
  consentManage: "Mesure d'audience",
  webglMissing: "La scène 3D ne peut pas s'afficher sur cet appareil ; la frise reste utilisable.",
  sceneLoading: (title: string) => `Chargement : ${title}`,
  sceneKicker: 'Scène 3D',
  sceneOverview: "Vue d'ensemble",
  scenePrevious: 'Point précédent',
  sceneNext: 'Point suivant',
  sceneBack: 'Retour à la carte',
  sceneSteps: 'Étapes du parcours',
  sceneStep: (index: number, total: number) => `Étape ${index} sur ${total}`,
  scenePlanned: 'Cette scène est en préparation : la carte vous montre en attendant le lieu.',
  sceneFailed: "Le modèle 3D de cette scène n'a pas pu être chargé. La carte reste disponible.",
  sceneFailureDetail: 'Détail technique :',
  sceneRetry: 'Réessayer',
  sceneHelp: 'Flèches gauche et droite : changer de point. Glisser : regarder autour. Échap : retour à la carte.',
  sceneEnter: (name: string) => `Visiter ${name} en 3D`,
  sceneDate: 'Date de la scène',
  sceneShortcuts: 'À visiter en 3D',
  soundOn: 'Son : activé',
  soundOff: 'Son : coupé',
  soundLabel: "Son d'ambiance",
  sources: 'Sources',
} as const

export const PAGE_LINKS: { id: PageId; label: string }[] = [
  { id: 'sources', label: 'Sources et crédits' },
  { id: 'mentions-legales', label: 'Mentions légales' },
  { id: 'confidentialite', label: 'Confidentialité' },
  { id: 'conditions', label: "Conditions d'utilisation" },
]

export const LEARN = {
  navLearn: 'Apprendre',
  navSearch: 'Rechercher',
  title: 'Apprendre en jouant',
  intro: "Quatre jeux pour retenir la chronologie de l'histoire de France. Vos scores et les fiches que vous avez ouvertes restent sur cet appareil seulement.",
  seen: (count: number, total: number) => `${count} fiches découvertes sur ${total}`,
  best: (score: number) => `Meilleur score : ${score}`,
  era: 'Époque',
  allEras: 'Toutes les époques',
  start: 'Jouer',
  next: 'Question suivante',
  again: 'Rejouer',
  back: 'Tous les jeux',
  check: 'Valider',
  up: 'Monter',
  down: 'Descendre',
  correct: 'Bonne réponse',
  wrong: (answer: string) => `Réponse : ${answer}`,
  score: (score: number, total: number) => `Score : ${score} sur ${total}`,
  open: 'Ouvrir la fiche',
  games: {
    quiz: { title: 'Quiz', text: 'Dix questions sur les dates, les puissances et les lieux.' },
    ordre: { title: "Remets dans l'ordre", text: 'Classez cinq événements du plus ancien au plus récent.' },
    date: { title: 'Situe la date', text: "Donnez l'année d'un événement, au plus près." },
    ou: { title: 'Où ?', text: "Cliquez sur la carte à l'endroit où l'événement a eu lieu." },
  },
  yearLabel: 'Année',
  pickOnMap: 'Cliquez sur la carte, puis validez.',
  picked: 'Point choisi sur la carte.',
  distance: (km: number) => `Vous êtes à ${km} km du lieu.`,
  searchTitle: 'Rechercher',
  searchLabel: 'Un événement, une personne, un lieu',
  searchEmpty: 'Aucun résultat.',
  kinds: { event: 'Événement', person: 'Personne', place: 'Lieu' },
} as const


import type { PageId } from '../core/route.ts'

export interface Page {
  id: PageId
  title: string
  description: string
  body: string
}

export const pages: Page[] = [
  {
    id: 'mentions-legales',
    title: 'Mentions légales',
    description: 'Éditeur, hébergeur et propriété intellectuelle du site France, de Clovis à Napoléon.',
    body: `## Éditeur

Ce site est édité à titre personnel et non commercial par **Maximator13** (pseudonyme).

Contact : par les [issues du dépôt GitHub](https://github.com/Maximator13/france/issues).

## Hébergeur

GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis ([github.com](https://github.com)), via le service GitHub Pages.

## Propriété intellectuelle

Le code source est publié sous licence MIT. Les contenus originaux (textes, données, modèles 3D et vidéos produits pour le projet) sont publiés sous licence [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr). Les ressources de tiers gardent leur propre licence : voir la page Sources et crédits.`,
  },
  {
    id: 'confidentialite',
    title: 'Confidentialité',
    description: "Données personnelles, stockage local et mesure d'audience sur le site France, de Clovis à Napoléon.",
    body: `## En bref

Ce site ne dépose aucun cookie et ne vous demande aucune donnée personnelle. Toutes ses ressources (code, polices, images, modèles 3D) sont servies par le site lui-même : votre navigateur ne contacte aucun service tiers.

## Stockage dans votre navigateur

Le site peut enregistrer dans votre navigateur (\`localStorage\`) vos préférences (son), votre choix sur la mesure d'audience, votre progression dans les jeux de révision et la liste des scènes visitées et des fiches lues. Ces données restent sur votre appareil ; vous pouvez les effacer à tout moment depuis les réglages de votre navigateur.

## Mesure d'audience

Aucune mesure d'audience n'est active pour l'instant. Si elle est activée, elle reposera sur GoatCounter, un outil sans cookie qui ne conserve pas votre adresse IP, et ne se chargera qu'après votre accord explicite. Vous pourrez retirer cet accord à tout moment.

## Hébergement

L'hébergeur, GitHub, peut journaliser les adresses IP des visiteurs pour assurer la sécurité de son service. Voir la [déclaration de confidentialité de GitHub](https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement).`,
  },
  {
    id: 'conditions',
    title: "Conditions d'utilisation",
    description: "Conditions d'utilisation du site France, de Clovis à Napoléon : accès, contenus, licences et responsabilité.",
    body: `## Objet

France, de Clovis à Napoléon est un site éducatif gratuit, consacré à l'histoire de France, de l'avènement de Clovis (481) à la mort de Napoléon (1821). Il est accessible sans inscription.

## Contenus

Les contenus sont rédigés avec soin et appuyés sur des sources citées pour chaque événement. Les dates traditionnelles, légendaires ou débattues sont signalées comme telles. Le site présente les faits, les sources et les débats des historiens ; il ne prend parti pour aucun régime ni aucun personnage. Il est fourni en l'état, sans garantie d'exactitude ni d'exhaustivité. Pour signaler une erreur, ouvrez une [issue sur le dépôt](https://github.com/Maximator13/france/issues).

## Réutilisation

Vous pouvez réutiliser les contenus originaux selon la licence CC BY 4.0, en citant « France, de Clovis à Napoléon, par Maximator13 » et l'adresse du dépôt. Le code est sous licence MIT. Les ressources de tiers suivent leur propre licence.

## Liens externes

Les liens vers d'autres sites (éditions de sources, ouvrages, bases de données) sont fournis pour information ; l'éditeur n'est pas responsable de leur contenu.

## Évolution

Ces conditions peuvent évoluer avec le site. Elles sont régies par le droit français.`,
  },
  {
    id: 'sources',
    title: 'Sources et crédits',
    description: 'Méthode, conventions de dates, calendriers, sources et crédits du site France, de Clovis à Napoléon.',
    body: `## Méthode

Chaque événement indique sa date, son niveau de certitude et au moins trois sources : des sources d'époque (chroniques, lettres, actes, mémoires, lois, bulletins de l'armée) et des ouvrages d'historiens. Les sources d'époque ne sont pas prises au mot : Grégoire de Tours écrit un siècle après Clovis, les bulletins de la Grande Armée sont de la propagande, les mémoires de Sainte-Hélène construisent une légende. Chaque fiche le dit.

- **Attesté** : fait rapporté par des sources contemporaines ou jugées fiables.
- **Traditionnel** : transmis par la tradition, plausible mais sans source contemporaine.
- **Légendaire** : récit légendaire, sans fondement historique établi (le vase de Soissons tel qu'on le raconte, les mots historiques jamais prononcés).
- **Débattu** : date ou fait discuté par les historiens ; la fourchette est indiquée.

Les effectifs et les pertes des batailles sont toujours donnés en fourchette, avec les historiens qui les avancent.

## Dates et calendriers

La frise va de 481 à 1821, soit 1 340 ans. Les bornes des époques sont des conventions d'historiens, expliquées pour chacune d'elles.

- **Calendrier julien** : en France, le calendrier grégorien remplace le julien en décembre 1582 (le 9 décembre est suivi du 20). Les dates antérieures sont données telles que les sources les donnent, dans le calendrier julien, sans conversion.
- **Calendrier républicain** : institué en 1793, il compte les années depuis le 22 septembre 1792, jour de la proclamation de la République. Le site affiche la date républicaine à côté de la date grégorienne pour tous les jours du 22 septembre 1792 au 31 décembre 1805, date de son abandon, d'après les débuts d'année réellement observés (les années III, VII et XI ont six jours complémentaires).

## Territoires

La carte montre le royaume des Francs, puis le royaume de France avec ses grands fiefs, la République et l'Empire, les possessions anglaises, l'État bourguignon et les États satellites de l'Empire, année par année. Ces tracés viennent d'une base de données mondiale, Cliopatria ; ils sont simplifiés et leurs frontières restent approximatives, surtout avant le XVIIe siècle, quand la souveraineté se mesurait en fidélités plus qu'en lignes.

## Crédits

- Polices : EB Garamond (Georg Duffner et Octavio Pardo) et Bodoni Moda (Owen Earl), sous licence SIL Open Font License 1.1.
- Bibliothèques : React, three.js, React Three Fiber, drei, troika-three-text, meshoptimizer, Zustand et marked (licence MIT), postprocessing (licence zlib), N8AO (licence ISC), Basis Universal (licence Apache 2.0), GSAP (licence gratuite propre à Webflow).
- Relief et fonds marins : NOAA NCEI, ETOPO 2022 (CC0 1.0), [doi:10.25921/fd45-gt74](https://doi.org/10.25921/fd45-gt74).
- Traits de côte et lacs : Made with Natural Earth (domaine public).
- Lieux et villes : [Wikidata](https://www.wikidata.org), CC0 1.0, coordonnées vérifiées une à une.
- Territoires année par année : J. S. Bennett, E. Mutch, A. Tollefson et al., [Cliopatria v0.2.1](https://github.com/Seshat-Global-History-Databank/cliopatria) (Seshat Global History Databank), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) ; données modifiées (extraction des entités franques, françaises, anglaises, bourguignonnes et napoléoniennes, simplification, dates et étiquettes corrigées).
- Sons d'ambiance : enregistrements du domaine public et sous CC0 (Wikimedia Commons, Freesound, xeno-canto, OpenGameArt) ; vagues : « Smallwaves » par Torsten Nilsson, Work With Sounds, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), modifié. Détail dans le fichier CREDITS.md du dépôt.

La liste complète des ressources, avec leurs auteurs, licences et modifications, est tenue à jour dans le fichier [CREDITS.md](https://github.com/Maximator13/france/blob/main/CREDITS.md) du dépôt.`,
  },
]

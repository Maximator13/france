# France, de Clovis à Napoléon

Cahier des charges d'un site jumeau de « Roma, de Romulus à Constantin XI » (https://maximator13.github.io/roma/, dépôt `C:\Users\maxim\Projets VSCode\roma`), cette fois sur l'histoire de France, avec l'Empire de Napoléon pour sommet. Il existe aussi un second jumeau, « Hellas » (`C:\Users\maxim\Projets VSCode\hellas`), sur le monde grec. Titre de travail, modifiable.

Ce fichier contient tout ce qu'il faut pour refaire, sur un autre sujet, ce qui a été construit pour Roma et Hellas : la vision, les contraintes, la méthode, l'architecture qui a marché, les pièges déjà rencontrés et les préférences de l'utilisateur. Il est écrit pour Claude, qui le lit en premier à chaque session.

## 0. Mode d'emploi

1. Créer un dossier vide, par exemple `C:\Users\maxim\Projets VSCode\france`, et un dépôt GitHub public `france` (compte Maximator13).
2. Copier ce fichier dans `docs/BRIEF.md` du nouveau dépôt.
3. Créer `CLAUDE.md` à la racine à partir du modèle de la section 14.
4. Première session : « Lis docs/BRIEF.md et lance la phase 0. »

Bornes à trancher en phase 0, avec une recommandation chiffrée (nombre d'événements, de scènes, de tranches de territoire) :
- **A. L'épopée napoléonienne seule** (de 1769, naissance de Bonaparte, à 1821, mort à Sainte-Hélène) : un site court, très dense en batailles.
- **B. La France de Clovis à Napoléon** (de 481 à 1815) : treize siècles, l'Empire en apothéose. **Recommandé** : même ampleur que Roma (environ 1 300 ans), et l'Empire garde la place d'honneur.
- **C. De la Gaule à 1945** : trop vaste pour la qualité visée ; à garder pour plus tard.

## 1. Vision

Un site web statique, publié sur GitHub Pages, pour étudier l'histoire de France, du baptême de Clovis à la chute de Napoléon. La frise chronologique est la colonne vertébrale : on la parcourt, et chaque événement important ouvre une scène 3D cinématique : la carte du royaume qui grandit province par province, puis l'Empire qui couvre l'Europe en 1811 et se rétracte, l'intérieur des cathédrales et des palais, des batailles en mouvement.

Deux publics à la fois : l'utilisateur, pour apprendre la chronologie (dates fiables, sources, jeux de révision), et les visiteurs de son GitHub, qui doivent être saisis dès les premières secondes.

Critères de réussite :
- Tout événement se retrouve en trois interactions au plus, avec sa date, son niveau de certitude et ses sources.
- Les trente premières secondes (intro, carte, frise) donnent envie de continuer.
- 60 images/s visées sur un portable récent sans carte graphique dédiée (machine de mesure : i7-1065G7, Intel Iris Plus, 12 Go) ; ailleurs, la qualité s'adapte automatiquement.

## 2. Contraintes

**GitHub Pages**
- Site 100 % statique, déployé par un workflow GitHub Actions.
- Limites : site publié de 1 Go au plus, fichier de 100 Mo au plus, déploiement de 10 min au plus. Budget interne : site complet de 600 Mo au plus.
- Le site vit sous `/france/` : la `base` de Vite, les décodeurs (Meshopt, KTX2) et tous les assets en tiennent compte.
- Routage par hash : chaque événement et chaque scène a une URL partageable qui survit au rechargement (`#/evenement/bataille-d-austerlitz`, `#/scene/sacre-de-napoleon`).
- Les binaires lourds ne vont jamais dans l'historique Git (voir section 5).

**Budget de performance** (mesuré et reporté dans PROGRESS à chaque phase)
- Premier écran utile : 5 Mo téléchargés au plus.
- Chaque scène 3D chargée à la demande : 20 Mo au plus hors vidéo. Chaque vidéo : 20 Mo au plus.
- Géométrie compressée (Meshopt), textures KTX2, instanciation pour tout ce qui se répète (colonnes, soldats, maisons, chevaux).
- Qualité adaptative (résolution, ombres, post-traitement) et mode léger pour mobile.
- Leçon de Roma : le chargement réel s'est révélé bien plus rapide que prévu. On peut viser des scènes riches (15 à 18 Mo optimisés, environ 2 millions de triangles affichés, 350 appels de dessin), à condition de mesurer.

**Licences**
- Uniquement des ressources gratuites, aucune API payante.
- Par ordre de préférence : ce qu'on crée dans Blender, puis CC0 et domaine public, puis CC BY, polices OFL. CC BY-SA et ODbL acceptées en documentant l'obligation de partage à l'identique. Toute ressource NC ou ND : demander d'abord.
- Chaque ressource externe entre dans `CREDITS.md` (source, auteur, licence, modifications) et sur la page « Sources et crédits » du site au moment où elle est ajoutée.

**Langue et style**
- Interface et contenus en français ; code, types et commits en anglais. Identifiants de contenu en slugs français, réutilisés dans les URL. Tous les textes vivent dans les fichiers de données.
- Aucun tiret cadratin ni demi-cadratin, nulle part (site, documentation, commits) : virgules, deux-points, parenthèses, et « de 1799 à 1815 » pour les intervalles. Un script de contrôle le vérifie.
- Le code ne contient aucun commentaire : des noms explicites et des fonctions courtes portent le sens. Le même script le vérifie.
- Rien de ce qui est publié ne mentionne l'outil de production : ni le code, ni la documentation publiée, ni le site, ni l'historique Git (aucune ligne de co-auteur, de session ou de signature dans les commits ni les pull requests).

**Prérequis web non négociables** (préférences globales de l'utilisateur)
- HTTPS forcé ; aucune clé dans le front ; anti-spam sur tout formulaire ; sauvegardes.
- Bandeau cookies avec consentement avant tout script de mesure ; pages Mentions légales, Confidentialité, Conditions d'utilisation.
- Mobile first ; images en WebP, chargement différé, minification ; contrastes vérifiés ; page 404 personnalisée.
- Meta title et description uniques par page ; `alt` sur toutes les images ; `robots.txt`, `sitemap.xml` ; Search Console préparée.
- Open Graph et Twitter Cards ; mesure d'audience respectueuse du consentement ; un seul appel à l'action principal par page ; favicon.

## 3. Stack

Reprendre celle de Roma, éprouvée : Vite, TypeScript strict, React 19, three.js, React Three Fiber, drei, @react-three/postprocessing (avec N8AO pour l'occlusion), GSAP pour les mouvements de caméra, Zustand pour l'état, zod pour valider les données au build, marked pour le markdown des fiches, Vitest, Playwright, ESLint. Node 24 ou plus. Polices auto-hébergées via Fontsource.

## 4. Point de départ : le code de Roma

Ne pas repartir de zéro. Le dépôt Roma contient un moteur complet et testé, à copier puis à adapter (Hellas en est une copie déjà adaptée à un autre sujet : s'y référer pour voir ce qui change d'un sujet à l'autre).

| Partie de Roma | À reprendre | À changer |
|---|---|---|
| `src/core/` (dates, routes, mouvement réduit, son d'ambiance) | tel quel | les bornes ; ajouter le calendrier républicain (section 8) |
| `src/timeline/` (frise à zoom sémantique, pistes parallèles, certitude) | tel quel | les pistes (royaume, Empire, coalitions, colonies) |
| `src/map/` (carte en relief, territoires animés par année, villes, itinéraires) | le moteur | `MAP_BOUNDS` (de l'Atlantique à Moscou pour 1812, du Portugal au Danemark), les données |
| `src/stage/` (Canvas unique, étalonnage par époque, qualité adaptative, HUD `?debug`, bascule carte et scène) | tel quel | les étalonnages des époques françaises |
| `src/scenes/kit/` (chargement glTF, atmosphère, nuages, eau animée, grain du sol, rail de caméra, vie, fumées, feux) | tel quel | ajouter la fumée de poudre noire des batailles |
| `src/scenes/battle/` (maquette tactique de Cannes) | le moteur | unités napoléoniennes (colonne, ligne, carré, artillerie à cheval), fumée et portée des canons |
| `src/learn/` (Apprendre : quiz, ordre, date, où ; Rechercher) | tel quel | les pistes exclues du quiz, l'échelle du jeu « Où ? » (100 points sous 30 km, 0 au-delà de 500 km pour la France seule) |
| `src/collection/` (cartes à collectionner : paquet du jour, raretés, séries, dieux à part) | tel quel | les séries : rois, maréchaux, batailles, monuments, régiments, objets (la redingote grise, le bicorne, l'épée d'Austerlitz) |
| `scripts/` (validation, contrôle de style, assets, post-build, relief, territoires, illustrations des cartes) | tel quel | les sources géographiques |
| `blender/kit/` (ordres, géométrie, matériaux, terrain, personnages, vie) | comme base | gothique (voûtes d'ogives, arcs-boutants, rosaces), architecture classique (Versailles, Invalides), uniformes |
| `tests/`, `.github/workflows/deploy.yml` | tel quel | les routes testées, le nom du dépôt |

Lire d'abord dans Roma : `docs/ARCHITECTURE.md` (surtout le contrat des scènes), `docs/DESIGN.md`, `docs/PROGRESS.md` (décisions et problèmes connus), `CLAUDE.md` (pièges), puis `docs/APPRENDRE.md` et la note sur la collection. Copier le code, pas l'historique Git.

## 5. Architecture qui a marché (à conserver)

- **Un seul Canvas WebGL 2**, monté une fois, derrière l'interface : la carte et les scènes s'y succèdent, la caméra circule sans rechargement.
- **La frise est en DOM**, accessible au clavier et aux lecteurs d'écran.
- **Routage par hash**, plus une page statique par événement et par scène prête (générée au post-build) pour les moteurs de recherche et les réseaux sociaux, avec Open Graph propre.
- **Données** : un fichier par type dans `src/data/` (époques, pistes, événements, lieux, personnes, villes, scènes, itinéraires, pages), validé par zod au build ; `npm run validate` refuse une scène « prête » sans son module ni son script Blender.
- **Assets lourds** : jamais dans Git. `npm run assets` optimise (gltf-transform, Meshopt, KTX2, `prune` avec `keepLeaves: true`) ; `npm run assets:publish -- --only=scenes/<id>/<id>.glb` publie dans une GitHub Release `assets-vN` et met à jour un manifeste versionné (chemin, taille, SHA-256, release) ; `npm run assets:pull` les récupère en CI, avec cache.
- **Contrat des scènes** (dans le `.glb` exporté par Blender) :
  - `poi_<id>` (caméra) et `poi_<id>_target` (sujet) pour chaque point d'intérêt, plus `poi_vue-d-ensemble` ;
  - `walk_<trajet>_<nn>` posés exactement sur le sol, espacés de 3 m au plus ; maillages `walker_<variante>` (pieds à l'origine, hors scène) ;
  - `smoke_<n>`, `birds_<n>`, `ash_<n>`, `eruption_vent`, `beacon` (feu), `oculus` et `sunbeam_target` (rayon de lumière) ;
  - matériaux nommés `water`, `sea` ou `river` : remplacés par une eau animée qui reflète le ciel ;
  - matériaux `terrain*` et `ground*` : grain de détail au sol ;
  - extra `cast_shadow: false` sur les petits objets.
- **Une scène simple tient en une configuration** (`ModelScene`) : modèle, soleil, brume, ciel, vue d'ensemble, exposition propre, intérieur éventuel. Le cartel de chaque point (titre, texte, sources) vit dans `src/data/scenes.ts`.
- **Son d'ambiance** libre (CC0), coupé par défaut, choisi par point d'intérêt (agora, port, chantier, foule, vent, fontaine…).
- **Rendu** : tonemapping neutre (Khronos PBR Neutral, pas ACES qui délave), étalonnage par époque, léger halo sur les sources lumineuses, ombres selon la qualité, occlusion N8AO.
- **Apprendre et Rechercher** (`src/learn/`) : quatre jeux et une recherche plein texte, progression dans `localStorage` sous try/catch ; sur téléphone, le jeu « Où ? » passe en feuille basse pour laisser la carte cliquable, et la légende d'époque se masque pendant ce jeu.
- **Collection de cartes** (`src/collection/`) : page à part (`#/collection`), paquet du jour au tirage déterministe par date, raretés, séries, illustrations libres de droits créditées, construite à partir des données du site.
- **Séances parallèles** : deux sessions qui travaillent dans le même dossier ne doivent jamais faire `git add` d'un dossier entier ; chacune n'ajoute que ses propres fichiers, et `git pull --rebase --autostash` avant de pousser.

## 6. Production 3D avec Blender

- Blender 5.2.2 LTS : `C:\Program Files\Blender Foundation\Blender 5.2\blender.exe` (hors PATH). KTX-Software 4.4.2 : `C:\Program Files\KTX-Software\bin\ktx.exe`. ffmpeg et gh dans le PATH.
- Chaque scène a son script `blender/<id>.py` qui la reconstruit entièrement et exporte le glTF ; le script est la source de vérité. Le code commun vit dans `blender/kit/`, le code propre à une scène dans `blender/kit/<id>_*.py`.
- Terrain réel : RGE ALTI et BD ORTHO de l'IGN (Licence Ouverte Etalab 2.0, déjà utilisés par Roma pour Nîmes et Arles) en France ; Copernicus DEM GLO-30 (attribution) ailleurs (Austerlitz, Wagram, Waterloo, Moscou). Restituer le terrain d'époque : haies, chemins creux, villages, bois et cours d'eau d'après les cartes de Cassini (XVIIIe siècle, domaine public) et les cartes d'état-major (XIXe siècle).
- Architecture : gothique (Notre-Dame avant Viollet-le-Duc, sans la flèche du XIXe siècle ; Reims ; la Sainte-Chapelle), châteaux forts, classique (Versailles, les Invalides, la place Vendôme et sa colonne de 1810), Paris d'avant Haussmann (rues étroites, ponts couverts de maisons jusqu'à la fin du XVIIIe siècle).
- Personnages low poly faits par script, instanciés, posés au sol, vêtus selon la date exacte : uniformes napoléoniens changeant d'une année à l'autre (bicorne puis shako, règlement Bardin de 1812), couleurs par régiment, Garde impériale (bonnets d'ours), cavalerie (cuirassiers, hussards, lanciers polonais), artillerie et ses attelages ; costumes civils par siècle.
- Batailles napoléoniennes : la fumée de poudre noire masquait le champ de bataille, c'est un trait d'époque à montrer (et un vrai défi de lisibilité : la rendre réglable).
- Plans pré-rendus : EEVEE, 1920×1080, 24 i/s, 8 à 15 s, MP4 H.264 et image d'affiche. Tout rendu de plus de 10 minutes : estimation et accord avant de lancer.
- Ressources : Poly Haven et ambientCG (CC0) ; Gallica, Paris Musées et la base Joconde (POP) pour les références visuelles, licence vérifiée image par image ; Sketchfab seulement modèle par modèle, licence vérifiée.

## 7. Direction artistique : réalisme stylisé, éclairé comme un film, et vif

- Formes simplifiées, proportions et matériaux fidèles : pierre de taille, vitraux, ors des Bourbons, marbres de Versailles, toiles des tentes, drapeaux et aigles, couleurs vives des uniformes (bleu de la ligne, blanc des Autrichiens, rouge des Anglais, vert des Russes).
- Références d'ambiance, toutes du domaine public : les tableaux de David (le Sacre), Gros (Eylau, Jaffa), Gérard (Austerlitz), Vernet, Meissonier (1814, la campagne de France), et les enluminures (Très Riches Heures du duc de Berry) pour le Moyen Âge.
- Leçon de Roma : l'utilisateur trouve vite un rendu « fade ». Viser d'emblée des couleurs saturées et lumineuses, un tonemapping neutre (Khronos PBR Neutral), et vérifier sur captures que rien n'est gris ni délavé.
- Étalonnage par époque, qui glisse de l'un à l'autre en parcourant la frise (accent de l'interface et lumière de la carte et des scènes) :
  - Mérovingiens et Carolingiens : or des reliquaires, lumière de bougie, bois sombre.
  - Moyen Âge capétien : bleu de France et or des lys, lumière des vitraux.
  - Renaissance et guerres de Religion : rouges profonds, lumière de la Loire.
  - Grand Siècle : or de Versailles, ciel limpide, soleil d'apparat.
  - Révolution : tricolore, ciel d'orage, contraste fort.
  - Consulat et Empire : vert impérial et or des abeilles, pourpre, soleil d'Austerlitz.
- Carte : relief stylisé dont la teinte suit l'époque (choix de l'utilisateur sur Roma, préféré à un fond réaliste), couleurs franches, mer animée.
- Interface sobre autour de la 3D : fiches en cartels de musée, titres dans une capitale classique française (une police OFL d'inspiration Didot ou Garamond, à choisir), texte en sérif de lecture.

## 8. Contenu historique

### Époques (bornes conventionnelles, que le site explique)

| Époque | Dates (option B) | Remarques |
|---|---|---|
| Francs et Mérovingiens | de 481 à 751 | Clovis roi des Francs en 481 ou 482 ; baptême vers 496 ou 498, date débattue |
| Carolingiens | de 751 à 987 | sacre de Pépin ; Charlemagne empereur le 25 décembre 800 ; partage de Verdun en 843 |
| Capétiens directs | de 987 à 1328 | Hugues Capet ; Bouvines (1214) ; Saint Louis |
| Valois et guerre de Cent Ans | de 1328 à 1589 | Crécy, Azincourt, Jeanne d'Arc, Renaissance, guerres de Religion |
| Bourbons, la monarchie absolue | de 1589 à 1789 | Henri IV, Richelieu, Louis XIV et Versailles |
| Révolution | de 1789 à 1799 | de la prise de la Bastille au coup d'État du 18 Brumaire |
| Consulat et Premier Empire | de 1799 à 1815 | sacre le 2 décembre 1804, apogée territoriale en 1811 et 1812, Waterloo, les Cent-Jours |

### Pistes parallèles

La frise a des pistes par puissance, actives selon leurs dates : le royaume de France puis l'Empire ; la Bourgogne des Valois et l'Angleterre pendant la guerre de Cent Ans ; les coalitions contre la France (une piste par coalition, de la première en 1792 à la septième en 1815) ; les États satellites de l'Empire (royaumes de Naples, de Hollande, de Westphalie, d'Espagne, Confédération du Rhin, duché de Varsovie) ; les colonies (Saint-Domingue, Louisiane, Égypte en 1798 à 1801).

### Modèle de données (repris de Roma)

Le même type `HistoricalEvent` que Roma et Hellas (identifiant en slug français, date, précision, certitude, époque, piste, catégorie, importance, lieu, résumé, corps en markdown, sources, personnes, scène). Les dates restent des années astronomiques via le module unique, même si tout est après J.-C. : le code reste commun aux trois sites.

Particularités françaises :
- **Calendrier républicain** (du 22 septembre 1792 au 31 décembre 1805) : afficher la date d'époque à côté de la date grégorienne (« 18 brumaire an VIII, 9 novembre 1799 »), avec un module de conversion testé.
- **Passage au calendrier grégorien** en France en décembre 1582 (le 9 décembre est suivi du 20) : les dates antérieures sont juliennes, le dire.
- **Noms** : Bonaparte jusqu'en 1804, Napoléon ensuite ; titres de noblesse d'Empire des maréchaux (Ney, prince de la Moskova), à afficher selon la date.

### Exactitude, priorité absolue (pièges propres au sujet)

- **Légendes à distinguer des faits** : le vase de Soissons et le baptême de Clovis (Grégoire de Tours, un siècle plus tard), « Paris vaut bien une messe », « L'État, c'est moi », « Qu'ils mangent de la brioche » (jamais dit par Marie-Antoinette), « La Garde meurt mais ne se rend pas » (attribuée à Cambronne, qui l'a niée), Bonaparte sur le pont d'Arcole (tableau de Gros, épisode embelli par la propagande).
- **Mythes modernes** : Napoléon n'était pas petit (environ 1,69 m, dans la moyenne de son temps ; la confusion vient des pouces français et de la caricature anglaise).
- **Chiffres** : effectifs et pertes des batailles toujours en fourchette avec la source (Grande Armée de 1812 : de 450 000 à 680 000 hommes selon ce qu'on compte ; pertes de la retraite de Russie débattues).
- **Sujets graves traités sans détour** : la Terreur, les guerres de Vendée, le rétablissement de l'esclavage en 1802 et l'expédition de Saint-Domingue, la guerre d'Espagne. Le site n'est pas un panégyrique : présenter les faits, les sources et les débats d'historiens.
- **Anachronismes à éviter** : pas de drapeau tricolore avant 1790, pas de Marseillaise avant 1792, pas de flèche de Viollet-le-Duc sur Notre-Dame avant 1859, pas d'Arc de triomphe de l'Étoile achevé avant 1836, pas de shako avant les années 1800, pas de bonnets d'ours partout (Garde et grenadiers seulement).
- Ce dont on n'est pas sûr va dans `docs/A_VERIFIER.md`, avec la meilleure hypothèse et les sources : l'utilisateur tranche.

### Sources de données (licence à vérifier avant usage)

- **Wikidata** (CC0) : personnes, lieux, dates, à recouper avec une source historique avant publication.
- **IGN** (Licence Ouverte) : relief, orthophotos, cartes historiques (Cassini, état-major) sur le Géoportail.
- **Gallica et data.bnf.fr** : textes et images du domaine public ; data.bnf.fr est sous Licence Ouverte.
- **Base POP (Mérimée, Joconde)** : monuments et œuvres, Licence Ouverte pour les notices ; photos à vérifier une par une.
- **Paris Musées Collections** : œuvres du domaine public en CC0.
- **Cliopatria** (CC BY 4.0, déjà utilisé par Roma) : territoires par année ; vérifier la couverture des États napoléoniens. Là où il manque des données, tracer des polygones approximatifs, citer les sources et montrer l'imprécision (bords flous).
- **ETOPO 2022** (domaine public) et Natural Earth (domaine public) pour la carte.
- Correspondance de Napoléon (édition de la Fondation Napoléon), mémoires (Las Cases, Marbot, Caulaincourt), bulletins de la Grande Armée (propagande : à citer comme telle), Tulard (Dictionnaire Napoléon), Lentz.

## 9. L'expérience

- **Intro**, passable : le globe, la plongée vers la France, Paris, le titre.
- **Frise** : toujours présente, navigable à la molette, au glisser, au clavier et au toucher ; zoom sémantique, des siècles au jour (l'Empire se lit presque au jour près) ; pistes parallèles ; indicateur de certitude par la forme, jamais la couleur seule ; recherche.
- **Carte** : de l'Atlantique à Moscou, synchronisée avec l'année de la frise : royaume, provinces réunies à la couronne, Empire et États satellites, coalitions, itinéraires animés (campagne d'Italie, d'Égypte, d'Austerlitz, de Russie et la retraite, le vol de l'Aigle en 1815 de Golfe-Juan à Paris).
- **Monuments et villes** : caméra guidée sur un rail entre des points d'intérêt, regard libre limité, cartels, son d'ambiance, passants, fumées, oiseaux, nuages, eau animée.
- **Batailles** : maquette tactique 3D (terrain réel, unités en formation, 1 figurine = N soldats avec l'échelle affichée, phases scriptées, lecture, pause, défilement, flèches de manœuvre, vue tactique et vue rasante, fumée de poudre réglable), plus un ou deux plans pré-rendus aux moments décisifs.
- **Apprendre et Rechercher** : repris de Roma (quiz, remets dans l'ordre, situe la date, où ? sur la carte, progression locale, recherche sans accents ni casse).
- **Collection de cartes** : reprise de Roma, sur une page à part qui n'empiète pas sur l'expérience principale (paquet du jour, raretés, séries, illustrations libres du domaine public).

## 10. Scènes envisagées (ordre de départ, modifiable)

Pour chaque scène : proposition vérifiée, production, captures, puis validation par l'utilisateur.

1. **Le sacre de Napoléon à Notre-Dame, 2 décembre 1804** : la nef décorée pour l'occasion (décor éphémère de Percier et Fontaine), l'assistance, le pape Pie VII ; d'après David, sans copier. Tranche verticale « monument ».
2. **Austerlitz, 2 décembre 1805** : maquette tactique, le soleil qui perce le brouillard sur le plateau de Pratzen, les étangs gelés (et le mythe des milliers de noyés, à démentir). Tranche verticale « bataille ».
3. **Waterloo, 18 juin 1815** : Hougoumont, la Haie-Sainte, les charges de cavalerie de Ney, l'arrivée des Prussiens, la Garde.
4. **Versailles sous Louis XIV, vers 1685** : la galerie des Glaces achevée en 1684, les jardins de Le Nôtre, la cour.
5. **La prise de la Bastille, 14 juillet 1789**.
6. **Paris vers 1250 sous Saint Louis** : la Sainte-Chapelle, Notre-Dame, l'île de la Cité, le Louvre de Philippe Auguste.
7. **Azincourt, 25 octobre 1415** : boue, archers anglais, chevalerie française.
8. **Le baptême de Clovis à Reims** (date débattue).
9. **La retraite de Russie, passage de la Bérézina, novembre 1812** : neige, ponts des pontonniers d'Éblé.
10. **La campagne d'Égypte, 1798** : la bataille des Pyramides, les savants (et les pyramides de Gizeh déjà faites pour Roma : réutiliser le modèle à la date de 1798).

L'utilisateur aime les scènes spectaculaires (éruption du Vésuve, phare allumé) : prévoir des moments forts (soleil d'Austerlitz, charge des cuirassiers, incendie de Moscou en septembre 1812, feux d'artifice du sacre).

## 11. Méthode de travail

- Une phase à la fois. En fin de phase : mettre à jour `docs/PROGRESS.md` (fait, décisions, problèmes connus, suite), commit, push, vérifier le site déployé, puis attendre la validation. Si l'utilisateur dit de travailler en autonomie (« fais tout sans me demander », « toute la nuit »), enchaîner sans attendre, tout noter dans PROGRESS comme « fait sans validation », et ne s'arrêter que pour ce qui est irréversible ou interdit.
- Commits petits et fréquents, en anglais, sans aucune ligne d'attribution.
- Chaque changement visuel se vérifie sur des captures Playwright regardées avant de le dire terminé. Pour juger le rendu, lancer Chromium sur le vrai GPU (`--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist`) : en headless logiciel (SwiftShader), le WebGL tourne à 2 i/s. Comparer avant et après côte à côte (ffmpeg `hstack`).
- Les i/s se mesurent chez l'utilisateur avec le HUD `?debug` ; les demander en fin de phase visuelle.
- Compromis de performance, de poids, de licence ou d'exactitude : deux ou trois options chiffrées, une recommandation, l'utilisateur choisit.
- Chaque scène est un module autonome (`src/scenes/<id>/` et `blender/<id>.py`) chargé à la demande.
- Donner souvent des nouvelles courtes : l'utilisateur suit depuis son téléphone et demande « t'en es où ».

### Chaîne de production d'une scène (a fait ses preuves sur Roma)

Lancée en arrière-plan par sous-agents ou workflow, deux scènes en parallèle au plus (Blender tourne sur le même portable) :
1. **Recherche** : proposition complète (date justifiée, monuments avec dimensions, état à la date, coordonnées et Pleiades, vie et lumière, points d'intérêt et cartels, plan de caméra, événements liés, assets libres, budget, anachronismes, doutes).
2. **Vérification contradictoire** : un second agent cherche à réfuter chaque date, chiffre, citation et licence, corrige et déplace l'incertain dans les doutes.
3. **Construction Blender** par script, avec rendus de prévisualisation regardés et itérés, puis `npm run assets` et rapport de poids.
4. **Relecture** par un historien et un chef opérateur (sur les rendus).
5. **Correction** des remarques.
6. **Intégration** par la session principale : `src/scenes/<id>/index.tsx`, entrée dans `src/data/scenes.ts` (points et cartels), ville et événements liés, sons, crédits, `docs/scenes/<id>.md`, `A_VERIFIER`, captures, publication de l'asset, commit, push, vérification en ligne.

## 12. Phases

### Phase 0 : cadrage (aucun code)
Lire ce brief et le code de Roma ; trancher les bornes (section 0), les époques, les pistes et l'emprise de la carte ; vérifier les sources de données et leurs licences ; proposer le plan de la phase 1. Attendre la validation.

### Phase 1 : fondations et déploiement
Copier et adapter le moteur de Roma ; dépôt, CI, déploiement Pages, pages légales, bandeau cookies, SEO, 404, frise avec une vingtaine d'événements, carte avec relief, premiers territoires, calendrier républicain testé. Site en ligne.

### Phase 2 : tranche verticale
Plan de design (palette nommée, typographies, principes) à valider ; carte animée à au moins cinq dates (dont 1214, 1659, 1789, 1811 et 1815) avec un itinéraire napoléonien ; une scène monument (le sacre) ; une bataille (Austerlitz) ; transitions continues frise, carte, scène. Terminé quand le parcours fonctionne en ligne, que chaque scène tient son budget et que l'utilisateur a validé le rendu sur sa machine.

### Phase 3 : tout le contenu et l'apprentissage
Environ 250 événements, tous les rois et souverains (avec les régences), les maréchaux d'Empire, les lieux, les territoires de toutes les époques ; Apprendre, Rechercher et la collection de cartes adaptés.

### Phase 4 : les scènes, une par une
Selon la section 10.

### Phase 5 : finitions
Intro définitive, son, accessibilité (clavier, contrastes, sous-titres, mouvement réduit), mobile, README avec captures et GIF, `CREDITS.md` complet, audit Lighthouse noté dans PROGRESS.

## 13. Pièges déjà rencontrés sur Roma (à éviter d'emblée)

- Les outils d'écriture de fichiers et les heredocs convertissent les séquences d'échappement des tirets U+2013 et U+2014 en vrais tirets : les construire avec `String.fromCharCode(0x2013, 0x2014)` dans le script de contrôle.
- `prune()` de gltf-transform supprime les nœuds vides : sans `keepLeaves: true`, les repères `poi_<id>` disparaissent.
- Passants les pieds dans le sol : la géométrie optimisée perd la transformation du nœud ; recaler chaque modèle pour que le bas de sa boîte englobante soit à l'origine, et poser les trajets exactement sur le sol.
- En développement, React monte puis démonte chaque effet : ne jamais libérer un modèle 3D dans un nettoyage immédiat (libération différée), sinon `compileAsync` attend des programmes détruits.
- Les étiquettes 3D (troika) lancent un worker dont la requête `blob:` ne finit jamais sur mobile émulé : ne jamais attendre `networkidle` dans Playwright.
- `vite preview` renvoie l'application pour toute adresse : le vrai 404 ne se vérifie qu'en ligne.
- Un sous-agent peut se voir refuser l'exécution de Blender : la session principale peut le lancer. Vérifier les rapports des agents avant de supposer qu'un modèle existe.
- Les tests Playwright expirent quand Blender tourne en parallèle sur la même machine : relancer, ou se fier à la CI.
- Un `.glb` produit par une autre session n'est pas en local : `npm run assets:pull` avant de tester.
- Eau : des vagues régulières créent du moirage au loin ; les filtrer selon la taille du pixel (`fwidth`).
- Ciel très lumineux (éruption, brume dense) : prévoir une exposition propre à la scène.
- Push : d'abord `git pull --rebase`, d'autres sessions poussent aussi. Si `gh` n'est pas dans le PATH de la session : `git -c credential.helper= -c "credential.helper=!'/c/Program Files/GitHub CLI/gh.exe' auth git-credential" push`.
- Suivi du déploiement : `"/c/Program Files/GitHub CLI/gh.exe" run watch <id> --exit-status`.

## 14. Modèle de CLAUDE.md pour le nouveau dépôt

```markdown
# France : mémoire de projet

Au début de chaque session, lire `docs/BRIEF.md` (cahier des charges) puis `docs/PROGRESS.md` (avancement et décisions). Ne pas les importer ici.

## Règles fixes

- Une phase à la fois. En fin de phase : mettre à jour PROGRESS, commit, push, vérifier le site déployé, puis attendre la validation (sauf autonomie accordée).
- Interface et contenus en français ; code, types et commits en anglais ; slugs français dans les URL.
- Aucun commentaire dans le code. Aucun tiret cadratin ni demi-cadratin nulle part (site, docs, commits) : virgules, deux-points, parenthèses.
- Rien de publié ne mentionne l'outil de production : pas de ligne de co-auteur, de session ni de signature. Garde-fous locaux non versionnés : `.claude/settings.local.json` (attribution vide), `.git/hooks/commit-msg`, `.git/info/exclude`.
- Années astronomiques (1 av. J.-C. = 0), toujours via le module de dates unique.
- Toute ressource externe entre dans `CREDITS.md` au moment de l'ajout ; licence NC ou ND : demander d'abord.
- Compromis de performance, poids, licence ou exactitude : deux ou trois options chiffrées, une recommandation, l'utilisateur choisit.
- Fait incertain : `docs/A_VERIFIER.md`, avec hypothèse et sources.
- Rendu Blender de plus de 10 minutes : estimation et accord avant de lancer.
- Changement visuel : captures Playwright regardées avant de le déclarer terminé.

## Outils locaux

- Blender 5.2.2 LTS : `C:\Program Files\Blender Foundation\Blender 5.2\blender.exe` (hors PATH).
- KTX-Software 4.4.2 : `C:\Program Files\KTX-Software\bin\ktx.exe` (hors PATH, à ajouter au PATH du script d'assets).
- ffmpeg et gh (compte Maximator13) dans le PATH.
- Machine de mesure : i7-1065G7, Intel Iris Plus, 12 Go.
- Projet de référence : `C:\Users\maxim\Projets VSCode\roma` (même moteur, sujet romain).

## Commandes

- `npm run dev` : développement (http://localhost:5173/france/).
- `npm run check` : style (commentaires, tirets), ESLint, typage, Vitest.
- `npm run build` : validation des données, build, pages de partage, budget du site.
- `npm run test:e2e` : Playwright sur le build (desktop et mobile).
- `npm run assets`, `npm run assets:publish -- --only=<chemin>`, `npm run assets:pull` : fichiers lourds.

## Pièges connus

Reprendre la section 13 du brief et la compléter au fil des sessions.
```

## 15. Préférences de l'utilisateur (constatées sur Roma)

- Écrit en français, souvent vite et sans accents : comprendre l'intention, ne pas faire répéter.
- Veut de l'efficacité et de l'autonomie : quand il dit « fais tout », « bosse toute la nuit », « fais ce que tu veux », avancer au maximum sans poser de questions, en parallèle quand c'est possible, et tout consigner dans PROGRESS.
- Aime le spectaculaire et le vivant : détails, foules, fumées, eau, sons, lumière de cinéma, couleurs franches. Trouve vite un rendu « fade ».
- Tient à ses choix de style : il a préféré garder la carte stylisée dont la couleur suit l'époque, simplement plus vive. Proposer un changement de direction artistique avant de le faire.
- Suit l'avancement depuis son téléphone : messages d'état courts et fréquents, captures envoyées quand une scène est en ligne.
- Mesure lui-même la fluidité sur son portable ; lui dire où cliquer (`?debug`) et quoi relever.

# Avancement

Le cahier des charges est dans `docs/BRIEF.md`, le cadrage dans `docs/CADRAGE.md`. Ce fichier garde l'état du projet d'une session à l'autre.

## Après la phase 1 : polices et collection de cartes (28 octobre 2026, à ta demande)

**Fait**
- Polices changées pour ne plus ressembler à Roma et Hellas, qui partagent EB Garamond : Playfair Display (didone de titrage, graisses 400 et 600, 500 pour les noms de la carte) et Spectral (texte, dessinée par Production Type à Paris, 400, italique et 600). Bodoni Moda et EB Garamond sont retirées.
- Collection de cartes rétablie, avec le moteur de Hellas : paquet du jour, cinq raretés, doublons changés en écus, fabrication, séries par époque et par type, récompenses d'exploration. Habillage français : sceau et dos de carte à la fleur de lys, frise de losanges, monnaie en écus, type « Œuvre » à la place de « Divinité ».
- 120 cartes, 20 par période (Mérovingiens et Carolingiens, Capétiens, Valois, Bourbons, Révolution, Empire et épilogue) : 7 légendaires (Clovis, Charlemagne, Saint Louis, Jeanne d'Arc, Louis XIV, Déclaration des droits de l'homme, Napoléon). Chaque carte est sourcée et relue par un second passage indépendant (faits, licences, cadrage). Il y a 31 personnes et 20 lieux de plus.
- 120 illustrations tirées de Wikimedia Commons (domaine public, CC0, CC BY ou CC BY-SA, aucune NC ni ND), recadrées par `scripts/cards-art.ts` (14,5 Mo, chargées à la demande) ; crédits image par image dans `CREDITS.md`.
- Rechercher et Apprendre étaient déjà en ligne depuis la phase 1 (menu du haut) ; inchangés.

**Mesures** : 187 tests unitaires ; Playwright vert sur ordinateur et mobile, ouverture d'un paquet comprise ; site publié 29,8 Mo, 320 fichiers.

**À vérifier** : 91 doutes de rédaction ajoutés à `docs/A_VERIFIER.md` (points 53 à 143). Quelques illustrations restent modestes (gardes françaises, mousquetaires, aigle de régiment).

## Phase 1 : fondations et déploiement (28 octobre 2026, faite en autonomie, en attente de ta validation)

Site en ligne : https://maximator13.github.io/france/ (dépôt https://github.com/Maximator13/france).

**Fait**
- Moteur de Hellas copié sans son historique, ses scènes ni sa collection de cartes (collection reportée en phase 3, comme le prévoit le brief) ; moteur de bataille gardé, son test reviendra avec Austerlitz en phase 2.
- Identité France : titre, description, Open Graph, image de partage régénérée, favicon provisoire (fleur de lys d'or sur bleu), clés `france.*` du stockage local, manifeste d'assets vide, README, licences, crédits.
- Années de 481 à 1821, huit époques et leurs étalonnages (or des reliquaires, pourpre carolingien, bleu de France, rouge Renaissance, or de Versailles, ciel d'orage révolutionnaire, vert impérial, épilogue assombri).
- **Calendrier républicain** : conversion par table des débuts d'année réels, affichée dans chaque fiche datée au jour du 22 septembre 1792 au 31 décembre 1805 ; mention du calendrier julien avant décembre 1582. Huit tests, dont 9 thermidor an II, 18 brumaire an VIII et le sixième jour complémentaire de l'an III.
- Vingt et une pistes (France, Angleterre, État bourguignon, Nouvelle-France, Louisiane, Saint-Domingue, Égypte, sept coalitions, sept États satellites).
- Contenu : 27 événements sourcés (de 3 à 5 sources chacun), 25 lieux, 85 personnes, 43 villes dont 41 vérifiées dans Wikidata (libellé et coordonnées relus par l'API) ; pages Mentions légales, Confidentialité, Conditions d'utilisation, Sources et crédits (méthode, calendriers, territoires). Deux fiches ajoutées au plan : le traité des Pyrénées et l'abolition de l'esclavage de 1794, qui éclaire celle de 1802.
- Carte : emprise de 12 O à 40 E et de 27 à 58 N, relief ETOPO 2022 à 60 pixels par degré (option A, deux moitiés de 0,7 Mo), cadrages France, Europe, Égypte et Russie selon l'année.
- Territoires Cliopatria de 481 à 1821 sans aucune année vide pour la France : 264 tranches, 468 Ko ; Angleterre, Bourgogne, royaumes d'Italie, de Naples, de Hollande, de Westphalie, d'Espagne, Confédération du Rhin, duché de Varsovie ; erreurs de la source corrigées (Naples napoléonien coupé avant 1806, Angleterre jointe à l'Empire angevin de 1147 à 1168).
- Site racine `maximator13.github.io` : France ajoutée à la page d'accueil et son sitemap à `robots.txt`.

**Mesures**
- Premier écran en ligne : 1,43 Mo sur ordinateur et sur mobile (budget 5 Mo).
- Site publié : 14,8 Mo, 71 fichiers (dont 11 Mo de sons d'ambiance repris de Roma).
- `npm run check` : 160 tests unitaires ; Playwright : 12 tests (6 sur ordinateur, 6 sur mobile), verts en local, en CI et sur le site en ligne.
- Vérifié en ligne : redirection HTTP vers HTTPS, statut 404 sur une adresse inconnue, 28 adresses dans `sitemap.xml`, titre propre sur les pages de partage.
- Images par seconde : à relever sur ton portable avec `?debug`.

**Décisions prises en autonomie** (détail dans la section 8 de `docs/CADRAGE.md`)
- Pas de rangées repliées codées pour les coalitions et les satellites : les rangées dynamiques de Hellas suffisent pour l'instant.
- Royaume tracé avec ses grands fiefs ; domaine royal et mouvance distingués en phase 2.
- Seuls neuf événements en importance 1, pour que la vue d'ensemble reste lisible.
- Lien de fin de frise vers Roma retiré (il prolongeait Hellas vers Rome, sans équivalent ici).

**Problèmes connus**
- Sur la carte, les noms des puissances chevauchent parfois ceux des villes (Poitiers sous « France »).
- L'ouverture d'une fiche depuis une autre époque laisse parfois la légende de l'ancienne époque pendant l'animation de la frise.
- Aucune plage de jours dans le modèle de données (18 Brumaire, Bérézina) : la durée est dans le texte.
- `docs/A_VERIFIER.md` : 52 points, dont 34 venus de la rédaction des fiches.

**Ce que j'attends de toi**
1. Ouvrir https://maximator13.github.io/france/ et dire si le rendu te plaît (couleurs des époques, polices, carte, collection).
2. Mesures du HUD sur ton portable, Chrome ou Edge en plein écran : https://maximator13.github.io/france/?debug, noter i/s, durée d'image, appels de dessin et qualité, à l'arrivée et en faisant glisser la frise.
3. Relire `docs/A_VERIFIER.md` quand tu veux.
4. Search Console : ajouter une propriété « Préfixe d'URL » pour `https://maximator13.github.io/france/` (validation par fichier HTML, donne-moi le nom du fichier), puis déclarer `sitemap.xml`.

**Suite** : phase 2 (plan de design, carte animée aux dates clés avec un itinéraire napoléonien, le sacre, Austerlitz).

## Phase 0 : cadrage (27 octobre 2026, validée le 27 octobre)

**Fait**
- Dossier `C:\Users\maxim\Projets VSCode\france`, dépôt git local sur `main`, brief copié dans `docs/BRIEF.md`, `CLAUDE.md` d'après le modèle du brief.
- Garde-fous locaux copiés de Roma : hook de message de commit, exclusions locales, attribution vide.
- Lecture de l'architecture, du design, de l'avancement et des pièges de Roma, et du cadrage et de l'avancement de Hellas.
- Mesure directe de Cliopatria v0.2.1 sur l'emprise de la France : couverture très bonne de 481 à 1815 (96 tranches pour le royaume, domaine royal et mouvance séparés), défauts listés.
- Licences des sources vérifiées ; Gallica et les cartes de Cassini signalées.
- Tout est dans `docs/CADRAGE.md` ; les points douteux dans `docs/A_VERIFIER.md` (18 points).

**Décisions** : toutes les recommandations de la section 8 de `docs/CADRAGE.md`, validées le 27 octobre 2026.

**Problèmes connus**
- Le dossier `france-simulator` voisin est un projet Roblox sans rapport.

**Suite** : phase 1.

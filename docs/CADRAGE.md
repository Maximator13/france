# Cadrage (phase 0)

Décisions de cadrage proposées pour France, à valider avant la phase 1. Établi le 27 octobre 2026 à partir du brief, du code et des documents de Roma, du cadrage de Hellas et d'une mesure directe de Cliopatria v0.2.1.

## 1. Bornes

| Option | Étendue | Événements visés (phase 3) | Scènes | Tranches de territoire (Cliopatria) |
|---|---|---|---|---|
| A. L'épopée napoléonienne | de 1769 à 1821, 52 ans | 120 environ, presque tous des batailles | 6 à 8 | 15 environ |
| B. De Clovis à Napoléon | de 481 à 1815, 1 334 ans | 250 environ | 10 | 230 environ |
| C. De la Gaule à 1945 | de 58 av. J.-C. à 1945, 2 000 ans | 400 et plus | 15 et plus | 300 et plus, avec des trous après 1819 |

**Recommandation : B, avec un épilogue jusqu'en 1821.** La frise s'ouvre en 481 et se ferme en 1821 (mort à Sainte-Hélène), comme Hellas s'ouvre sur un prologue minoen. Sans cet épilogue, les Cent-Jours et Waterloo sont collés au bord de la frise et l'exil n'existe pas. Même ampleur que Roma (2 205 ans là-bas, 1 340 ici), et l'Empire reste l'apothéose : de 1799 à 1815, la frise se lit presque au jour près.

## 2. Époques

Intervalles semi-ouverts, comme Hellas : une époque commence à sa borne incluse et s'arrête juste avant la suivante. Toutes les années sont après J.-C. ; le module de dates de Roma reste tel quel (années astronomiques), seules `FIRST_YEAR` et `LAST_YEAR` changent (481 et 1821).

| id | Libellé | Bornes | Conventions concurrentes expliquées sur le site |
|---|---|---|---|
| `merovingiens` | Francs et Mérovingiens | de 481 à 751 | avènement de Clovis en 481 ou 482 ; début possible en 486 (Soissons) |
| `carolingiens` | Carolingiens | de 751 à 987 | sacre de Pépin en 751 (Soissons) ou en 754 (Saint-Denis, par le pape) |
| `capetiens` | Capétiens directs | de 987 à 1328 | |
| `valois` | Valois, de la guerre de Cent Ans aux guerres de Religion | de 1328 à 1589 | Renaissance souvent comptée à part, de 1494 à 1559 |
| `bourbons` | Bourbons, la monarchie absolue | de 1589 à 1789 | « Ancien Régime » dès 1515 chez certains auteurs |
| `revolution` | Révolution | de 1789 à 1799 | fin en 1795 (Directoire) ou en 1804 selon les manuels |
| `empire` | Consulat et Premier Empire | de 1799 à 1815 | |
| `exil` | Épilogue : l'exil | de 1815 à 1821 | époque courte, sans étalonnage propre (celui de l'Empire, assombri) |

Étalonnage de chaque époque : celui de la section 7 du brief (or des reliquaires et bougie ; bleu de France et or des lys ; rouges profonds et lumière de la Loire ; or de Versailles ; tricolore et ciel d'orage ; vert impérial, or des abeilles et soleil d'Austerlitz). Les époques Capétiens et Valois partagent une même famille de bleus, à distinguer en phase 2.

## 3. Pistes

Vingt et une pistes. Comme Hellas, les rangées de la frise sont attribuées dynamiquement aux pistes qui ont des événements à l'écran ; le moteur est repris tel quel.

| id | Libellé | Active | Remarque |
|---|---|---|---|
| `royaume` | Francs, royaume de France, République, Empire | de 481 à 1821 | piste principale ; son libellé suit la date (royaume des Francs, Francie occidentale, royaume de France, République, Empire) |
| `angleterre` | Angleterre et possessions anglaises en France | de 1066 à 1558 | de la conquête normande à la perte de Calais |
| `bourgogne` | État bourguignon des Valois | de 1363 à 1477 | de Philippe le Hardi à la mort de Charles le Téméraire |
| `nouvelle-france` | Nouvelle-France | de 1534 à 1763 | à ajouter au brief : premier empire colonial, perdu au traité de Paris |
| `saint-domingue` | Saint-Domingue | de 1697 à 1804 | du traité de Ryswick à l'indépendance d'Haïti |
| `louisiane` | Louisiane | de 1682 à 1803 | cédée à l'Espagne en 1762, rétrocédée en 1800, vendue en 1803 |
| `egypte` | Expédition d'Égypte | de 1798 à 1801 | |
| `coalition-1` à `coalition-7` | Les sept coalitions | 1re de 1792 à 1797, 2e de 1798 à 1802, 3e en 1805, 4e de 1806 à 1807, 5e en 1809, 6e de 1812 à 1814, 7e en 1815 | sept pistes, une par coalition, comme le demande le brief |
| `italie` | Royaume d'Italie | de 1805 à 1814 | à ajouter au brief : le plus grand des États satellites |
| `naples` | Royaume de Naples | de 1806 à 1815 | Joseph puis Murat |
| `hollande` | Royaume de Hollande | de 1806 à 1810 | Louis Bonaparte, puis annexion |
| `rhin` | Confédération du Rhin | de 1806 à 1813 | |
| `westphalie` | Royaume de Westphalie | de 1807 à 1813 | Jérôme Bonaparte |
| `varsovie` | Duché de Varsovie | de 1807 à 1815 | occupé par la Russie dès 1813 |
| `espagne` | Espagne de Joseph Bonaparte | de 1808 à 1813 | et la guerre d'Espagne |

Avec ces plages, en 1809 on compte quatorze pistes actives : la frise de Roma n'en montre que quatre ou cinq à la fois. Proposition : en vue d'ensemble, les coalitions se regroupent sur une seule rangée « Coalitions » et les États satellites sur une rangée « États satellites » ; elles ne se déplient qu'au zoom (fenêtre de moins de 30 ans). C'est le seul vrai ajout au moteur de frise.

## 4. Carte

**Emprise des données : de 12 ouest à 40 est, de 27 à 58 nord** (52 degrés sur 31).

| Bord | Lieux qui le fixent |
|---|---|
| Ouest | Lisbonne (9,1 O), Torres Vedras, cap Finisterre, Bretagne et Irlande |
| Est | Moscou (37,6 E), Borodino (35,8 E), Saint-Jean-d'Acre (35,1 E) |
| Nord | Copenhague (55,7 N), Moscou (55,8 N), Smolensk, Vilnius, Tilsit |
| Sud | Le Caire et les Pyramides (30 N), Alexandrie, Aboukir, Tunis (mort de Saint Louis), Gibraltar |

Saint-Domingue, la Louisiane et la Nouvelle-France sont hors carte : elles vivent sur la frise et dans les fiches. Un encart de carte n'est pas prévu (à rediscuter en phase 3).

Cadrages de caméra : `france` (de 5,5 O à 10 E, de 41 à 51,5 N ; par défaut jusqu'en 1791), `europe` (de 10 O à 30 E, de 36 à 56 N ; Révolution et Empire), `russie` (de 0 à 40 E, de 46 à 58 N ; 1812), `egypte` (de 25 à 37 E, de 28 à 34 N ; 1798 à 1801).

**Relief.** L'emprise de Roma (de 13 O à 53 E, de 22 à 59 N) contient déjà toute celle-ci : son extrait ETOPO 2022 se recadre sans nouveau téléchargement.

| Option | Contenu | Netteté sur la France | Poids estimé |
|---|---|---|---|
| A | relief de Roma recadré, 3 120 × 1 860 (60 px par degré) | environ 1,3 km par pixel en longitude | 1,0 Mo |
| B | A plus une texture de détail de la France (240 px par degré, 3 720 × 2 520), chargée après le premier écran | environ 0,35 km par pixel, provinces et vallées lisibles | 1,0 Mo puis 2,5 Mo |
| C | une seule texture de 4 056 × 2 418 (78 px par degré) | environ 1 km par pixel partout | 1,6 Mo |

Recommandation : **A en phase 1, B en phase 2.** Le sujet zoome sans cesse sur la France (le royaume qui grandit province par province), ce que Roma n'a jamais fait et qui y a laissé un problème connu de netteté.

**Territoires.** Mesure directe sur `cliopatria_polities_only_v021.geojson` (573 entités dans l'emprise entre 481 et 1815) :

- **Couverture très bonne.** Royaume des Francs (de 462 à 849, 50 tranches), Francie occidentale (de 850 à 989, 21 tranches), royaume de France (de 990 à 1791, **96 tranches**), Première République (1792 à 1795), Directoire (1796 à 1799), Consulat (1800 à 1804), Premier Empire (1805 à 1814, apogée de 1 240 000 km² en 1811), France de la Restauration (1815). Bretagne ducale (de 947 à 1491), Bourgogne (de 1385 à 1481), Angleterre, Empire angevin (de 1147 à 1209), Aquitaine, Toulouse, Savoie, Lorraine, Navarre. Pour l'Empire : Confédération du Rhin, Westphalie, Varsovie, Naples, Berg, république batave, Suisse, royaume d'Espagne.
- **Deux couches pour le royaume.** Cliopatria sépare le domaine royal (« Kingdom of France » : 49 000 km² en 990, 240 000 en 1285, 534 000 en 1789) de la mouvance (« (Kingdom of France) », grands fiefs compris, 802 000 km²). C'est exactement la vision du brief : le domaine qui grandit à l'intérieur du royaume. Proposition : domaine en couleur pleine, mouvance en hachures.
- **Défauts à corriger à l'import :**
  - « Kingdom of Naples (Napoleonic) » commence en 1762 : à couper à 1806 ;
  - le royaume de Hollande (de 1806 à 1810) est compté comme « Batavian Republic », le royaume d'Italie (de 1805 à 1814) comme « Italian Republic » : à renommer selon la date ;
  - le domaine royal de 1139 à 1151 inclut l'Aquitaine d'Aliénor (164 000 km²) : correct dans les faits, à expliquer ;
  - trous : Angleterre de 1072 à 1209 (couverte par « Norman England » et l'Empire angevin), Bourgogne de 1018 à 1384, aucune tranche française en 1795 et 1796 entre République et Directoire ;
  - les Cent-Jours (1815) n'existent pas : on reprend la France de 1814 ;
  - résolution temporelle de l'Empire : une tranche pour 1807 et 1808, une pour 1812 et 1813. Les annexions de 1810 (Hollande, Hambourg) tombent en 1811 : tracés de complément pour la phase 2.
- **Volume estimé** : 230 tranches dans l'emprise, de l'ordre de 900 Ko simplifiées (Roma : 282 tranches, 877 Ko).

Instantanés de la phase 2 : 511 (mort de Clovis), 843 (Verdun), 1180 (avènement de Philippe Auguste), 1214, 1429, 1659, 1789, 1811, 1815.

**Lieux.** Pleiades ne couvre que l'Antiquité. Le champ `pleiadesId` reste facultatif et un champ `wikidataId` s'y ajoute, avec des coordonnées vérifiées sur Wikidata et GeoNames.

## 5. Sources de données et licences

Vérifiées le 27 octobre 2026.

| Source | Licence | Usage prévu | Verdict |
|---|---|---|---|
| Cliopatria v0.2.1 (Seshat) | CC BY 4.0 | territoires de 481 à 1815 | oui, déjà en cache dans Roma, corrections ci-dessus |
| ETOPO 2022 (NOAA) | domaine public | relief de la carte | oui, extrait de Roma réutilisable |
| Natural Earth 5.1.2 | domaine public | côtes, fleuves (Loire, Seine, Rhin, Danube, Niémen, Bérézina) | oui ; retirer barrages et canaux modernes |
| IGN (RGE ALTI, BD ORTHO) | Licence Ouverte Etalab 2.0 | relief et sol des scènes en France | oui, déjà utilisé par Roma |
| Copernicus DEM GLO-30 | licence Copernicus, mention obligatoire | Austerlitz, Waterloo, Borodino, Bérézina, Gizeh | oui |
| Cartes de Cassini et d'état-major (Géoportail, désormais Cartes.gouv) | non trouvée | référence visuelle seulement pour modeler haies, bois et villages ; aucune reproduction | à vérifier avant toute reproduction |
| Wikidata | CC0 | identifiants, coordonnées, dates à recouper | oui, jamais seule source d'une date |
| GeoNames | CC BY 4.0 | recoupement des coordonnées | oui |
| Paris Musées Collections | CC0 pour les œuvres du domaine public | illustrations des cartes de collection, références | oui |
| Base POP (Mérimée, Joconde) | Licence Ouverte pour les notices ; photos souvent « © RMN » | notices oui ; photos une par une, la plupart non réutilisables | notices seulement |
| Gallica | réutilisation non commerciale libre avec la mention « Source gallica.bnf.fr / BnF » ; réutilisation commerciale payante | textes et images du domaine public | **assimilable à une clause NC** : à ta décision (voir section 8) |
| data.bnf.fr | Licence Ouverte | métadonnées des œuvres et des auteurs | oui |
| Wikimedia Commons, Met, Rijksmuseum, National Gallery of Art | domaine public ou CC0, vérifié image par image | tableaux de David, Gros, Gérard, Vernet, Meissonier ; enluminures | oui, alternative à Gallica pour les mêmes œuvres |
| Sons de Roma | CC0 | ambiances (foule, vent, fontaine, chantier) | oui ; à compléter par des sons de bataille CC0 (canon, tambours) |

**Polices (Fontsource, OFL 1.1).**

| Usage | Police | Allure |
|---|---|---|
| Titres (recommandée) | Bodoni Moda | didone à fort contraste, la plus proche du Didot de l'Empire ; capitales espacées |
| Titres (variante) | Playfair Display SC | didone plus douce, meilleure lisibilité en petit |
| Titres (variante) | Cormorant SC | Garamond de titrage, plus Renaissance qu'Empire |
| Texte | EB Garamond | reprise de Roma, déjà testée |

Recommandation : Bodoni Moda et EB Garamond en provisoire, à confirmer sur une planche comparative du plan de design de la phase 2.

## 6. Premiers événements (phase 1)

Vingt-cinq événements sur toutes les époques et plusieurs pistes, dont Charles le Téméraire pour la piste bourguignonne et la mort de Napoléon pour l'épilogue. Les dates discutées et les choix de certitude sont dans `docs/A_VERIFIER.md`. Les dates de 1793 à 1805 portent aussi leur date républicaine, calculée par le module de conversion.

| id | Date | Certitude | Piste | Lieu | Sources |
|---|---|---|---|---|---|
| `clovis-roi-des-francs` | 481 ou 482 | débattue | royaume | Tournai | Grégoire de Tours, *Histoire des Francs*, II ; Rouche, *Clovis* (1996) |
| `bapteme-de-clovis` | vers 496 à 499, un 25 décembre | débattue | royaume | Reims | Grégoire de Tours, II, 31 ; lettre d'Avit de Vienne à Clovis |
| `bataille-de-vouille` | 507 | attestée | royaume | Vouillé (lieu discuté) | Grégoire de Tours, II, 37 |
| `sacre-de-pepin-le-bref` | 751 | attestée | royaume | Soissons | *Annales regni Francorum* ; *Continuations de Frédégaire* |
| `couronnement-de-charlemagne` | 25 décembre 800 | attestée | royaume | Rome | Éginhard, *Vie de Charlemagne*, 28 ; *Annales regni Francorum* (année 801) |
| `traite-de-verdun` | août 843 | attestée | royaume | Verdun | *Annales de Saint-Bertin*, année 843 |
| `election-d-hugues-capet` | 987 | attestée | royaume | Senlis, sacre à Noyon | Richer de Reims, *Histoires*, IV ; Sassier, *Hugues Capet* (1987) |
| `bataille-de-bouvines` | 27 juillet 1214 | attestée | royaume | Bouvines | Guillaume le Breton, *Gesta Philippi Augusti* et *Philippide* ; Duby, *Le Dimanche de Bouvines* (1973) |
| `consecration-de-la-sainte-chapelle` | 26 avril 1248 | attestée | royaume | Paris | Le Goff, *Saint Louis* (1996) |
| `bataille-de-crecy` | 26 août 1346 | attestée | angleterre | Crécy-en-Ponthieu | Froissart, *Chroniques*, I ; Sumption, *The Hundred Years War*, I (1990) |
| `bataille-d-azincourt` | 25 octobre 1415 | attestée | angleterre | Azincourt | Monstrelet, *Chronique* ; Curry, *Agincourt: A New History* (2005) |
| `levee-du-siege-d-orleans` | 8 mai 1429 | attestée | royaume | Orléans | procès de condamnation et de réhabilitation ; Contamine, Bouzy, Hélary, *Jeanne d'Arc, histoire et dictionnaire* (2012) |
| `mort-de-charles-le-temeraire` | 5 janvier 1477 | attestée | bourgogne | Nancy | Commynes, *Mémoires*, V ; Schnerb, *L'État bourguignon* (1999) |
| `massacre-de-la-saint-barthelemy` | 24 août 1572 | attestée | royaume | Paris | Jouanna, *La Saint-Barthélemy* (2007) |
| `edit-de-nantes` | avril 1598 | attestée | royaume | Nantes | texte de l'édit (Archives nationales) ; Garrisson, *L'Édit de Nantes et sa révocation* (1985) |
| `la-cour-s-installe-a-versailles` | 6 mai 1682 | attestée | royaume | Versailles | Solnon, *La Cour de France* (1987) ; Sarmant, *Louis XIV* (2012) |
| `prise-de-la-bastille` | 14 juillet 1789 | attestée | royaume | Paris | Godechot, *La Prise de la Bastille* (1965) ; Lüsebrink et Reichardt, *The Bastille* (1997) |
| `execution-de-louis-xvi` | 21 janvier 1793 (2 pluviôse an I) | attestée | royaume | Paris | Martin, *Nouvelle histoire de la Révolution française* (2012) |
| `coup-d-etat-du-18-brumaire` | 9 et 10 novembre 1799 (18 et 19 brumaire an VIII) | attestée | royaume | Paris et Saint-Cloud | Tulard, *Le 18 Brumaire* (1999) ; Lentz, *Le 18-Brumaire* (1997) |
| `retablissement-de-l-esclavage` | 20 mai 1802 (30 floréal an X) | attestée | saint-domingue | Paris | loi du 30 floréal an X ; Bénot, *La Démence coloniale sous Napoléon* (1992) |
| `sacre-de-napoleon` | 2 décembre 1804 (11 frimaire an XIII) | attestée | royaume | Paris, Notre-Dame | Tulard (dir.), *Dictionnaire Napoléon* ; Lentz, *Nouvelle histoire du Premier Empire*, I (2002) |
| `bataille-d-austerlitz` | 2 décembre 1805 (11 frimaire an XIV) | attestée | coalition-3 | Austerlitz (Slavkov u Brna) | 30e bulletin de la Grande Armée (propagande, citée comme telle) ; Goetz, *1805: Austerlitz* (2005) |
| `passage-de-la-berezina` | du 26 au 29 novembre 1812 | attestée | coalition-6 | Studianka | Caulaincourt, *Mémoires* ; Lentz, *Nouvelle histoire du Premier Empire*, II (2004) |
| `bataille-de-waterloo` | 18 juin 1815 | attestée | coalition-7 | Waterloo, Mont-Saint-Jean | Houssaye, *1815, Waterloo* (1898) ; Hofschröer, *1815: The Waterloo Campaign* (1998 et 1999) |
| `mort-de-napoleon` | 5 mai 1821 | attestée | royaume | Sainte-Hélène | Las Cases, *Mémorial de Sainte-Hélène* ; Lentz et Macé, *La Mort de Napoléon* (2009) |
## 7. Ce qui change dans le moteur de Roma

Inventaire fait sur le code de Roma (et l'écart déjà mesuré par Hellas) :

| Partie | Changement |
|---|---|
| `src/core/dates.ts` | `FIRST_YEAR = 481`, `LAST_YEAR = 1821` ; nouveau module `republican.ts` (voir ci-dessous) ; mention « calendrier julien » pour les dates antérieures au 20 décembre 1582 |
| `src/core/` | noms selon la date (Bonaparte puis Napoléon, titres des maréchaux) : une fonction `nameAt(person, date)` |
| `src/data/schema.ts` | catégories reprises de Hellas ; champ `wikidataId` ; plages de jours (`endDate`) pour la Bérézina, le 18 Brumaire et les sièges, problème connu de Roma |
| `src/timeline/` | rangées repliées « Coalitions » et « États satellites » en vue d'ensemble |
| `src/map/geo.ts` | `MAP_BOUNDS = { west: -12, east: 40, south: 27, north: 58 }` ; cadrages de la section 4 |
| `src/map/` | rendu multicolore de Hellas, plus domaine royal plein et mouvance hachurée |
| `src/scenes/battle/` | repris de Roma en phase 2 avec les unités napoléoniennes et la fumée |
| identité | `site.ts`, `index.html`, Open Graph, favicon, clés `france.*` de `localStorage`, manifeste d'assets vide |

**Calendrier républicain.** Conversion par table des débuts d'année réels (équinoxe à Paris, pas la règle de Romme jamais appliquée) : an I le 22 septembre 1792, an II le 22 septembre 1793, an III le 22 septembre 1794, an IV le 23 septembre 1795, an V le 22 septembre 1796, an VI le 22 septembre 1797, an VII le 22 septembre 1798, an VIII le 23 septembre 1799, an IX le 23 septembre 1800, an X le 23 septembre 1801, an XI le 23 septembre 1802, an XII le 24 septembre 1803, an XIII le 23 septembre 1804, an XIV le 23 septembre 1805. Douze mois de trente jours puis cinq ou six jours complémentaires (six les années III, VII et XI). Le calendrier n'est affiché que du 22 septembre 1792 au 31 décembre 1805 (son usage officiel commence en réalité en octobre 1793, de façon rétroactive). Cas testés : 2 pluviôse an I, 18 brumaire an VIII, 30 floréal an X, 11 frimaire an XIII et XIV, jours complémentaires de l'an III, 10 nivôse an XIV (31 décembre 1805).

## 8. Décisions à prendre

1. **Bornes** : B avec épilogue jusqu'en 1821 (recommandé), B strict jusqu'en 1815, ou A.
2. **Pistes ajoutées au brief** : Nouvelle-France et royaume d'Italie (recommandé : oui).
3. **Relief** : A en phase 1 puis B en phase 2 (recommandé), ou C.
4. **Gallica** : sa clause est non commerciale. Recommandé : ne rien reproduire depuis Gallica et prendre les mêmes œuvres du domaine public sur Wikimedia Commons, Paris Musées ou les grands musées en CC0 ; Gallica reste une source de lecture et de citation.
5. **Police des titres** : Bodoni Moda (recommandé), Playfair Display SC ou Cormorant SC.
6. **Dépôt GitHub** : créer `Maximator13/france` public maintenant, ou au début de la phase 1 (recommandé : au début de la phase 1).
7. **Site racine** : ajouter France à la page d'accueil et au `robots.txt` de `maximator13.github.io`, comme pour Hellas (recommandé : oui, en fin de phase 1).

**Décisions prises le 27 octobre 2026** : toutes les recommandations ci-dessus (B avec épilogue jusqu'en 1821, Nouvelle-France et royaume d'Italie, relief A puis B, rien de reproduit depuis Gallica, Bodoni Moda, dépôt créé au début de la phase 1, site racine mis à jour en fin de phase 1).

Écarts pendant la phase 1 :
- les rangées repliées « Coalitions » et « États satellites » n'ont pas été codées : la frise de Hellas attribue déjà ses quatre rangées secondaires aux pistes qui ont le plus d'événements à l'écran, et les coalitions, qui se suivent sans se chevaucher, partagent une rangée ;
- le royaume est tracé avec ses grands fiefs ; le domaine royal en couleur pleine dans la mouvance hachurée est reporté en phase 2 ;
- la collection de cartes de Hellas est retirée jusqu'à la phase 3 ;
- `endDate` (plages de jours) n'est pas ajouté : les fiches du 18 Brumaire et de la Bérézina donnent la durée dans leur texte.

## 9. Plan de la phase 1 : fondations et déploiement

| # | Étape | Taille |
|---|---|---|
| 1 | Copier le moteur de Hellas (le plus récent : rendu multicolore, rangées dynamiques, Apprendre) sans historique ni scènes ; `npm ci` ; `npm run check` au vert | petite |
| 2 | Identité France : `site.ts`, `index.html`, Open Graph, favicon provisoire (fleur de lys et abeille), clés de stockage, manifeste vide, README, licences | petite |
| 3 | Bornes, huit époques et leurs étalonnages ; module du calendrier républicain et ses tests ; mention julien ou grégorien | moyenne |
| 4 | Vingt et une pistes et rangées repliables (coalitions, satellites) | moyenne |
| 5 | Contenu : les vingt-cinq événements, leurs lieux (Wikidata) et personnes, une quarantaine de villes, accueil, pages légales et Sources | moyenne |
| 6 | Relief option A recadré depuis Roma, points de contrôle du test refaits, quatre cadrages | petite |
| 7 | Territoires Cliopatria de 481 à 1815 avec corrections, domaine royal et mouvance | grande |
| 8 | Tests de bout en bout, image de partage, `CREDITS.md`, contrôle des poids (premier écran sous 5 Mo) | petite |
| 9 | Dépôt public, Pages par GitHub Actions, push, vérifications en ligne (HTTPS, 404, sitemap, pages de partage) | petite |

Hors phase 1 : texture de détail de la France, tracés de complément de l'Empire, itinéraires napoléoniens, unités du moteur de bataille, gothique et uniformes du kit Blender (phase 2).

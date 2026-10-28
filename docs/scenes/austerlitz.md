# Scène : la bataille d'Austerlitz (2 décembre 1805)

Identifiant de scène : `austerlitz`. Année astronomique : 1805. Tranche verticale « bataille » de la phase 2.

Statut : proposition vérifiée, relue par un historien militaire et un chef opérateur (28 octobre 2026), remarques « must » et « should » appliquées. Les points incertains sont rassemblés dans la section « Doutes ».

Convention de lecture : « attestée » signifie rapporté par les témoins et les ouvrages de référence sans contradiction sérieuse ; « traditionnelle », transmis par les mémoires et la tradition mais invérifiable ; « débattue », contesté par les sources ou les historiens ; « légendaire », récit sans valeur historique démontrable. Les heures sont en heure solaire vraie au Pratzeberg (le moteur calcule le soleil en heure solaire).

## Date et lumière

**Lundi 2 décembre 1805 (11 frimaire an XIV), un an jour pour jour après le sacre.** Certitude : attestée.

Calcul pour 49,13° N, déclinaison du soleil de -21,9° :
- lever vers 7 h 45 et coucher vers 16 h 15, heure solaire (soit environ 7 h 34 et 16 h 04 en temps moyen local, l'équation du temps valant environ +11 minutes début décembre) ;
- soleil à 19° seulement à midi, au sud : lumière rasante toute la journée, ombres longues ;
- à 9 h, soleil à 9° vers le sud-est (azimut 141°), dans le dos des divisions de Soult qui montent vers le plateau depuis l'ouest et le nord-ouest.

Météo : brouillard épais dans les fonds (vallée du Goldbach, étangs) à l'aube, dissipé sur les hauteurs vers 8 h 30 à 9 h (attestée ; l'heure varie selon les témoins), froid sec, étangs couverts d'une glace mince (attestée). Le « soleil d'Austerlitz » qui perce la brume au-dessus du plateau est attesté comme phénomène ; son rôle de signal est une construction de la légende impériale.

Rendu :
- chaque phase porte une heure (`hour`, position du soleil), une brume (`mist`, de 0 à 1) et une lumière (`light` : intensité et couleur du soleil, couleur du brouillard), fondues sur les 60 premiers pour cent de la phase ;
- la brume est faite de sept nappes posées entre 192 m et un plafond qui descend quand elle se lève (plafond = 192 + 66 × racine de `mist`) : à 0,45, il est vers 236 m, si bien que le Pratzeberg (325 m), Staré Vinohrady (292 m) et Pratzen (249 m) sortent au soleil tandis que Telnitz, Sokolnitz et le Goldbach (195 à 211 m) restent noyés ; les nappes s'estompent au contact du sol (relief lu dans une texture), s'éclaircissent vers le soleil (diffusion avant) et sont plus chaudes en haut ;
- phases 1 et 2 : soleil voilé (0,7 puis 1, gris bleuté), ciel caché par le brouillard (dôme de la couleur du brouillard tant que la brume dépasse 0,3) ; phase 3 : percée du soleil (3,6, doré `#ffcf8f`) ; phases 4 à 6 : 3, `#ffe2c0` ; phase 7 : 2,6 ; phase 8 : 1,6 orangé, soleil bas à 15 h 30 ;
- choix de lisibilité : les deux premières phases sont éclairées à 8 h 18 et 8 h 42 (soleil à 4° et 7°), un peu après les heures affichées ;
- vue tactique de la phase 3 orientée vers le sud-est (`view` : lacet 140°, inclinaison 30°), à contre-jour ; vue rasante de la phase 3 prise du Zuran, poste de Napoléon, vers le Pratzeberg (azimut 163°, focale 28°) : le soleil à 141° est en haut à gauche, à contre-jour ;
- brouillard de distance réduit à 35 % en vue tactique pour ne pas délaver la carte.

## Le site

### Repère local

Origine au sommet du Pratzeberg (Mohyla míru), 49,12814 N, 16,76244 E ; x vers l'est, y vers le nord, en mètres ; altitudes réelles. Coordonnées des villages : OpenStreetMap (Nominatim), converties dans ce repère.

| Lieu (nom de 1805, nom actuel) | x, y (m) | Altitude du modèle |
|---|---|---|
| Pratzeberg (Mohyla míru) | 0, 0 | 325 m |
| Pratzen (Prace) | 201, 1 464 | 249 m |
| Staré Vinohrady (« vieilles vignes ») | 1 700, 2 300 | 294 m (sommet lu sur le relief) |
| Telnitz (Telnice) | -3 254, -2 918 | 195 m |
| Sokolnitz (Sokolnice) et son château | -3 014, -1 606 ; château -2 744, -1 139 | 205 m |
| Faisanderie de Sokolnitz (Bažantnice) | -2 183, -282 | |
| Kobelnitz (Kobylnice) | -2 234, 1 097 | 211 m |
| Puntowitz (Ponětovice) | -1 468, 2 676 | 223 m |
| Girzikowitz (Jiříkovice) | -287, 4 333 | 231 m |
| Blasowitz (Blažovice) | 1 703, 4 177 | 240 m |
| Schlapanitz (Šlapanice) | -2 562, 4 533 | |
| Colline de Zuran (Žuráň), poste de Napoléon | -1 753, 5 745 | 283 m |
| Le Santon | 106, 6 713 | 285 m |
| Bosenitz (Tvarožná) | 661, 7 080 | |
| Augezd (Újezd u Brna) | -367, -2 651 | 194 m |
| Satschan (Žatčany) | -2 095, -4 475 | |
| Menitz (Měnín) | -4 975, -5 087 | |
| Krzenowitz (Křenovice) | 4 874, 1 564 | 206 m |
| Austerlitz (Slavkov u Brna) | 8 308, 2 831 | hors emprise détaillée |
| Gross Raigern (Rajhrad), d'où arrive Friant | -11 617, -4 342 | hors emprise |

### Emprise et relief

- Relief : Copernicus DEM GLO-30, dalle N49 E016 (modèle numérique de surface à 30 m), filtré par une médiane 5 × 5 puis lissé, pour effacer en partie les bâtiments et les arbres d'aujourd'hui.
- Emprise détaillée : 16 × 16 km (x de -8 000 à 8 000, y de -7 000 à 9 000), maillage de 80 m, cœur de 8,4 × 13 km (x de -4 800 à 3 600, y de -5 200 à 7 800) à 25 m ; terrain lointain à 400 m jusqu'à une dizaine de kilomètres autour.
- Restitution de 1805 :
  - étangs de Satschan, de Menitz et de Kobelnitz, asséchés depuis, restitués comme plans gelés à leur niveau (calculé sur le fond actuel), contours elliptiques d'après le fond de vallée de la Littawa et du Goldbach, glace en éventail lissé (256 rayons) ;
  - Goldbach (Říčka), Littawa (Litava) et ruisseau de Bosenitz (Roketnice) creusés d'après leur tracé actuel (OpenStreetMap) ;
  - route d'Olmütz et chemins entre villages ;
  - parcellaire en lanières (labours, chaumes, blés d'hiver), prés le long des ruisseaux et autour des étangs, roseaux sur les rives ;
  - villages aux maisons basses chaulées, toits de chaume ou de tuile, églises à bulbe aux clochers rehaussés (repères à l'horizon) ; château de Sokolnitz ; faisanderie close de mur ; vignes de Staré Vinohrady ; arbres nus de décembre (vergers, alignements, bosquets) ;
  - batteries en terre au Santon et ruine de la chapelle mariale, désaffectée en 1776 et démontée par les Français pour les retranchements.
- Absent : autoroute D1, voie ferrée, monument de la Paix (1910 à 1912), chapelle actuelle du Santon (1832).
- Texture du sol en trois morceaux : couronne (2 048 px pour 16 km) et cœur coupé en deux (sud et nord, 4 096 × 3 170 px chacun, environ 2 m par pixel).

## Les armées

Effectifs de la maquette (ordre de grandeur, arrondis ; voir « Doutes »). Total : 72 000 Français, 89 000 coalisés (Russes environ 70 %).

### Grande Armée (Napoléon)

| Unité de la maquette | Hommes | Figurine | Position à l'aube |
|---|---|---|---|
| 3e de ligne et tirailleurs (Telnitz) | 1 700 | ligne | Telnitz |
| Division Legrand (Soult) | 4 700 | ligne | Sokolnitz, château, faisanderie |
| Cavalerie légère Margaron | 1 000 | chasseur | derrière Sokolnitz |
| Division Friant (Davout) | 3 800 (3 200 à 3 800 présents selon les auteurs) | ligne | en marche depuis Gross Raigern |
| Dragons de Bourcier (Davout) | 2 000 | cavalier | en marche, devant Friant |
| Division Saint-Hilaire (Soult) | 7 550 | ligne | fond du Goldbach, devant Puntowitz |
| Division Vandamme (Soult) | 7 550 | ligne | devant Girzikowitz |
| Artillerie du 4e corps | 500 | artillerie | avec Saint-Hilaire |
| 17e léger au Santon | 1 500 | ligne | le Santon, 18 canons ; compté à part de la division Suchet (6 700 en tout) |
| Divisions Suchet et Caffarelli (Lannes) | 5 200 et 6 000 | ligne | de part et d'autre de la route d'Olmütz |
| Divisions Rivaud et Drouet (Bernadotte) | 5 600 et 5 700 | ligne | derrière Girzikowitz |
| Cavalerie de Murat : Kellermann, Walther, Nansouty, d'Hautpoul | 2 300, 1 900, 2 000, 1 200 | chasseur, dragon, cuirassier | entre Schlapanitz et la route |
| Garde à pied, cavalerie de la Garde (Bessières, Rapp), artillerie de la Garde | 4 700, 1 100, 300 | garde, chasseur, artillerie | réserve, près de Schlapanitz |
| Grenadiers d'Oudinot, menés par Duroc (Oudinot blessé à Schöngrabern le 16 novembre) | 5 700 | ligne | réserve |

### Armée austro-russe (Koutouzov, sous les yeux d'Alexandre Ier et de François II ; plan de Weyrother)

| Unité de la maquette | Hommes | Figurine | Position à l'aube |
|---|---|---|---|
| Avant-garde de Kienmayer (infanterie autrichienne) | 3 300 | autrichienne | au-dessus d'Augezd |
| Hussards et chevau-légers de Kienmayer | 3 100 | cavalerie coalisée | idem |
| 1re colonne (Dokhtourov) | 13 600 | russe | sud du plateau |
| 2e colonne (Langeron), sans la brigade Kamenski | 8 300 | russe | plateau |
| Brigade Kamenski (grenadiers de Fanagorie, mousquetaires de Riazan) | 3 400 | grenadier russe | plateau |
| 3e colonne (Przybyszewski) | 7 800 | russe | plateau |
| 4e colonne : Russes de Miloradovitch | 7 500 | russe | à l'est de Pratzen |
| 4e colonne : Autrichiens de Kolowrat | 15 600 | autrichienne | idem |
| Batteries autrichiennes de la 4e colonne | 800 | artillerie autrichienne | idem |
| Cavalerie de Liechtenstein (5e colonne) | 4 600 | cavalerie coalisée | vers Blasowitz |
| Avant-garde de Bagration, cavalerie d'Ouvarov, cosaques, artillerie | 8 600, 2 600, 1 000, 400 | russe, cavalerie coalisée, cosaque, artillerie russe | route d'Olmütz, à l'est du Santon |
| Garde impériale russe (Constantin) : infanterie ; gardes à cheval, chevaliers-gardes, hussards et cosaques de la Garde | 6 400 et 2 000 | grenadier russe, cavalerie coalisée | entre Krzenowitz et Blasowitz |

## Les phases de la bataille

| Phase | Heure (rendu) | Récit | Certitude |
|---|---|---|---|
| 1. Les colonnes dans le brouillard | 7 h à 8 h (8,3) | Les trois premières colonnes descendent du plateau vers le Goldbach ; Kienmayer attaque Telnitz vers 7 h ; Friant arrive par l'ouest. | attestée |
| 2. Telnitz et Sokolnitz | 8 h à 9 h (8,7) | Dokhtourov prend Telnitz, Langeron et Przybyszewski attaquent Sokolnitz ; Bourcier et la brigade Heudelet (108e de ligne) reprennent Telnitz vers 9 h. La 4e colonne quitte le plateau. | attestée, heures débattues |
| 3. Le soleil d'Austerlitz | vers 9 h (9,2) | Brume dissipée sur les hauteurs vers 8 h 45 ; Saint-Hilaire et Vandamme montent au plateau. | attestée ; dialogue avec Soult traditionnel |
| 4. Le combat du plateau | 9 h 30 à 11 h 30 (10,5) | Kolowrat, Miloradovitch et Kamenski contre-attaquent ; Saint-Hilaire tient le Pratzeberg, Vandamme prend Staré Vinohrady. | attestée |
| 5. Le Santon et la cavalerie | 10 h à midi (11,5) | Lannes contre Bagration ; Liechtenstein contre Kellermann, puis Nansouty et d'Hautpoul ; Bernadotte à Blasowitz. | attestée |
| 6. La charge de la Garde russe | vers 13 h (13) | Constantin contre Vandamme ; les gardes à cheval prennent l'aigle d'un bataillon du 4e de ligne ; Bessières et Rapp culbutent les chevaliers-gardes ; Repnine pris. | attestée ; heure débattue (de 13 h à 14 h) |
| 7. Le coup de faux | 14 h à 15 h (14,3) | Soult, la Garde et Oudinot pivotent vers Augezd ; Przybyszewski capitule ; Bagration recule. | attestée |
| 8. Les étangs gelés | 15 h à la nuit (15,6) | Retraite par la digue et la glace des étangs ; tirs français sur la glace ; fin des combats vers 16 h 30. | attestée ; nombre de noyés débattu, chiffre du bulletin légendaire |

Compteurs de la phase 8 : coalisés tués ou blessés, 15 000 (fourchette de 13 000 à 16 000) ; prisonniers, 12 000 (estimations de 11 000 à 20 000, le bulletin donnant « la note de 20 mille ») ; Français tués, 1 305 (fourchette de 1 288 à 1 537, avec 6 940 blessés et 573 prisonniers ; le bulletin disait 800 tués) ; corps retrouvés à la vidange de l'étang de Satschan, 3 (« deux ou trois »). Le compteur et le cartel donnent le même chiffre de prisonniers.

## Échelle et moteur

- `scale` 20 (1 figurine pour 20 soldats) : 8 051 figurines au total, toutes visibles (aucune unité au camp).
- `tacticalScale` 6 : en vue tactique, figurines grossies six fois, avec la mention habituelle.
- `latitude` 49,13 ; `declination` -21,9.
- Formations rendues par l'emprise : ligne (large, peu profonde), colonne d'attaque (étroite et profonde, ou `column: true` le long d'un itinéraire), carré non utilisé (aucun carré attesté de façon décisive à Austerlitz).
- Ajouts au moteur de bataille (`src/scenes/battle/`) :
  - `mist` par phase et `Mist.tsx` : nappes de brouillard entre deux altitudes, brume levée d'une phase à l'autre (`mistAt` dans `timeline.ts`, testé) ;
  - `Smoke.tsx` : fumée de poudre noire en panaches animés devant les unités d'infanterie et d'artillerie qui combattent (`fight`) ou tiraillent (`skirmish`), poussée par le vent ; réglable dans le panneau (« Fumée de poudre » : aucune, légère par défaut, dense) ;
  - treize figurines napoléoniennes faites dans Blender (`blender/kit/austerlitz_figures.py`) : ligne française (bicorne de 1805), Garde française (bonnet d'ours), cuirassier, dragon (Bourcier, Walther), chasseur à cheval (dolman vert, colback : Kellermann, Margaron, cavalerie de la Garde), artillerie française (affût vert olive), infanterie russe (vert foncé, bicorne des mousquetaires), grenadier russe (bonnet de grenadier modèle 1802 à plaque de cuivre et plumet : Garde et brigade Kamenski), infanterie autrichienne (habit blanc, Kaskett), cavalerie coalisée (habit blanc, casque noir), cosaque, artillerie autrichienne (habit brun, Corsehut, affût ocre), artillerie russe (vert, bicorne, affût vert) ;
  - vue rasante : figurines grossies 1,5 fois (`groundScale`, mention dans la légende) pour que les troupes se lisent à hauteur d'homme ; cadrage en enfilade, œil d'officier monté à 2,6 m, 15 m en arrière et 50 m sur le côté de l'unité, visée 150 m devant son centre ; phases 3 et 8 en point de vue fixe (Zuran ; hauteurs d'Augezd vers l'étang de Satschan) ;
  - étiquettes masquées si leur cadre sort de l'écran, touche une autre étiquette (les unités en mouvement passent en premier), l'en-tête ou le panneau de commandes ;
  - flèches aux couleurs de la légende, plus fines ; flèche pointillée pour un tir d'artillerie (`fire`, phase 8) ; emprises au sol plus discrètes ; fumée plus légère et estompée près de l'œil en vue rasante ; compteurs sur une ligne défilante sur téléphone.

## Cartels (points d'intérêt)

Un point par phase, dans le même ordre (le test `battle.test.ts` le vérifie dès que les points sont dans `scenes.ts`). Texte complet dans la section « Entrée scenes.ts ».

## Entrée scenes.ts

Remplacer la ligne `austerlitz` de `src/data/scenes.ts` par :

```ts
  {
    "id": "austerlitz",
    "title": "Austerlitz, 2 décembre 1805",
    "status": "ready",
    "year": 1805,
    "lat": 49.128,
    "lon": 16.762,
    "summary": "La bataille des Trois Empereurs en huit phases, du brouillard de l'aube aux étangs gelés, sur le relief réel du plateau de Pratzen restitué dans son état de 1805.",
    "points": [
      {
        "id": "les-colonnes-dans-le-brouillard",
        "title": "Les colonnes dans le brouillard",
        "text": "À l'aube du 2 décembre 1805, un an jour pour jour après le sacre, un brouillard épais noie la vallée du Goldbach. Suivant le plan du général autrichien Weyrother, trois colonnes austro-russes descendent du plateau de Pratzen vers le sud pour tourner la droite française, que Napoléon a laissée faible à dessein entre Telnitz et Sokolnitz. Vers 7 h, l'avant-garde autrichienne de Kienmayer attaque Telnitz, tenu par le 3e de ligne et les tirailleurs du Pô et corses. La division Friant du maréchal Davout, partie de Vienne deux jours plus tôt (environ 110 km), quitte Gross Raigern pour rejoindre le champ de bataille.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Ian Castle, Austerlitz 1805 : The Fate of Empires, Osprey, 2002", "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"]
      },
      {
        "id": "telnitz-et-sokolnitz",
        "title": "Telnitz et Sokolnitz",
        "text": "Entre 8 h et 9 h, la colonne de Dokhtourov enlève Telnitz, celles de Langeron et de Przybyszewski assaillent Sokolnitz et son château. La division Legrand cède du terrain. Vers 9 h, les dragons de Bourcier et la brigade Heudelet (108e de ligne), en tête de la division Friant, reprennent Telnitz ; le reste de Friant, jeté dans la bataille au sortir de la marche, s'accroche à Sokolnitz. Les deux villages changent plusieurs fois de mains dans la journée. Une dizaine de milliers de Français y retiennent près de la moitié de l'armée coalisée, comme l'espérait Napoléon.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"]
      },
      {
        "id": "le-soleil-d-austerlitz",
        "title": "Le soleil d'Austerlitz",
        "text": "Vers 8 h 45, le soleil dissipe le brouillard sur les hauteurs tandis que les fonds restent noyés. Depuis la colline de Zuran, Napoléon voit le plateau de Pratzen se vider. Selon la tradition, il demande à Soult combien de temps il lui faut pour y monter : « moins de vingt minutes, Sire ». Les divisions Saint-Hilaire et Vandamme, cachées dans le fond du Goldbach, gravissent les pentes et surprennent l'état-major allié. Le « soleil d'Austerlitz » devient ensuite un pilier de la légende impériale.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Jacques Garnier, Austerlitz, 2 décembre 1805, Fayard, 2005", "Philippe-Paul de Ségur, Histoire et mémoires, t. II (tradition)"]
      },
      {
        "id": "le-combat-du-plateau",
        "title": "Le combat du plateau",
        "text": "Koutouzov et le tsar rappellent en hâte ce qu'ils peuvent : les Russes de Miloradovitch, les jeunes recrues autrichiennes de Kolowrat, la brigade Kamenski qui fait demi-tour. Pendant deux heures, Saint-Hilaire tient le sommet du Pratzeberg sous un feu croisé, puis le dégage à la baïonnette, tandis que Vandamme enlève les hauteurs de Staré Vinohrady. En fin de matinée, le centre allié est coupé en deux.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Ian Castle, Austerlitz 1805 : The Fate of Empires, Osprey, 2002"]
      },
      {
        "id": "le-santon-et-la-cavalerie",
        "title": "Le Santon et la bataille de cavalerie",
        "text": "Au nord, le long de la route d'Olmütz, Lannes affronte l'avant-garde de Bagration. Le Santon, butte que Napoléon a fait fortifier et armer de dix-huit canons, est tenu par le 17e léger. Dans la plaine de Blasowitz, les cavaliers de Liechtenstein chargent la cavalerie légère de Kellermann ; les cuirassiers de Nansouty et d'Hautpoul les rejettent dans l'une des grandes mêlées de cavalerie de la journée. Bagration finit par se replier en bon ordre vers Austerlitz.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"]
      },
      {
        "id": "la-charge-de-la-garde-russe",
        "title": "La charge de la Garde russe",
        "text": "Vers 13 h, le grand-duc Constantin lance la Garde impériale russe contre Vandamme près de Staré Vinohrady. L'infanterie de la Garde ébranle la ligne française, puis les gardes à cheval enfoncent un bataillon du 4e de ligne, qui perd son aigle, la seule de la journée. Napoléon envoie Bessières avec la cavalerie de la Garde ; Rapp, à la tête des chasseurs à cheval et des mamelouks, culbute les chevaliers-gardes venus en renfort et ramène prisonnier le prince Repnine, qui commandait un de leurs escadrons. François Gérard a peint la scène en 1810.",
        "sources": ["30e bulletin de la Grande Armée, 12 frimaire an XIV (3 décembre 1805), napoleon.org", "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977", "François Gérard, La Bataille d'Austerlitz, 1810, musée de Versailles"]
      },
      {
        "id": "le-coup-de-faux",
        "title": "Le coup de faux",
        "text": "Maître du plateau, Napoléon fait pivoter son armée vers le sud. Vers 14 h, Soult, la Garde et les grenadiers d'Oudinot, menés par Duroc, descendent sur Augezd et prennent à revers les colonnes engagées depuis le matin autour de Telnitz et de Sokolnitz, que Davout et Legrand tiennent toujours de face. Près du château de Sokolnitz, la colonne de Przybyszewski, encerclée, met bas les armes. Au nord, Lannes et Murat repoussent Bagration.",
        "sources": ["Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Jacques Garnier, Austerlitz, 2 décembre 1805, Fayard, 2005"]
      },
      {
        "id": "les-etangs-geles",
        "title": "Les étangs gelés et le mythe des noyés",
        "text": "Pris au piège, les restes de l'aile gauche alliée refluent vers le sud, par l'étroite digue entre les étangs de Satschan et de Menitz et sur une glace encore mince, que les boulets français brisent. La proclamation du lendemain affirme : « ce qui a échappé à votre fer s'est noyé dans les lacs », et le 30e bulletin évoque, comme à Aboukir, « 20 mille hommes se jetant dans l'eau et se noyant dans les lacs ». Mais quand l'étang de Satschan fut vidé quelques jours plus tard, on n'y trouva que deux ou trois corps et quelque 150 chevaux. Le vrai bilan reste lourd : environ 15 000 coalisés tués ou blessés et 12 000 prisonniers, contre 1 305 tués et près de 7 000 blessés français.",
        "sources": ["Proclamation à l'armée, Austerlitz, 12 frimaire an XIV (3 décembre 1805)", "30e bulletin de la Grande Armée, 12 frimaire an XIV (3 décembre 1805), napoleon.org", "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005", "Alexander Mikaberidze (trad.), 1805 : Tsar Alexander's First War with Napoleon, The Russian Official History, Helion, 2022"]
      }
    ]
  },
```

## Crédits

À reporter dans `CREDITS.md` :

| Ressource | Auteur | Licence | Source | Usage et modifications |
|---|---|---|---|---|
| Copernicus DEM GLO-30, dalle N49 E016 | DLR, Airbus Defence and Space, programme Copernicus (Union européenne, ESA) | licence Copernicus DEM : mention obligatoire « produced using Copernicus WorldDEM-30 (c) DLR e.V. 2010-2014 and (c) Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved » | https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N49_00_E016_00_DEM/Copernicus_DSM_COG_10_N49_00_E016_00_DEM.tif | relief de la scène ; filtré (médiane 5 × 5, lissage), étangs de 1805 aplanis, ruisseaux creusés |
| Données OpenStreetMap | contributeurs d'OpenStreetMap | ODbL 1.0, mention « © les contributeurs d'OpenStreetMap » | https://www.openstreetmap.org (requêtes Nominatim et Overpass du 28 octobre 2026) | positions des villages ; tracés de la Říčka (Goldbach), de la Litava et de la Roketnice, simplifiés à 250 m |

Aucune texture, aucun modèle ni aucun son externe : figurines, maisons, églises, arbres, château et textures du sol sont générés par `blender/austerlitz.py` et `blender/kit/austerlitz_*.py`.

## Doutes

À reporter dans `docs/A_VERIFIER.md` :

- **30e bulletin : résolu.** Le texte (napoleon.org, d'après A. Pascal, 1844) dit « tel qu'on l'avait vu à Aboukir : 20 mille hommes se jetant dans l'eau et se noyant dans les lacs », compte « au moins 15 mille Russes tués » et 800 tués français. Le cartel le cite.
- **Chapelle du Santon : résolu.** Chapelle mariale désaffectée en 1776, démontée par les Français pour leurs batteries, remplacée en 1832 (austerlitz.org ; south-moravia.com). Ruine modélisée.
- **Vidange de l'étang de Satschan.** Hypothèse : vidé « quelques jours après » sur ordre de Napoléon, deux ou trois corps d'hommes et quelque 150 chevaux (Holland et Poole, 1902, cités par l'article anglais de Wikipédia). Les dates « du 8 au 12 décembre » n'ont pas de source retrouvée et sont retirées. Canons repêchés : de 38 à plus de 100 selon les auteurs. Pertes russes par noyade : de 200 à 2 000. À relire dans Goetz 2005 et Duffy 1977.
- **Forme et emprise des étangs en 1805.** Hypothèse : trois ellipses (Satschan, 2,3 × 0,7 km, sur la Littawa entre Augezd et Satschan ; Menitz, 2,6 × 1 km, sur le bas Goldbach entre Telnitz et Menitz ; Kobelnitz, 1 × 0,4 km, sur le Goldbach au nord de Kobelnitz), dans les fonds actuels. À vérifier sur le premier relevé militaire (1764 à 1768, mapire.eu) et sur les cartes de Goetz, Duffy et Castle ; l'étang de Kobelnitz est le plus incertain. La digue entre Satschan et Menitz n'est pas modélisée à part.
- **Prisonniers.** 12 000 retenus (Chandler, Goetz) ; jusqu'à 20 000 dans le bulletin et les ouvrages anciens.
- **Effectifs.** 72 000 Français et 89 000 coalisés dans la maquette (publiés : 65 000 à 75 000 et 73 000 à 89 000). Le 17e léger est compté à part de Suchet ; Friant a peut-être 3 200 présents ; la 3e colonne est prise à 7 800 (Wikipédia en donne 10 000). À aligner sur l'ordre de bataille de napoleon-series.org et les annexes de Goetz.
- **Heures.** Chronologie de l'article français de Wikipédia, recoupée avec l'article anglais (brume dissipée vers 8 h 45, combats de Telnitz « vers 8 h ») ; Duffy et Goetz placent la première attaque de Kienmayer vers 7 h.
- **Paroles.** « Moins de vingt minutes, Sire » : Ségur, Histoire et mémoires, t. II, repris par Thiers ; tradition.
- **Charge de la Garde russe.** Suit le bulletin (« chargé par la garde impériale russe à cheval ») et la tradition russe (gardes à cheval, tableau de Mazourovski) ; les chevaliers-gardes arrivent ensuite et sont culbutés par Rapp. L'ordre exact des charges varie selon les auteurs.
- **Uniformes.** Mousquetaires russes en bicorne (shako en cours de distribution en 1805 selon une partie des auteurs ; capote gris-brun souvent portée en hiver, non montrée) ; Garde russe entièrement en bonnet de grenadier modèle 1802 (ses compagnies de mousquetaires gardaient le bicorne) ; cavalerie coalisée en habit blanc (simplification pour les hussards autrichiens et les uhlans) ; artillerie de la 4e colonne montrée autrichienne (il y avait aussi des batteries russes) ; colback pour toute la cavalerie légère française (les chasseurs de ligne portaient le shako).
- **Sources à vérifier.** Alombert et Colin, La campagne de 1805 en Allemagne, retiré des cartels faute d'avoir vérifié qu'il couvre le 2 décembre ; la référence « Mikaberidze 2006 », introuvable, est remplacée par l'Histoire officielle russe traduite par Mikaberidze (Helion, 2022).
- **Staré Vinohrady.** Sommet placé à (1 700, 2 300), lu sur le relief ; à confirmer sur la carte.
- **Relief.** Le GLO-30 est un modèle de surface : bâtiments, bois et remblais modernes laissent des traces de quelques mètres ; le tumulus du monument de la Paix peut relever le Pratzeberg (325 m dans le modèle, 324 m usuellement).
- **Cours d'eau.** Tracés actuels, rectifiés par endroits aux XIXe et XXe siècles.
- **Itinéraires des unités.** Restitution simplifiée à l'échelle de la division.
- **Vue rasante grossie 1,5 fois.** Choix de lisibilité fait sans validation de l'utilisateur, réglable par un seul nombre (`groundScale` dans `battle.ts`). Autre option : doubler les figurines proches (1 figurine pour 10 soldats à moins de 300 m). À trancher par l'utilisateur.

## Mesures

Mesurées le 28 octobre 2026 après la passe de corrections (`blender/austerlitz.py`, Blender 5.2, puis `npm run assets`) :

| Mesure | Valeur |
|---|---|
| glb brut (`.cache/scenes/austerlitz/austerlitz.glb`) | 14,3 Mo |
| glb optimisé (`.cache/build/scenes/austerlitz/austerlitz.glb`, KTX2 et Meshopt) | 5,67 Mo (budget 20 Mo) |
| triangles stockés après optimisation | 424 555 |
| triangles affichés du décor (instances comprises, rapport Blender) | 1 308 551 |
| figurines | 8 051 au total, 13 types, deux niveaux de détail |
| appels de dessin du décor (rapport Blender, ombres comprises) | 88 ; plus 26 pour les figurines, 1 pour la fumée, 7 pour la brume, 1 pour le dôme de brouillard, flèches et emprises |
| maillages, matériaux, textures | 51, 7, 3 (couronne 2 048 px, cœur sud et nord 4 096 × 3 170 px) |
| décor | 677 maisons et granges, 10 églises, château de Sokolnitz, mur de la faisanderie, 3 batteries et la ruine de la chapelle du Santon, 3 étangs gelés, 10 709 arbres |
| durée de construction | environ 7 min (5 min de textures ; `--reuse=1` les réutilise) |

Le budget n'est employé qu'au tiers : le script d'assets plafonne les textures du sol à 4 096 px, d'où le découpage du cœur en deux. Pistes pour le reste : cartes de détail répétées (labours, chaumes, prés) dans `addGroundDetail`, haies et vergers le long des lignes de vue rasantes, plans pré-rendus.

Captures Playwright sur le vrai GPU (Iris Plus, ANGLE D3D11) regardées : vues tactiques des huit phases, vues rasantes des huit phases, téléphone (390 × 844) en vue tactique des phases 1, 3 et 8 et en vue rasante de la phase 4. Les rendus de prévisualisation Blender ne sont pas utilisés (EEVEE trop lent avec 11 000 objets sur l'Iris Plus).

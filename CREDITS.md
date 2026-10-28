# Crédits

Toute ressource externe est listée ici au moment où elle entre dans le projet : source, auteur, licence, modifications.

## Polices

| Police | Auteurs | Licence | Source | Modifications |
|---|---|---|---|---|
| Bodoni Moda | Owen Earl (indestructible type) | SIL Open Font License 1.1 | https://github.com/indestructible-type/Bodoni, via le paquet npm `@fontsource/bodoni-moda` 5.3.0 | aucune ; sous-ensemble latin (500) servi |
| EB Garamond | The EB Garamond Project Authors (Georg Duffner, Octavio Pardo) | SIL Open Font License 1.1 | https://github.com/octaviopardo/EBGaramond12, via le paquet npm `@fontsource/eb-garamond` 5.3.0 | aucune ; sous-ensemble latin (400, 400 italique, 600) servi |

## Bibliothèques livrées avec le site

Dépendances npm utilisées sans modification ; leurs licences accompagnent leurs paquets.

| Bibliothèque | Version | Licence | Source |
|---|---|---|---|
| React, React DOM | 19.3.1 | MIT | https://github.com/facebook/react |
| three.js | 0.186.1 | MIT | https://github.com/mrdoob/three.js |
| React Three Fiber | 9.8.2 | MIT | https://github.com/pmndrs/react-three-fiber |
| drei | 10.7.9 | MIT | https://github.com/pmndrs/drei |
| @react-three/postprocessing | 3.2.0 | MIT | https://github.com/pmndrs/react-postprocessing |
| postprocessing | 6.39.5 | zlib | https://github.com/pmndrs/postprocessing |
| troika-three-text (étiquettes 3D, via drei) | 0.52.5 | MIT | https://github.com/protectwise/troika |
| N8AO (occlusion ambiante des scènes) | 2.0.1 | ISC | https://github.com/N8python/n8ao |
| meshoptimizer (décodeur des modèles 3D) | inclus dans three.js | MIT | https://github.com/zeux/meshoptimizer |
| Basis Universal (transcodeur KTX2) | inclus dans three.js | Apache 2.0 | https://github.com/BinomialLLC/basis_universal |
| GSAP | 3.15.0 | GSAP Standard « No Charge » License (gratuite, non libre, propriété de Webflow) | https://gsap.com/standard-license |
| Zustand | 5.0.15 | MIT | https://github.com/pmndrs/zustand |
| marked | 18.1.1 | MIT | https://github.com/markedjs/marked |

## Contenus historiques

Les textes des événements, des époques et des pistes sont rédigés pour le projet (licence CC BY 4.0). Chaque événement cite ses propres sources (sources d'époque et ouvrages de référence), affichées dans son cartel ; elles ne sont pas reproduites ici.

## Données géographiques

| Données | Source et licence | Attribution | Fichiers et modifications |
|---|---|---|---|
| Relief et bathymétrie | NOAA NCEI, ETOPO 2022, version 30 secondes d'arc, altitude de surface ; CC0 1.0 | NOAA National Centers for Environmental Information. 2022: ETOPO 2022 15 Arc-Second Global Relief Model. https://doi.org/10.25921/fd45-gt74 | `public/geo/relief-west.webp` et `public/geo/relief-east.webp` : extrait régional (12° O à 40° E, 27° à 58° N) moyenné à 60 points par degré, coupé en deux moitiés qui partagent la colonne de 14° E, altitude encodée sur un octet (racine carrée signée) ; script `scripts/geo/relief.ts` |
| Terres et lacs | Natural Earth 1:10m Land et Lakes, v5.1.2 ; domaine public | Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com. | Rastérisés en masque terre et eau sur la grille du relief ; lacs de barrage modernes exclus (anachroniques) |
| Territoires | Cliopatria v0.2.1, Seshat Global History Databank ; CC BY 4.0 | J. S. Bennett, E. Mutch, A. Tollefson et al., Cliopatria v0.2.1 (Seshat Global History Databank), https://github.com/Seshat-Global-History-Databank/cliopatria, licence CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/) ; article : Bennett et al. 2025, Scientific Data 12:247, doi:10.1038/s41597-025-04516-9 | `public/geo/territories.json` : entités franques, françaises (royaume avec ses grands fiefs, République, Directoire, Consulat, Empire, Restauration), anglaises, bourguignonnes et napoléoniennes extraites et rattachées aux pistes de `src/data/tracks.ts` ; royaume de Naples napoléonien coupé avant 1806 ; République batave et République italienne prises pour les royaumes de Hollande (de 1806 à 1810) et d'Italie (de 1805 à 1814) ; découpe sur l'emprise de la carte, fusion par piste et période, îles de moins de 100 km² retirées, simplification de Visvalingam (9 km, 4 km pour les petits anneaux), coordonnées arrondies à 0,01° ; script `scripts/geo/territories.ts` |
| Lieux et villes | Wikidata ; CC0 1.0 | https://www.wikidata.org | Identifiants vérifiés par l'API Wikidata (libellé et coordonnées) pour `src/data/places.ts` et `src/data/cities.ts` ; coordonnées relevées ou ajustées sur les sites historiques |

## Sons d'ambiance

Boucles de 45 s faites pour le projet dans `public/audio/` (mono, recadrées, filtrées, fondu enchaîné à la boucle, volume normalisé à -20 LUFS, Ogg Vorbis et MP3). Coupées par défaut sur le site.

| Fichier | Source | Auteur | Licence |
|---|---|---|---|
| `evening-city` (foule lointaine, filtrée pour rester inintelligible) | https://commons.wikimedia.org/wiki/File:360703_eguobyte_large-crowd-medium-distance-stereo.wav | eguobyte | CC0 1.0 |
| `summer-evening` (cigales) | https://commons.wikimedia.org/wiki/File:Cicada_orni.ogg | DavidDelon | domaine public |
| `summer-evening` (martinets) | https://xeno-canto.org/819689 | Sonothèque ADVL, enregistrement de Léa Lefrou | CC0 1.0 |
| `fountain` | https://commons.wikimedia.org/wiki/File:Fountain_in_toulouse.ogg | aldor | domaine public |
| `river` | https://commons.wikimedia.org/wiki/File:Sanna_river_rapids.ogg | Jarrod Stanley | CC0 1.0 |
| `harbour` (vagues) | https://commons.wikimedia.org/wiki/File:WWS_Smallwaves.ogg | « Smallwaves » par Torsten Nilsson, Work With Sounds | CC BY 4.0, modifié |
| `harbour` (goéland) | https://xeno-canto.org/707075 | Sonothèque ADVL | CC0 1.0 |
| `harbour` (craquements de bois) | https://opengameart.org/content/tree-creaking | AntumDeluge, d'après Department64 | CC0 1.0 |
| `wind` (vent synthétisé) | https://opengameart.org/content/wind1 | Luke.RUSTLTD | CC0 1.0 |
| `arena-crowd` | https://freesound.org/s/342378/ ; https://freesound.org/s/141704/ ; foule d'eguobyte ci-dessus | stefgaz ; felix.blume ; eguobyte | CC0 1.0 |
| `market` | https://freesound.org/s/384052/ ; https://freesound.org/s/159614/ ; https://freesound.org/s/455773/ | emanuele.caro ; lollosound ; kyles | CC0 1.0 |
| `masonry` | https://freesound.org/s/812116/ ; https://freesound.org/s/321571/ | achats57 ; mondofred | CC0 1.0 |
| `animals` | https://freesound.org/s/131925/ ; https://commons.wikimedia.org/wiki/File:157763_felix-blume_a-donkey-is-braying-in-his-enclosure-in-south-of-france.wav ; https://freesound.org/s/453433/ | felix.blume ; Felix Blume ; kyles | CC0 1.0 |
| `cart` | https://freesound.org/s/437078/ ; https://freesound.org/s/538438/ | craigsmith ; bruno.auzet | CC0 1.0 |
| `interior` | https://freesound.org/s/828537/ ; https://freesound.org/s/478545/ | NickTayloe ; LordFluffeh | CC0 1.0 |
| `birds-day` | https://freesound.org/s/404663/ ; https://freesound.org/s/116791/ | straget ; nigelcoop | CC0 1.0 |

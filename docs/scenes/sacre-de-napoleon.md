# Proposition de scène : le sacre de Napoléon à Notre-Dame, 2 décembre 1804

Statut : produite (script Blender, modèle optimisé, module React), relue par un historien et un chef opérateur, corrigée et vérifiée sur captures. L'entrée `scenes.ts` est fournie plus bas, à intégrer par la session principale.

Identifiant de scène `sacre-de-napoleon`, année astronomique 1804, Notre-Dame de Paris (48,85296 N ; 2,34990 E).

## Date et moment de la scène

**Le dimanche 2 décembre 1804 (11 frimaire an XIII), vers 13 heures solaires, au cours de la messe : Napoléon vient de se couronner et lève la couronne de l'impératrice au-dessus de Joséphine agenouillée.**

Chronologie retenue (Fondation Napoléon, chronologie de la journée du sacre) : neige légère dans la nuit ; dès 6 h, premiers invités refoulés car les charpentiers finissent le décor ; vers 7 h, 500 instrumentistes et chanteurs en place sur des gradins provisoires aux deux extrémités de la croisée ; 9 h, corps diplomatique ; vers 10 h 30, arrivée du pape, qui gagne son trône du côté gauche du chœur, près du maître-autel ; après 11 h, l'empereur et l'impératrice revêtent le grand habillement sous la tente de l'archevêché ; vers midi, entrée du couple, conduit aux petits trônes devant le maître-autel, face au trône pontifical ; Veni creator, serment religieux, onctions, messe de Paisiello, bénédiction des insignes après l'Alléluia, couronnement, passage au grand trône, Vivat, Te Deum, serment constitutionnel après la messe (le pape retiré à la sacristie), proclamation ; départ du cortège peu avant 16 h.

Soleil calculé pour Paris à 13 h solaires, déclinaison de moins 21,9° : azimut 194,6°, hauteur 18,0° (`blender/kit/sacre_plan.py`, vérifié par `python blender/kit/sacre_plan.py`).

## L'édifice en 1804

Dimensions retenues (site officiel de la cathédrale ; Friends of Notre-Dame de Paris ; Structurae) :

| Élément | Valeur publiée | Dans le modèle |
|---|---|---|
| Longueur hors œuvre | 127 à 128 m | 128,6 m (façade à x = -70, chevet à x = 58,6 environ) |
| Nef | 60 m de long, 13 m de large | 60 m (travée sous les tours de 10 m, puis 8 travées de 6,25 m), vaisseau de 13 m entre axes |
| Bas-côtés | doubles, 5,9 m chacun | 5,9 m, puis chapelles jusqu'à 24 m de l'axe |
| Voûtes | 33 m sous clef | 33 m, sexpartites dans la nef et le chœur, retombées à 23 m |
| Toiture | 43 m sous comble | faîte à 45 m |
| Transept | 48 m sur 14 m | 48 m sur 14 m, deux travées par bras |
| Chœur | 38 m sur 12 m | travées droites de 6,2 m et rond-point à cinq pans |
| Rose ouest | 9,7 m | 9,7 m, centre à 26 m |
| Roses nord et sud | 13,1 m | 13,1 m, centre à 21,5 m |
| Tours | 69 m | 69 m ; façade de 43,5 m de large, galerie haute à 45 m |

État en 1804, avant Lassus et Viollet-le-Duc (travaux à partir de 1845) :
- pas de flèche : la flèche médiévale a été démontée à la fin du XVIIIe siècle (celle de Viollet-le-Duc date de 1859 et 1860) ;
- statues de la galerie des rois et des portails abattues sous la Révolution : niches vides ;
- vitraux des fenêtres remplacés au XVIIIe siècle par du verre blanc en losanges (confirmé par la vue du chœur de 1804), roses colorées conservées, la rose sud reconstruite au XVIIIe siècle ;
- chœur de Robert de Cotte : arcades en plein cintre sur piliers plaqués de marbre blanc et rose, stalles, sol de marbre, maître-autel, Pietà de Nicolas Coustou devant une haute croix ; statues de Louis XIII et de Louis XIV absentes (non visibles sur la vue de 1804) ;
- grand orgue sur la tribune ouest ;
- murs blanchis à la chaux pour la cérémonie, grande grille du chœur et deux autels retirés (Fondation Napoléon).

Orientation : l'axe réel est tourné vers l'est-sud-est ; le modèle aligne la nef sur +X (est) et tourne le soleil de 24° (azimut du soleil dans la scène : 170,6°).

## Le décor éphémère de Percier et Fontaine

D'après les planches de la Description des cérémonies (1807), la vue du grand trône de Le Beau d'après Naudet, la vue du chœur de Le Cœur et Gautier, le projet de Percier (Carnavalet D.2159) et la notice du Louvre sur David :
- **Porche** néogothique en bois, carton et stuc : pavillon à deux étages, grand arc brisé central tendu de tapisserie bleue semée d'or, arcs latéraux ouverts sur trois faces, registre de niches à statues peintes rouges et bleues, balustrade ajourée à 17 m, pinacles d'angle portant des figures dorées vers 24 m ; galerie basse à arcades et panneaux cramoisis à médaillons devant la façade.
- **Galerie** de bois vers l'archevêché le long du flanc sud (toile peinte en pierre, tapisseries à l'intérieur) et **rotonde** tendue de tapisseries à l'est.
- **Bannières** cramoisies à emblème d'or au sommet des deux tours.
- **Nef** : loges en gradins entre les piliers, fronts de velours cramoisi semé d'or frangés d'or, lambrequins cramoisis aux tribunes avec N dans des couronnes de laurier, rideaux bleus relevés dans les baies des tribunes, aigles sur globes au chapiteau des piliers, girandoles fixées aux colonnettes, tapis bleu dans l'axe.
- **Grand trône** à l'extrémité ouest de la nef, devant le portail central fermé : estrade de 3,6 m et 24 marches à tapis rouge et rampes dorées, gradins de conseillers d'État et de sénateurs sur les flancs ; sur l'estrade, arc de triomphe à colonnes corinthiennes jumelées en marbre blanc à bases et chapiteaux dorés, entablement, attique à Victoires en relief et couronne de laurier, armes impériales entre deux aigles ; trône sous un dais en couronne aux rideaux cramoisis relevés, tenture bleue semée derrière ; petit trône de l'impératrice à sa droite.
- **Musiciens** sur des gradins dans les deux bras du transept.
- **Chœur** : rideaux verts dans les arcades de marbre, loges cramoisies ; sanctuaire et maître-autel à six chandeliers, deux grands cierges, dais plat suspendu au-dessus de l'autel avec plumets blancs ; trône du pape côté nord sous un dais en dôme cramoisi surmonté de la tiare, tenture blanche aux clés croisées et aux étoiles ; petits trônes de l'empereur et de l'impératrice sous un dais vert frangé d'or, coussin violet de Joséphine, tapis vert.

## Vie et figurants

3 069 figurines instanciées après élimination à la construction de celles qu'aucun point de vue ne voit (228 retirées par lancer de rayons depuis les neuf caméras), 38 modèles : grands corps de l'État en habits bleus brodés, magistrats en robe rouge ou noire, généraux, chasseurs de la Garde, dames en robes blanches et manteaux de cour, chanoines en surplis et camail gris violet, évêques mitrés, cardinaux, musiciens et chantres, pages, grenadiers de la Garde sur le parvis, foule parisienne, statues peintes et figures dorées du porche. Les foules vues de loin (tribunes, musiciens, gradins du trône, parvis) utilisent un modèle allégé. Personnages principaux détaillés (mains, nez, 16 pans) : Napoléon (tunique blanche, manteau de velours pourpre à grand collet d'hermine, laurier d'or, couronne fermée levée), Joséphine à genoux sur un coussin violet, sa traîne portée par deux pages, Pie VII assis sous son dais avec quatre cardinaux, princes et grands dignitaires portant les insignes. Passants animés : huissiers et pages dans les bas-côtés extérieurs, Parisiens derrière la foule du parvis.

## Lumière et ambiance

- Soleil d'hiver bas venant du sud (parti pris : le ciel de l'après-midi n'est pas documenté), légère brume froide ; en qualité moyenne et haute, l'ombre du soleil est cadrée sur la cathédrale dès que la caméra est à l'intérieur.
- Trois rayons calculés dans l'axe du soleil (rose sud, deux fenêtres hautes du chœur) et un rayon de mise en scène sur le couple impérial.
- Vitres blanches froides et roses aux bleus et rubis profonds, plombs sombres, remplage de rose en pierre sombre.
- Six lampes ponctuelles chaudes (nef, croisée, autel, grand trône, et une lumière de face sur le couple), halos additifs sur les 178 flammes (un seul appel de dessin).
- Étalonnage propre à la scène : saturation 0,78 et gain légèrement refroidi par rapport à l'époque Empire.
- Son : couche `interior`, plus `wind` sur les deux vues du parvis.

## Plan de caméra

Neuf points (coordonnées Blender, mètres, z vers le haut) :

| Point | Caméra | Cible |
|---|---|---|
| `vue-d-ensemble` | (-235, -150, 95) | (-30, -5, 22) |
| `le-porche` | (-142, -22, 6.5) | (-78, 2, 13) |
| `la-nef` | (-52, 0, 13.5) | (12, 0, 6) |
| `le-grand-trone` | (-27, 0, 9.5) | (-60, 0, 9) |
| `la-nef-gothique` | (-49, 5.4, 14) | (-10, -5.5, 22) |
| `la-croisee-et-les-musiciens` | (-2, 8.4, 4.5) | (0, -20, 11) |
| `le-choeur` | (6, 0, 4.2) | (37.6, 0, 5.5) |
| `le-pape-pie-vii` | (26.6, -1, 2.4) | (31.6, 4.75, 1.83) |
| `le-couronnement` | (27.4, -5.4, 2.9) | (30.4, 0.6, 1.4) |

## Contrat de la scène (repères du modèle)

- `poi_<id>` et `poi_<id>_target` pour les neuf points, dont `poi_vue-d-ensemble`.
- `walk_bas-cote-sud_<nn>`, `walk_bas-cote-nord_<nn>` (tous les 2,5 m), `walk_parvis-nord_<nn>`, `walk_parvis-sud_<nn>` (tous les 2,6 m), au sol ; maillages `walker_huissier`, `walker_page`, `walker_bourgeois`, `walker_bourgeoise`.
- Ajouts au kit (`src/scenes/kit/`), sans effet sur les autres scènes : `shaft_<n>` et `shaft_<n>_target` (extra `radius`) pour plusieurs rayons ; `lamp_<n>` pour des lampes ponctuelles réglées par `lamps` ; `candle_<n>` pour les halos de bougies (`CandleGlow.tsx`, un nuage de points additif) ; options `look` (saturation, gain), `shaftStrength` dans `ModelSceneConfig` ; ombre du soleil cadrée sur `interior` quand la caméra est dedans (`Atmosphere.tsx`). `SCENE_LOOK` (`src/stage/grading.ts`) gagne `saturation` et `gain`, appliqués dans `src/stage/Stage.tsx`.
- Matériau `water` (deux bras de Seine) remplacé par l'eau animée ; `ground_parvis` reçoit le grain de sol.
- Groupes : `cathedrale`, `vitraux` (sans ombre), `decor` (décor intérieur sans ombre, porche avec ombre), `ville`, `lustres` et `assistance` (instances, sans ombre), `walkers`, `markers`.

## Production

- `blender/sacre_de_napoleon.py` reconstruit tout et exporte `.cache/scenes/sacre-de-napoleon/sacre-de-napoleon.glb` ; options `previews=all|none|<ids>`, `samples=`, `crowd=`, `reuse=1`, `exposure=`, `inside_exposure=`, `lamp=`.
- `blender/kit/sacre_plan.py` (cotes, soleil), `sacre_gothic.py` (arcs, murs percés, voûtes, travées gothiques et arcades de marbre du chœur, transept, roses), `sacre_exterior.py` (façade, tours, bannières, porche, galerie basse, galerie et rotonde, sol, Seine, maisons), `sacre_decor.py` (loges, tentures, rideaux, aigles, girandoles, grand trône et son arc, sanctuaire, dais, trônes, orgue), `sacre_figures.py` (costumes, placements, modèles allégés), `sacre_materials.py` (textures procédurales). Le kit Blender partagé n'est pas modifié.
- Commande : `"C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup -P blender/sacre_de_napoleon.py -- previews=none` (construction de 30 à 40 s), puis `npm run assets`. Le `.glb` optimisé a été copié dans `public/assets/scenes/sacre-de-napoleon/` (non versionné) pour l'essai local. Publication à faire : `npm run assets:publish -- --only=scenes/sacre-de-napoleon/sacre-de-napoleon.glb`.

## Entrée scenes.ts

À substituer à la ligne `planned` actuelle de `src/data/scenes.ts` (validée localement avec `npm run validate`) :

```ts
{
  "id": "sacre-de-napoleon",
  "title": "Le sacre de Napoléon à Notre-Dame, 2 décembre 1804",
  "status": "ready",
  "year": 1804,
  "lat": 48.85296,
  "lon": 2.3499,
  "summary": "Le 2 décembre 1804, Napoléon est sacré empereur des Français dans Notre-Dame de Paris, en présence du pape Pie VII. La cathédrale est montrée dans son état d'avant Viollet-le-Duc (sans flèche, vitres blanches, chœur de marbre du XVIIIe siècle), parée des décors provisoires de Percier et Fontaine d'après les gravures de 1807 : porche néogothique, tentures, loges, grand trône à l'ouest de la nef, sanctuaire dans le chœur. Heure et lumière du jour, ainsi que plusieurs détails du décor, sont restitués en hypothèse.",
  "points": [
    {
      "id": "vue-d-ensemble",
      "title": "Notre-Dame, 2 décembre 1804",
      "text": "Ce dimanche 2 décembre 1804, 11 frimaire an XIII, Napoléon est sacré empereur des Français à Notre-Dame, en présence du pape Pie VII. La cathédrale, rendue au culte en 1802 après le Concordat, sort de dix ans de Révolution : les statues de la façade ont été abattues, et sa flèche médiévale, démontée à la fin du XVIIIe siècle, ne sera reconstruite par Viollet-le-Duc qu'en 1859. Pour l'occasion, les architectes Percier et Fontaine l'ont habillée de décors provisoires, des bannières flottent sur les tours et l'on a démoli des maisons pour dégager les abords. Il a neigé dans la nuit et il fait très froid ; on compte entre 15 000 et 20 000 invités selon les sources.",
      "sources": [
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org",
        "C. Collard, « Les fêtes du sacre de Napoléon, entre effervescence et espérance », napoleon.org",
        "C. Percier et P. F. L. Fontaine, Description des cérémonies et des fêtes qui ont eu lieu pour le couronnement de LL. MM. Napoléon et Joséphine, 1807"
      ]
    },
    {
      "id": "le-porche",
      "title": "Le porche de Percier et Fontaine",
      "text": "Devant le portail, Percier et Fontaine ont élevé un porche néogothique en bois, carton et stuc : un pavillon à deux étages, ouvert par un grand arc brisé tendu de tapisserie bleue, orné d'une rangée de statues peintes, d'une balustrade et de pinacles portant des figures dorées. Une galerie couverte, tendue de tapisseries des Gobelins, y conduit ; une autre galerie de bois longe l'église vers l'archevêché, où l'on revêt les habits de cérémonie. À l'est, une rotonde tendue de tapisseries accueille les arrivants ; une tempête faillit l'emporter dans la nuit du 27 au 28 novembre. Le tracé des galeries est ici simplifié.",
      "sources": [
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org",
        "Fondation Napoléon, notice du dessin de Fontaine « Rotonde décorée de tapisseries accueillant les invités lors de leur arrivée à Notre-Dame », napoleon.org",
        "C. Percier et P. F. L. Fontaine, Description des cérémonies…, 1807, planche de l'arrivée à Notre-Dame"
      ]
    },
    {
      "id": "la-nef",
      "title": "La nef parée pour le sacre",
      "text": "La nef est tendue de soie et de velours semés des emblèmes du nouvel Empire : aigles, abeilles, étoiles et N entourés de lauriers. Entre les piliers, on a bâti des loges en gradins tendues de velours cramoisi frangé d'or pour les grands corps de l'État, les magistrats, les officiers et les dames ; d'autres invités garnissent les tribunes, drapées de rideaux bleus, et un tapis bleu mène au grand trône. Le décor fut à peine prêt : à 6 heures du matin, les charpentiers travaillaient encore et l'on dut refouler les premiers invités. Les couleurs suivent les planches coloriées de 1807 ; les girandoles des piliers sont une restitution.",
      "sources": [
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org",
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "C. Percier et P. F. L. Fontaine, Description des cérémonies…, 1807, planche de la nef"
      ]
    },
    {
      "id": "le-grand-trone",
      "title": "Le grand trône",
      "text": "À l'extrémité ouest de la nef, devant le grand portail fermé, le grand trône impérial domine une haute estrade de plus de vingt marches. Il est placé sous un arc de triomphe à colonnes jumelées, couronné des armes impériales entre deux aigles, et abrité par un dais en forme de couronne. Après le couronnement, Napoléon et Joséphine quittent les petits trônes du chœur et remontent toute la nef pour s'y asseoir ; le pape vient y bénir l'empereur et proclame « Vivat Imperator in aeternum ». Après la messe, l'empereur y prête le serment constitutionnel, la main sur l'Évangile, tandis que le pape s'est retiré à la sacristie.",
      "sources": [
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org",
        "Le Beau d'après Naudet, « Grand trône élevé dans la nef de l'église de Notre-Dame de Paris », BnF",
        "P. F. L. Fontaine, Le Serment, dessin pour la Description des cérémonies…, notice napoleon.org",
        "L. P. de Ségur, Procès-verbal de la cérémonie du sacre et du couronnement, 1805"
      ]
    },
    {
      "id": "la-nef-gothique",
      "title": "Une nef gothique blanchie",
      "text": "Commencée vers 1163, la cathédrale a une nef de 60 mètres de long, haute de 33 mètres sous voûte, flanquée de doubles bas-côtés, de tribunes et de hautes fenêtres. En 1804, elle ne ressemble pas à celle d'aujourd'hui : au XVIIIe siècle, presque tous les vitraux médiévaux ont été remplacés par du verre blanc, sauf ceux des trois roses, et la nef est claire. Pour le sacre, les murs ont été blanchis à la chaux et le gothique en partie caché sous un décor à l'antique ; un contemporain s'en moqua : « Dieu ne s'y reconnaîtra plus ». La restauration de Lassus et Viollet-le-Duc, à partir de 1845, effacera ces aménagements.",
      "sources": [
        "Cathédrale Notre-Dame de Paris, site officiel, dimensions",
        "Friends of Notre-Dame de Paris, « Layout » et « Progression Through Time »",
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org"
      ]
    },
    {
      "id": "la-croisee-et-les-musiciens",
      "title": "La croisée et les musiciens",
      "text": "Dès 7 heures du matin, cinq cents instrumentistes et chanteurs ont pris place sur des gradins provisoires, aux deux extrémités de la croisée. Ils jouent la marche du sacre et les motets de Jean-François Le Sueur, la messe et le Te Deum de Giovanni Paisiello, que Napoléon admire, et le Vivat de l'abbé Roze. Au-dessus d'eux s'ouvrent les roses, larges de 13 mètres, qui ont gardé l'essentiel de leurs vitraux colorés, la rose sud ayant été reconstruite au XVIIIe siècle. Le ciel de cet après-midi n'est pas connu : le soleil d'hiver qui traverse ici la rose sud est un parti pris de mise en lumière.",
      "sources": [
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "Friends of Notre-Dame de Paris, « Layout », diamètre des roses"
      ]
    },
    {
      "id": "le-choeur",
      "title": "Le chœur du XVIIIe siècle",
      "text": "Au début du XVIIIe siècle, Robert de Cotte a remanié le chœur pour accomplir le vœu de Louis XIII, qui avait placé la France sous la protection de la Vierge : le gothique y disparaît derrière des arcades en plein cintre revêtues de marbre blanc et rose, avec stalles sculptées, sol de marbre, maître-autel et, derrière lui, la Pietà de Nicolas Coustou devant une haute croix. Pour le sacre, on a retiré la grande grille du chœur et deux autels, fermé les arcades de rideaux verts et suspendu un dais au-dessus de l'autel. Viollet-le-Duc démolira au XIXe siècle la plus grande partie de ce décor ; la Pietà et le sol au chiffre royal sont toujours en place.",
      "sources": [
        "Musée du Louvre, notice de J.-L. David, Sacre de l'empereur Napoléon Ier et couronnement de l'impératrice Joséphine, INV 3699",
        "Fondation Napoléon, « Cathédrale Notre-Dame de Paris », napoleon.org",
        "Le Cœur et Gautier, « Vue de l'intérieur du chœur de la cathédrale de Paris, tel qu'il étoit décoré le jour du sacre », BnF"
      ]
    },
    {
      "id": "le-pape-pie-vii",
      "title": "Pie VII",
      "text": "Arrivé à Paris le 28 novembre, le pape Pie VII est entré dans la cathédrale vers 10 h 30, au chant du Tu es Petrus de Le Sueur. Il attend l'empereur sur le trône dressé pour lui du côté gauche du chœur, près du maître-autel, sous un dais surmonté de la tiare, devant une tenture blanche aux clés de saint Pierre. Il oint Napoléon et Joséphine au front et aux mains, bénit l'épée, le manteau, l'anneau, les couronnes et le globe, mais ne pose pas la couronne : l'empereur s'en coiffe lui-même, un geste convenu d'avance selon la plupart des historiens. David le peint assis, la main levée pour bénir.",
      "sources": [
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "T. Lentz, Nouvelle histoire du Premier Empire, t. I, 2002, p. 86 à 89",
        "Le Cœur et Gautier, vue du chœur décoré le jour du sacre, BnF"
      ]
    },
    {
      "id": "le-couronnement",
      "title": "Le couronnement",
      "text": "Au cours de la messe, après la bénédiction des insignes, Napoléon prend sur l'autel la couronne de laurier d'or et la pose lui-même sur sa tête, puis couronne Joséphine, agenouillée devant lui sur un coussin violet. C'est l'instant que Jacques-Louis David choisit pour son immense tableau, peint de 1805 à 1807 et conservé au Louvre (6,21 mètres sur 9,79) : il y montre l'empereur couronnant l'impératrice plutôt que se couronnant lui-même, et y ajoute Madame Mère, absente ce jour-là. La scène s'inspire de cette composition sans la copier : costumes, visages et places des dignitaires sont simplifiés.",
      "sources": [
        "Fondation Napoléon, « La journée du sacre, 11 frimaire an XIII (2 décembre 1804) », napoleon.org",
        "Musée du Louvre, notice de J.-L. David, Sacre de l'empereur Napoléon Ier et couronnement de l'impératrice Joséphine, INV 3699",
        "Mémoires de Madame de Rémusat, t. II"
      ]
    }
  ],
  "ambience": [
    {
      "layer": "interior",
      "volume": 0.55
    },
    {
      "layer": "wind",
      "volume": 0.35,
      "points": [
        "vue-d-ensemble",
        "le-porche"
      ]
    }
  ]
},
```

## Crédits

Aucune ressource externe n'entre dans le modèle : toutes les textures sont générées par `blender/kit/sacre_materials.py` (et `roof_flat_pixels` du kit partagé). Rien à ajouter à `CREDITS.md` pour le modèle ; aucune licence NC ou ND.

Sources documentaires (citées, non reproduites) :
- Fondation Napoléon, napoleon.org : chronologie « La journée du sacre » ; « Cathédrale Notre-Dame de Paris » ; notices des dessins de Fontaine (Le Serment, Rotonde décorée de tapisseries) ; chronique de C. Collard sur les fêtes du sacre.
- C. Percier et P. F. L. Fontaine, Description des cérémonies et des fêtes qui ont eu lieu pour le couronnement de LL. MM. Napoléon et Joséphine, 1807 (domaine public ; planches de l'arrivée à Notre-Dame et de la nef, Commons « Percier et Fontaine 003.jpg » et « 004.jpg »).
- Le Beau d'après Naudet, « Grand trône élevé dans la nef », BnF btv1b6940855p ; Basset, « Vue du trône élevé dans l'église de N.-D. de Paris », BnF btv1b69408548 ; Le Cœur et Gautier, vue du chœur décoré le jour du sacre, BnF btv1b6940836b ; C. Percier, projet de décoration du chœur et du trône pontifical, musée Carnavalet D.2159 (CC0).
- Musée du Louvre, notice de J.-L. David, Sacre de l'empereur Napoléon Ier et couronnement de l'impératrice Joséphine, INV 3699 (MR 1437).
- L. P. de Ségur, Procès-verbal de la cérémonie du sacre et du couronnement, 1805 ; T. Lentz, Nouvelle histoire du Premier Empire, t. I, 2002 ; Mémoires de Madame de Rémusat, t. II.
- Cathédrale Notre-Dame de Paris (site officiel), Friends of Notre-Dame de Paris, Structurae : dimensions.

## Doutes

Résolus par la relecture :
- **Place du grand trône** : extrémité ouest de la nef, devant le portail fermé (napoleon.org, Le Serment et Cathédrale ; gravure « Grand trône élevé dans la nef »). La formule de Wikipédia (« à l'emplacement de l'ancien jubé ») est isolée.
- **Autel du sacre** : le maître-autel du chœur (napoleon.org : petits trônes « devant le maître-autel », onctions au maître-autel).
- **Musiciens** : gradins aux deux bras du transept (« aux deux extrémités de la croisée »).
- **Pietà de Coustou** : en place (notice du Louvre ; vue du chœur de 1804) ; statues royales non visibles en 1804, donc absentes.
- **Tableau de David** : INV 3699 (MR 1437), 6,21 sur 9,79 m, peint de décembre 1805 à novembre 1807, retouches en janvier 1808 (Louvre).
- **Lustres** : aucune vue n'en montre dans les arcades ni à la croisée ; remplacés par des girandoles aux piliers (projet de Percier).
- **Couleurs** : loges cramoisies semées d'or, rideaux bleus aux tribunes, tapis bleu dans la nef et rouge sur l'escalier du trône, vert dans le chœur (planches coloriées ; notice du Louvre pour les rideaux verts).
- **Gloire dorée** derrière la Pietà : non attestée en 1804, remplacée par une haute croix et un dais plat à plumets.

Encore ouverts :

| Point | Hypothèse retenue | Sources et raison du doute |
|---|---|---|
| Heure du couronnement | vers 13 h solaires | napoleon.org donne midi pour l'entrée et 15 h 30 pour les vivats, pas l'heure du couronnement |
| Ciel de l'après-midi | soleil d'hiver bas, brume froide | seule la neige de la nuit est attestée ; parti pris annoncé dans le cartel de la croisée |
| Axe de la cathédrale | relèvement de 114° | « est-sud-est » sans chiffre ; à mesurer sur une orthophoto IGN |
| Porche | pavillon à deux étages d'après la planche de l'arrivée | lecture d'un « portique triomphal à quatre grands arcs gothiques » plausible mais non vérifiée ; nombre exact de statues et leurs sujets inconnus |
| Marches du grand trône | 24 | les gravures en montrent plus de vingt |
| Girandoles | une par pilier au niveau des tribunes | d'après le projet de Percier pour le chœur, étendu à la nef |
| Tracé des galeries et place de la rotonde | flanc sud, rotonde à l'est | galeries attestées, tracé exact inconnu |
| Nombre d'invités | entre 15 000 et 20 000 | napoleon.org donne 20 000 (chronologie) et 15 000 (chronique de C. Collard) |
| Couronnement de lui-même convenu d'avance | « selon la plupart des historiens » | à appuyer d'une citation précise (Lentz) |
| Couronne posée par Napoléon | couronne de laurier d'or bénie par le pape | titres des estampes de la collection de Vinck ; à vérifier dans Ségur |
| Vitrerie blanche | XVIIIe siècle, atelier Le Vieil | dates non confirmées en ligne |
| Rose sud | reconstruite au XVIIIe siècle (cardinal de Noailles) | dates à vérifier (Erlande-Brandenburg) |
| Places des dignitaires | simplifiées | ordre de Basset (impératrice à droite de l'empereur, princes à gauche) respecté au grand trône, simplifié ailleurs |

## Mesures

- `.glb` brut : 14,3 Mo ; optimisé par `npm run assets` : **3,98 Mo** (3 978 268 octets), 167 047 triangles stockés, 59 maillages, 27 matériaux, 18 textures (KTX2). Budget : 20 Mo.
- Triangles affichés : **0,91 million** selon l'estimation du script (toutes instances) ; de 0,45 à 1,05 million sur le HUD selon le point de vue. Budget : 2 millions.
- Appels de dessin : 124 selon l'estimation du script ; de 61 à 162 sur le HUD. Budget : 350.
- Figurines : 3 069 instances de 38 modèles ; 84 luminaires (girandoles, torchères, chandeliers, cierges) ; 178 halos de flamme.
- Images par seconde sur la machine de référence (Iris Plus, Chromium en D3D11, 1440 × 900, d'autres sessions actives sur la machine) : qualité moyenne de 15 à 23 i/s (14 à 21 avant la correction) ; qualité basse de 55 à 60 i/s. La qualité moyenne reste limitée par le remplissage (ombres, occlusion ambiante, antialiasing, lampes) ; le moniteur de performance repasse en basse si besoin. À mesurer chez l'utilisateur avec `?debug`.
- Captures regardées : les dix étapes en qualité moyenne et quatre en qualité basse, sur le vrai GPU.

## Anachronismes évités

Pas de flèche de Viollet-le-Duc, pas de vitraux colorés du XIXe siècle dans les fenêtres hautes, pas de statues de la galerie des rois, pas de lustres de cristal non attestés, pas de gloire dorée derrière la Pietà, pas d'aigles de drapeau (distribuées le 5 décembre 1804), pas de Madame Mère dans les tribunes (elle était absente, David l'ajoute).

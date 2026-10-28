import type { Scene } from './schema.ts'

export const scenes: Scene[] = [
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
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Ian Castle, Austerlitz 1805 : The Fate of Empires, Osprey, 2002",
          "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"
        ]
      },
      {
        "id": "telnitz-et-sokolnitz",
        "title": "Telnitz et Sokolnitz",
        "text": "Entre 8 h et 9 h, la colonne de Dokhtourov enlève Telnitz, celles de Langeron et de Przybyszewski assaillent Sokolnitz et son château. La division Legrand cède du terrain. Vers 9 h, les dragons de Bourcier et la brigade Heudelet (108e de ligne), en tête de la division Friant, reprennent Telnitz ; le reste de Friant, jeté dans la bataille au sortir de la marche, s'accroche à Sokolnitz. Les deux villages changent plusieurs fois de mains dans la journée. Une dizaine de milliers de Français y retiennent près de la moitié de l'armée coalisée, comme l'espérait Napoléon.",
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"
        ]
      },
      {
        "id": "le-soleil-d-austerlitz",
        "title": "Le soleil d'Austerlitz",
        "text": "Vers 8 h 45, le soleil dissipe le brouillard sur les hauteurs tandis que les fonds restent noyés. Depuis la colline de Zuran, Napoléon voit le plateau de Pratzen se vider. Selon la tradition, il demande à Soult combien de temps il lui faut pour y monter : « moins de vingt minutes, Sire ». Les divisions Saint-Hilaire et Vandamme, cachées dans le fond du Goldbach, gravissent les pentes et surprennent l'état-major allié. Le « soleil d'Austerlitz » devient ensuite un pilier de la légende impériale.",
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Jacques Garnier, Austerlitz, 2 décembre 1805, Fayard, 2005",
          "Philippe-Paul de Ségur, Histoire et mémoires, t. II (tradition)"
        ]
      },
      {
        "id": "le-combat-du-plateau",
        "title": "Le combat du plateau",
        "text": "Koutouzov et le tsar rappellent en hâte ce qu'ils peuvent : les Russes de Miloradovitch, les jeunes recrues autrichiennes de Kolowrat, la brigade Kamenski qui fait demi-tour. Pendant deux heures, Saint-Hilaire tient le sommet du Pratzeberg sous un feu croisé, puis le dégage à la baïonnette, tandis que Vandamme enlève les hauteurs de Staré Vinohrady. En fin de matinée, le centre allié est coupé en deux.",
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Ian Castle, Austerlitz 1805 : The Fate of Empires, Osprey, 2002"
        ]
      },
      {
        "id": "le-santon-et-la-cavalerie",
        "title": "Le Santon et la bataille de cavalerie",
        "text": "Au nord, le long de la route d'Olmütz, Lannes affronte l'avant-garde de Bagration. Le Santon, butte que Napoléon a fait fortifier et armer de dix-huit canons, est tenu par le 17e léger. Dans la plaine de Blasowitz, les cavaliers de Liechtenstein chargent la cavalerie légère de Kellermann ; les cuirassiers de Nansouty et d'Hautpoul les rejettent dans l'une des grandes mêlées de cavalerie de la journée. Bagration finit par se replier en bon ordre vers Austerlitz.",
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977"
        ]
      },
      {
        "id": "la-charge-de-la-garde-russe",
        "title": "La charge de la Garde russe",
        "text": "Vers 13 h, le grand-duc Constantin lance la Garde impériale russe contre Vandamme près de Staré Vinohrady. L'infanterie de la Garde ébranle la ligne française, puis les gardes à cheval enfoncent un bataillon du 4e de ligne, qui perd son aigle, la seule de la journée. Napoléon envoie Bessières avec la cavalerie de la Garde ; Rapp, à la tête des chasseurs à cheval et des mamelouks, culbute les chevaliers-gardes venus en renfort et ramène prisonnier le prince Repnine, qui commandait un de leurs escadrons. François Gérard a peint la scène en 1810.",
        "sources": [
          "30e bulletin de la Grande Armée, 12 frimaire an XIV (3 décembre 1805), napoleon.org",
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Christopher Duffy, Austerlitz 1805, Seeley Service, 1977",
          "François Gérard, La Bataille d'Austerlitz, 1810, musée de Versailles"
        ]
      },
      {
        "id": "le-coup-de-faux",
        "title": "Le coup de faux",
        "text": "Maître du plateau, Napoléon fait pivoter son armée vers le sud. Vers 14 h, Soult, la Garde et les grenadiers d'Oudinot, menés par Duroc, descendent sur Augezd et prennent à revers les colonnes engagées depuis le matin autour de Telnitz et de Sokolnitz, que Davout et Legrand tiennent toujours de face. Près du château de Sokolnitz, la colonne de Przybyszewski, encerclée, met bas les armes. Au nord, Lannes et Murat repoussent Bagration.",
        "sources": [
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Jacques Garnier, Austerlitz, 2 décembre 1805, Fayard, 2005"
        ]
      },
      {
        "id": "les-etangs-geles",
        "title": "Les étangs gelés et le mythe des noyés",
        "text": "Pris au piège, les restes de l'aile gauche alliée refluent vers le sud, par l'étroite digue entre les étangs de Satschan et de Menitz et sur une glace encore mince, que les boulets français brisent. La proclamation du lendemain affirme : « ce qui a échappé à votre fer s'est noyé dans les lacs », et le 30e bulletin évoque, comme à Aboukir, « 20 mille hommes se jetant dans l'eau et se noyant dans les lacs ». Mais quand l'étang de Satschan fut vidé quelques jours plus tard, on n'y trouva que deux ou trois corps et quelque 150 chevaux. Le vrai bilan reste lourd : environ 15 000 coalisés tués ou blessés et 12 000 prisonniers, contre 1 305 tués et près de 7 000 blessés français.",
        "sources": [
          "Proclamation à l'armée, Austerlitz, 12 frimaire an XIV (3 décembre 1805)",
          "30e bulletin de la Grande Armée, 12 frimaire an XIV (3 décembre 1805), napoleon.org",
          "Robert Goetz, 1805 : Austerlitz, Greenhill, 2005",
          "Alexander Mikaberidze (trad.), 1805 : Tsar Alexander's First War with Napoleon, The Russian Official History, Helion, 2022"
        ]
      }
    ]
  },
  { "id": "waterloo", "title": "Waterloo, 18 juin 1815", "status": "planned" },
  { "id": "versailles", "title": "Versailles sous Louis XIV, vers 1685", "status": "planned" },
  { "id": "bastille", "title": "La prise de la Bastille, 14 juillet 1789", "status": "planned" },
  { "id": "paris-saint-louis", "title": "Paris vers 1250, sous Saint Louis", "status": "planned" },
  { "id": "azincourt", "title": "Azincourt, 25 octobre 1415", "status": "planned" },
  { "id": "bapteme-de-clovis", "title": "Le baptême de Clovis à Reims", "status": "planned" },
  { "id": "berezina", "title": "Le passage de la Bérézina, novembre 1812", "status": "planned" },
  { "id": "pyramides", "title": "La campagne d'Égypte, 1798", "status": "planned" },
]

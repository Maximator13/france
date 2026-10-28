import type { Itinerary } from './schema.ts'

export const itineraries: Itinerary[] = [
  {
    "id": "premiere-campagne-d-italie",
    "title": "Première campagne d'Italie, de Nice à Campo-Formio",
    "summary": "Nommé à la tête de l'armée d'Italie, Bonaparte arrive à Nice fin mars 1796. En un mois il sépare les Piémontais des Autrichiens et contraint le roi de Sardaigne à l'armistice de Cherasco ; il force l'Adda à Lodi, entre à Milan, puis repousse quatre armées autrichiennes venues dégager Mantoue (Castiglione, Arcole, Rivoli). Mantoue capitule en février 1797, l'armée franchit les Alpes orientales jusqu'à Leoben, et la paix est signée à Campo-Formio en octobre 1797.",
    "from": 1796,
    "to": 1797,
    "waypoints": [
      { "lon": 7.2683, "lat": 43.7019, "label": "Nice, prise de commandement", "year": 1796, "month": 3, "day": 27, "certainty": "attested", "note": "Bonaparte rejoint le quartier général de l'armée d'Italie à Nice ; coordonnées de Nice (Wikidata Q33959)." },
      { "lon": 8.2764, "lat": 44.3989, "label": "Montenotte", "year": 1796, "month": 4, "day": 12, "certainty": "attested", "note": "Première victoire de la campagne, sur l'aile autrichienne d'Argenteau (Wikidata Q974166)." },
      { "lon": 7.8167, "lat": 44.3833, "label": "Mondovi", "year": 1796, "month": 4, "day": 21, "certainty": "attested", "note": "Victoire sur les Piémontais de Colli (Wikidata Q1093286)." },
      { "lon": 7.8667, "lat": 44.65, "label": "Armistice de Cherasco", "year": 1796, "month": 4, "day": 28, "certainty": "attested", "note": "Le roi de Sardaigne sort de la guerre ; coordonnées de Cherasco (Wikidata Q19946)." },
      { "lon": 9.5089, "lat": 45.3192, "label": "Pont de Lodi", "year": 1796, "month": 5, "day": 10, "certainty": "attested", "note": "Passage de l'Adda en force (Wikidata Q900945)." },
      { "lon": 9.19, "lat": 45.4642, "label": "Entrée à Milan", "year": 1796, "month": 5, "day": 15, "certainty": "attested", "note": "Coordonnées de Milan (Wikidata Q490)." },
      { "lon": 10.4833, "lat": 45.3833, "label": "Castiglione", "year": 1796, "month": 8, "day": 5, "certainty": "attested", "note": "Victoire sur l'armée de secours de Wurmser (Wikidata Q610328)." },
      { "lon": 11.2775, "lat": 45.3572, "label": "Pont d'Arcole", "year": 1796, "month": 11, "day": 15, "certainty": "attested", "note": "Bataille de trois jours, du 15 au 17 novembre 1796, dans les marais de l'Alpone (Wikidata Q776609)." },
      { "lon": 10.8167, "lat": 45.5667, "label": "Rivoli", "year": 1797, "month": 1, "day": 14, "certainty": "attested", "note": "Défaite d'Alvinczy sur le plateau de Rivoli (Wikidata Q1069936)." },
      { "lon": 10.8, "lat": 45.16, "label": "Capitulation de Mantoue", "year": 1797, "month": 2, "day": 2, "certainty": "attested", "note": "Wurmser rend la place après huit mois de siège (Wikidata Q815175)." },
      { "lon": 15.0972, "lat": 47.3817, "label": "Préliminaires de Leoben", "year": 1797, "month": 4, "day": 18, "certainty": "attested", "note": "Paix préliminaire signée en Styrie, à moins de 150 km de Vienne ; coordonnées de Leoben (Wikidata Q485294)." },
      { "lon": 13.1667, "lat": 46.0167, "label": "Traité de Campo-Formio", "year": 1797, "month": 10, "day": 17, "certainty": "attested", "note": "Signé à la villa Manin de Passariano et daté de Campo-Formio (Campoformido, Wikidata Q53232) ; l'Autriche cède la Belgique et reçoit Venise." }
    ],
    "sources": [
      "Jean Tulard (dir.), Dictionnaire Napoléon, Fayard, 1987, article « Italie (campagne d', 1796-1797) »",
      "David G. Chandler, The Campaigns of Napoleon, Macmillan, 1966, parties 2 et 3",
      "Martin Boycott-Brown, The Road to Rivoli: Napoleon's First Campaign, Cassell, 2001",
      "Wikidata, coordonnées des batailles et des villes citées (éléments indiqués dans chaque étape), consulté le 28 octobre 2026"
    ]
  },
  {
    "id": "expedition-d-egypte",
    "title": "Expédition d'Égypte et campagne de Syrie",
    "summary": "La flotte quitte Toulon le 19 mai 1798, prend Malte en passant, et débarque l'armée d'Orient près d'Alexandrie le 1er juillet. Victorieux aux Pyramides, Bonaparte entre au Caire, mais la flotte est détruite à Aboukir le 1er août. En 1799 il marche sur la Syrie ottomane, prend El-Arich et Jaffa, échoue devant Saint-Jean-d'Acre et rentre au Caire. Après sa victoire terrestre d'Aboukir, il s'embarque secrètement en août, touche Ajaccio et débarque à Saint-Raphaël le 9 octobre 1799, un mois avant le 18 Brumaire.",
    "from": 1798,
    "to": 1799,
    "waypoints": [
      { "lon": 5.928, "lat": 43.1242, "label": "Départ de Toulon", "year": 1798, "month": 5, "day": 19, "certainty": "attested", "note": "Coordonnées de Toulon (Wikidata Q44160)." },
      { "lon": 10.2, "lat": 40.3, "year": 1798, "month": 5, "day": 30, "certainty": "debated", "note": "Point de passage approximatif : la flotte, rejointe par les convois de Gênes, d'Ajaccio et de Civitavecchia, descend à l'est de la Corse et de la Sardaigne." },
      { "lon": 11.8, "lat": 37.5, "year": 1798, "month": 6, "day": 7, "certainty": "debated", "note": "Point de passage approximatif à l'ouest de la Sicile, avant l'arrivée devant Malte le 9 juin." },
      { "lon": 14.5125, "lat": 35.8978, "label": "Prise de Malte", "year": 1798, "month": 6, "day": 12, "certainty": "attested", "note": "Débarquement le 10 juin, capitulation de l'ordre de Saint-Jean le 12 ; coordonnées de La Valette (Wikidata Q23800)." },
      { "lon": 29.9187, "lat": 31.2001, "label": "Prise d'Alexandrie", "year": 1798, "month": 7, "day": 2, "certainty": "attested", "note": "Débarquement dans la nuit du 1er au 2 juillet à l'anse du Marabout, assaut le 2 (Wikidata Q87)." },
      { "lon": 31.2, "lat": 30.0833, "label": "Bataille des Pyramides", "year": 1798, "month": 7, "day": 21, "certainty": "attested", "note": "Victoire sur les Mamelouks de Mourad Bey à Embabeh, face au Caire (Wikidata Q332543)." },
      { "lon": 31.2357, "lat": 30.0444, "label": "Entrée au Caire", "year": 1798, "month": 7, "day": 24, "certainty": "attested", "note": "Coordonnées du Caire (Wikidata Q85)." },
      { "lon": 31.2357, "lat": 30.0444, "label": "Départ pour la Syrie", "year": 1799, "month": 2, "day": 10, "certainty": "attested", "note": "Bonaparte quitte Le Caire avec environ 13 000 hommes." },
      { "lon": 33.8, "lat": 31.1333, "label": "El-Arich", "year": 1799, "month": 2, "day": 20, "certainty": "attested", "note": "Le fort capitule après un court siège (Wikidata Q238452)." },
      { "lon": 34.4597, "lat": 31.5075, "label": "Gaza", "year": 1799, "month": 2, "day": 25, "certainty": "attested", "note": "Ville occupée sans combat sérieux (Wikidata Q47492)." },
      { "lon": 34.7531, "lat": 32.0522, "label": "Prise de Jaffa", "year": 1799, "month": 3, "day": 7, "certainty": "attested", "note": "Ville prise d'assaut et mise à sac ; massacre de prisonniers dans les jours suivants, et début de la peste dans l'armée (Wikidata Q180294)." },
      { "lon": 35.0817, "lat": 32.9275, "label": "Siège de Saint-Jean-d'Acre", "year": 1799, "month": 3, "day": 19, "certainty": "attested", "note": "Djezzar Pacha, soutenu par la flotte de Sidney Smith, tient la place (Wikidata Q815109)." },
      { "lon": 35.0817, "lat": 32.9275, "label": "Levée du siège d'Acre", "year": 1799, "month": 5, "day": 20, "certainty": "attested", "note": "Après deux mois et huit assauts manqués, l'armée se replie vers l'Égypte." },
      { "lon": 31.2357, "lat": 30.0444, "label": "Retour au Caire", "year": 1799, "month": 6, "day": 14, "certainty": "attested", "note": "Entrée présentée comme un triomphe." },
      { "lon": 30.0667, "lat": 31.3167, "label": "Bataille d'Aboukir", "year": 1799, "month": 7, "day": 25, "certainty": "attested", "note": "Victoire terrestre sur l'armée ottomane débarquée par la flotte anglaise ; coordonnées d'Aboukir (Wikidata Q139773)." },
      { "lon": 29.9187, "lat": 31.2001, "label": "Départ de Bonaparte", "year": 1799, "month": 8, "day": 23, "certainty": "attested", "note": "Bonaparte s'embarque sur la frégate Muiron près d'Alexandrie et laisse le commandement à Kléber." },
      { "lon": 20.0, "lat": 33.3, "year": 1799, "month": 9, "day": 5, "certainty": "debated", "note": "Point de passage approximatif : pour éviter les croisières anglaises, les frégates longent la côte africaine vers l'ouest." },
      { "lon": 11.2, "lat": 37.6, "year": 1799, "month": 9, "day": 20, "certainty": "debated", "note": "Point de passage approximatif au large du cap Bon." },
      { "lon": 7.6, "lat": 39.6, "year": 1799, "month": 9, "day": 26, "certainty": "debated", "note": "Point de passage approximatif à l'ouest de la Sardaigne." },
      { "lon": 7.9, "lat": 41.4, "year": 1799, "month": 9, "day": 30, "certainty": "debated", "note": "Point de passage approximatif à l'approche de la Corse." },
      { "lon": 8.7386, "lat": 41.9192, "label": "Escale à Ajaccio", "year": 1799, "month": 10, "day": 1, "certainty": "attested", "note": "Vents contraires : Bonaparte reste dans sa ville natale du 1er au 6 octobre (Wikidata Q40104)." },
      { "lon": 6.7356, "lat": 43.4331, "label": "Débarquement à Saint-Raphaël", "year": 1799, "month": 10, "day": 9, "certainty": "attested", "note": "Débarquement dans le golfe de Fréjus, à Saint-Raphaël ; coordonnées de Fréjus (Wikidata Q215155)." },
      { "lon": 2.3488, "lat": 48.8534, "label": "Arrivée à Paris", "year": 1799, "month": 10, "day": 16, "certainty": "attested", "note": "Trois semaines avant le coup d'État des 18 et 19 Brumaire an VIII (9 et 10 novembre 1799)." }
    ],
    "sources": [
      "Henry Laurens, Charles C. Gillispie, Jean-Claude Golvin et Claude Traunecker, L'Expédition d'Égypte, 1798-1801, Armand Colin, 1989",
      "Jean Tulard (dir.), Dictionnaire Napoléon, Fayard, 1987, articles « Égypte (expédition d') » et « Syrie (campagne de) »",
      "David G. Chandler, The Campaigns of Napoleon, Macmillan, 1966, partie 4",
      "Wikidata, coordonnées des batailles et des villes citées (éléments indiqués dans chaque étape), consulté le 28 octobre 2026"
    ]
  },
  {
    "id": "campagne-de-1805",
    "title": "Campagne de 1805, du camp de Boulogne à Austerlitz",
    "summary": "L'invasion de l'Angleterre abandonnée, la Grande Armée quitte les côtes de la Manche à la fin d'août 1805 et traverse la France à marches forcées. Elle passe le Rhin fin septembre, enveloppe l'armée de Mack, qui capitule à Ulm le 20 octobre, entre à Vienne le 13 novembre et bat les Austro-Russes à Austerlitz le 2 décembre 1805, un an jour pour jour après le sacre. La paix de Presbourg suit le 26 décembre.",
    "from": 1805,
    "to": 1805,
    "waypoints": [
      { "lon": 1.6139, "lat": 50.7256, "label": "Camp de Boulogne", "year": 1805, "month": 8, "day": 27, "certainty": "attested", "note": "Fin août, les corps de l'armée des côtes reçoivent l'ordre de marcher vers le Rhin ; coordonnées de Boulogne-sur-Mer (Wikidata Q81997)." },
      { "lon": 7.7522, "lat": 48.5733, "label": "Passage du Rhin", "year": 1805, "month": 9, "day": 26, "certainty": "attested", "note": "Les corps franchissent le Rhin du 25 au 26 septembre entre Mannheim et Strasbourg, où l'Empereur arrive le 26 (Wikidata Q6602)." },
      { "lon": 10.0906, "lat": 48.4542, "label": "Elchingen", "year": 1805, "month": 10, "day": 14, "certainty": "attested", "note": "Ney force le passage du Danube et ferme l'encerclement (Wikidata Q657502)." },
      { "lon": 9.9833, "lat": 48.3833, "label": "Capitulation d'Ulm", "year": 1805, "month": 10, "day": 20, "certainty": "attested", "note": "Mack rend la place avec environ 25 000 hommes (Wikidata Q159072)." },
      { "lon": 11.575, "lat": 48.1375, "label": "Munich", "year": 1805, "month": 10, "day": 24, "certainty": "attested", "note": "Napoléon dans la capitale de son allié bavarois (Wikidata Q1726)." },
      { "lon": 16.3738, "lat": 48.2082, "label": "Entrée à Vienne", "year": 1805, "month": 11, "day": 13, "certainty": "attested", "note": "Murat et Lannes s'emparent par ruse du pont du Danube ; coordonnées de Vienne (Wikidata Q1741)." },
      { "lon": 16.6083, "lat": 49.1953, "label": "Brünn", "year": 1805, "month": 11, "day": 20, "certainty": "attested", "note": "Napoléon établit son quartier général à Brünn (Brno, Wikidata Q14960)." },
      { "lon": 16.7625, "lat": 49.1281, "label": "Austerlitz", "year": 1805, "month": 12, "day": 2, "certainty": "attested", "note": "Bataille des Trois Empereurs, sur le plateau de Pratzen (Wikidata Q134114)." },
      { "lon": 17.1093, "lat": 48.1517, "label": "Paix de Presbourg", "year": 1805, "month": 12, "day": 26, "certainty": "attested", "note": "Traité signé à Presbourg (Bratislava, Wikidata Q1780) : l'Autriche cède la Vénétie, le Tyrol et ses terres souabes." }
    ],
    "sources": [
      "Jean Tulard (dir.), Dictionnaire Napoléon, Fayard, 1987, articles « Ulm » et « Austerlitz »",
      "David G. Chandler, The Campaigns of Napoleon, Macmillan, 1966, partie 6",
      "Robert Goetz, 1805: Austerlitz, Napoleon and the Destruction of the Third Coalition, Greenhill Books, 2005",
      "Wikidata, coordonnées des batailles et des villes citées (éléments indiqués dans chaque étape), consulté le 28 octobre 2026"
    ]
  },
  {
    "id": "campagne-de-russie",
    "title": "Campagne de Russie et retraite, 1812",
    "summary": "La Grande Armée, plus de 400 000 hommes en première ligne, passe le Niémen le 24 juin 1812. Les armées russes se dérobent : Vilna, Vitebsk, Smolensk sont prises sans bataille décisive. Koutouzov accepte le combat à Borodino le 7 septembre ; Napoléon entre dans Moscou le 14, que l'incendie ravage. Faute de paix, il en repart le 19 octobre ; arrêté à Maloïaroslavets, il doit reprendre la route dévastée de l'aller. Le froid, la faim et les cosaques détruisent l'armée, qui franchit la Bérézina du 26 au 29 novembre et repasse le Niémen à la mi-décembre.",
    "from": 1812,
    "to": 1812,
    "waypoints": [
      { "lon": 23.9333, "lat": 54.9, "label": "Passage du Niémen", "year": 1812, "month": 6, "day": 24, "certainty": "attested", "note": "Trois ponts jetés devant Kovno (Kaunas, Wikidata Q4115712)." },
      { "lon": 25.28, "lat": 54.6872, "label": "Vilna", "year": 1812, "month": 6, "day": 28, "certainty": "attested", "note": "Entrée dans la capitale lituanienne, que Barclay de Tolly a évacuée (Wikidata Q216)." },
      { "lon": 30.1667, "lat": 55.1833, "label": "Vitebsk", "year": 1812, "month": 7, "day": 28, "certainty": "attested", "note": "Ville occupée après les combats d'Ostrovno (Wikidata Q102217)." },
      { "lon": 32.0453, "lat": 54.7828, "label": "Smolensk", "year": 1812, "month": 8, "day": 17, "certainty": "attested", "note": "Assaut du 17 août ; les Russes évacuent la ville en flammes dans la nuit (Wikidata Q2337)." },
      { "lon": 35.8167, "lat": 55.5167, "label": "Borodino", "year": 1812, "month": 9, "day": 7, "certainty": "attested", "note": "Bataille de la Moskova, la plus sanglante de la campagne (Wikidata Q184320)." },
      { "lon": 37.6173, "lat": 55.7558, "label": "Entrée à Moscou", "year": 1812, "month": 9, "day": 14, "certainty": "attested", "note": "La ville, vidée de ses habitants, brûle du 15 au 18 septembre (Wikidata Q649)." },
      { "lon": 37.6173, "lat": 55.7558, "label": "Départ de Moscou", "year": 1812, "month": 10, "day": 19, "certainty": "attested", "note": "Après cinq semaines d'attente vaine d'une négociation avec Alexandre Ier." },
      { "lon": 36.4583, "lat": 55.0217, "label": "Maloïaroslavets", "year": 1812, "month": 10, "day": 24, "certainty": "attested", "note": "La ville change huit fois de mains ; Napoléon renonce à la route de Kalouga (Wikidata Q598090)." },
      { "lon": 36.0333, "lat": 55.5, "label": "Mojaïsk", "year": 1812, "month": 10, "day": 28, "certainty": "attested", "note": "Retour sur la route de l'aller, déjà ravagée (Wikidata Q159139)." },
      { "lon": 34.3, "lat": 55.2, "label": "Viazma", "year": 1812, "month": 11, "day": 3, "certainty": "attested", "note": "Combat d'arrière-garde (Wikidata Q903472)." },
      { "lon": 32.0453, "lat": 54.7828, "label": "Retour à Smolensk", "year": 1812, "month": 11, "day": 9, "certainty": "attested", "note": "Les magasins espérés sont presque vides ; premiers grands froids." },
      { "lon": 31.43, "lat": 54.56, "label": "Krasnoï", "year": 1812, "month": 11, "day": 17, "certainty": "attested", "note": "Combats du 15 au 18 novembre ; Ney, coupé, rejoint par le Dniepr gelé (Wikidata Q25809)." },
      { "lon": 28.3594, "lat": 54.3283, "label": "Passage de la Bérézina", "year": 1812, "month": 11, "day": 26, "certainty": "attested", "note": "Ponts des pontonniers d'Eblé à Studianka, franchis du 26 au 29 novembre (Wikidata Q555839)." },
      { "lon": 26.4, "lat": 54.4836, "label": "Smorgon, départ de l'Empereur", "year": 1812, "month": 12, "day": 5, "certainty": "attested", "note": "Napoléon laisse le commandement à Murat et part pour Paris (Wikidata Q958617)." },
      { "lon": 25.28, "lat": 54.6872, "label": "Retour à Vilna", "year": 1812, "month": 12, "day": 9, "certainty": "attested", "note": "Les débris de l'armée pillent les magasins et abandonnent la ville le 10 décembre." },
      { "lon": 23.9333, "lat": 54.9, "label": "Repassage du Niémen", "year": 1812, "month": 12, "day": 14, "certainty": "attested", "note": "Ney et l'arrière-garde repassent le fleuve à Kovno ; quelques dizaines de milliers d'hommes seulement en reviennent." }
    ],
    "sources": [
      "Marie-Pierre Rey, L'Effroyable Tragédie : une nouvelle histoire de la campagne de Russie, Flammarion, 2012",
      "Adam Zamoyski, 1812: Napoleon's Fatal March on Moscow, HarperCollins, 2004",
      "David G. Chandler, The Campaigns of Napoleon, Macmillan, 1966, partie 13",
      "Wikidata, coordonnées des batailles et des villes citées (éléments indiqués dans chaque étape), consulté le 28 octobre 2026"
    ]
  },
  {
    "id": "vol-de-l-aigle",
    "title": "Le vol de l'Aigle, de l'île d'Elbe à Paris",
    "summary": "Parti de l'île d'Elbe le 26 février 1815 avec un millier d'hommes, Napoléon débarque à Golfe-Juan le 1er mars. Pour éviter la Provence royaliste, il passe par les Alpes (Grasse, Digne, Gap), la route qu'on appelle aujourd'hui route Napoléon. À Laffrey, le 7 mars, le 5e de ligne envoyé contre lui se rallie ; Grenoble ouvre ses portes le soir même, Lyon le 10. Ney, qui avait promis de le ramener « dans une cage de fer », le rejoint ; Louis XVIII quitte Paris dans la nuit du 19 au 20 mars, et Napoléon entre aux Tuileries le 20 au soir. Les Cent-Jours commencent.",
    "from": 1815,
    "to": 1815,
    "waypoints": [
      { "lon": 10.3167, "lat": 42.8167, "label": "Départ de l'île d'Elbe", "year": 1815, "month": 2, "day": 26, "certainty": "attested", "note": "Embarquement à Portoferraio sur le brick l'Inconstant (Wikidata Q157856)." },
      { "lon": 9.0, "lat": 43.4, "year": 1815, "month": 2, "day": 28, "certainty": "debated", "note": "Point de passage approximatif au nord du cap Corse." },
      { "lon": 7.0742, "lat": 43.5672, "label": "Débarquement à Golfe-Juan", "year": 1815, "month": 3, "day": 1, "certainty": "attested", "note": "Bivouac sur la plage, puis départ vers Cannes dans la nuit (Wikidata Q2617965)." },
      { "lon": 6.9253, "lat": 43.6581, "label": "Grasse", "year": 1815, "month": 3, "day": 2, "certainty": "attested", "note": "La colonne abandonne ses canons et prend les sentiers de montagne (Wikidata Q173705)." },
      { "lon": 6.5133, "lat": 43.8467, "label": "Castellane", "year": 1815, "month": 3, "day": 3, "certainty": "attested", "note": "Wikidata Q207083." },
      { "lon": 6.2356, "lat": 44.0925, "label": "Digne", "year": 1815, "month": 3, "day": 4, "certainty": "attested", "note": "Digne-les-Bains (Wikidata Q181306)." },
      { "lon": 5.9464, "lat": 44.19, "label": "Sisteron", "year": 1815, "month": 3, "day": 5, "certainty": "attested", "note": "Le pont sur la Durance n'est pas défendu (Wikidata Q271085)." },
      { "lon": 6.0778, "lat": 44.5586, "label": "Gap", "year": 1815, "month": 3, "day": 5, "certainty": "attested", "note": "Arrivée le soir ; proclamations imprimées à Gap (Wikidata Q175081)." },
      { "lon": 5.7736, "lat": 45.0247, "label": "Laffrey", "year": 1815, "month": 3, "day": 7, "certainty": "attested", "note": "Prairie de la Rencontre : le 5e de ligne refuse de tirer et se rallie (Wikidata Q694814)." },
      { "lon": 5.7264, "lat": 45.1869, "label": "Grenoble", "year": 1815, "month": 3, "day": 7, "certainty": "attested", "note": "Entrée le soir, portes enfoncées par la foule (Wikidata Q1289)." },
      { "lon": 4.8357, "lat": 45.764, "label": "Lyon", "year": 1815, "month": 3, "day": 10, "certainty": "attested", "note": "Le comte d'Artois a quitté la ville le matin même (Wikidata Q456)." },
      { "lon": 4.8319, "lat": 46.3067, "label": "Mâcon", "year": 1815, "month": 3, "day": 13, "certainty": "attested", "note": "Wikidata Q174247." },
      { "lon": 4.8539, "lat": 46.7811, "label": "Chalon-sur-Saône", "year": 1815, "month": 3, "day": 14, "certainty": "attested", "note": "Le même jour, Ney se rallie à Lons-le-Saunier (Wikidata Q203645)." },
      { "lon": 3.5669, "lat": 47.7975, "label": "Auxerre", "year": 1815, "month": 3, "day": 17, "certainty": "attested", "note": "Napoléon y retrouve Ney (Wikidata Q167600)." },
      { "lon": 2.7016, "lat": 48.4047, "label": "Fontainebleau", "year": 1815, "month": 3, "day": 20, "certainty": "attested", "note": "Arrivée au petit matin, au château où il avait abdiqué onze mois plus tôt (Wikidata Q182872)." },
      { "lon": 2.3488, "lat": 48.8534, "label": "Entrée aux Tuileries", "year": 1815, "month": 3, "day": 20, "certainty": "attested", "note": "Arrivée vers 21 heures, portée par la foule ; Louis XVIII est parti pour Gand (Wikidata Q90)." }
    ],
    "sources": [
      "Emmanuel de Waresquiel, Cent Jours : la tentation de l'impossible, mars-juillet 1815, Fayard, 2008",
      "Dominique de Villepin, Les Cent-Jours ou l'esprit de sacrifice, Perrin, 2001",
      "Jean Tulard (dir.), Dictionnaire Napoléon, Fayard, 1987, article « Cent-Jours »",
      "Wikidata, coordonnées des villes citées (éléments indiqués dans chaque étape), consulté le 28 octobre 2026"
    ]
  }
]

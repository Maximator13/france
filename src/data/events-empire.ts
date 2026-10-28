import type { HistoricalEvent } from './schema.ts'

export const events: HistoricalEvent[] = [
  {
    "id": "prise-de-la-bastille",
    "title": "Prise de la Bastille",
    "start": 1789,
    "month": 7,
    "day": 14,
    "precision": "day",
    "certainty": "attested",
    "era": "revolution",
    "track": "royaume",
    "category": "politics",
    "importance": 1,
    "placeId": "bastille",
    "people": [
      "de-launay",
      "louis-xvi"
    ],
    "summary": "Le 14 juillet 1789, après le renvoi de Necker et la concentration de troupes autour de Paris, des Parisiens armés aux Invalides le matin même assiègent la Bastille pour y prendre de la poudre. Le gouverneur de Launay capitule en fin d'après-midi et est tué par la foule. La forteresse ne gardait que sept prisonniers, mais sa chute devient aussitôt le symbole de la fin de l'arbitraire royal.",
    "body": "**Une ville qui s'arme.** Le renvoi du ministre Necker, connu à Paris le 12 juillet, et la présence de régiments autour de la capitale font craindre un coup de force contre l'Assemblée nationale. Les électeurs parisiens forment un comité permanent et une milice bourgeoise. Le 14 au matin, la foule enlève aux Invalides plusieurs dizaines de milliers de fusils (environ 30 000 selon les estimations courantes), puis se porte vers la Bastille, où l'on a transféré la poudre de l'Arsenal.\n\n**Le siège.** La garnison compte environ 80 invalides et une trentaine de soldats suisses. Après l'échec de délégations, des coups de feu partent de la forteresse ; l'arrivée de gardes-françaises avec des canons décide de Launay à capituler vers 17 heures. Les assaillants ont perdu une centaine d'hommes (98 tués selon le décompte retenu par Jacques Godechot), les défenseurs quelques-uns pendant le combat ; de Launay et plusieurs membres de la garnison sont massacrés après la reddition, comme le prévôt des marchands Flesselles. La forteresse ne détenait que sept prisonniers : quatre faussaires, deux fous et un noble enfermé à la demande de sa famille.\n\n**Un symbole immédiat.** La démolition commence dès le 15 juillet, sous la direction de l'entrepreneur Palloy, qui vend des pierres sculptées en souvenir. Le roi rappelle Necker et se rend le 17 juillet à l'Hôtel de Ville, où il accepte la cocarde. Le mot « Rien » inscrit par Louis XVI à la date du 14 dans son journal ne prouve pas son indifférence : c'est un carnet de chasse. Le 14 juillet devient fête nationale par la loi du 6 juillet 1880, qui commémore aussi la fête de la Fédération du 14 juillet 1790.",
    "sources": [
      {
        "kind": "primary",
        "author": "Louis-Marie Prudhomme (éditeur)",
        "work": "Révolutions de Paris, journal hebdomadaire, Paris, 1789",
        "locus": "n° 1 (du 12 au 18 juillet 1789)"
      },
      {
        "kind": "modern",
        "author": "Jacques Godechot",
        "work": "La Prise de la Bastille, 14 juillet 1789, Paris, Gallimard, coll. « Trente journées qui ont fait la France », 1965"
      },
      {
        "kind": "modern",
        "author": "Hans-Jürgen Lüsebrink et Rolf Reichardt",
        "work": "The Bastille: A History of a Symbol of Despotism and Freedom, Durham, Duke University Press, 1997"
      },
      {
        "kind": "modern",
        "author": "Jean-Clément Martin",
        "work": "Nouvelle histoire de la Révolution française, Paris, Perrin, 2012"
      }
    ],
    "scene": "bastille"
  },
  {
    "id": "execution-de-louis-xvi",
    "title": "Exécution de Louis XVI",
    "start": 1793,
    "month": 1,
    "day": 21,
    "precision": "day",
    "certainty": "attested",
    "era": "revolution",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "place-de-la-revolution",
    "people": [
      "louis-xvi",
      "edgeworth-de-firmont",
      "sanson"
    ],
    "summary": "Le 21 janvier 1793, Louis Capet, ancien roi des Français, est guillotiné place de la Révolution, à Paris, après un procès devant la Convention qui l'a déclaré coupable de conspiration contre la liberté et condamné à mort à une courte majorité. L'exécution d'un roi sacré rompt avec mille ans de monarchie et pèse sur toute la suite de la Révolution.",
    "body": "**Le procès.** Après la chute de la monarchie le 10 août 1792 et la proclamation de la République, la découverte de l'« armoire de fer » aux Tuileries, qui contenait des papiers compromettants, précipite le procès. La Convention juge elle-même le roi, défendu par Malesherbes, Tronchet et de Sèze. Lors des appels nominaux des 15 au 20 janvier, la culpabilité est votée à la quasi-unanimité, l'appel au peuple rejeté, la mort votée par 387 voix contre 334 (dont 361 pour la mort sans condition, soit tout juste la majorité absolue), et le sursis repoussé par 380 voix contre 310.\n\n**L'exécution.** Le 21 janvier (2 pluviôse an I dans le calendrier républicain, adopté à l'automne 1793 et compté rétrospectivement), Louis XVI est conduit en voiture du Temple à la place de la Révolution, l'ancienne place Louis-XV, sous la garde de milliers d'hommes en armes. Assisté de l'abbé Edgeworth de Firmont, il tente de parler à la foule ; les tambours couvrent sa voix. Il est guillotiné vers 10 h 20 par le bourreau Charles-Henri Sanson.\n\n**Mots attribués et portée.** La phrase « Fils de Saint Louis, montez au ciel », prêtée à l'abbé Edgeworth, apparaît dans la presse après coup ; lui-même écrivit ne pas se souvenir de l'avoir dite. Le régicide fait des conventionnels qui l'ont voté des « régicides », proscrits en 1816 sous la Restauration, et contribue à l'entrée en guerre de l'Angleterre et de l'Espagne contre la France au printemps 1793. Les historiens discutent encore de la part de la conviction, de la peur et du calcul politique dans le vote.",
    "sources": [
      {
        "kind": "primary",
        "author": "Henry Essex Edgeworth de Firmont",
        "work": "Mémoires de M. l'abbé Edgeworth de Firmont, dernier confesseur de Louis XVI, Paris, 1815"
      },
      {
        "kind": "primary",
        "author": "Convention nationale",
        "work": "Procès-verbaux des appels nominaux sur le jugement de Louis Capet, janvier 1793, publiés dans les Archives parlementaires, 1re série"
      },
      {
        "kind": "modern",
        "author": "Jean-Clément Martin",
        "work": "Nouvelle histoire de la Révolution française, Paris, Perrin, 2012"
      },
      {
        "kind": "modern",
        "author": "Jean-Christian Petitfils",
        "work": "Louis XVI, Paris, Perrin, 2005"
      }
    ]
  },
  {
    "id": "coup-d-etat-du-18-brumaire",
    "title": "Coup d'État du 18 Brumaire",
    "start": 1799,
    "month": 11,
    "day": 9,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "Le coup d'État se déroule sur deux jours : le 18 brumaire an VIII (9 novembre 1799) à Paris, et le 19 brumaire (10 novembre) à Saint-Cloud, où il se décide.",
    "era": "empire",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "saint-cloud",
    "people": [
      "napoleon-bonaparte",
      "sieyes",
      "lucien-bonaparte",
      "roger-ducos"
    ],
    "summary": "Les 9 et 10 novembre 1799 (18 et 19 brumaire an VIII), le général Bonaparte, rentré d'Égypte, et le directeur Sieyès renversent le Directoire. Les Conseils, transférés à Saint-Cloud sous prétexte d'un complot, résistent ; les grenadiers dispersent les Cinq-Cents et une minorité de députés confie le pouvoir à trois consuls provisoires : Bonaparte, Sieyès et Roger Ducos.",
    "body": "**Un coup d'État préparé par des civils.** En 1799, le Directoire est discrédité par les défaites, les coups de force successifs et la crise financière. Sieyès, entré au Directoire, cherche un « sabre » pour réviser la Constitution de l'an III ; Bonaparte, revenu d'Égypte en octobre en abandonnant son armée, accepte le rôle. Le 18 brumaire (9 novembre), le Conseil des Anciens, invoquant un prétendu complot jacobin, transfère les deux Conseils à Saint-Cloud et confie à Bonaparte le commandement des troupes de Paris. Trois directeurs démissionnent, deux autres sont gardés.\n\n**La journée de Saint-Cloud.** Le 19 brumaire (10 novembre), la séance tourne mal : Bonaparte, venu haranguer les Anciens puis les Cinq-Cents, est accueilli aux cris de « hors la loi ». Son frère Lucien, président des Cinq-Cents, sort convaincre les soldats que l'Assemblée est tenue par des factieux ; les grenadiers de Murat et Leclerc évacuent la salle. Le soir, quelques dizaines de députés réunis à la hâte votent la création d'un Consulat provisoire et d'une commission chargée de rédiger une nouvelle constitution.\n\n**Ce qui en sort.** La Constitution de l'an VIII, promulguée en décembre 1799, fait de Bonaparte le Premier consul et concentre l'exécutif entre ses mains. Le plébiscite qui la ratifie est connu par des résultats publiés de plus de trois millions de oui ; Claude Langlois a montré que le ministère de l'Intérieur, tenu par Lucien, avait gonflé les chiffres, le nombre réel tournant autour de un million et demi. Le récit officiel des poignards brandis contre Bonaparte dans la salle des Cinq-Cents relève de la propagande de l'époque.",
    "sources": [
      {
        "kind": "primary",
        "author": "Gazette nationale ou le Moniteur universel",
        "work": "Comptes rendus des séances des 18 et 19 brumaire an VIII et proclamation de Bonaparte du 19 brumaire, Paris, an VIII"
      },
      {
        "kind": "modern",
        "author": "Jean Tulard",
        "work": "Le 18 Brumaire. Comment terminer une révolution, Paris, Perrin, 1999"
      },
      {
        "kind": "modern",
        "author": "Thierry Lentz",
        "work": "Le 18-Brumaire. Les coups d'État de Napoléon Bonaparte, Paris, Jean Picollec, 1997"
      },
      {
        "kind": "modern",
        "author": "Claude Langlois",
        "work": "« Le plébiscite de l'an VIII ou le coup d'État du 18 pluviôse an VIII », Annales historiques de la Révolution française, 1972"
      }
    ]
  },
  {
    "id": "retablissement-de-l-esclavage",
    "title": "Rétablissement de l'esclavage dans les colonies françaises",
    "start": 1802,
    "month": 5,
    "day": 20,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "La loi du 30 floréal an X (20 mai 1802) maintient l'esclavage là où il n'avait pas été aboli ; son rétablissement en Guadeloupe procède d'un arrêté consulaire du 16 juillet 1802, et il fut tenté par les armes à Saint-Domingue.",
    "era": "empire",
    "track": "saint-domingue",
    "category": "society",
    "importance": 2,
    "placeId": "paris",
    "people": [
      "napoleon-bonaparte",
      "toussaint-louverture",
      "charles-leclerc",
      "richepanse",
      "louis-delgres",
      "sonthonax"
    ],
    "summary": "Le 20 mai 1802 (30 floréal an X), le Premier consul Bonaparte fait voter une loi qui maintient l'esclavage et la traite dans les colonies rendues par l'Angleterre et dans l'océan Indien, huit ans après l'abolition de 1794. En Guadeloupe, l'esclavage est rétabli par la force après une résistance écrasée ; à Saint-Domingue, la guerre qui s'ensuit aboutit à l'indépendance d'Haïti en 1804.",
    "body": "**L'abolition de 1794.** En août 1793, face à l'insurrection des esclaves commencée en 1791 dans le Nord de Saint-Domingue et à la guerre contre l'Angleterre et l'Espagne, le commissaire Sonthonax proclame l'émancipation générale dans la province du Nord. Le 16 pluviôse an II (4 février 1794), la Convention abolit l'esclavage dans toutes les colonies françaises. L'abolition est appliquée à Saint-Domingue et en Guadeloupe, mais pas en Martinique, occupée par les Anglais, ni aux Mascareignes, dont les colons refusent le décret. Toussaint Louverture, ancien esclave affranchi devenu général de la République, s'impose à Saint-Domingue et y promulgue en 1801 une constitution qui le nomme gouverneur à vie.\n\n**La loi du 30 floréal an X.** Au printemps 1802, la paix d'Amiens rend la Martinique à la France. La loi du 20 mai 1802 dispose que l'esclavage y sera maintenu « conformément aux lois et règlements antérieurs à 1789 », comme dans les autres colonies restituées et aux Mascareignes, et que la traite reprendra. Le texte ne nomme pas Saint-Domingue ni la Guadeloupe, mais le même gouvernement prépare le retour à l'ordre ancien : un arrêté consulaire du 16 juillet 1802 rétablit l'esclavage en Guadeloupe, et les instructions secrètes du général Leclerc prévoient de désarmer les anciens esclaves. Bonaparte en porte la responsabilité politique ; les historiens discutent de la part du calcul, de l'influence du lobby colonial et de ses propres convictions (Yves Bénot y voit une politique délibérée, Thierry Lentz et Pierre Branda insistent sur le pragmatisme), non du fait lui-même.\n\n**La Guadeloupe.** Débarqué en mai 1802, le général Richepanse se heurte à la résistance des soldats de couleur menés par Louis Delgrès et Joseph Ignace. Le 28 mai, assiégés à Matouba, Delgrès et plusieurs centaines de ses compagnons se font sauter plutôt que de se rendre. La répression qui suit fait plusieurs milliers de morts, selon des estimations débattues, et l'esclavage est rétabli. Il ne sera aboli définitivement qu'en 1848.\n\n**Saint-Domingue.** L'expédition Leclerc, partie à la fin de 1801 avec plus de 20 000 hommes et renforcée ensuite, obtient la reddition de Toussaint Louverture, qui est arrêté par traîtrise en juin 1802 et meurt captif au fort de Joux, dans le Jura, le 7 avril 1803. L'annonce du rétablissement de l'esclavage en Guadeloupe relance l'insurrection générale. Décimée par la fièvre jaune, qui emporte Leclerc, et par une guerre d'extermination menée des deux côtés, l'armée française capitule après la bataille de Vertières (18 novembre 1803). Le 1er janvier 1804, Dessalines proclame l'indépendance d'Haïti.",
    "sources": [
      {
        "kind": "primary",
        "author": "Consulat (Corps législatif et Tribunat)",
        "work": "Loi du 30 floréal an X relative à la traite des noirs et au régime des colonies, Bulletin des lois, an X"
      },
      {
        "kind": "modern",
        "author": "Yves Bénot",
        "work": "La Démence coloniale sous Napoléon, Paris, La Découverte, 1992"
      },
      {
        "kind": "modern",
        "author": "Laurent Dubois",
        "work": "Avengers of the New World: The Story of the Haitian Revolution, Cambridge (Massachusetts), Harvard University Press, 2004"
      },
      {
        "kind": "modern",
        "author": "Frédéric Régent",
        "work": "Esclavage, métissage, liberté. La Révolution française en Guadeloupe, 1789-1802, Paris, Grasset, 2004"
      },
      {
        "kind": "modern",
        "author": "Pierre Branda et Thierry Lentz",
        "work": "Napoléon, l'esclavage et les colonies, Paris, Fayard, 2006"
      }
    ]
  },
  {
    "id": "sacre-de-napoleon",
    "title": "Sacre de Napoléon à Notre-Dame",
    "start": 1804,
    "month": 12,
    "day": 2,
    "precision": "day",
    "certainty": "attested",
    "era": "empire",
    "track": "royaume",
    "category": "religion",
    "importance": 1,
    "placeId": "notre-dame-de-paris",
    "people": [
      "napoleon-bonaparte",
      "josephine-de-beauharnais",
      "pie-vii"
    ],
    "summary": "Le 2 décembre 1804 (11 frimaire an XIII), à Notre-Dame de Paris, Napoléon est sacré empereur des Français en présence du pape Pie VII. Il se couronne lui-même, comme le prévoyait le cérémonial, puis couronne Joséphine. La cérémonie mêle rite religieux hérité des rois et serment civil à la Constitution, prêté après le départ du pape.",
    "body": "**De la République à l'Empire.** Le sénatus-consulte du 28 floréal an XII (18 mai 1804) confie le gouvernement de la République à un « empereur des Français » héréditaire. Le plébiscite sur l'hérédité donne environ 3,5 millions de oui contre quelques milliers de non, chiffres eux aussi arrangés selon les historiens. Napoléon veut un sacre pour s'inscrire dans la tradition monarchique, mais à Paris plutôt qu'à Reims, et avec le pape plutôt qu'avec l'archevêque.\n\n**La cérémonie.** Pie VII, venu de Rome après de longues négociations, oint l'empereur et l'impératrice et bénit les insignes. Napoléon prend lui-même la couronne et la pose sur sa tête, geste réglé à l'avance et non improvisé, puis couronne Joséphine agenouillée. À la demande de celle-ci, un mariage religieux avait été célébré discrètement la veille par le cardinal Fesch, oncle de l'empereur. Le pape se retire avant le serment, par lequel Napoléon jure notamment de respecter la liberté des cultes et l'irrévocabilité de la vente des biens nationaux.\n\n**L'image et la réalité.** Le grand tableau de David (1805 à 1808, musée du Louvre) montre le couronnement de Joséphine et non celui de Napoléon ; il place dans la tribune Letizia Bonaparte, la mère de l'empereur, qui n'assistait pas au sacre. Le témoignage de Mme de Rémusat, dame du palais, décrit la longueur et le froid de la cérémonie, qui dura plusieurs heures.",
    "sources": [
      {
        "kind": "primary",
        "author": "Claire de Rémusat",
        "work": "Mémoires de Madame de Rémusat, 1802-1808, Paris, Calmann Lévy, 1879 et 1880"
      },
      {
        "kind": "modern",
        "author": "José Cabanis",
        "work": "Le Sacre de Napoléon, 2 décembre 1804, Paris, Gallimard, coll. « Trente journées qui ont fait la France », 1970"
      },
      {
        "kind": "modern",
        "author": "Jean Tulard (dir.)",
        "work": "Dictionnaire Napoléon, Paris, Fayard, 1987, nouvelle édition 1999",
        "locus": "article « Sacre »"
      },
      {
        "kind": "modern",
        "author": "Thierry Lentz",
        "work": "Nouvelle histoire du Premier Empire, t. I, Napoléon et la conquête de l'Europe, 1804-1810, Paris, Fayard, 2002"
      }
    ],
    "scene": "sacre-de-napoleon"
  },
  {
    "id": "bataille-d-austerlitz",
    "title": "Bataille d'Austerlitz",
    "start": 1805,
    "month": 12,
    "day": 2,
    "precision": "day",
    "certainty": "attested",
    "era": "empire",
    "track": "coalition-3",
    "category": "war",
    "importance": 1,
    "placeId": "austerlitz",
    "people": [
      "napoleon-bonaparte",
      "alexandre-ier",
      "francois-ii-d-autriche",
      "koutouzov",
      "soult"
    ],
    "summary": "Le 2 décembre 1805 (11 frimaire an XIV), en Moravie, Napoléon bat l'armée austro-russe des empereurs Alexandre Ier et François II, d'où le nom de « bataille des Trois Empereurs ». Le corps de Soult enlève le plateau de Pratzen et coupe l'armée alliée en deux. La victoire met fin à la troisième coalition : l'Autriche signe la paix de Presbourg le 26 décembre.",
    "body": "**La campagne.** Après la capitulation autrichienne d'Ulm en octobre et l'entrée à Vienne en novembre, Napoléon, loin de ses bases, s'arrête en Moravie face aux Russes de Koutouzov et aux restes de l'armée autrichienne. Il dégarnit volontairement son aile droite et abandonne le plateau de Pratzen pour inciter les Alliés à l'attaquer au sud et à couper sa route vers Vienne.\n\n**La bataille.** Le 2 décembre au matin, les colonnes alliées descendent du Pratzen vers les villages de Telnitz et Sokolnitz, tenus par Davout. Napoléon lance alors le corps de Soult à l'assaut du plateau, qui est pris vers midi malgré la contre-attaque de la Garde russe. L'armée alliée, coupée en deux, est rejetée au sud vers les étangs gelés de Satschan et de Menitz, tandis que Lannes et Murat la tiennent au nord. Effectifs et pertes varient selon les auteurs : environ 65 000 à 75 000 Français contre 85 000 à 90 000 Alliés ; côté français, de 7 000 à 9 000 tués et blessés ; côté allié, de 15 000 à 16 000 tués et blessés et de 11 000 à 12 000 prisonniers (ordres de grandeur retenus par Duffy et Goetz).\n\n**Le mythe des étangs.** Le 30e bulletin de la Grande Armée, texte de propagande rédigé sous le contrôle de Napoléon, décrit des milliers de Russes engloutis sous la glace des étangs brisée par l'artillerie, et le chiffre a longtemps été répété. Les étangs, peu profonds, furent asséchés les jours suivants : on n'y trouva que quelques cadavres humains et un grand nombre de chevaux et de canons. Les historiens estiment les noyés à quelques dizaines tout au plus. La proclamation du 3 décembre (« Soldats, je suis content de vous ») et le « soleil d'Austerlitz » ont fait le reste de la légende.",
    "sources": [
      {
        "kind": "primary",
        "author": "Napoléon (texte officiel de propagande)",
        "work": "30e bulletin de la Grande Armée, Austerlitz, 12 frimaire an XIV (3 décembre 1805), publié au Moniteur universel"
      },
      {
        "kind": "modern",
        "author": "Christopher Duffy",
        "work": "Austerlitz 1805, Londres, Seeley Service, 1977"
      },
      {
        "kind": "modern",
        "author": "Robert Goetz",
        "work": "1805: Austerlitz. Napoleon and the Destruction of the Third Coalition, Londres, Greenhill Books, 2005"
      },
      {
        "kind": "modern",
        "author": "Jacques Garnier",
        "work": "Austerlitz, 2 décembre 1805, Paris, Fayard, 2005"
      }
    ],
    "scene": "austerlitz"
  },
  {
    "id": "passage-de-la-berezina",
    "title": "Passage de la Bérézina",
    "start": 1812,
    "month": 11,
    "day": 26,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "Les ponts sont construits à partir du 26 novembre ; le passage et les combats sur les deux rives durent jusqu'au 29 au matin, quand Éblé fait brûler les ponts.",
    "era": "empire",
    "track": "coalition-6",
    "category": "war",
    "importance": 2,
    "placeId": "studianka",
    "people": [
      "napoleon-bonaparte",
      "eble",
      "oudinot",
      "ney",
      "tchitchagov",
      "koutouzov",
      "caulaincourt"
    ],
    "summary": "Du 26 au 29 novembre 1812, pendant la retraite de Russie, les restes de la Grande Armée franchissent la Bérézina près de Studianka sur deux ponts construits dans l'eau glacée par les pontonniers du général Éblé, tandis que les corps d'Oudinot, de Ney et de Victor contiennent les Russes sur les deux rives. L'armée échappe à l'encerclement, mais des milliers de traînards restent sur la rive gauche quand les ponts sont brûlés.",
    "body": "**Un piège.** La Grande Armée entrée en Russie en juin 1812 comptait de 450 000 à 680 000 hommes selon ce que l'on compte. En novembre, après l'abandon de Moscou, elle n'aligne plus que quelques dizaines de milliers de combattants, suivis d'une foule de traînards et de civils. Les Russes de l'amiral Tchitchagov ont pris Borissov et son pont ; Wittgenstein arrive du nord, Koutouzov suit à distance. La Bérézina, grossie par le dégel, charrie des glaçons.\n\n**Les ponts d'Éblé.** Un gué est repéré près de Studianka, au nord de Borissov, et une diversion trompe Tchitchagov. À partir du 26 novembre, environ 400 pontonniers du général Éblé, travaillant dans l'eau jusqu'aux épaules, construisent deux ponts de chevalets, l'un pour l'infanterie, l'autre pour l'artillerie, qu'ils réparent sans cesse. Beaucoup en meurent. Le 28, Oudinot et Ney repoussent Tchitchagov sur la rive droite tandis que le corps de Victor tient la rive gauche contre Wittgenstein, sous le feu de l'artillerie qui provoque la panique sur les ponts.\n\n**Le bilan.** Le 29 au matin, Éblé exécute l'ordre de brûler les ponts ; des milliers de traînards qui n'ont pas voulu passer la nuit précédente sont abandonnés aux Cosaques. Les pertes françaises (tués, noyés, prisonniers, combattants ou non) sont estimées de 25 000 à 45 000 personnes selon les historiens, sans compter précisément les civils ; les pertes russes sont mal connues. Militairement, Napoléon a sauvé le noyau de l'armée et sa propre personne, ce qui explique que certains historiens parlent d'un succès tactique au milieu d'un désastre. Éblé meurt d'épuisement à Königsberg le 31 décembre. Le 29e bulletin, daté du 3 décembre, reconnaît la catastrophe tout en concluant que la santé de l'empereur « n'a jamais été meilleure ».",
    "sources": [
      {
        "kind": "primary",
        "author": "Armand de Caulaincourt",
        "work": "Mémoires du général de Caulaincourt, duc de Vicence, éd. Jean Hanoteau, Paris, Plon, 1933"
      },
      {
        "kind": "primary",
        "author": "Napoléon (texte officiel de propagande)",
        "work": "29e bulletin de la Grande Armée, Molodetchno, 3 décembre 1812, publié au Moniteur universel"
      },
      {
        "kind": "modern",
        "author": "Thierry Lentz",
        "work": "Nouvelle histoire du Premier Empire, t. II, L'effondrement du système napoléonien, 1810-1814, Paris, Fayard, 2004"
      },
      {
        "kind": "modern",
        "author": "Marie-Pierre Rey",
        "work": "L'Effroyable Tragédie. Une nouvelle histoire de la campagne de Russie, Paris, Flammarion, 2012"
      },
      {
        "kind": "modern",
        "author": "Adam Zamoyski",
        "work": "1812: Napoleon's Fatal March on Moscow, Londres, HarperCollins, 2004"
      }
    ],
    "scene": "berezina"
  },
  {
    "id": "bataille-de-waterloo",
    "title": "Bataille de Waterloo",
    "start": 1815,
    "month": 6,
    "day": 18,
    "precision": "day",
    "certainty": "attested",
    "era": "empire",
    "track": "coalition-7",
    "category": "war",
    "importance": 1,
    "placeId": "waterloo",
    "people": [
      "napoleon-bonaparte",
      "wellington",
      "blucher",
      "ney",
      "grouchy",
      "cambronne",
      "soult"
    ],
    "summary": "Le 18 juin 1815, au sud de Waterloo, sur le plateau de Mont-Saint-Jean, l'armée de Napoléon revenu de l'île d'Elbe est battue par l'armée anglo-alliée de Wellington et l'armée prussienne de Blücher, arrivée en fin de journée. La défaite met fin aux Cent-Jours : Napoléon abdique le 22 juin.",
    "body": "**La campagne de Belgique.** Revenu au pouvoir en mars 1815, Napoléon attaque en Belgique avant que les armées de la septième coalition ne se réunissent. Le 16 juin, il bat les Prussiens à Ligny tandis que Ney affronte les Anglo-alliés aux Quatre-Bras. Le 17, il détache le maréchal Grouchy avec environ 33 000 hommes pour poursuivre les Prussiens, qui se replient vers Wavre pour rester en mesure de soutenir Wellington.\n\n**La bataille.** Le sol détrempé par l'orage retarde l'attaque jusque vers 11 h 30. Napoléon dispose d'environ 72 000 hommes, Wellington d'environ 68 000 ; les Prussiens engagent dans l'après-midi et le soir 50 000 hommes environ (chiffres approximatifs, discutés selon les auteurs). La ferme fortifiée d'Hougoumont résiste toute la journée ; l'attaque du corps de d'Erlon échoue ; Ney lance vers 16 heures de grandes charges de cavalerie contre les carrés anglo-alliés, sans infanterie pour les soutenir. La Haye-Sainte tombe vers 18 h 30, mais les Prussiens de Bülow attaquent Plancenoit sur le flanc droit français. Vers 19 h 30, l'assaut de la Moyenne Garde est repoussé, et l'armée française se débande. Pertes approximatives : de 25 000 à 30 000 Français tués et blessés et environ 7 000 à 8 000 prisonniers ; environ 15 000 à 17 000 côté anglo-allié et 7 000 côté prussien.\n\n**Mots et noms.** La phrase « La Garde meurt mais ne se rend pas » est attribuée au général Cambronne par un journaliste dès le 24 juin 1815 ; Cambronne, blessé et fait prisonnier ce soir-là, l'a toujours démentie. Le « mot de Cambronne » plus bref a été popularisé par Victor Hugo dans Les Misérables (1862). La bataille porte le nom du village où Wellington avait son quartier général et d'où il data sa dépêche ; les Prussiens l'appelèrent Belle-Alliance, les Français Mont-Saint-Jean.",
    "sources": [
      {
        "kind": "primary",
        "author": "Arthur Wellesley, duc de Wellington",
        "work": "Dépêche au comte Bathurst, Waterloo, 19 juin 1815, publiée dans la London Gazette Extraordinary du 22 juin 1815"
      },
      {
        "kind": "modern",
        "author": "Henry Houssaye",
        "work": "1815. Waterloo, Paris, Perrin, 1898"
      },
      {
        "kind": "modern",
        "author": "Peter Hofschröer",
        "work": "1815: The Waterloo Campaign, 2 vol., Londres, Greenhill Books, 1998 et 1999"
      },
      {
        "kind": "modern",
        "author": "Thierry Lentz",
        "work": "Nouvelle histoire du Premier Empire, t. IV, Les Cent-Jours, 1815, Paris, Fayard, 2010"
      }
    ],
    "scene": "waterloo"
  },
  {
    "id": "mort-de-napoleon",
    "title": "Mort de Napoléon à Sainte-Hélène",
    "start": 1821,
    "month": 5,
    "day": 5,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "La date et le lieu sont certains ; la cause de la mort a été discutée. Le consensus médical retient un cancer de l'estomac, l'hypothèse d'un empoisonnement à l'arsenic étant rejetée.",
    "era": "exil",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "longwood",
    "people": [
      "napoleon-bonaparte",
      "hudson-lowe",
      "antommarchi",
      "henri-gatien-bertrand",
      "las-cases"
    ],
    "summary": "Le 5 mai 1821, vers 17 h 50, Napoléon meurt à Longwood, sur l'île britannique de Sainte-Hélène, où il était déporté depuis octobre 1815. L'autopsie conclut à un ulcère cancéreux de l'estomac ; l'hypothèse d'un empoisonnement à l'arsenic, lancée en 1961, a été écartée par les études récentes. Ses restes sont ramenés aux Invalides en 1840.",
    "body": "**L'exil.** Après Waterloo et sa seconde abdication, Napoléon se livre aux Britanniques, qui le déportent à Sainte-Hélène, au milieu de l'Atlantique Sud. Il arrive en octobre 1815 avec une petite suite (Bertrand, Montholon, Gourgaud, Las Cases) et s'installe à Longwood House, une maison humide sur un plateau venté. Ses relations avec le gouverneur Hudson Lowe, chargé d'une surveillance stricte, sont exécrables. Il dicte ses souvenirs, matière du Mémorial de Sainte-Hélène de Las Cases (1823), qui fonde la légende napoléonienne.\n\n**La mort.** Malade depuis plusieurs mois, souffrant de douleurs abdominales et de vomissements, Napoléon meurt le 5 mai 1821 en fin d'après-midi. Ses dernières paroles, rapportées avec des variantes par les témoins (« France », « armée », « tête d'armée », « Joséphine »), sont incertaines. L'autopsie, pratiquée le lendemain par son médecin Antommarchi en présence de médecins britanniques, décrit un estomac rongé par un ulcère d'aspect cancéreux, la maladie dont était mort son père.\n\n**Le débat sur la cause.** En 1961, le dentiste suédois Sten Forshufvud avance la thèse d'un empoisonnement à l'arsenic, appuyée sur des analyses de cheveux. Elle a été largement réfutée : des analyses publiées en 2008 ont montré des taux d'arsenic comparables tout au long de la vie de Napoléon et chez ses contemporains, exposition alors courante (papiers peints, remèdes), et une étude anatomopathologique de 2007 conforte le diagnostic d'un cancer gastrique avancé. Le consensus des historiens et des médecins retient ce cancer. Le corps, inhumé dans l'île, est rapatrié et déposé aux Invalides le 15 décembre 1840.",
    "sources": [
      {
        "kind": "primary",
        "author": "Emmanuel de Las Cases",
        "work": "Mémorial de Sainte-Hélène, Paris, 1823"
      },
      {
        "kind": "primary",
        "author": "Henri-Gatien Bertrand",
        "work": "Cahiers de Sainte-Hélène, éd. Paul Fleuriot de Langle, 3 vol., Paris, 1949 à 1959"
      },
      {
        "kind": "primary",
        "author": "Francesco Antommarchi",
        "work": "Mémoires du docteur F. Antommarchi, ou les Derniers Moments de Napoléon, Paris, 1825"
      },
      {
        "kind": "modern",
        "author": "Thierry Lentz et Jacques Macé",
        "work": "La Mort de Napoléon. Mythes, légendes et mystères, Paris, Perrin, 2009"
      }
    ]
  },
  {
    "id": "abolition-de-l-esclavage",
    "title": "Abolition de l'esclavage dans les colonies",
    "start": 1794,
    "month": 2,
    "day": 4,
    "precision": "day",
    "certainty": "attested",
    "era": "revolution",
    "track": "saint-domingue",
    "category": "society",
    "importance": 2,
    "placeId": "paris",
    "people": [
      "sonthonax",
      "toussaint-louverture",
      "jean-baptiste-belley"
    ],
    "summary": "Le 4 février 1794, la Convention abolit l'esclavage dans toutes les colonies françaises et fait citoyens les hommes qui y vivent, sans distinction de couleur. Elle ratifie ce que l'insurrection des esclaves de Saint-Domingue, commencée en août 1791, et les commissaires civils avaient déjà imposé sur place. L'abolition n'est appliquée qu'à Saint-Domingue, en Guadeloupe et en Guyane, et Bonaparte rétablit l'esclavage en 1802.",
    "body": "**Une abolition arrachée à Saint-Domingue.** Dans la nuit du 22 au 23 août 1791, les esclaves de la plaine du Nord de Saint-Domingue se soulèvent. Pour garder la colonie face aux Espagnols et aux Britanniques, le commissaire civil Sonthonax proclame la liberté générale dans le Nord le 29 août 1793, et son collègue Polverel l'étend au reste de la colonie à l'automne. Trois députés élus à Saint-Domingue, dont Jean-Baptiste Belley, ancien esclave, sont admis à la Convention le 3 février 1794.\n\n**Le décret du 16 pluviôse an II.** Le lendemain, sans long débat, la Convention déclare l'esclavage aboli dans toutes les colonies : « tous les hommes, sans distinction de couleur, domiciliés dans les colonies, sont citoyens français ». Le texte ne prévoit aucune indemnité pour les propriétaires. Il pousse Toussaint Louverture, qui combattait avec les Espagnols, à rallier la République au printemps 1794.\n\n**Une application partielle.** Le décret s'applique à Saint-Domingue, en Guadeloupe, reprise aux Britanniques par Victor Hugues en 1794, et en Guyane. La Martinique, occupée par les Britanniques, garde l'esclavage, et les colons des Mascareignes refusent le décret. Huit ans plus tard, la loi du 20 mai 1802 maintient l'esclavage là où il n'avait pas été aboli, et un arrêté consulaire le rétablit en Guadeloupe ; l'abolition définitive date du 27 avril 1848.",
    "sources": [
      {
        "kind": "primary",
        "author": "Convention nationale",
        "work": "Décret du 16 pluviôse an II (4 février 1794) portant abolition de l'esclavage dans les colonies"
      },
      {
        "kind": "modern",
        "author": "Yves Bénot",
        "work": "La Révolution française et la fin des colonies, Paris, La Découverte, 1987"
      },
      {
        "kind": "modern",
        "author": "Laurent Dubois",
        "work": "Avengers of the New World: The Story of the Haitian Revolution, Cambridge (Mass.), Harvard University Press, 2004"
      },
      {
        "kind": "modern",
        "author": "Jean-Clément Martin",
        "work": "Nouvelle histoire de la Révolution française, Paris, Perrin, 2012"
      }
    ]
  }
]

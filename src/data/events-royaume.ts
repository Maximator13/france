import type { HistoricalEvent } from './schema.ts'

const GREGOIRE = "Grégoire de Tours"
const HISTOIRE_DES_FRANCS = "Histoire des Francs (Decem libri historiarum)"

export const events: HistoricalEvent[] = [
  {
    "id": "clovis-roi-des-francs",
    "title": "Clovis succède à Childéric, roi des Francs",
    "start": 481,
    "precision": "year",
    "certainty": "debated",
    "certaintyNote": "Aucun texte ne date l'avènement. Grégoire de Tours (II, 43) donne trente ans de règne à Clovis, mort en 511 : on en tire 481 ou 482 selon la manière de compter. 481 est retenu ici par convention.",
    "era": "merovingiens",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "tournai",
    "people": [
      "clovis",
      "childeric-ier"
    ],
    "summary": "Vers 481 ou 482, à la mort de son père Childéric, Clovis, âgé d'une quinzaine d'années, devient roi d'un des groupes de Francs saliens installés autour de Tournai, dans la province romaine de Belgique seconde. En trente ans, il soumet la plus grande partie de la Gaule. Le rôle de premier roi de France lui a été donné bien plus tard par l'historiographie.",
    "body": "**Un roi franc dans la Gaule romaine.** Childéric, le père de Clovis, était un chef de guerre franc au service de l'Empire. Sa tombe, découverte à Tournai en 1653, contenait un anneau sigillaire au nom de « Childéric roi » et un riche mobilier, en grande partie volé au Cabinet des médailles en 1831. Peu après l'avènement, l'évêque Remi de Reims écrit au jeune roi pour le féliciter d'avoir pris en charge l'administration de la Belgique seconde : la lettre montre un chef franc qui se coule dans les cadres romains.\n\n**Une source unique, et tardive.** Presque tout ce que l'on sait de Clovis vient de Grégoire de Tours, qui écrit dans les années 570 à 590, près d'un siècle après les faits, et compose un récit édifiant. La victoire sur Syagrius à Soissons, datée de 486 par déduction, et l'anecdote du vase de Soissons (II, 27) ne sont connues que par lui ; le vase relève de la tradition plus que de l'histoire vérifiable.\n\n**Pourquoi 481.** Clovis meurt en 511, et son royaume est partagé entre ses quatre fils. Faire commencer l'histoire de France avec lui est un choix ancien de la monarchie, qui voyait en lui le premier roi chrétien ; c'est une convention, non un fait de son temps. Son nom franc, Chlodowig, a donné Louis.",
    "sources": [
      {
        "kind": "primary",
        "author": GREGOIRE,
        "work": HISTOIRE_DES_FRANCS,
        "locus": "II, 27 et 43"
      },
      {
        "kind": "primary",
        "author": "Remi de Reims",
        "work": "Lettre à Clovis, dans les Epistolae Austrasicae"
      },
      {
        "kind": "modern",
        "author": "Michel Rouche",
        "work": "Clovis, Paris, Fayard, 1996"
      },
      {
        "kind": "modern",
        "author": "Ian Wood",
        "work": "The Merovingian Kingdoms, 450-751, Londres, Longman, 1994"
      }
    ]
  },
  {
    "id": "bapteme-de-clovis",
    "title": "Baptême de Clovis à Reims",
    "start": 496,
    "precision": "year",
    "certainty": "debated",
    "certaintyNote": "Grégoire de Tours lie le baptême à une victoire sur les Alamans, ce qui donne traditionnellement 496. La lettre d'Avit de Vienne a fait proposer 498 ou 499, et certains historiens le repoussent jusque vers 506 à 508. Le jour de Noël est retenu d'après la lettre d'Avit ; l'année reste discutée.",
    "era": "merovingiens",
    "track": "royaume",
    "category": "religion",
    "importance": 1,
    "placeId": "reims",
    "people": [
      "clovis",
      "remi-de-reims",
      "clotilde",
      "avit-de-vienne"
    ],
    "summary": "Un jour de Noël, vers la fin du Ve siècle, l'évêque Remi baptise Clovis à Reims, avec une partie de ses guerriers. Le roi franc choisit le christianisme catholique des évêques de Gaule, alors que les autres rois germaniques sont ariens. L'année est discutée, de 496 à 508 selon les historiens, et le récit le plus connu a été écrit près d'un siècle plus tard.",
    "body": "**Le récit de Grégoire.** Grégoire de Tours (II, 28 à 31) raconte la conversion comme une histoire édifiante : l'influence de la reine Clotilde, princesse burgonde catholique, puis un vœu fait par Clovis au cours d'une bataille contre les Alamans, enfin le baptême des mains de Remi. C'est lui qui place dans la bouche de l'évêque l'apostrophe « Courbe la tête, fier Sicambre », et qui compte plus de trois mille guerriers baptisés avec le roi. Ces détails, écrits vers 575 à 590, sont des reconstructions et non des témoignages.\n\n**Le seul témoin contemporain.** L'évêque Avit de Vienne, sujet du roi burgonde, écrit à Clovis pour le féliciter de son baptême, célébré à la Nativité. Sa lettre ne nomme ni Reims ni les Alamans, et c'est sur elle que s'appuient ceux qui proposent une date plus tardive que celle de Grégoire.\n\n**Pourquoi c'est important.** Wisigoths, Burgondes, Ostrogoths et Vandales sont chrétiens ariens ; Clovis, lui, adopte la foi des évêques et de l'aristocratie gallo-romaine, ce qui lui assure leur appui. La Sainte Ampoule, apportée par une colombe selon la légende, n'apparaît qu'au IXe siècle, chez l'archevêque Hincmar de Reims ; elle servira au sacre des rois de France.",
    "sources": [
      {
        "kind": "primary",
        "author": GREGOIRE,
        "work": HISTOIRE_DES_FRANCS,
        "locus": "II, 28 à 31"
      },
      {
        "kind": "primary",
        "author": "Avit de Vienne",
        "work": "Lettre à Clovis sur son baptême",
        "locus": "lettre 46 (éd. Peiper)"
      },
      {
        "kind": "modern",
        "author": "Michel Rouche",
        "work": "Clovis, Paris, Fayard, 1996"
      },
      {
        "kind": "modern",
        "author": "Bruno Dumézil",
        "work": "Le Baptême de Clovis, Paris, Gallimard, 2019"
      }
    ],
    "scene": "bapteme-de-clovis"
  },
  {
    "id": "bataille-de-vouille",
    "title": "Bataille de Vouillé",
    "start": 507,
    "precision": "year",
    "certainty": "attested",
    "certaintyNote": "La bataille et l'année sont sûres. Le lieu, le « champ Vogladensis » à dix milles de Poitiers selon Grégoire de Tours, est traditionnellement identifié à Vouillé ; Voulon et d'autres sites ont été proposés.",
    "era": "merovingiens",
    "track": "royaume",
    "category": "war",
    "importance": 2,
    "placeId": "vouille",
    "people": [
      "clovis",
      "alaric-ii"
    ],
    "summary": "En 507, près de Poitiers, Clovis bat les Wisigoths d'Alaric II, tué dans la bataille. Le royaume wisigoth de Toulouse perd la plus grande partie de ses terres au sud de la Loire et se replie sur l'Espagne et la Septimanie. Clovis fait ensuite de Paris le siège de son royaume.",
    "body": "**Une guerre préparée.** Les lettres que Théodoric, roi des Ostrogoths d'Italie, adresse à Clovis, à Alaric et au roi burgonde, conservées par Cassiodore, montrent qu'il tente en vain d'empêcher le conflit. Grégoire de Tours (II, 37) présente la campagne comme une guerre contre des hérétiques ariens ; c'est sa lecture, écrite trois générations plus tard.\n\n**La bataille.** Les Francs franchissent la Vienne et rencontrent l'armée wisigothe à dix milles de Poitiers. Alaric II est tué, selon Grégoire de la main même de Clovis, détail qui relève de l'éloge. Aucune source ne donne d'effectifs fiables.\n\n**Les suites.** Clovis prend Toulouse et une partie du trésor wisigoth ; Théodoric intervient pour conserver la Provence et la Septimanie aux Goths. À Tours, Clovis reçoit de l'empereur Anastase des insignes consulaires, puis il établit à Paris « le siège de son royaume » (II, 38). L'emplacement exact du champ de bataille reste discuté.",
    "sources": [
      {
        "kind": "primary",
        "author": GREGOIRE,
        "work": HISTOIRE_DES_FRANCS,
        "locus": "II, 35 à 38"
      },
      {
        "kind": "primary",
        "author": "Cassiodore",
        "work": "Variae (lettres de Théodoric à Alaric II, Gondebaud et Clovis)",
        "locus": "III, 1 à 4"
      },
      {
        "kind": "modern",
        "author": "Ralph W. Mathisen et Danuta Shanzer (dir.)",
        "work": "The Battle of Vouillé, 507 CE: Where France Began, Boston et Berlin, De Gruyter, 2012"
      },
      {
        "kind": "modern",
        "author": "Michel Rouche",
        "work": "Clovis, Paris, Fayard, 1996"
      }
    ]
  },
  {
    "id": "sacre-de-pepin-le-bref",
    "title": "Pépin le Bref élu et oint roi des Francs",
    "start": 751,
    "precision": "year",
    "certainty": "attested",
    "certaintyNote": "L'élection à Soissons date de la fin de 751 ou du tout début de 752 ; les Annales royales la placent sous l'année 750. Le rôle de Boniface, nommé par elles seules, est mis en doute par de nombreux historiens. Le second sacre, par le pape à Saint-Denis, date de 754.",
    "era": "carolingiens",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "soissons",
    "people": [
      "pepin-le-bref",
      "childeric-iii",
      "boniface",
      "etienne-ii"
    ],
    "summary": "En 751, à Soissons, le maire du palais Pépin le Bref se fait élire roi par les grands et oindre par les évêques. Le dernier Mérovingien, Childéric III, est tondu et enfermé dans un monastère. Pour la première fois, un roi franc reçoit l'onction ; en 754, le pape Étienne II la renouvelle à Saint-Denis. La dynastie carolingienne commence.",
    "body": "**Un changement de dynastie justifié après coup.** Depuis des décennies, les maires du palais de la famille des Pippinides gouvernent à la place des rois mérovingiens. Selon les Annales royales, Pépin envoie en 749 l'évêque Burchard de Wurtzbourg et l'abbé Fulrad demander au pape Zacharie s'il est bon que celui qui n'a pas le pouvoir porte le titre de roi. La réponse favorable du pape n'est connue que par ces annales, rédigées à la cour carolingienne une quarantaine d'années plus tard.\n\n**L'onction.** À Soissons, Pépin est « élu selon la coutume des Francs » et oint, geste emprunté à l'Ancien Testament et peut-être aux rois wisigoths. Les Annales nomment Boniface comme officiant ; les Continuations de Frédégaire parlent seulement de la consécration par les évêques.\n\n**Le sacre de 754.** Venu chercher l'aide des Francs contre les Lombards, le pape Étienne II oint de nouveau Pépin et ses fils Charles et Carloman à Saint-Denis, en 754. Un court texte, la Clausula de unctione Pippini, ajoute qu'il interdit aux Francs de choisir un roi hors de cette famille ; son authenticité est discutée. En échange, Pépin mène deux campagnes en Italie et remet au pape les territoires pris aux Lombards.",
    "sources": [
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Annales regni Francorum (Annales royales)",
        "locus": "années 749 à 754"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Continuations de la Chronique de Frédégaire"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Clausula de unctione Pippini"
      },
      {
        "kind": "modern",
        "author": "Pierre Riché",
        "work": "Les Carolingiens, une famille qui fit l'Europe, Paris, Hachette, 1983"
      },
      {
        "kind": "modern",
        "author": "Rosamond McKitterick",
        "work": "The Frankish Kingdoms under the Carolingians, 751-987, Londres, Longman, 1983"
      }
    ]
  },
  {
    "id": "couronnement-de-charlemagne",
    "title": "Charlemagne couronné empereur à Rome",
    "start": 800,
    "month": 12,
    "day": 25,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "Les Annales royales placent l'événement sous l'année 801, parce qu'elles font commencer l'année à Noël : il s'agit bien du 25 décembre 800.",
    "era": "carolingiens",
    "track": "royaume",
    "category": "politics",
    "importance": 1,
    "placeId": "basilique-saint-pierre-de-rome",
    "people": [
      "charlemagne",
      "leon-iii",
      "eginhard"
    ],
    "summary": "Le jour de Noël 800, dans la basilique Saint-Pierre de Rome, le pape Léon III pose une couronne sur la tête de Charlemagne, roi des Francs et des Lombards, que le peuple de Rome acclame empereur. Pour la première fois depuis 476, l'Occident a de nouveau un empereur, ce que Constantinople ne reconnaît qu'en 812.",
    "body": "**Un pape en difficulté.** En 799, Léon III est agressé dans Rome par des membres de l'aristocratie romaine et se réfugie auprès de Charlemagne, à Paderborn. Charles arrive à Rome à la fin de 800 ; le 23 décembre, le pape se lave par serment des accusations portées contre lui.\n\n**La cérémonie.** Selon les Annales royales, pendant la messe de Noël, Léon III couronne Charles, le peuple l'acclame « Auguste, couronné par Dieu, grand et pacifique empereur des Romains », puis le pape se prosterne devant lui à la manière antique. À Constantinople règne alors l'impératrice Irène, et une partie des Francs considère que le trône impérial est vacant.\n\n**Un empereur réticent ?** Éginhard (chapitre 28) affirme que Charles n'aurait pas mis les pieds dans l'église ce jour-là s'il avait connu le dessein du pape. Les historiens y voient le plus souvent une formule de modestie, ou le signe d'un désaccord sur la forme d'une cérémonie qui donnait au pape le premier rôle ; le débat reste ouvert.",
    "sources": [
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Annales regni Francorum (Annales royales)",
        "locus": "année 801"
      },
      {
        "kind": "primary",
        "author": "Éginhard",
        "work": "Vie de Charlemagne",
        "locus": "28"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Liber pontificalis, vie de Léon III"
      },
      {
        "kind": "modern",
        "author": "Robert Folz",
        "work": "Le Couronnement impérial de Charlemagne, 25 décembre 800, Paris, Gallimard, 1964"
      },
      {
        "kind": "modern",
        "author": "Jean Favier",
        "work": "Charlemagne, Paris, Fayard, 1999"
      }
    ]
  },
  {
    "id": "traite-de-verdun",
    "title": "Traité de Verdun, partage de l'Empire carolingien",
    "start": 843,
    "month": 8,
    "precision": "month",
    "certainty": "attested",
    "certaintyNote": "Le texte du traité n'est pas conservé ; les annales le datent du mois d'août 843 sans donner le jour.",
    "era": "carolingiens",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "verdun",
    "people": [
      "lothaire-ier",
      "louis-le-germanique",
      "charles-le-chauve"
    ],
    "summary": "En août 843, à Verdun, les trois petits-fils de Charlemagne se partagent l'Empire : Charles le Chauve reçoit l'ouest, la Francie occidentale, Louis le Germanique l'est, et Lothaire, qui garde le titre impérial, une longue bande de la Frise à l'Italie. Le royaume de Charles est l'ancêtre territorial du royaume de France.",
    "body": "**Trois ans de guerre civile.** À la mort de Louis le Pieux, en 840, son fils aîné Lothaire revendique l'autorité sur tout l'Empire. Ses frères Louis et Charles s'allient contre lui et le battent à Fontenoy-en-Puisaye le 25 juin 841, puis confirment leur alliance par les serments de Strasbourg, le 14 février 842. L'historien Nithard, petit-fils de Charlemagne, en a conservé le texte, l'un en langue romane, l'autre en langue germanique : le premier passe pour le plus ancien texte conservé en langue romane, ancêtre du français.\n\n**Le partage.** Préparé par des commissaires qui recensent les terres de l'Empire, l'accord donne à chacun des frères une part de valeur comparable. Charles reçoit les terres à l'ouest d'une ligne qui suit à peu près l'Escaut, la Meuse, la Saône et le Rhône ; Lothaire conserve Aix-la-Chapelle et Rome.\n\n**Ce que Verdun n'est pas.** On a longtemps présenté le traité comme l'acte de naissance de la France et de l'Allemagne. C'est un partage dynastique entre frères, comme les Francs en ont fait beaucoup ; la Francie occidentale ne devient que lentement le royaume de France, et le royaume du milieu est lui-même partagé dès 855.",
    "sources": [
      {
        "kind": "primary",
        "author": "Prudence de Troyes",
        "work": "Annales de Saint-Bertin",
        "locus": "année 843"
      },
      {
        "kind": "primary",
        "author": "Nithard",
        "work": "Histoire des fils de Louis le Pieux",
        "locus": "III, 5 (serments de Strasbourg)"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Annales de Fulda",
        "locus": "année 843"
      },
      {
        "kind": "modern",
        "author": "Janet L. Nelson",
        "work": "Charles the Bald, Londres, Longman, 1992"
      },
      {
        "kind": "modern",
        "author": "Pierre Riché",
        "work": "Les Carolingiens, une famille qui fit l'Europe, Paris, Hachette, 1983"
      }
    ]
  },
  {
    "id": "election-d-hugues-capet",
    "title": "Hugues Capet élu roi",
    "start": 987,
    "precision": "year",
    "certainty": "attested",
    "certaintyNote": "Assemblée de Senlis à la fin de mai ou au début de juin 987, sacre le 3 juillet, à Noyon selon la plupart des historiens, à Reims selon une tradition minoritaire. L'événement est daté à l'année.",
    "era": "capetiens",
    "track": "royaume",
    "category": "politics",
    "importance": 1,
    "placeId": "senlis",
    "people": [
      "hugues-capet",
      "adalberon-de-reims",
      "louis-v",
      "charles-de-lorraine"
    ],
    "summary": "En 987, après la mort accidentelle du jeune roi Louis V, les grands réunis à Senlis écartent son oncle Charles de Lorraine, dernier Carolingien, et élisent le duc des Francs Hugues Capet. Sacré le 3 juillet, il fait associer son fils Robert au trône dès la fin de l'année. Ses descendants régneront sur la France jusqu'en 1848.",
    "body": "**Une élection.** Louis V meurt au printemps 987 d'une chute de cheval, sans enfant. Selon Richer de Reims, qui écrit dans les années 990, l'archevêque Adalbéron de Reims, partisan d'Hugues et proche de la cour ottonienne, plaide devant l'assemblée de Senlis que le royaume ne s'acquiert pas par droit héréditaire et que Charles de Lorraine, vassal de l'empereur, n'en est pas digne. Le discours est une composition de Richer, mais il reflète les arguments du moment.\n\n**Un roi faible ?** Hugues Capet, chef de la famille des Robertiens, dont deux membres avaient déjà été rois, ne domine directement qu'un domaine modeste, autour de Paris et d'Orléans. Charles de Lorraine prend Laon en 988 ; il n'est capturé qu'en 991, par la trahison de l'évêque de Laon.\n\n**La durée.** En faisant sacrer son fils Robert de son vivant, Hugues installe une pratique que ses successeurs reprennent jusqu'à Philippe Auguste et qui assure la continuité. Le surnom de Capet n'est attesté qu'après sa mort ; son origine, peut-être la chape de saint Martin, est discutée.",
    "sources": [
      {
        "kind": "primary",
        "author": "Richer de Reims",
        "work": "Histoires",
        "locus": "IV"
      },
      {
        "kind": "primary",
        "author": "Gerbert d'Aurillac",
        "work": "Lettres"
      },
      {
        "kind": "modern",
        "author": "Yves Sassier",
        "work": "Hugues Capet, Paris, Fayard, 1987"
      },
      {
        "kind": "modern",
        "author": "Laurent Theis",
        "work": "L'Avènement d'Hugues Capet, 3 juillet 987, Paris, Gallimard, 1984"
      }
    ]
  },
  {
    "id": "bataille-de-bouvines",
    "title": "Bataille de Bouvines",
    "start": 1214,
    "month": 7,
    "day": 27,
    "precision": "day",
    "certainty": "attested",
    "era": "capetiens",
    "track": "royaume",
    "category": "war",
    "importance": 2,
    "placeId": "bouvines",
    "people": [
      "philippe-auguste",
      "otton-iv",
      "ferrand-de-flandre",
      "renaud-de-dammartin",
      "jean-sans-terre"
    ],
    "summary": "Le dimanche 27 juillet 1214, entre Lille et Tournai, Philippe Auguste bat l'empereur Otton IV et ses alliés, le comte de Flandre et le comte de Boulogne, faits prisonniers. Trois semaines plus tôt, son fils Louis avait repoussé Jean sans Terre à La Roche-aux-Moines. La victoire confirme les conquêtes françaises sur les Plantagenêts.",
    "body": "**Une coalition à deux mâchoires.** Jean sans Terre, qui a perdu la Normandie en 1204, organise avec son neveu l'empereur Otton IV, Ferrand de Flandre et Renaud de Dammartin une double attaque : lui-même par le Poitou, ses alliés par le nord. Le 2 juillet, devant La Roche-aux-Moines, en Anjou, Jean recule devant le prince Louis sans livrer bataille.\n\n**La bataille.** Les coalisés rattrapent l'armée française près du pont de Bouvines, un dimanche, jour où l'on évitait de combattre. Le récit principal est celui de Guillaume le Breton, chapelain du roi, présent derrière lui. Philippe Auguste est désarçonné et sauvé par ses chevaliers ; frère Guérin, évêque élu de Senlis, ordonne la ligne française. Otton s'enfuit, son étendard à l'aigle et au dragon est pris ; Ferrand et Renaud sont capturés.\n\n**Les effectifs.** Ils sont inconnus. Les estimations modernes, notamment celle de J. F. Verbruggen, donnent à chaque camp de l'ordre de 1 200 à 1 500 cavaliers et quelques milliers de fantassins ; les chroniqueurs avancent des chiffres bien plus forts.\n\n**Les suites.** Le retour du roi à Paris donne lieu à des fêtes que Guillaume le Breton décrit longuement. En Angleterre, la défaite affaiblit Jean, contraint par ses barons à accorder la Grande Charte en 1215. Georges Duby a fait de ce dimanche un objet d'histoire et de mémoire.",
    "sources": [
      {
        "kind": "primary",
        "author": "Guillaume le Breton",
        "work": "Gesta Philippi Augusti"
      },
      {
        "kind": "primary",
        "author": "Guillaume le Breton",
        "work": "Philippide"
      },
      {
        "kind": "modern",
        "author": "Georges Duby",
        "work": "Le Dimanche de Bouvines, 27 juillet 1214, Paris, Gallimard, 1973"
      },
      {
        "kind": "modern",
        "author": "John W. Baldwin",
        "work": "The Government of Philip Augustus, Berkeley, University of California Press, 1986"
      },
      {
        "kind": "modern",
        "author": "J. F. Verbruggen",
        "work": "The Art of Warfare in Western Europe during the Middle Ages, Woodbridge, Boydell Press, 1997"
      }
    ]
  },
  {
    "id": "consecration-de-la-sainte-chapelle",
    "title": "Consécration de la Sainte-Chapelle",
    "start": 1248,
    "month": 4,
    "day": 26,
    "precision": "day",
    "certainty": "attested",
    "era": "capetiens",
    "track": "royaume",
    "category": "building",
    "importance": 2,
    "placeId": "sainte-chapelle",
    "people": [
      "louis-ix"
    ],
    "summary": "Le 26 avril 1248, dans l'enceinte du palais royal de la Cité, à Paris, la Sainte-Chapelle est consacrée. Louis IX l'a fait bâtir en quelques années pour abriter la couronne d'épines et les autres reliques de la Passion achetées à l'empereur latin de Constantinople. Deux mois plus tard, le roi part en croisade.",
    "body": "**Des reliques avant l'édifice.** En 1239, Louis IX rachète à Baudouin II, empereur latin de Constantinople, la couronne d'épines, que ce dernier avait mise en gage auprès de marchands vénitiens. Le roi va la recevoir nu-pieds près de Sens et l'apporte à Paris ; l'archevêque Gautier Cornut a raconté cette arrivée. D'autres reliques de la Passion suivent, dont un fragment de la Croix.\n\n**Une châsse de verre.** La chapelle compte deux niveaux : en bas, pour le personnel du palais ; en haut, pour le roi et les reliques. Les murs de la chapelle haute s'effacent presque devant quinze grandes verrières, en bonne partie d'origine. La chapelle haute est consacrée par le légat Eudes de Châteauroux, la chapelle basse par l'archevêque de Bourges. L'architecte est inconnu : l'attribution traditionnelle à Pierre de Montreuil n'est pas prouvée.\n\n**Le coût.** Selon des témoignages réunis après la mort du roi, l'édifice aurait coûté environ 40 000 livres tournois, bien moins que les reliques. Vidée à la Révolution, restaurée au XIXe siècle, la chapelle a perdu la plupart de ses reliques ; la couronne d'épines est conservée par la cathédrale Notre-Dame de Paris.",
    "sources": [
      {
        "kind": "primary",
        "author": "Gautier Cornut",
        "work": "Historia susceptionis coronae spineae (récit de la réception de la couronne d'épines)"
      },
      {
        "kind": "modern",
        "author": "Jacques Le Goff",
        "work": "Saint Louis, Paris, Gallimard, 1996"
      },
      {
        "kind": "modern",
        "author": "Meredith Cohen",
        "work": "The Sainte-Chapelle and the Construction of Sacral Monarchy, Cambridge, Cambridge University Press, 2015"
      }
    ],
    "scene": "paris-saint-louis"
  },
  {
    "id": "bataille-de-crecy",
    "title": "Bataille de Crécy",
    "start": 1346,
    "month": 8,
    "day": 26,
    "precision": "day",
    "certainty": "attested",
    "era": "valois",
    "track": "angleterre",
    "category": "war",
    "importance": 2,
    "placeId": "crecy-en-ponthieu",
    "people": [
      "edouard-iii",
      "philippe-vi",
      "edouard-de-woodstock",
      "jean-de-boheme"
    ],
    "summary": "Le 26 août 1346, près de Crécy, en Ponthieu, l'armée d'Édouard III, à pied et appuyée par ses archers, écrase la chevalerie de Philippe VI, qui charge jusqu'à la nuit. Le roi de Bohême, le comte de Flandre et le frère du roi de France sont tués. Édouard met ensuite le siège devant Calais, qu'il prend en 1347.",
    "body": "**La chevauchée.** Débarqué en Cotentin en juillet 1346, Édouard III pille la Normandie et prend Caen, puis remonte vers le nord. Il franchit la Somme au gué de Blanchetaque et s'arrête sur une pente près de Crécy, où il attend l'armée française.\n\n**La bataille.** Les Anglais ont mis pied à terre, les archers sur les ailes. En fin de journée, les arbalétriers génois au service de la France avancent les premiers et sont décimés par les flèches ; les cavaliers français chargent à travers leurs rangs, puis par vagues successives jusqu'à la nuit, sans percer. Jean de Luxembourg, roi de Bohême, aveugle, se fait conduire au combat et y meurt. Philippe VI, blessé, quitte le champ de bataille.\n\n**Les chiffres.** Les historiens estiment l'armée anglaise entre 12 000 et 15 000 hommes environ (Andrew Ayton, Jonathan Sumption) ; l'armée française, sans doute plus nombreuse, ne peut être chiffrée sûrement. Les lettres envoyées en Angleterre font état de plus de 1 500 chevaliers et écuyers comptés morts devant la division du prince de Galles ; les pertes anglaises semblent faibles. Le chroniqueur florentin Villani mentionne des bouches à feu anglaises, présence discutée.",
    "sources": [
      {
        "kind": "primary",
        "author": "Jean Froissart",
        "work": "Chroniques",
        "locus": "livre I"
      },
      {
        "kind": "primary",
        "author": "Jean le Bel",
        "work": "Chronique"
      },
      {
        "kind": "primary",
        "author": "Giovanni Villani",
        "work": "Nuova Cronica"
      },
      {
        "kind": "modern",
        "author": "Jonathan Sumption",
        "work": "The Hundred Years War, I: Trial by Battle, Londres, Faber and Faber, 1990"
      },
      {
        "kind": "modern",
        "author": "Andrew Ayton et Philip Preston",
        "work": "The Battle of Crécy, 1346, Woodbridge, Boydell Press, 2005"
      }
    ]
  },
  {
    "id": "bataille-d-azincourt",
    "title": "Bataille d'Azincourt",
    "start": 1415,
    "month": 10,
    "day": 25,
    "precision": "day",
    "certainty": "attested",
    "era": "valois",
    "track": "angleterre",
    "category": "war",
    "importance": 2,
    "placeId": "azincourt",
    "people": [
      "henri-v",
      "charles-d-albret",
      "charles-d-orleans",
      "charles-vi"
    ],
    "summary": "Le 25 octobre 1415, entre les bois d'Azincourt et de Tramecourt, l'armée d'Henri V, épuisée et en route vers Calais, défait une armée française plus nombreuse, mal coordonnée, qui s'enlise dans une terre détrempée. Le connétable d'Albret et de nombreux grands seigneurs sont tués, le duc d'Orléans est pris. Henri V reprend la conquête de la Normandie deux ans plus tard.",
    "body": "**Une campagne mal engagée.** Henri V débarque en août 1415 près d'Harfleur, qui ne capitule qu'après un mois de siège, et sa troupe est affaiblie par la dysenterie. Il décide de gagner Calais par voie de terre ; l'armée française lui barre la route en Artois. Le roi Charles VI, malade, est absent, et la France est déchirée par la guerre civile entre Armagnacs et Bourguignons.\n\n**La bataille.** Sur un terrain labouré et détrempé, resserré entre deux bois, l'avant-garde française démontée avance en masse compacte sous les flèches des archers anglais, protégés par des pieux. Au cours du combat, craignant une nouvelle attaque, Henri V fait tuer une partie des prisonniers, fait rapporté par les chroniqueurs des deux camps.\n\n**Les chiffres.** Ils sont très discutés. La tradition, reprise par Juliet Barker, oppose environ 6 000 Anglais à des Français trois à quatre fois plus nombreux ; Anne Curry, à partir des registres de solde, propose environ 8 700 Anglais contre 12 000 Français. Les morts français se comptent par milliers, dont le connétable Charles d'Albret et les ducs d'Alençon, de Brabant et de Bar ; les pertes anglaises, quelques centaines, comprennent le duc d'York.",
    "sources": [
      {
        "kind": "primary",
        "author": "Anonyme (chapelain d'Henri V)",
        "work": "Gesta Henrici Quinti"
      },
      {
        "kind": "primary",
        "author": "Enguerrand de Monstrelet",
        "work": "Chronique",
        "locus": "livre I"
      },
      {
        "kind": "primary",
        "author": "Jean Le Fèvre de Saint-Remy",
        "work": "Chronique"
      },
      {
        "kind": "modern",
        "author": "Anne Curry",
        "work": "Agincourt: A New History, Stroud, Tempus, 2005"
      },
      {
        "kind": "modern",
        "author": "Juliet Barker",
        "work": "Agincourt: The King, the Campaign, the Battle, Londres, Little, Brown, 2005"
      }
    ],
    "scene": "azincourt"
  },
  {
    "id": "levee-du-siege-d-orleans",
    "title": "Levée du siège d'Orléans",
    "start": 1429,
    "month": 5,
    "day": 8,
    "precision": "day",
    "certainty": "attested",
    "era": "valois",
    "track": "royaume",
    "category": "war",
    "importance": 1,
    "placeId": "orleans",
    "people": [
      "jeanne-d-arc",
      "jean-de-dunois",
      "charles-vii",
      "john-talbot"
    ],
    "summary": "Le 8 mai 1429, les Anglais lèvent le siège d'Orléans, commencé en octobre 1428, après la prise de leurs bastilles par les troupes de Charles VII, auxquelles s'est jointe Jeanne d'Arc, arrivée dans la ville le 29 avril. La victoire ouvre la route du sacre de Charles VII à Reims, le 17 juillet suivant.",
    "body": "**Une ville clé.** Orléans commande le passage de la Loire vers les terres restées fidèles au dauphin Charles. Les Anglais l'assiègent à partir du 12 octobre 1428 et l'entourent d'une ceinture de bastilles, sans parvenir à un blocus complet. La ville est défendue par Jean, bâtard d'Orléans, le futur Dunois.\n\n**Neuf jours.** Jeanne, reçue par Charles à Chinon au début de mars 1429 et examinée par des théologiens à Poitiers, entre dans Orléans le 29 avril avec un convoi de vivres. Les Français prennent la bastille de Saint-Loup le 4 mai, celle des Augustins le 6, puis les Tourelles, à la tête du pont, le 7, où Jeanne est blessée d'une flèche. Le dimanche 8 mai, l'armée anglaise se range en bataille, puis se retire sans combattre. Orléans célèbre cette date depuis 1430.\n\n**Ce que l'on sait, et comment.** Le déroulement est connu par le Journal du siège, compilé plus tard, et surtout par les dépositions des procès : le procès de condamnation de 1431 et le procès de réhabilitation de 1455 et 1456, où témoignent Dunois et des habitants. La part exacte de Jeanne dans les décisions militaires, à côté des capitaines, reste discutée ; son effet sur le moral des deux camps ne l'est guère.",
    "sources": [
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Procès de condamnation de Jeanne d'Arc (1431)"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Procès de réhabilitation de Jeanne d'Arc (1455 et 1456), déposition de Dunois"
      },
      {
        "kind": "primary",
        "author": "Anonyme",
        "work": "Journal du siège d'Orléans"
      },
      {
        "kind": "modern",
        "author": "Philippe Contamine, Olivier Bouzy et Xavier Hélary",
        "work": "Jeanne d'Arc. Histoire et dictionnaire, Paris, Robert Laffont, 2012"
      },
      {
        "kind": "modern",
        "author": "Colette Beaune",
        "work": "Jeanne d'Arc, Paris, Perrin, 2004"
      }
    ]
  },
  {
    "id": "mort-de-charles-le-temeraire",
    "title": "Mort de Charles le Téméraire devant Nancy",
    "start": 1477,
    "month": 1,
    "day": 5,
    "precision": "day",
    "certainty": "attested",
    "era": "valois",
    "track": "bourgogne",
    "category": "war",
    "importance": 2,
    "placeId": "nancy",
    "people": [
      "charles-le-temeraire",
      "rene-ii-de-lorraine",
      "louis-xi",
      "marie-de-bourgogne",
      "philippe-de-commynes"
    ],
    "summary": "Le 5 janvier 1477, sous les murs de Nancy qu'il assiège en plein hiver, Charles le Téméraire est vaincu et tué par l'armée de René II de Lorraine, renforcée de mercenaires suisses. Son corps est retrouvé deux jours plus tard. L'État bourguignon se défait : Louis XI saisit le duché de Bourgogne, les Pays-Bas passent aux Habsbourg par le mariage de sa fille Marie.",
    "body": "**Un rêve de royaume.** Maître de la Bourgogne, de la Franche-Comté et des riches Pays-Bas, Charles veut relier ses deux ensembles de terres. Il occupe la Lorraine en 1475, mais les Suisses le battent à Grandson le 2 mars 1476, puis à Morat le 22 juin. René II reprend Nancy en octobre ; Charles revient l'assiéger avec une armée diminuée.\n\n**La bataille.** Le 5 janvier, l'armée de René II, où les Suisses forment le gros de l'infanterie, tourne la position bourguignonne par la neige. L'armée de Charles est mise en déroute ; le duc est tué dans la fuite. Son corps, dépouillé et défiguré, est retrouvé près d'un étang et identifié par ses proches. Les effectifs sont mal connus : quelques milliers d'hommes du côté bourguignon, sans doute deux ou trois fois plus du côté lorrain, selon les estimations reprises par Richard Vaughan et Bertrand Schnerb.\n\n**La fin de l'État bourguignon.** Louis XI s'empare du duché de Bourgogne et de la Picardie. Marie de Bourgogne épouse en août 1477 Maximilien de Habsbourg, qui conserve les Pays-Bas : la rivalité entre la France et les Habsbourg en découle. Philippe de Commynes, ancien conseiller du duc passé à Louis XI, tire de sa chute une leçon politique dans ses Mémoires.",
    "sources": [
      {
        "kind": "primary",
        "author": "Philippe de Commynes",
        "work": "Mémoires",
        "locus": "livre V"
      },
      {
        "kind": "primary",
        "author": "Jean Molinet",
        "work": "Chroniques"
      },
      {
        "kind": "modern",
        "author": "Bertrand Schnerb",
        "work": "L'État bourguignon, 1363-1477, Paris, Perrin, 1999"
      },
      {
        "kind": "modern",
        "author": "Richard Vaughan",
        "work": "Charles the Bold: The Last Valois Duke of Burgundy, Londres, Longman, 1973"
      }
    ]
  },
  {
    "id": "massacre-de-la-saint-barthelemy",
    "title": "Massacre de la Saint-Barthélemy",
    "start": 1572,
    "month": 8,
    "day": 24,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "Le massacre commence avant l'aube du 24 août 1572, jour de la Saint-Barthélemy, dure plusieurs jours à Paris et se poursuit dans une vingtaine de villes jusqu'en octobre.",
    "era": "valois",
    "track": "royaume",
    "category": "religion",
    "importance": 2,
    "placeId": "paris",
    "people": [
      "charles-ix",
      "catherine-de-medicis",
      "gaspard-de-coligny",
      "henri-de-guise",
      "henri-iv",
      "marguerite-de-valois"
    ],
    "summary": "Dans la nuit du 23 au 24 août 1572, quelques jours après le mariage d'Henri de Navarre et de Marguerite de Valois, les chefs protestants réunis à Paris sont assassinés sur décision du conseil royal, à commencer par l'amiral de Coligny. Le massacre gagne la population parisienne puis plusieurs villes de province ; il fait plusieurs milliers de victimes.",
    "body": "**Un mariage de paix.** La paix de Saint-Germain, en 1570, a mis fin à la troisième guerre de Religion. Le mariage du protestant Henri de Navarre et de Marguerite, sœur de Charles IX, célébré le 18 août 1572 devant Notre-Dame, doit la sceller et attire à Paris la noblesse protestante. Le 22 août, Coligny est blessé d'un coup d'arquebuse tiré d'une maison liée aux Guise.\n\n**Le massacre.** Dans la nuit, le roi et son conseil décident d'éliminer les chefs protestants. Au petit matin du 24, les hommes du duc de Guise tuent Coligny ; la milice et une partie de la population parisienne étendent la tuerie à tous les protestants, pendant plusieurs jours. Le 26 août, Charles IX déclare devant le parlement avoir agi pour prévenir un complot. Henri de Navarre et le prince de Condé, épargnés, doivent abjurer. L'image du roi tirant sur les fuyants depuis une fenêtre du Louvre vient de récits postérieurs sans témoin sûr.\n\n**Bilan et débat.** Les historiens estiment les victimes à 2 000 à 4 000 à Paris et à plusieurs milliers en province. La responsabilité reste débattue : Catherine de Médicis longtemps accusée, crime d'État dicté par la crainte d'une reprise de la guerre pour Arlette Jouanna, drame d'un roi voulant sauver la paix pour Denis Crouzet, pression des Guise et de Paris pour d'autres.",
    "sources": [
      {
        "kind": "primary",
        "author": "Simon Goulart (éd.)",
        "work": "Mémoires de l'Estat de France sous Charles neufiesme, 1576"
      },
      {
        "kind": "primary",
        "author": "Marguerite de Valois",
        "work": "Mémoires"
      },
      {
        "kind": "primary",
        "author": "Jacques-Auguste de Thou",
        "work": "Histoire universelle"
      },
      {
        "kind": "modern",
        "author": "Arlette Jouanna",
        "work": "La Saint-Barthélemy. Les mystères d'un crime d'État, 24 août 1572, Paris, Gallimard, 2007"
      },
      {
        "kind": "modern",
        "author": "Denis Crouzet",
        "work": "La Nuit de la Saint-Barthélemy. Un rêve perdu de la Renaissance, Paris, Fayard, 1994"
      }
    ]
  },
  {
    "id": "edit-de-nantes",
    "title": "Édit de Nantes",
    "start": 1598,
    "month": 4,
    "precision": "month",
    "certainty": "attested",
    "certaintyNote": "Les historiens datent la signature du 13 ou du 30 avril 1598 selon les pièces considérées (l'édit, ses articles particuliers, ses brevets) ; l'événement est daté au mois.",
    "era": "bourbons",
    "track": "royaume",
    "category": "religion",
    "importance": 1,
    "placeId": "nantes",
    "people": [
      "henri-iv",
      "louis-xiv"
    ],
    "summary": "En avril 1598, à Nantes, Henri IV signe un édit qui met fin aux guerres de Religion : les protestants obtiennent la liberté de conscience, une liberté de culte limitée à certains lieux, l'accès aux charges et des places de sûreté. Le catholicisme reste la religion du royaume. Louis XIV révoque l'édit en 1685.",
    "body": "**La fin de trente-six ans de guerres.** Depuis 1562, huit guerres de Religion ont ravagé le royaume. Henri de Navarre, héritier protestant de la couronne en 1589, abjure à Saint-Denis le 25 juillet 1593 et entre dans Paris en 1594. La phrase « Paris vaut bien une messe » ne figure dans aucun texte de son temps : elle lui a été prêtée après coup. En 1598, la soumission du duc de Mercœur en Bretagne et la paix de Vervins avec l'Espagne permettent un règlement.\n\n**Ce que dit l'édit.** Il comprend des articles généraux, des articles particuliers et deux brevets. Les protestants ont la liberté de conscience partout, mais le culte public seulement dans des lieux fixés, jamais à Paris ni dans ses environs ; ils accèdent aux offices, plaident devant des chambres mi-parties et conservent pour un temps des places de sûreté. C'est un compromis de paix civile, non la proclamation d'un principe de tolérance.\n\n**Une application difficile.** Le parlement de Paris ne l'enregistre qu'en février 1599, après un discours ferme du roi. Les places de sûreté sont perdues en 1629 ; Louis XIV révoque l'édit à Fontainebleau en octobre 1685.",
    "sources": [
      {
        "kind": "primary",
        "author": "Henri IV",
        "work": "Édit de Nantes, avril 1598 (original conservé aux Archives nationales)"
      },
      {
        "kind": "primary",
        "author": "Henri IV",
        "work": "Discours aux gens du parlement de Paris, février 1599"
      },
      {
        "kind": "modern",
        "author": "Janine Garrisson",
        "work": "L'Édit de Nantes et sa révocation. Histoire d'une intolérance, Paris, Seuil, 1985"
      },
      {
        "kind": "modern",
        "author": "Bernard Cottret",
        "work": "1598, l'Édit de Nantes, Paris, Perrin, 1997"
      }
    ]
  },
  {
    "id": "la-cour-s-installe-a-versailles",
    "title": "La cour s'installe à Versailles",
    "start": 1682,
    "month": 5,
    "day": 6,
    "precision": "day",
    "certainty": "attested",
    "certaintyNote": "Le 6 mai 1682 est la date usuelle de l'installation officielle ; le roi et la cour y séjournaient déjà souvent depuis les années 1670, et les travaux se poursuivent bien après.",
    "era": "bourbons",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "versailles",
    "people": [
      "louis-xiv"
    ],
    "summary": "Le 6 mai 1682, Louis XIV fixe à Versailles sa résidence, sa cour et le siège du gouvernement. L'ancien relais de chasse de Louis XIII est devenu, après vingt ans de travaux, un palais capable d'abriter plusieurs milliers de personnes. Versailles reste le centre du pouvoir jusqu'en octobre 1789, avec une interruption de 1715 à 1722.",
    "body": "**D'un relais de chasse à un palais.** Louis XIII fait bâtir à Versailles un pavillon de chasse en 1623, puis un petit château. À partir de 1661, Louis XIV y lance de grands travaux avec l'architecte Louis Le Vau, le jardinier André Le Nôtre et le peintre Charles Le Brun ; Jules Hardouin-Mansart prend le relais à la fin des années 1670. La galerie des Glaces n'est achevée qu'en 1684.\n\n**Une installation progressive.** Le roi séjourne de plus en plus longuement à Versailles et annonce son intention de s'y fixer dès 1677. Le 6 mai 1682, la cour et les ministres s'y établissent ; le palais devient le cadre d'une étiquette réglée, du lever au coucher du roi.\n\n**Domestiquer la noblesse ?** On a longtemps lu Versailles comme un piège tendu à la noblesse pour la soumettre, interprétation popularisée par le sociologue Norbert Elias. Les historiens d'aujourd'hui y voient plutôt un lieu d'échanges où le roi distribue faveurs et charges, et où les grands viennent chercher ce qu'ils ne trouvent plus ailleurs. À la mort de Louis XIV, en 1715, le Régent ramène la cour à Paris ; Louis XV revient à Versailles en 1722.",
    "sources": [
      {
        "kind": "primary",
        "author": "Louis-François du Bouchet, marquis de Sourches",
        "work": "Mémoires sur le règne de Louis XIV"
      },
      {
        "kind": "primary",
        "author": "Louis de Rouvroy, duc de Saint-Simon",
        "work": "Mémoires"
      },
      {
        "kind": "modern",
        "author": "Jean-François Solnon",
        "work": "La Cour de France, Paris, Fayard, 1987"
      },
      {
        "kind": "modern",
        "author": "Thierry Sarmant",
        "work": "Louis XIV, homme et roi, Paris, Tallandier, 2012"
      }
    ],
    "scene": "versailles"
  },
  {
    "id": "traite-des-pyrenees",
    "title": "Traité des Pyrénées",
    "start": 1659,
    "month": 11,
    "day": 7,
    "precision": "day",
    "certainty": "attested",
    "era": "bourbons",
    "track": "royaume",
    "category": "politics",
    "importance": 2,
    "placeId": "ile-des-faisans",
    "people": [
      "mazarin",
      "luis-de-haro",
      "louis-xiv"
    ],
    "summary": "Le 7 novembre 1659, sur l'île des Faisans, au milieu de la Bidassoa, Mazarin et le ministre espagnol Luis de Haro signent la paix qui met fin à vingt-quatre ans de guerre entre la France et l'Espagne. La France gagne le Roussillon et l'Artois, et Louis XIV doit épouser l'infante Marie-Thérèse. La frontière des Pyrénées prend à peu près le tracé qu'elle a encore.",
    "body": "**La fin d'une longue guerre.** Entrée en guerre ouverte contre l'Espagne en 1635, la France continue le combat après la paix de Westphalie (1648), malgré la Fronde. La victoire de Turenne aux Dunes (juin 1658) et l'épuisement des deux royaumes ouvrent la négociation. Les deux ministres, Mazarin et Luis de Haro, se rencontrent pendant plusieurs mois sur l'île des Faisans, territoire neutre au milieu de la rivière frontière.\n\n**Ce que gagne la France.** Le traité donne à Louis XIV le Roussillon et une partie de la Cerdagne (la conférence de Llívia, en 1660, fixe les villages cédés, ce qui laisse Llívia espagnole), l'Artois (sauf Aire et Saint-Omer) et plusieurs places des Pays-Bas espagnols et de Lorraine. Le prince de Condé, passé au service de l'Espagne pendant la Fronde, est pardonné et rentre en France.\n\n**Un mariage et une renonciation.** Louis XIV épouse l'infante Marie-Thérèse à Saint-Jean-de-Luz le 9 juin 1660. Elle renonce à ses droits sur la couronne d'Espagne, mais contre une dot de 500 000 écus d'or qui ne sera jamais payée : Louis XIV s'en servira pour revendiquer une partie des Pays-Bas en 1667, puis pour soutenir son petit-fils Philippe d'Anjou, roi d'Espagne en 1700.",
    "sources": [
      {
        "kind": "primary",
        "author": "France et Espagne",
        "work": "Traité de paix des Pyrénées, 7 novembre 1659"
      },
      {
        "kind": "modern",
        "author": "Lucien Bély",
        "work": "Les Relations internationales en Europe, XVIIe et XVIIIe siècles, Paris, Presses universitaires de France, 1992"
      },
      {
        "kind": "modern",
        "author": "Daniel Séré",
        "work": "La Paix des Pyrénées. Vingt-quatre ans de négociations entre la France et l'Espagne (1635-1659), Paris, Honoré Champion, 2007"
      },
      {
        "kind": "modern",
        "author": "Peter Sahlins",
        "work": "Boundaries: The Making of France and Spain in the Pyrenees, Berkeley, University of California Press, 1989"
      }
    ]
  }
]

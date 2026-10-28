import type { Era } from './schema.ts'

export const eras: Era[] = [
  {
    id: 'merovingiens',
    name: 'Francs et Mérovingiens',
    start: 481,
    end: 751,
    summary:
      "Roi d'un petit peuple franc installé autour de Tournai, Clovis élimine les derniers pouvoirs romains de Gaule, bat les Alamans et les Wisigoths, et reçoit le baptême catholique, ce qui lui assure l'appui des évêques. Ses descendants, les Mérovingiens, se partagent le royaume entre fils (Neustrie, Austrasie, Bourgogne) et se déchirent, tout en gardant les cadres romains : cités, évêchés, latin écrit. À partir du VIIe siècle, les maires du palais gouvernent à leur place ; l'un d'eux, Charles Martel, arrête une expédition arabe près de Poitiers en 732.",
    boundsNote:
      "Le site commence en 481, date traditionnelle de l'avènement de Clovis à la mort de son père Childéric (482 chez certains auteurs). D'autres font commencer l'histoire de France en 486 (victoire de Soissons sur Syagrius), vers 496 à 508 (baptême) ou en 843 (traité de Verdun, naissance d'une Francie occidentale). La fin en 751 est celle du coup d'État de Pépin le Bref, qui dépose le dernier Mérovingien, Childéric III.",
  },
  {
    id: 'carolingiens',
    name: 'Carolingiens',
    start: 751,
    end: 987,
    summary:
      "Pépin le Bref se fait élire et sacrer roi en 751 ; son fils Charlemagne conquiert la Lombardie, la Saxe et la marche d'Espagne, et se fait couronner empereur à Rome le 25 décembre 800. L'Empire est partagé entre ses petits-fils au traité de Verdun (843) : la Francie occidentale de Charles le Chauve est l'ancêtre du royaume de France. Raids vikings, pouvoir croissant des comtes et rivalité avec la famille des Robertiens affaiblissent la dynastie jusqu'à la mort de Louis V en 987.",
    boundsNote:
      "Le sacre de 751, à Soissons, est suivi d'un second sacre par le pape Étienne II à Saint-Denis en 754 : les deux dates se rencontrent. La fin en 987 correspond à l'élection d'Hugues Capet ; un Carolingien, Charles de Lorraine, conteste encore la couronne jusqu'en 991.",
  },
  {
    id: 'capetiens',
    name: 'Capétiens directs',
    start: 987,
    end: 1328,
    summary:
      "Élu en 987, Hugues Capet ne contrôle directement qu'un domaine réduit autour de Paris et d'Orléans, face à de grands princes plus puissants que lui. Ses successeurs font sacrer leur fils de leur vivant et transmettent la couronne de père en fils pendant trois siècles et demi. Philippe Auguste prend la Normandie et l'Anjou aux Plantagenêts et l'emporte à Bouvines (1214) ; Saint Louis fait de la justice royale une référence ; Philippe le Bel affronte le pape et détruit l'ordre du Temple. Le domaine royal couvre alors la plus grande partie du royaume.",
    boundsNote:
      "Ces bornes sont dynastiques : de l'élection d'Hugues Capet (987) à la mort de Charles IV le Bel (1328), dernier des fils de Philippe le Bel, sans héritier mâle. On distingue souvent un « premier âge capétien », jusqu'à Philippe Auguste (1180), où l'autorité royale reste faible.",
  },
  {
    id: 'valois',
    name: 'Valois, de la guerre de Cent Ans aux guerres de Religion',
    start: 1328,
    end: 1589,
    summary:
      "La couronne passe à Philippe VI de Valois, cousin du dernier Capétien ; le roi d'Angleterre Édouard III la revendique, et la guerre de Cent Ans commence en 1337. Défaites de Crécy, de Poitiers et d'Azincourt, peste noire de 1348, guerre civile entre Armagnacs et Bourguignons : le royaume manque disparaître avant le sursaut de Jeanne d'Arc (1429) et la reconquête achevée en 1453. Les Valois mènent ensuite les guerres d'Italie et accueillent la Renaissance, avant que les guerres de Religion, de 1562 à 1598, ne déchirent catholiques et protestants.",
    boundsNote:
      "La période s'ouvre en 1328 avec Philippe VI et se ferme en 1589 avec l'assassinat d'Henri III, dernier Valois. Beaucoup de manuels coupent ces deux siècles et demi en deux : la fin du Moyen Âge, jusqu'en 1453 ou 1492, puis la Renaissance, souvent datée de 1494 (premières guerres d'Italie) à 1559 (paix du Cateau-Cambrésis). Les dates de cette époque sont données dans le calendrier julien, en usage en France jusqu'au 9 décembre 1582.",
  },
  {
    id: 'bourbons',
    name: 'Bourbons, la monarchie absolue',
    start: 1589,
    end: 1789,
    summary:
      "Henri IV, protestant converti au catholicisme en 1593, met fin aux guerres de Religion par l'édit de Nantes (1598). Sous Louis XIII, Richelieu abat les places fortes protestantes et engage la France contre les Habsbourg ; après la Fronde, Louis XIV gouverne seul à partir de 1661, installe la cour à Versailles (1682), révoque l'édit de Nantes (1685) et mène des guerres qui agrandissent le royaume. Au XVIIIe siècle, les Lumières critiquent l'absolutisme, la France perd la Nouvelle-France (1763), et la crise financière qui suit la guerre d'Amérique oblige Louis XVI à réunir les états généraux.",
    boundsNote:
      "De l'avènement d'Henri IV (1589) à la réunion des états généraux et à la prise de la Bastille (1789). L'expression « monarchie absolue » est un terme d'historiens : le roi est absolu au sens où il ne partage pas la souveraineté, mais son pouvoir reste limité par les lois fondamentales, les parlements, les privilèges et la coutume. Toutes les dates sont désormais grégoriennes.",
  },
  {
    id: 'revolution',
    name: 'Révolution',
    start: 1789,
    end: 1799,
    summary:
      "Les états généraux se proclament Assemblée nationale en juin 1789 ; la prise de la Bastille, l'abolition des privilèges et la Déclaration des droits de l'homme et du citoyen ouvrent une décennie de bouleversements. La monarchie constitutionnelle échoue ; la République est proclamée en septembre 1792 et Louis XVI exécuté en janvier 1793. La guerre contre les monarchies coalisées, la Terreur, les guerres de Vendée et l'abolition de l'esclavage (1794) marquent la Convention, à laquelle succède le Directoire (1795).",
    boundsNote:
      "Du 5 mai 1789 (ouverture des états généraux) ou du 14 juillet 1789 au coup d'État du 18 Brumaire (9 novembre 1799). Certains historiens arrêtent la Révolution en 1795 (fin de la Convention), d'autres la prolongent jusqu'en 1804 ou 1815. Le calendrier républicain, institué en 1793, compte les années depuis le 22 septembre 1792 : le site affiche les deux dates jusqu'au 31 décembre 1805.",
  },
  {
    id: 'empire',
    name: 'Consulat et Premier Empire',
    start: 1799,
    end: 1815,
    summary:
      "Premier consul après le 18 Brumaire, Napoléon Bonaparte réorganise l'État (préfets, Code civil, Banque de France, Concordat) et rétablit l'esclavage dans les colonies en 1802. Sacré empereur le 2 décembre 1804, il bat les coalitions à Austerlitz, Iéna, Friedland et Wagram, et place ses frères sur des trônes européens. L'Empire atteint son extension maximale en 1811 et 1812, avec 130 départements et des États satellites, avant la retraite de Russie, la campagne d'Allemagne et la première abdication en 1814. Revenu de l'île d'Elbe, Napoléon est battu à Waterloo le 18 juin 1815.",
    boundsNote:
      "Du 18 Brumaire (9 novembre 1799) à la seconde abdication (22 juin 1815). Le Consulat dure jusqu'au 18 mai 1804, quand le Sénat proclame l'Empire ; la première Restauration (1814 et 1815) et les Cent-Jours (de mars à juin 1815) sont rattachés ici à l'Empire. Le nom de Bonaparte est employé jusqu'en 1804, celui de Napoléon ensuite.",
  },
  {
    id: 'exil',
    name: "Épilogue : l'exil",
    start: 1815,
    end: 1821,
    summary:
      "Livré aux Britanniques, Napoléon est déporté à Sainte-Hélène, dans l'Atlantique Sud, où il arrive en octobre 1815. Il y dicte ses souvenirs, qui fondent sa légende, et y meurt le 5 mai 1821. En France, Louis XVIII règne sous une charte constitutionnelle ; le congrès de Vienne a ramené le pays à ses frontières de 1790, à peu de chose près.",
    boundsNote:
      "Courte époque d'épilogue, de la seconde abdication (1815) à la mort de Napoléon (1821). Le site s'arrête là ; l'histoire de France continue avec la Restauration, hors de son sujet.",
  },
]

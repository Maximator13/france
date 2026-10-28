# Plan de design

Statut : direction en place sur le site, établie sans validation pendant la phase 2 faite en autonomie (28 octobre 2026). Les valeurs sont celles du code (`src/styles.css`, `src/stage/grading.ts`, `src/data/tracks.ts`, `src/collection/collection.css`) ; une modification se fait là, puis ici.

## Palette nommée

| Nom | Valeur | Rôle |
|---|---|---|
| Nuit de Saint-Denis | `#0C1219` | fond de page et des panneaux (à 93 % d'opacité sur la 3D) |
| Vélin | `#F2EEE4` | texte principal |
| Pierre de Paris | `#C8C2B4` | texte secondaire, légendes, aides |
| Or des lys | `#D8B25A` | accent par défaut : filets, bouton principal, année courante, sceau des cartes |
| Ivoire du royaume | `#E8DCC0` | piste et territoire de la France |
| Rouge Plantagenêt | `#C8323C` | Angleterre |
| Bleu de Nouvelle-France | `#3D8BD9` | Nouvelle-France |
| Gris des coalitions | `#9FB0C8` | les sept coalitions, qui se suivent sans se chevaucher |

Contraste sur Nuit de Saint-Denis : Vélin 16,2:1, Pierre de Paris 10,6:1, Or des lys 9,3:1. L'accent change avec l'époque ; pour le texte, il passe par `readableAccent`, qui l'éclaircit jusqu'à 4,5:1 au moins sur le fond (testé sur toute la frise).

### Accent et lumière par époque

La carte et les scènes glissent d'une époque à l'autre en parcourant la frise.

| Époque | Accent | Lumière |
|---|---|---|
| Francs et Mérovingiens | or des reliquaires | lumière de bougie, soleil bas, ciel orangé |
| Carolingiens | pourpre impérial | fin de jour dorée |
| Capétiens directs | bleu de France | ciel franc, lumière claire des cathédrales |
| Valois | rouge profond | lumière chaude de la Loire |
| Bourbons | or de Versailles | plein soleil, ciel bleu intense |
| Révolution | rouge du bonnet | ciel d'orage, contrastes durs |
| Consulat et Empire | vert impérial | soleil d'Austerlitz, or des abeilles |
| Épilogue : l'exil | vert assombri | lumière éteinte de Sainte-Hélène |

Capétiens et Valois, qui partageaient une famille de bleus au cadrage, sont maintenant séparés : bleu de France pour les premiers, rouge profond pour les seconds.

### Couleurs des puissances

Une couleur par piste, partagée par la frise et la carte. Les voisines dans le temps restent distinctes : en 1420, ivoire de la France, rouge de l'Angleterre, violet de l'État bourguignon ; en 1811, ivoire de l'Empire, vert du royaume d'Italie, orange de Naples, ocre de la Confédération du Rhin, jaune de Westphalie et de l'Espagne de Joseph, rose du duché de Varsovie. La certitude d'un événement se lit par la forme de son marqueur, jamais par sa couleur.

## Typographies

Choisies pour ne ressembler ni à Roma ni à Hellas, qui partagent EB Garamond.

- **Playfair Display** (SIL OFL 1.1), didone à fort contraste dans l'esprit de Didot et des titres de l'Empire : titres, noms d'époques, boutons, noms des puissances et des villes sur la carte (graisse 500), noms des cartes.
- **Spectral** (SIL OFL 1.1), dessinée à Paris par Production Type pour la lecture à l'écran : textes, cartels, sources ; italique pour les notes et les noms de lieux secondaires de la carte. Corps de 17 px (16 px sur mobile), interligne 1,55.
- Typographie française appliquée au rendu : espaces insécables fines avant les signes doubles, guillemets « », apostrophes typographiques.

## Principes

1. **La 3D est le moment fort.** L'interface se tient en bordure : une frise en bas, un cartel sur le côté, rien au centre de l'image.
2. **Des cartels de musée.** Chaque fiche et chaque point d'une scène est un cartel : titre, date (avec la date républicaine de 1792 à 1805), certitude, texte court, sources.
3. **L'exactitude se voit.** Certitude sur chaque événement, fourchettes pour les effectifs, mythes signalés comme tels (les noyés d'Austerlitz) ; doutes dans `docs/A_VERIFIER.md`.
4. **Le royaume qui grandit.** La carte suit l'année du curseur : le royaume province par province, puis l'Empire et ses États satellites ; les itinéraires de Bonaparte se dessinent avec la frise.
5. **Des couleurs franches.** Tonemapping neutre, aucun gris délavé ; chaque changement visuel se vérifie sur capture.
6. **Une seule famille de mouvements.** Une seule courbe (`power3`) ; la caméra circule sans coupure de la frise à la carte puis à la scène. Avec `prefers-reduced-motion`, les mouvements deviennent des fondus. Une adresse ouverte directement place la frise sans animation.
7. **Un seul appel à l'action principal par écran** : « Commencer en 481 » à l'accueil, « Point suivant » dans une scène, « Visiter en 3D » dans une fiche liée à une scène, « Ouvrir le paquet du jour » dans la collection.
8. **Mobile d'abord.** Sur téléphone, la frise reste en bas, les fiches couvrent l'écran et le cartel d'une scène devient une feuille basse qui laisse voir la 3D.

## Collection

Cartes au format 5:7, cadre fin et frise de losanges, sceau à la fleur de lys, dos « FRANCIA » ; cinq raretés distinguées par le métal du cadre ; monnaie en écus. Illustrations d'époque du domaine public ou sous licence libre, recadrées sans retouche.

## Scènes 3D

Réalisme stylisé éclairé comme un film : formes simplifiées, proportions et matériaux fidèles (pierre de Paris, plomb, dorures, tentures, uniformes réglementaires), lumière qui raconte le moment (bougies et vitraux du sacre, soleil qui perce le brouillard à Austerlitz), fumée de poudre noire dans les batailles.

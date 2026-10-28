# France, de Clovis à Napoléon

Un site pour étudier l'histoire de France, de l'avènement de Clovis (481) à la mort de Napoléon (1821), avec l'Empire pour sommet. La frise chronologique en est la colonne vertébrale, avec une piste par puissance (royaume puis Empire, Angleterre, Bourgogne, colonies, coalitions, États satellites) ; la carte en relief montre leurs territoires année par année, de l'Atlantique à Moscou. Les dates de 1792 à 1805 sont aussi données dans le calendrier républicain.

Site : https://maximator13.github.io/france/ (en construction)

Sites jumeaux : [Roma](https://maximator13.github.io/roma/) et [Hellas](https://maximator13.github.io/hellas/).

## Développement

Il faut Node 24 ou plus récent.

```bash
npm install
npm run dev
```

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run check` | style, lint, typage et tests unitaires |
| `npm run build` | validation des données puis build de production dans `dist/` |
| `npm run test:e2e` | tests de fumée Playwright sur le build |
| `node scripts/geo/relief.ts` | relief de la carte (ETOPO 2022, Natural Earth) |
| `node scripts/geo/territories.ts` | territoires année par année (Cliopatria) |

## Licences

Code sous licence MIT (`LICENSE`). Contenus originaux sous licence CC BY 4.0 (`LICENSE-CONTENT.md`). Ressources de tiers : voir `CREDITS.md`.

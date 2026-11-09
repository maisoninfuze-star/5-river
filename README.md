# 5 Rivers Restaurant — site web

Site bilingue (français par défaut, anglais complet) : accueil + carte complète (179 plats).
Next.js 16 (App Router), TypeScript, Tailwind CSS 4, **export statique** (HTML pur, aucun serveur).

## Démarrer

```bash
npm install
npm run dev            # http://localhost:3000/fr/
npm run build          # génère out/ (site statique complet)
npm run check          # intégrité du menu + TypeScript + ESLint
```

Aperçu du build : `python3 -m http.server 4231 -d out` puis http://localhost:4231/

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Coordonnées, heures, commande en ligne, livraison, réseaux, indexation | `src/config/business.ts` |
| Plats, prix (en cents), sections, sauces de caris | `src/data/menu.ts` |
| Photos (registre, textes alternatifs) | `src/data/images.ts` + `assets-src/` |
| Textes de l'interface FR / EN | `src/i18n/dictionaries.ts` |
| Logo (emblème rond, version en-tête), cinq rivières, filigranes | `src/components/Emblem.tsx`, `Wordmark.tsx`, `Rivers.tsx` |
| Animation d'ouverture (une fois par session ; `#intro` la rejoue, `#introhold` la fige) | `src/components/Splash.tsx`, `SplashController.tsx`, `globals.css` (.splash) |
| Couleurs, typographie, mouvement | `src/app/globals.css` |

Après une modification du menu : `npm run check:menu` vérifie identifiants, prix et sauces.

## Commande

Tant que `ordering.onlineOrderUrl` vaut `null`, **tous** les boutons « Commander » appellent le
514 748-1200. Mettre une URL vérifiée change tous les boutons en « Commander en ligne ».
Les plateformes de livraison (`deliveryProviders`) restent invisibles tant que `enabled: false`.
Le site ne prend aucune commande ni aucun paiement.

## Déploiement

Le dossier `out/` est un site statique : Vercel, Netlify, GitHub Pages, Cloudflare Pages ou tout hébergeur.

- **Vercel** : importer le dépôt, préréglage Next.js, aucune variable d'environnement. Vercel sert `out/` automatiquement avec `output: "export"`.
- **Autre hébergeur** : `npm run build`, puis téléverser le contenu de `out/`.

### Avant la mise en ligne publique

1. Faire valider `docs/LAUNCH-CHECKLIST.md` par le propriétaire.
2. Dans `src/config/business.ts` : passer les champs confirmés à `verified: true`, renseigner `site.url`
   (active canonique, hreflang et image Open Graph), puis `site.indexing = true` et `site.structuredData = true`.
3. Remplacer ou faire approuver les photos (voir `docs/ASSETS.md`).
4. `npm run check && npm run build`.

Tant que `site.indexing = false` : balise `noindex, nofollow` sur chaque page et `robots.txt` qui bloque tout.

# Images : sources et remplacement

## Situation actuelle

**Toutes les photos sont des images illustratives générées par IA** pour l'aperçu privé.
Ce ne sont pas des photos de 5 Rivers, de sa cuisine ni de ses assiettes. Le pied de page indique
« Photos à titre indicatif ». À faire approuver par le propriétaire, ou à remplacer, avant la mise en ligne.

| Clé | Utilisée pour | Source |
|---|---|---|
| hero | Accueil, première vue | fal.ai Flux 1.1 Pro Ultra (texte → image), 2026-11-03 |
| biryani-poulet, poulet-beurre, kottu-boeuf, masala-dosa, palak-paneer, poulet-tandoori | Plats nº 72, 19, 102, 109, 61, 118 | idem |
| variete | Section « Notre cuisine » (5 currys) | idem |
| thali | Section thali, catégorie Thalis et combos | idem |
| samosa, naan-ail, dal-makhani, gulab-jamun, lassi-mangue | Aperçu du menu (nº 1, 153, 63, 163, 159) | idem |
| nouilles, poutine | Catégories du menu (nº 93, 138) | idem |

Les invites exactes sont dans `scripts/gen-images.mjs`. Une seule direction artistique pour toute la série
(lumière naturelle, ivoire, lin bordeaux, noyer).

Retouches :
- `poutine` : verre de boisson retiré avec fal-ai/nano-banana-pro/edit (`scripts/clean-backgrounds.py`).
- `biryani-poulet`, `kottu-boeuf`, `palak-paneer`, `thali` : recadrés pour retirer bouteilles et verres de
  boisson ambrée (le menu porte la mention halal) ; coins du `thali` retouchés localement (OpenCV).
  Voir `scripts/crop-drinks.py`. Originaux non recadrés dans `assets-src/generated/_avant-*` (non versionnés).

Le logo 5 Rivers n'a pas été repris de la photo de la couverture (reflets, perspective).
Le mot-symbole « 5 RIVERS / RESTAURANT » et les cinq traits de couleur sont redessinés en vecteur
d'après la couverture (`Wordmark.tsx`, `Rivers.tsx`) : à remplacer par le fichier officiel.
Les photos de plats imprimées dans le menu 5 Rivers n'ont pas été reprises (source et droits inconnus).

## Remplacer une photo

1. Déposer la photo approuvée sous le **même nom de clé** : `assets-src/owner/biryani-poulet.jpg`
   (jpg, png ou webp ; idéalement ≥ 1600 px de large).
2. `npm run images` : le script prend `owner/` en priorité et produit AVIF, WebP et JPEG en 480/800/1200/1600 px.
3. Si les proportions changent, mettre à jour `width`/`height` dans `src/data/images.ts`, et `source: "owner"`.
4. Ajuster le texte alternatif FR/EN dans `src/data/images.ts` pour qu'il décrive la vraie photo.
5. Quand toutes les photos sont réelles, retirer « Photos à titre indicatif » (`footer.photosNote` dans `src/i18n/dictionaries.ts`).

Règles : chaque photo doit montrer le plat qu'elle illustre, jamais l'intérieur, le personnel, la devanture
ni les assiettes d'un autre restaurant. Un plat sans photo s'affiche normalement, sans image.

## Remplacer le logo

Remplacer le contenu de `src/components/Wordmark.tsx` par une balise `<img src="/brand/5-rivers-logo.svg" …>`
(fichier dans `public/brand/`). Fournir un SVG, ou un PNG d'au moins 600 px de large sur fond transparent.

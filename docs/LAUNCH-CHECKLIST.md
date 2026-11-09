# Liste de vérification avant lancement (PRIVÉE — ne pas publier)

À confirmer avec le propriétaire avant toute mise en ligne publique. Chaque point confirmé :
mettre `verified: true` dans `src/config/business.ts` (ou corriger la valeur).

## Identité et domaine
- [ ] **Nom** : « 5 Rivers Restaurant » (couverture du menu). Le restaurant s'appelait « Restaurant Raja ».
      Confirmer l'orthographe officielle (« 5 Rivers » en chiffre, comme sur le logo).
- [ ] **Logo** : fichier source vectoriel (SVG / AI / PDF) ou PNG haute résolution. Le site utilise une
      version redessinée d'après la photo de la couverture.
- [ ] **Domaine** : quel nom de domaine utiliser ? Ne rien reprendre de raja-qc.com (redirigeait vers des jeux d'argent)
      ni de restaurantraja.com.
- [ ] **Réseaux sociaux / courriel** : aucun lien publié. Fournir seulement des comptes actifs et confirmés.

## Coordonnées et heures
- [ ] **Adresse** : 1151, rue Décarie, Saint-Laurent (Montréal), QC H4L 3M8 — reprise de l'ancien menu Raja.
- [ ] **Téléphone** : 514 748-1200 — repris de l'ancien menu Raja. **Le menu 5 Rivers ne l'indique pas.**
      Tous les boutons « Commander » appellent ce numéro : à confirmer en priorité.
- [ ] **Heures** : absentes du menu 5 Rivers → section heures masquée. Fournir les heures pour les afficher.
- [ ] **Thali** : l'ancien menu limitait le thali à 11 h – 15 h ; le nouveau ne dit rien. Rien n'est affiché.

## Menu et prix (179 plats, lus sur 8 photos)
- [ ] **Relecture complète** : plusieurs pages ont été photographiées en biais ; les prix ont été associés
      aux plats dans l'ordre. Points à vérifier en particulier :
  - Tandoori : paneer tikka 13,99 $, crevettes tikka 13,99 $, poisson tikka 14,99 $, grillades mixtes 24,99 $.
  - Riz : basmati 3,99 $, pilau 4,50 $, basmati épicé 4,50 $.
  - Riz frit : bœuf 13,50 $, œuf 9,99 $, agneau 11,99 $ (ordre inhabituel des prix).
  - Nouilles : œuf 10,99 $, bœuf 13,50 $.
  - Dosas : masala dosa aux œufs 10,50 $, dosa à l'œuf 8,99 $, dosa au paneer 10,99 $.
  - Kottu : bœuf 12,99 $, poulet 11,50 $, poulet chilli 14,50 $.
- [ ] **Paneer masala** : prix illisible (reflet sur la photo) → affiché sans prix.
- [ ] **« ½ lb 6,99 $ / 1 lb 11,99 $ »** imprimé en haut de la page Entrées, au-dessus du samosa : à quel plat
      se rapporte-t-il ? (Repris seulement pour les pakoras au poulet et au poisson, où il est imprimé.)
- [ ] **Taxes** : prix taxes incluses ou non ? Le site dit seulement « Prix en dollars canadiens ».
- [ ] Rouleau à la viande (1,50 $) : poulet, bœuf ou agneau au même prix ?
- [ ] Crevettes tikka : « avec salade ou riz » — au choix du client ?
- [ ] Thalis : contenu non imprimé → non affiché. Le préciser si souhaité.
- [ ] Noms à confirmer : « Lassha kulfi », « Lasha paratha » (affiché « Lachha paratha »), « Shrilankan paratha ».

## Allégations
- [ ] **Halal** : logo halal sur la couverture → « Halal » affiché (bandeau d'accueil, pied de page).
      Confirmer qu'il couvre tout le menu ; aucun organisme certificateur n'est nommé.
      Pour masquer : `business.halal.value.display = false`.
- [ ] L'accueil présente l'Amritsari kulcha et le chole bhature comme « deux classiques du Pendjab » (origine
      des plats, pas du restaurant). Retirer si le propriétaire préfère.
- [ ] Aucune étiquette allergène, végane, sans gluten ni niveau de piquant n'est affichée.

## Commande et livraison
- [ ] Système de commande en ligne propre au restaurant ? URL → `ordering.onlineOrderUrl`.
- [ ] Uber Eats / DoorDash / SkipTheDishes : une fiche « Restaurant 5 Rivers » existe sur Uber Eats à cette
      adresse. Le propriétaire doit confirmer que c'est la sienne et fournir les URL exactes avant de les activer.

## Photos
- [ ] Toutes les photos sont des illustrations générées par IA (voir `docs/ASSETS.md`). Approuver ou remplacer.

## Mise en ligne
- [ ] `site.url` renseigné, `site.indexing = true`, `site.structuredData = true`.
- [ ] `npm run check && npm run build` sans erreur.

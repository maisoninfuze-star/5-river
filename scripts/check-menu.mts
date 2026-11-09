/**
 * Vérifie l'intégrité du menu 5 Rivers : identifiants uniques et valides,
 * noms FR/EN présents, prix entiers en cents, caris complets, images existantes.
 *
 *   npm run check:menu
 */
import { existsSync } from "node:fs";
import { allItems, categories, signatureIds } from "../src/data/menu.ts";

const errors: string[] = [];
const warnings: string[] = [];
const ids = new Map<string, number>();
for (const it of allItems) ids.set(it.id, (ids.get(it.id) ?? 0) + 1);
for (const [id, n] of ids) if (n > 1) errors.push(`identifiant en double : ${id}`);

for (const it of allItems) {
  if (!/^[a-z0-9-]+$/.test(it.id)) errors.push(`identifiant invalide : ${it.id}`);
  if (!it.name.fr?.trim() || !it.name.en?.trim()) errors.push(`${it.id} : nom FR/EN manquant`);
  const prices = [it.price, ...(it.options ?? []).map((o) => o.price)].filter((p) => p !== null) as number[];
  if (!prices.length) warnings.push(`${it.id} : prix illisible sur le menu (non affiché)`);
  for (const p of prices) if (!Number.isInteger(p) || p <= 0) errors.push(`${it.id} : prix invalide ${p}`);
  if (it.desc && (!it.desc.fr.trim() || !it.desc.en.trim())) errors.push(`${it.id} : description FR/EN incomplète`);
  if (it.image && !existsSync(`public/images/${it.image}-800.webp`)) errors.push(`${it.id} : image ${it.image} absente`);
}
const sauces = categories.find((c) => c.id === "caris")!.subcategories;
if (sauces.length !== 9 || sauces.some((s) => !s.sauce)) errors.push("Nos caris : 9 sauces attendues");
for (const c of categories) if (c.image && !existsSync(`public/images/${c.image}-800.webp`)) errors.push(`catégorie ${c.id} : image absente`);
for (const id of signatureIds) if (!ids.has(id)) errors.push(`signature ${id} introuvable`);

if (errors.length) {
  console.error(`✗ Menu : ${errors.length} erreur(s)\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`✓ Menu : ${allItems.length} plats, ${categories.length} catégories, 9 sauces, identifiants uniques.`);
for (const w of warnings) console.log(`  ! ${w}`);

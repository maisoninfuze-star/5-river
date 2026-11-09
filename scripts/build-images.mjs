#!/usr/bin/env node
/**
 * Produit les images responsives de public/images/ :
 *   <clé>-<largeur>.avif / .webp  (480, 800, 1200, 1600) + <clé>-1200.jpg (repli)
 * Source : assets-src/owner/<clé>.jpg (photo fournie par le restaurant) si présente,
 * sinon assets-src/generated/<clé>.jpg (image illustrative).
 *
 *   npm run images
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [480, 800, 1200, 1600];
const OUT = path.resolve("public/images");
fs.mkdirSync(OUT, { recursive: true });

const keys = fs
  .readdirSync("assets-src/generated")
  .filter((f) => f.endsWith(".jpg"))
  .map((f) => f.replace(/\.jpg$/, ""));

for (const key of keys) {
  const owner = ["jpg", "jpeg", "png", "webp"].map((e) => `assets-src/owner/${key}.${e}`).find((p) => fs.existsSync(p));
  const src = owner ?? `assets-src/generated/${key}.jpg`;
  const base = sharp(src).rotate();
  const { width } = await base.metadata();
  for (const w of WIDTHS) {
    const rw = Math.min(w, width);
    await base.clone().resize({ width: rw }).avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${key}-${w}.avif`);
    await base.clone().resize({ width: rw }).webp({ quality: 74 }).toFile(`${OUT}/${key}-${w}.webp`);
  }
  await base.clone().resize({ width: 1200 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${key}-1200.jpg`);
  console.log(`${owner ? "owner    " : "generated"} ${key}`);
}

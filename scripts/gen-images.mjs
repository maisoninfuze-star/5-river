#!/usr/bin/env node
/**
 * Génère la série photo ILLUSTRATIVE du prototype 5 Rivers (fal.ai Flux 1.1 Pro Ultra, texte → image).
 * Un seul style partagé (STYLE) pour une série cohérente.
 * Images de démonstration générées par IA : à faire approuver ou à remplacer par de vraies photos
 * du restaurant avant la mise en ligne (voir docs/ASSETS.md).
 *
 *   FAL_KEY=... node scripts/gen-images.mjs [--only hero,thali] [--force]
 */
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("FAL_KEY manquant."); process.exit(1); }
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const force = args.includes("--force");
const OUT = path.resolve("assets-src/generated");
fs.mkdirSync(OUT, { recursive: true });

const STYLE = " Editorial food photography for a warm, modern neighbourhood Indian restaurant. Soft natural window light from the left, gentle shadows, warm ivory matte stoneware, a deep burgundy linen napkin, dark warm walnut table, a small touch of brushed brass, shallow depth of field, rich true-to-life appetizing colour, faint steam, generous negative space, photorealistic, 50mm lens, magazine quality. No text, no logos, no brand names, no people, no hands, no faces.";

const SHOTS = {
  hero: ["4:5", "A generous copper handi of chicken biryani: long-grain basmati rice with saffron-yellow and white grains, tender chicken pieces, fried onions and fresh coriander, seen from a three-quarter angle, a bowl of butter chicken with a swirl of cream and torn naan softly out of focus behind, a few whole spices (green cardamom, star anise, cinnamon stick) scattered on the table."],
  "biryani-poulet": ["4:5", "A plate of chicken biryani: long-grain basmati rice in saffron-yellow and white grains, chicken pieces on the bone, fried onions, fresh coriander leaves, a small bowl of raita beside it, three-quarter angle."],
  "poulet-beurre": ["4:5", "A bowl of butter chicken: tender chicken pieces in a smooth orange tomato-cream sauce with a swirl of cream and a little chopped coriander, a piece of naan beside the bowl, close three-quarter angle."],
  "kottu-boeuf": ["4:5", "A heaped mound of beef kottu roti on a plate: paratha flatbread finely chopped into small shredded strips and stir-fried together with small pieces of beef, scrambled egg, sliced onion, green chilli and curry leaves, all mixed into one textured pile like a stir-fry, no whole flatbread visible, no fried egg on top, steaming, three-quarter angle."],
  "masala-dosa": ["4:5", "A masala dosa: a very thin, crisp, lacy golden-brown South Indian rice crepe rolled into a long tube on a long oval plate, a little yellow spiced potato filling visible at the open end, with a small bowl of white coconut chutney and a small bowl of sambar lentil stew, overhead three-quarter angle."],
  "palak-paneer": ["4:5", "A bowl of palak paneer: smooth vivid green spinach curry with soft white cubes of paneer cheese and a drizzle of cream, close three-quarter angle."],
  "poulet-tandoori": ["4:5", "One single tandoori chicken leg quarter with a deep red-orange tandoori marinade and charred edges, on a plate with sliced red onion rings and a lemon wedge, three-quarter angle."],
  thali: ["3:2", "A lunch thali on a round plate: a bowl of chicken curry, a portion of basmati rice, a folded naan and a small fresh green salad with cucumber, tomato and onion. Only these four elements, nothing else. Slightly overhead angle."],
  variete: ["4:5", "Overhead view of five different Indian curries in matching small ivory bowls arranged loosely on the table: a pale creamy korma, a deep red vindaloo, a green spinach saag, an orange coconut madras and a jalfrezi with mixed peppers, a few whole spices between them."],
  samosa: ["4:5", "Three golden crisp triangular vegetable samosas on a small plate with a little bowl of green chutney, close three-quarter angle."],
  "naan-ail": ["4:5", "A freshly baked garlic naan with charred blisters, brushed with butter, chopped garlic and coriander, torn open on a wooden board, close angle."],
  "dal-makhani": ["4:5", "A bowl of dal makhani: dark creamy black lentil stew with a swirl of cream and a small knob of butter melting on top, close three-quarter angle."],
  "gulab-jamun": ["4:5", "Two gulab jamun: round, very dark brown fried milk dumplings, glistening in warm syrup in a small ivory bowl, close three-quarter angle."],
  "lassi-mangue": ["4:5", "A tall glass of thick mango lassi, pale orange and creamy, beside half a fresh ripe mango, no straw branding, close angle."],
  nouilles: ["4:5", "A bowl of Indo-Chinese chicken hakka noodles stir-fried with julienned peppers, cabbage, carrot and spring onion, glossy, three-quarter angle."],
  poutine: ["4:5", "A Quebec poutine topped with an orange butter chicken style curry sauce: crisp golden fries and white cheese curds in a shallow ivory bowl, sauce poured over, no meat pieces, three-quarter angle."],
};

const queue = Object.entries(SHOTS).filter(([n]) => !only || only.includes(n));
async function run([name, [ratio, prompt]]) {
  const file = path.join(OUT, `${name}.jpg`);
  if (fs.existsSync(file) && !force) { console.log(`· ${name} (existe)`); return; }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
        method: "POST",
        headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt + STYLE, aspect_ratio: ratio, output_format: "jpeg", num_images: 1, safety_tolerance: "2", raw: false }),
      });
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      const json = await res.json();
      if (!json.images?.[0]?.url) throw new Error("réponse vide");
      fs.writeFileSync(file, Buffer.from(await (await fetch(json.images[0].url)).arrayBuffer()));
      console.log(`ok ${name} ${json.images[0].width}x${json.images[0].height}`);
      return;
    } catch (e) {
      console.log(`! ${name} essai ${attempt}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt * attempt));
    }
  }
}
// Deux requêtes à la fois : au-delà, fal renvoie des réponses vides.
const workers = Array.from({ length: 2 }, async () => { while (queue.length) await run(queue.shift()); });
await Promise.all(workers);

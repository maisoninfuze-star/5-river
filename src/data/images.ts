/**
 * Registre des images. Les fichiers optimisés (AVIF/WebP/JPEG, plusieurs largeurs)
 * sont produits par `npm run images` à partir de `assets-src/`.
 *
 * ⚠ Toutes les photos actuelles sont des images ILLUSTRATIVES générées par IA
 * (fal.ai, voir docs/ASSETS.md). Elles doivent être approuvées par le propriétaire
 * ou remplacées par de vraies photos de 5 Rivers avant la mise en ligne.
 *
 * Pour remplacer une photo : déposer le nouveau fichier dans assets-src/owner/<clé>.jpg,
 * puis `npm run images`. Le script donne priorité au dossier owner/.
 */
import type { L } from "./menu";

export type ImageKey =
  | "hero"
  | "biryani-poulet"
  | "poulet-beurre"
  | "kottu-boeuf"
  | "masala-dosa"
  | "palak-paneer"
  | "poulet-tandoori"
  | "thali"
  | "variete"
  | "samosa"
  | "naan-ail"
  | "dal-makhani"
  | "gulab-jamun"
  | "lassi-mangue"
  | "nouilles"
  | "poutine";

export type ImageMeta = {
  /** Proportions de l'original (largeur / hauteur). */
  width: number;
  height: number;
  alt: L;
  /** Point focal pour object-position. */
  focus?: string;
  /** Origine de l'image : "generated" (IA, illustrative) ou "owner" (fournie par 5 Rivers). */
  source: "generated" | "owner";
};

const gen = (alt: L, focus?: string, size: [number, number] = [1856, 2304]): ImageMeta => ({
  width: size[0],
  height: size[1],
  alt,
  focus,
  source: "generated",
});

export const images: Record<ImageKey, ImageMeta> = {
  hero: gen(
    {
      fr: "Biryani au poulet servi dans une marmite en cuivre, avec un bol de poulet au beurre et du naan en arrière-plan",
      en: "Chicken biryani served in a copper pot, with a bowl of butter chicken and naan in the background",
    },
    "50% 60%",
  ),
  "biryani-poulet": gen({
    fr: "Assiette de biryani au poulet, riz basmati safrané et coriandre fraîche",
    en: "Plate of chicken biryani with saffron basmati rice and fresh coriander",
  }, undefined, [1856, 1682]),
  "poulet-beurre": gen({
    fr: "Bol de poulet au beurre en sauce orangée crémeuse, avec un morceau de naan",
    en: "Bowl of butter chicken in a creamy orange sauce, with a piece of naan",
  }),
  "kottu-boeuf": gen({
    fr: "Kottu roti au bœuf : paratha haché sauté avec œuf, oignon et épices",
    en: "Beef kottu roti: chopped paratha stir-fried with egg, onion and spices",
  }, "55% 50%", [1856, 1313]),
  "masala-dosa": gen({
    fr: "Masala dosa roulé sur un plat ovale, avec chutney et sambar",
    en: "Rolled masala dosa on an oval plate, with chutney and sambar",
  }),
  "palak-paneer": gen({
    fr: "Bol de palak paneer, sauce aux épinards et cubes de paneer",
    en: "Bowl of palak paneer, spinach sauce with cubes of paneer",
  }, "50% 40%", [1856, 1590]),
  "poulet-tandoori": gen({
    fr: "Cuisse de poulet tandoori grillée, rondelles d’oignon rouge et citron",
    en: "Grilled tandoori chicken leg with red onion rings and lemon",
  }),
  thali: {
    width: 2196,
    height: 1448,
    alt: {
      fr: "Thali : cari de poulet, riz basmati, naan et salade sur une même assiette",
      en: "Thali: chicken curry, basmati rice, naan and salad on one plate",
    },
    source: "generated",
  },
  variete: gen({
    fr: "Cinq currys dans des bols ivoire : korma, vindaloo, saag, madras et jalfrezi",
    en: "Five curries in ivory bowls: korma, vindaloo, saag, madras and jalfrezi",
  }),
  samosa: gen({
    fr: "Samosas dorés et croustillants avec un petit bol de chutney vert",
    en: "Golden, crisp samosas with a small bowl of green chutney",
  }),
  "naan-ail": gen({
    fr: "Naan à l’ail tout juste sorti du four, sur une planche de bois",
    en: "Fresh garlic naan on a wooden board",
  }),
  "dal-makhani": gen({
    fr: "Bol de dal makhani, lentilles noires crémeuses",
    en: "Bowl of dal makhani, creamy black lentils",
  }),
  "gulab-jamun": gen({
    fr: "Gulab jamun dans leur sirop, servis dans un petit bol",
    en: "Gulab jamun in syrup, served in a small bowl",
  }),
  "lassi-mangue": gen({
    fr: "Grand verre de lassi à la mangue à côté d’une mangue fraîche",
    en: "Tall glass of mango lassi beside a fresh mango",
  }),
  nouilles: gen({
    fr: "Bol de nouilles au poulet sautées avec poivrons et légumes",
    en: "Bowl of chicken noodles stir-fried with peppers and vegetables",
  }),
  poutine: gen({
    fr: "Poutine à la sauce au beurre, frites et fromage en grains",
    en: "Butter chicken sauce poutine with fries and cheese curds",
  }),
};

/** Largeurs produites par scripts/build-images.mjs. */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600] as const;

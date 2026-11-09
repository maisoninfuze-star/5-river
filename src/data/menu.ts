/**
 * Menu complet de 5 Rivers Restaurant.
 *
 * Source : photos du menu imprimé fournies le 2026-11-09 (8 pages, couverture comprise).
 * Le menu imprimé n'a pas de numéros : chaque plat a un identifiant `id` stable
 * (ancre #plat-<id>). Date d'effet et traitement des taxes : inconnus.
 *
 * Plusieurs pages ont été photographiées en biais : les prix ont été associés aux
 * plats dans l'ordre (autant de prix que de plats dans chaque liste). À faire relire
 * par le propriétaire — voir docs/LAUNCH-CHECKLIST.md.
 *
 * - Prix en CENTS (entiers). 1299 = 12,99 $.
 * - Descriptions : celles du menu imprimé, corrigées (orthographe, accords) sans rien ajouter.
 * - Aucune allégation ajoutée : ni allergènes, ni niveau de piquant, ni « végane ».
 */
import type { ImageKey } from "./images";

export type L = { fr: string; en: string };

/** Protéine d'un cari, pour la grille sauces × protéines. */
export type Protein = "poulet" | "agneau" | "boeuf" | "crevettes" | "poisson" | "paneer";

export type MenuItem = {
  id: string;
  name: L;
  /** Prix en cents ; `null` = illisible sur la photo du menu (non affiché). */
  price: number | null;
  /** Formats à prix différents (½ lb / 1 lb, demi / complet). */
  options?: { label: L; price: number }[];
  desc?: L;
  /** Supplément, pas un plat. */
  addOn?: boolean;
  /** Choix que le client précise à la commande. */
  choice?: L;
  /** Cari : protéine (colonne de la grille). */
  protein?: Protein;
  image?: ImageKey;
  /** Orthographes alternatives pour la recherche. */
  aliases?: string[];
};

export type Subcategory = {
  id: string;
  name?: L;
  description?: L;
  /** Sauce de cari : affichée en grille sauces × protéines. */
  sauce?: boolean;
  items: MenuItem[];
};

export type Category = {
  id: string;
  name: L;
  /** Titre court pour la navigation. */
  short?: L;
  description?: L;
  image?: ImageKey;
  subcategories: Subcategory[];
};

const l = (fr: string, en: string): L => ({ fr, en });
const i = (id: string, fr: string, en: string, price: number | null, extra: Partial<MenuItem> = {}): MenuItem => ({
  id,
  name: { fr, en },
  price,
  ...extra,
});

/** Cari : nom FR/EN construit à partir de la sauce et de la protéine. */
const PROTEIN: Record<Protein, { fr: string; frDe: string; en: string }> = {
  poulet: { fr: "Poulet", frDe: "au poulet", en: "Chicken" },
  agneau: { fr: "Agneau", frDe: "à l’agneau", en: "Lamb" },
  boeuf: { fr: "Bœuf", frDe: "au bœuf", en: "Beef" },
  crevettes: { fr: "Crevettes", frDe: "aux crevettes", en: "Shrimp" },
  poisson: { fr: "Poisson", frDe: "au poisson", en: "Fish" },
  paneer: { fr: "Paneer", frDe: "au paneer", en: "Paneer" },
};
const curry = (
  sauce: string,
  fr: (p: (typeof PROTEIN)[Protein]) => string,
  en: (p: (typeof PROTEIN)[Protein]) => string,
  prices: Partial<Record<Protein, number>>,
  extra: Partial<Record<Protein, Partial<MenuItem>>> = {},
): MenuItem[] =>
  (Object.entries(prices) as [Protein, number][]).map(([p, price]) => ({
    id: `${sauce}-${p}`,
    name: { fr: fr(PROTEIN[p]), en: en(PROTEIN[p]) },
    price,
    protein: p,
    ...extra[p],
  }));

export const categories: Category[] = [
  {
    id: "entrees",
    name: l("Entrées et soupes", "Appetizers & soups"),
    short: l("Entrées", "Appetizers"),
    image: "samosa",
    subcategories: [
      {
        id: "entrees",
        name: l("Entrées", "Appetizers"),
        items: [
          i("samosa-legumes", "Samosa aux légumes", "Vegetable samosa", 150, {
            desc: l("Pâte croustillante farcie de pommes de terre, pois et épices.", "Crunchy pastry filled with potatoes, peas and Indian spices."),
            image: "samosa",
          }),
          i("samosa-poulet", "Samosa au poulet", "Chicken samosa", 250),
          i("channa-samosa", "Channa samosa", "Channa samosa", 650, {
            desc: l("Samosa servi avec pois chiches épicés, chutneys et garnitures.", "Samosa topped with spiced chickpeas, chutneys and fresh garnishes."),
            aliases: ["chana", "pois chiches", "chickpeas"],
          }),
          i("pakora-legumes", "Pakora aux légumes (6)", "Veggie pakora (6)", 499, {
            desc: l("Beignets de légumes frits dans une pâte aux épices.", "Crispy vegetable fritters coated in a spiced chickpea batter."),
          }),
          i("pakora-paneer", "Pakora au paneer (6)", "Paneer pakora (6)", 699, {
            desc: l("Morceaux de paneer frits dans une pâte croustillante aux épices.", "Paneer cheese fritters coated in a crispy spiced batter."),
            aliases: ["fromage", "cheese"],
          }),
          i("pakora-poulet", "Pakora au poulet", "Chicken pakora", null, {
            options: [
              { label: l("½ lb", "½ lb"), price: 699 },
              { label: l("1 lb", "1 lb"), price: 1199 },
            ],
            desc: l("Morceaux de poulet marinés et frits.", "Marinated chicken pieces coated and deep-fried until crispy."),
          }),
          i("pakora-poisson", "Pakora au poisson", "Fish pakora", null, {
            options: [
              { label: l("½ lb", "½ lb"), price: 699 },
              { label: l("1 lb", "1 lb"), price: 1199 },
            ],
            desc: l("Poisson tendre frit dans une pâte épicée et croustillante.", "Tender fish coated in a crispy spiced batter and fried."),
          }),
          i("bhaji-oignons", "Bhaji aux oignons (6)", "Onion bhaji (6)", 450, {
            desc: l(
              "Beignets d’oignons croustillants à la farine de pois chiches et aux épices indiennes.",
              "Crispy onion fritters made with chickpea flour and Indian spices.",
            ),
            aliases: ["bahjee", "bhajee", "bahje"],
          }),
          i("crevettes-frites", "Crevettes frites et salade (6)", "Fried shrimp & salad (6)", 1199, {
            desc: l("Crevettes panées servies avec une salade fraîche.", "Breaded fried shrimp served with a fresh salad."),
          }),
          i("frites", "Frites", "Fries", null, {
            options: [
              { label: l("Petite", "Small"), price: 450 },
              { label: l("Grande", "Large"), price: 650 },
            ],
          }),
          i("rouleau-viande", "Rouleau à la viande", "Meat roll", 150, {
            choice: l("poulet, bœuf ou agneau", "chicken, beef or lamb"),
            aliases: ["roll", "rouleaux"],
          }),
          i("rouleau-legumes", "Rouleau aux légumes", "Veggie roll", 125, { aliases: ["roll", "rouleaux"] }),
          i("rouleau-nouilles", "Rouleau impérial aux nouilles", "Noodle spring roll", 199, {
            desc: l("Rouleau croustillant farci de nouilles assaisonnées.", "Crispy spring roll stuffed with seasoned noodles."),
            aliases: ["spring roll", "noodles"],
          }),
          i("gobi-65", "Gobi 65", "Gobi 65", 749, {
            desc: l("Chou-fleur croustillant sauté aux épices du sud de l’Inde.", "Crispy cauliflower tossed with South Indian spices."),
            aliases: ["chou-fleur", "cauliflower"],
          }),
          i("chaat-papri", "Chaat papri", "Chaat papri", 599, {
            desc: l("Papris croustillants avec yogourt, pois chiches et chutneys.", "Crispy wafers topped with yogurt, chickpeas and chutneys."),
            aliases: ["papdi"],
          }),
          i("dahi-bhalla", "Dahi bhalla", "Dahi bhalla", 599, {
            desc: l("Beignets de lentilles servis avec yogourt et chutneys.", "Soft lentil dumplings served with yogurt and chutneys."),
            aliases: ["dahi vada"],
          }),
          i("dahi-golgapa", "Dahi golgapa", "Dahi golgapa", 599, {
            desc: l("Bouchées croustillantes garnies de yogourt, chutneys et épices.", "Crispy shells filled with yogurt, chutneys and spices."),
            aliases: ["pani puri", "golgappa"],
          }),
          i("aloo-tikki", "Aloo tikki (2)", "Aloo tikki (2)", 650, {
            desc: l("Galettes de pommes de terre épicées servies avec chutneys.", "Spiced potato patties served with traditional chutneys."),
          }),
          i("vada", "Vada", "Vada", 100, { aliases: ["vadai"] }),
          i("vada-sambar", "Vada sambar", "Vada sambar", 599, { aliases: ["vadai"] }),
          i("burger-tikki-nouilles", "Burger tikki aux nouilles", "Veg noodle tikki burger", 999, {
            desc: l("Burger végétarien garni de nouilles et d’une galette aloo tikki.", "Vegetarian burger topped with noodles and an aloo tikki patty."),
          }),
          i("burger-paneer-tikki", "Burger paneer tikki", "Paneer tikki burger", 1199, {
            desc: l("Burger au paneer, galette épicée et garnitures fraîches.", "Paneer burger with a spiced patty and fresh toppings."),
          }),
          i("malai-chaap", "Malai chaap", "Malai chaap", 1399, {
            desc: l("Chaap de soja mariné dans une sauce crémeuse aux épices douces.", "Soya chaap marinated in a rich creamy sauce with mild spices."),
            aliases: ["soya", "soja"],
          }),
        ],
      },
      {
        id: "soupes",
        name: l("Soupes", "Soups"),
        items: [
          i("soupe-poulet", "Soupe au poulet", "Chicken soup", 599),
          i("soupe-lentilles", "Soupe aux lentilles", "Daal soup", 499, { aliases: ["dal", "daal", "lentils"] }),
          i("soupe-sambar", "Soupe sambar", "Sambar soup", 550),
        ],
      },
    ],
  },
  {
    id: "caris",
    name: l("Nos caris", "Our curries"),
    short: l("Caris", "Curries"),
    description: l(
      "Neuf sauces, une protéine au choix. Choisissez la sauce, puis le poulet, l’agneau, le bœuf, les crevettes ou le poisson.",
      "Nine sauces, your choice of protein. Pick the sauce, then chicken, lamb, beef, shrimp or fish.",
    ),
    image: "poulet-beurre",
    subcategories: [
      {
        id: "beurre",
        sauce: true,
        name: l("Sauce au beurre", "Butter sauce"),
        description: l(
          "Mariné aux épices, cuit à la poêle et servi dans une sauce crémeuse au beurre.",
          "Marinated in spices, pan-fried and served in a creamy butter sauce.",
        ),
        items: curry("beurre", (p) => `${p.fr} au beurre`, (p) => `Butter ${p.en.toLowerCase()}`, { poulet: 1299, crevettes: 1499 }, {
          poulet: { image: "poulet-beurre", aliases: ["butter chicken"] },
        }),
      },
      {
        id: "tikka-masala",
        sauce: true,
        name: l("Tikka masala", "Tikka masala"),
        description: l(
          "Servi avec oignons et poivrons dans une sauce onctueuse.",
          "Served with fresh onions, bell peppers and spices in a thick, rich sauce.",
        ),
        items: curry("tikka-masala", (p) => `Tikka masala ${p.frDe}`, (p) => `${p.en} tikka masala`, {
          poulet: 1299,
          poisson: 1299,
          paneer: 1299,
          crevettes: 1499,
        }),
      },
      {
        id: "cari",
        sauce: true,
        name: l("Cari", "Curry"),
        description: l(
          "La viande de votre choix, mijotée dans une sauce aux épices, au gingembre et à l’ail.",
          "The meat of your choice, simmered in a sauce of spices, ginger and garlic.",
        ),
        items: curry("cari", (p) => `Cari ${p.frDe}`, (p) => `${p.en} curry`, {
          poulet: 1199,
          agneau: 1599,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1299,
        }),
      },
      {
        id: "vindaloo",
        sauce: true,
        name: l("Vindaloo", "Vindaloo"),
        description: l(
          "La viande de votre choix, avec pommes de terre, mijotée au vinaigre dans une sauce au cari et aux piments.",
          "The meat of your choice, with potatoes, simmered in a vinegar-based curry with whole red chillies.",
        ),
        items: curry("vindaloo", (p) => `Vindaloo ${p.frDe}`, (p) => `${p.en} vindaloo`, {
          poulet: 1299,
          agneau: 1499,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1499,
        }),
      },
      {
        id: "korma",
        sauce: true,
        name: l("Korma", "Korma"),
        description: l(
          "Mariné aux épices, cuit à la poêle et servi dans une sauce crémeuse à base de noix.",
          "Marinated and cooked in a creamy sauce with nuts and exotic spices.",
        ),
        items: curry("korma", (p) => `Korma ${p.frDe}`, (p) => `${p.en} korma`, {
          poulet: 1199,
          agneau: 1499,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1499,
        }),
      },
      {
        id: "chilli",
        sauce: true,
        name: l("Chilli", "Chilli"),
        description: l(
          "Cari relevé aux poivrons, oignons, ail et piments, dans une sauce riche.",
          "Flavourful spicy curry with peppers, onions, garlic and chillies in a rich aromatic sauce.",
        ),
        items: [
          ...curry("chilli", (p) => `${p.fr} chilli`, (p) => `Chilli ${p.en.toLowerCase()}`, {
            poulet: 1299,
            agneau: 1699,
            boeuf: 1499,
            crevettes: 1599,
            poisson: 1499,
          }, {
            agneau: { name: l("Kebab d’agneau chilli", "Lamb chilli kebab"), aliases: ["kabab"] },
            boeuf: { name: l("Kebab de bœuf chilli", "Beef chilli kebab"), aliases: ["kabab"] },
          }),
          i("poulet-65", "Poulet 65", "Chicken 65", 1199),
        ],
      },
      {
        id: "saag",
        sauce: true,
        name: l("Saag", "Saag"),
        description: l(
          "La viande de votre choix aux épinards, garnie de coriandre fraîche.",
          "The meat of your choice mixed with spinach and fresh coriander.",
        ),
        items: curry("saag", (p) => `Saag ${p.frDe}`, (p) => `${p.en} saag`, {
          poulet: 1299,
          agneau: 1699,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1499,
        }),
      },
      {
        id: "jalfrezi",
        sauce: true,
        name: l("Jalfrezi", "Jalfrezi"),
        description: l(
          "La viande de votre choix avec oignons, poivrons verts et épices indiennes, et un soupçon de vinaigre.",
          "The meat of your choice with onions, green peppers and Indian spices, with a hint of vinegar.",
        ),
        items: curry("jalfrezi", (p) => `Jalfrezi ${p.frDe}`, (p) => `${p.en} jalfrezi`, {
          poulet: 1299,
          agneau: 1699,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1499,
        }),
      },
      {
        id: "madras",
        sauce: true,
        name: l("Madras", "Madras"),
        description: l(
          "Cari aux piments forts, graines de moutarde et lait de coco.",
          "Curry with whole red chillies, mustard seed and coconut milk.",
        ),
        items: curry("madras", (p) => `Madras ${p.frDe}`, (p) => `${p.en} Madras`, {
          poulet: 1299,
          agneau: 1699,
          boeuf: 1499,
          crevettes: 1599,
          poisson: 1499,
        }),
      },
    ],
  },
  {
    id: "tandoori",
    name: l("Tandoori", "Tandoori"),
    image: "poulet-tandoori",
    subcategories: [
      {
        id: "tandoori",
        items: [
          i("cuisse-poulet-tandoori", "Cuisse de poulet tandoori", "Tandoori chicken leg", 550, { image: "poulet-tandoori" }),
          i("poulet-tikka", "Poulet tikka", "Chicken tikka", 1250, {
            desc: l("Morceaux de poitrine de poulet marinés et rôtis au tandoor.", "Pieces of chicken breast marinated and roasted in the tandoor."),
          }),
          i("kebab-poulet", "Kebab de poulet", "Chicken kebab", 1299, {
            desc: l("Poulet haché mariné, cuit au tandoor avec oignons et ail.", "Marinated minced chicken roasted, garnished with onions and garlic."),
            aliases: ["kabab"],
          }),
          i("kebab-agneau", "Kebab d’agneau", "Lamb kebab", 1299, {
            desc: l("Agneau haché mariné, cuit au tandoor avec oignons et ail.", "Marinated minced lamb roasted, garnished with onions and garlic."),
            aliases: ["kabab"],
          }),
          i("paneer-tikka", "Paneer tikka", "Paneer tikka", 1399, {
            desc: l("Paneer mariné dans le yogourt et les épices, puis grillé au tandoor.", "Paneer cheese marinated in yogurt and spices, then grilled in the tandoor."),
          }),
          i("crevettes-tikka", "Crevettes tikka", "Shrimp tikka", 1399, {
            choice: l("salade ou riz", "salad or rice"),
          }),
          i("poisson-tikka", "Poisson tikka", "Fish tikka", 1499),
          i("grillades-mixtes", "Grillades mixtes tandoori", "Tandoori mixed grill", 2499, {
            desc: l(
              "Poulet tikka, kebab de poulet, kebab d’agneau, crevettes tikka et poisson tikka, avec boisson, naan, salade et sauce.",
              "Chicken tikka, chicken kebab, lamb kebab, shrimp tikka and fish tikka, with a drink, naan, salad and sauce.",
            ),
            aliases: ["mix grill", "assiette"],
          }),
        ],
      },
    ],
  },
  {
    id: "vegetarien",
    name: l("Végétarien", "Vegetarian"),
    description: l(
      "Sans viande ni poisson. Végétarien ne veut pas dire végane : plusieurs plats contiennent du paneer, de la crème ou du beurre.",
      "No meat or fish. Vegetarian does not mean vegan: several dishes contain paneer, cream or butter.",
    ),
    image: "palak-paneer",
    subcategories: [
      {
        id: "vegetarien",
        items: [
          i("aloo-gobi", "Aloo gobi", "Aloo gobi", 999, {
            desc: l("Pommes de terre et chou-fleur aux épices indiennes.", "Potatoes and cauliflower cooked with traditional Indian spices."),
          }),
          i("palak-paneer", "Palak paneer", "Palak paneer", 1050, {
            desc: l("Paneer dans une sauce crémeuse aux épinards.", "Paneer cheese cooked in a creamy spinach sauce."),
            image: "palak-paneer",
            aliases: ["epinards", "spinach"],
          }),
          i("shahi-paneer", "Shahi paneer", "Shahi paneer", 1150, {
            desc: l("Paneer dans une riche sauce crémeuse aux noix de cajou et aux épices.", "Paneer in a rich creamy cashew and spice sauce."),
          }),
          i("paneer-kadahi", "Paneer kadahi", "Paneer kadahi", 1199, {
            desc: l("Paneer sauté avec poivrons, oignons et épices kadahi.", "Paneer stir-fried with peppers, onions and kadahi spices."),
            aliases: ["karahi", "kadai"],
          }),
          i("paneer-masala", "Paneer masala", "Paneer masala", null, {
            desc: l("Paneer dans une sauce tomate riche et parfumée.", "Paneer cooked in a rich and aromatic tomato gravy."),
          }),
          i("paneer-bhurji", "Paneer bhurji", "Paneer bhurji", 1499, {
            desc: l("Paneer émietté, sauté avec tomates, oignons et épices.", "Crumbled paneer sautéed with tomatoes, onions and spices."),
          }),
          i("malai-kofta", "Malai kofta", "Malai kofta", 999, {
            desc: l("Boulettes de légumes et de paneer dans une sauce crémeuse.", "Vegetable and paneer dumplings in a creamy sauce."),
          }),
          i("korma-legumes", "Korma aux légumes", "Veggie korma", 1099, {
            desc: l("Légumes variés dans une sauce douce aux noix et à la crème.", "Mixed vegetables in a mild creamy nut-based sauce."),
          }),
          i("jalfrezi-legumes", "Jalfrezi aux légumes", "Veggie jalfrezi", 1099, {
            desc: l("Légumes sautés avec poivrons, oignons et sauce épicée.", "Vegetables stir-fried with peppers, onions and spicy sauce."),
          }),
          i("cari-legumes", "Cari aux légumes variés", "Mixed vegetable curry", 999, {
            desc: l("Assortiment de légumes cuisinés dans une sauce au cari.", "Mixed vegetables cooked in a flavourful curry sauce."),
            aliases: ["mix veggies", "curry"],
          }),
          i("saag-legumes", "Saag", "Saag", 999, {
            desc: l("Épinards assaisonnés, cuits aux épices traditionnelles.", "Seasoned spinach cooked with traditional Indian spices."),
            aliases: ["epinards", "spinach"],
          }),
          i("tarka-daal", "Tarka daal", "Tarka daal", 999, {
            desc: l("Lentilles jaunes tempérées à l’ail, au cumin et aux épices.", "Yellow lentils tempered with garlic, cumin and spices."),
            aliases: ["dal", "tadka", "lentilles", "lentils"],
          }),
          i("daal-makhni", "Daal makhni", "Daal makhni", 999, {
            desc: l("Lentilles noires et haricots rouges au beurre et à la crème.", "Black lentils and kidney beans cooked with butter and cream."),
            image: "dal-makhani",
            aliases: ["dal makhani", "lentilles", "lentils"],
          }),
          i("channa-masala", "Channa masala", "Channa masala", 999, {
            desc: l("Pois chiches mijotés dans une sauce tomate épicée.", "Chickpeas simmered in a spiced tomato gravy."),
            aliases: ["chana", "pois chiches", "chickpeas"],
          }),
          i("chaap-kadahi", "Chaap kadahi", "Chaap kadahi", 1099, {
            desc: l("Chaap végétarien sauté avec poivrons, oignons et épices.", "Vegetarian chaap stir-fried with peppers, onions and spices."),
            aliases: ["soya", "soja", "karahi"],
          }),
        ],
      },
    ],
  },
  {
    id: "biryani",
    name: l("Biryani et riz", "Biryani & rice"),
    short: l("Biryani", "Biryani"),
    description: l("Riz basmati parfumé aux épices indiennes.", "Basmati rice flavoured with Indian spices."),
    image: "biryani-poulet",
    subcategories: [
      {
        id: "biryanis",
        name: l("Biryanis", "Biryanis"),
        items: [
          i("biryani-legumes", "Biryani aux légumes", "Vegetable biryani", 1050, { aliases: ["biriyani"] }),
          i("biryani-poulet", "Biryani au poulet", "Chicken biryani", 1199, { image: "biryani-poulet", aliases: ["biriyani"] }),
          i("biryani-boeuf", "Biryani au bœuf", "Beef biryani", 1199, { aliases: ["biriyani"] }),
          i("biryani-agneau", "Biryani à l’agneau", "Lamb biryani", 1250, { aliases: ["biriyani"] }),
          i("biryani-crevettes", "Biryani aux crevettes", "Shrimp biryani", 1399, { aliases: ["biriyani"] }),
          i("biryani-poisson", "Biryani au poisson", "Fish biryani", 1399, { aliases: ["biriyani"] }),
          i("biryani-fruits-de-mer", "Biryani aux fruits de mer", "Seafood biryani", 1599, { aliases: ["biriyani"] }),
        ],
      },
      {
        id: "riz",
        name: l("Riz et raïta", "Rice & raita"),
        items: [
          i("riz-basmati", "Riz basmati", "Basmati rice", 399),
          i("riz-pilau", "Riz pilau", "Pilau rice", 450, { aliases: ["pulao", "pilaf"] }),
          i("riz-basmati-epice", "Riz basmati épicé", "Spiced basmati rice", 450),
          i("raita", "Raïta", "Raita", null, {
            options: [
              { label: l("Demi", "Half"), price: 249 },
              { label: l("Complet", "Full"), price: 499 },
            ],
            aliases: ["yogourt", "yogurt"],
          }),
        ],
      },
    ],
  },
  {
    id: "wok",
    name: l("Manchurian, riz frit et nouilles", "Manchurian, fried rice & noodles"),
    short: l("Manchurian et wok", "Manchurian & wok"),
    image: "nouilles",
    subcategories: [
      {
        id: "manchurian",
        name: l("Manchurian", "Manchurian"),
        items: [
          i("manchurian-legumes", "Manchurian aux légumes", "Veg Manchurian", 1299, {
            desc: l(
              "Boulettes de légumes frites dans une sauce Manchurian relevée à l’ail et au gingembre.",
              "Vegetable dumplings tossed in a savoury Manchurian sauce with garlic and ginger.",
            ),
            aliases: ["manchurien"],
          }),
          i("manchurian-poulet", "Poulet Manchurian", "Chicken Manchurian", 1399, {
            desc: l("Morceaux de poulet croustillants sautés dans une sauce Manchurian épicée.", "Crispy chicken pieces tossed in a spicy Manchurian sauce."),
            aliases: ["manchurien"],
          }),
          i("manchurian-crevettes", "Crevettes Manchurian", "Shrimp Manchurian", 1399, {
            desc: l(
              "Crevettes sautées dans une sauce Manchurian parfumée à l’ail, au gingembre et aux épices.",
              "Shrimp cooked in a flavourful Manchurian sauce with garlic, ginger and spices.",
            ),
            aliases: ["manchurien"],
          }),
          i("manchurian-gobi", "Gobi Manchurian", "Gobi Manchurian", 1199, {
            desc: l(
              "Chou-fleur croustillant sauté dans une sauce Manchurian aigre-douce et épicée.",
              "Crispy cauliflower tossed in a tangy and spicy Manchurian sauce.",
            ),
            aliases: ["manchurien", "chou-fleur", "cauliflower"],
          }),
          i("poulet-chilli-sud-indien", "Poulet chilli sud-indien", "South Indian chilli chicken", 1399, {
            desc: l(
              "Poulet épicé sauté avec poivrons, oignons, feuilles de cari et piments du sud de l’Inde.",
              "Spicy chicken stir-fried with peppers, onions, curry leaves and South Indian chillies.",
            ),
            aliases: ["chili"],
          }),
        ],
      },
      {
        id: "riz-frit",
        name: l("Riz frit", "Fried rice"),
        items: [
          i("riz-frit-legumes", "Riz frit aux légumes", "Vegetable fried rice", 1099),
          i("riz-frit-poulet", "Riz frit au poulet", "Chicken fried rice", 1099),
          i("riz-frit-boeuf", "Riz frit au bœuf", "Beef fried rice", 1350),
          i("riz-frit-oeuf", "Riz frit aux œufs", "Egg fried rice", 999, { aliases: ["oeuf"] }),
          i("riz-frit-agneau", "Riz frit à l’agneau", "Lamb fried rice", 1199),
          i("riz-frit-crevettes", "Riz frit aux crevettes", "Shrimp fried rice", 1399),
          i("riz-frit-poisson", "Riz frit au poisson", "Fish fried rice", 1399),
          i("riz-frit-fruits-de-mer", "Riz frit aux fruits de mer", "Seafood fried rice", 1499),
        ],
      },
      {
        id: "nouilles",
        name: l("Nouilles", "Noodles"),
        items: [
          i("nouilles-legumes", "Nouilles aux légumes", "Vegetable noodles", 999),
          i("nouilles-poulet", "Nouilles au poulet", "Chicken noodles", 1199, { image: "nouilles" }),
          i("nouilles-oeuf", "Nouilles aux œufs", "Egg noodles", 1099, { aliases: ["oeuf"] }),
          i("nouilles-agneau", "Nouilles à l’agneau", "Lamb noodles", 1399),
          i("nouilles-crevettes", "Nouilles aux crevettes", "Shrimp noodles", 1399),
          i("nouilles-poisson", "Nouilles au poisson", "Fish noodles", 1399),
          i("nouilles-boeuf", "Nouilles au bœuf", "Beef noodles", 1350),
          i("nouilles-fruits-de-mer", "Nouilles aux fruits de mer", "Seafood noodles", 1599),
        ],
      },
    ],
  },
  {
    id: "dosas",
    name: l("Dosas", "Dosas"),
    image: "masala-dosa",
    subcategories: [
      {
        id: "dosas",
        items: [
          i("dosa-nature", "Dosa nature (4)", "Plain dosa (4)", 899, { aliases: ["dosai", "thosai"] }),
          i("masala-dosa", "Masala dosa", "Masala dosa", 1050, { image: "masala-dosa", aliases: ["dosai", "thosai"] }),
          i("masala-dosa-poulet", "Masala dosa au poulet", "Chicken masala dosa", 1199, { aliases: ["dosai"] }),
          i("masala-dosa-oeufs", "Masala dosa aux œufs", "Egg masala dosa", 1050, { aliases: ["dosai", "oeufs"] }),
          i("dosa-oeuf", "Dosa à l’œuf", "Egg dosa", 899, { aliases: ["dosai", "oeuf"] }),
          i("masala-dosa-agneau", "Masala dosa à l’agneau", "Lamb masala dosa", 1299, { aliases: ["dosai"] }),
          i("dosa-paneer", "Dosa au paneer", "Paneer dosa", 1099, { aliases: ["dosai"] }),
          i("masala-dosa-poisson", "Masala dosa au poisson", "Fish masala dosa", 1299, { aliases: ["dosai"] }),
        ],
      },
    ],
  },
  {
    id: "kottu",
    name: l("Kottu roti", "Kottu roti"),
    image: "kottu-boeuf",
    subcategories: [
      {
        id: "kottu",
        items: [
          i("kottu-legumes", "Kottu roti aux légumes", "Vegetable kottu roti", 999, { aliases: ["kotu"] }),
          i("kottu-oeuf", "Kottu roti à l’œuf", "Egg kottu roti", 999, { aliases: ["kotu", "oeuf"] }),
          i("kottu-boeuf", "Kottu roti au bœuf", "Beef kottu roti", 1299, { image: "kottu-boeuf", aliases: ["kotu", "boeuf"] }),
          i("kottu-poulet", "Kottu roti au poulet", "Chicken kottu roti", 1150, { aliases: ["kotu"] }),
          i("kottu-poulet-chilli", "Kottu roti au poulet chilli", "Chilli chicken kottu roti", 1450, { aliases: ["kotu", "chili"] }),
          i("kottu-agneau", "Kottu roti à l’agneau", "Lamb kottu roti", 1399, { aliases: ["kotu"] }),
          i("kottu-crevettes", "Kottu roti aux crevettes", "Shrimp kottu roti", 1399, { aliases: ["kotu"] }),
        ],
      },
    ],
  },
  {
    id: "thali",
    name: l("Thalis et spécialités", "Thalis & specialties"),
    short: l("Thalis", "Thalis"),
    image: "thali",
    subcategories: [
      {
        id: "thalis",
        name: l("Thalis", "Thalis"),
        items: [
          i("thali-cari-poulet", "Thali au cari de poulet", "Chicken curry thali", 1299),
          i("thali-poulet-beurre", "Thali au poulet au beurre", "Butter chicken thali", 1299, { aliases: ["butter chicken"] }),
          i("thali-vegetarien", "Thali végétarien", "Vegetarian thali", 1199),
          i("thali-agneau", "Thali à l’agneau", "Lamb thali", 1299),
          i("thali-boeuf", "Thali au bœuf", "Beef thali", 1299),
        ],
      },
      {
        id: "specialites",
        name: l("Spécialités", "Specialties"),
        items: [
          i("amritsari-kulcha", "Amritsari kulcha (1)", "Amritsari kulcha (1)", 999, { aliases: ["amritsary"] }),
          i("chole-bhature", "Chole bhature et halwa", "Chole bhature with halwa", 899, { aliases: ["chole bathure", "bhatura"] }),
        ],
      },
    ],
  },
  {
    id: "pains",
    name: l("Pains et naan rolls", "Breads & naan rolls"),
    short: l("Pains", "Breads"),
    image: "naan-ail",
    subcategories: [
      {
        id: "pains",
        name: l("Pains", "Breads"),
        items: [
          i("naan", "Naan", "Naan", 199),
          i("naan-ail", "Naan à l’ail", "Garlic naan", 299, { image: "naan-ail" }),
          i("naan-poulet", "Naan au poulet", "Chicken naan", 450),
          i("naan-paneer", "Naan au paneer", "Paneer naan", 450),
          i("naan-epinards", "Naan aux épinards", "Spinach naan", 450),
          i("aloo-paratha", "Aloo paratha tandoori", "Tandoori aloo paratha", 450),
          i("paratha-mixte", "Paratha mixte", "Mix paratha", 450),
          i("paratha-sri-lankais", "Paratha sri-lankais", "Sri Lankan paratha", 250, { aliases: ["shrilankan"] }),
          i("lachha-paratha", "Lachha paratha", "Lachha paratha", 299, { aliases: ["lasha", "laccha"] }),
          i("paratha", "Paratha", "Paratha", 199),
          i("pappadam", "Pappadam", "Pappadam", 99, { aliases: ["papadum", "papad", "poppadom"] }),
          i("tawa-roti", "Tawa roti", "Tawa roti", 99, { aliases: ["chapati"] }),
        ],
      },
      {
        id: "naan-rolls",
        name: l("Naan rolls", "Naan rolls"),
        items: [
          i("naan-roll-poulet-tikka", "Naan roll au poulet tikka", "Chicken tikka naan roll", 750, { aliases: ["wrap", "sandwich"] }),
          i("naan-roll-kebab-poulet", "Naan roll au kebab de poulet", "Chicken kebab naan roll", 850, { aliases: ["wrap", "kabab"] }),
          i("naan-roll-kebab-agneau", "Naan roll au kebab d’agneau", "Lamb kebab naan roll", 899, { aliases: ["wrap", "kabab"] }),
          i("naan-roll-vegetarien", "Naan roll végétarien", "Veggie naan roll", 750, { aliases: ["wrap"] }),
          i("naan-roll-oeufs", "Naan roll aux œufs", "Egg naan roll", 750, { aliases: ["wrap", "oeufs"] }),
        ],
      },
    ],
  },
  {
    id: "poutines",
    name: l("Poutines", "Poutines"),
    image: "poutine",
    subcategories: [
      {
        id: "poutines",
        items: [
          i("poutine-cari-poulet", "Poutine sauce cari au poulet", "Chicken curry sauce poutine", 650),
          i("poutine-beurre", "Poutine sauce au beurre", "Butter chicken sauce poutine", 750, { image: "poutine", aliases: ["butter chicken"] }),
          i("poutine-korma", "Poutine korma aux légumes", "Veggie korma poutine", 750),
          i("poutine-reguliere", "Poutine régulière", "Regular poutine", 650, { aliases: ["classique", "classic"] }),
          i("supplement-poulet", "Ajout de poulet", "Add chicken pieces", 399, { addOn: true }),
        ],
      },
    ],
  },
  {
    id: "douceurs",
    name: l("Boissons et desserts", "Drinks & desserts"),
    short: l("Douceurs", "Sweets"),
    image: "gulab-jamun",
    subcategories: [
      {
        id: "boissons",
        name: l("Boissons", "Drinks"),
        items: [
          i("lassi-mangue", "Lassi à la mangue", "Mango lassi", 399, { image: "lassi-mangue" }),
          i("lassi-sale", "Lassi salé", "Salty lassi", 350, { aliases: ["sale"] }),
          i("lassi-sucre", "Lassi sucré", "Sweet lassi", 350, { aliases: ["sucre"] }),
          i("falooda", "Falooda", "Falooda", 999, { aliases: ["fallooda"] }),
          i("the-masala", "Thé masala", "Masala tea", 299, { aliases: ["chai", "the"] }),
          i("boisson-gazeuse", "Boisson gazeuse", "Soft drink", 199, { aliases: ["soda", "liqueur", "pop"] }),
        ],
      },
      {
        id: "desserts",
        name: l("Desserts", "Desserts"),
        items: [
          i("gulab-jamun", "Gulab jamun (2)", "Gulab jamun (2)", 199, { image: "gulab-jamun" }),
          i("gulab-jamun-boite", "Gulab jamun en boîte", "Gulab jamun box", 450),
          i("ladoo", "Ladoo (4)", "Ladoo (4)", 450, { aliases: ["laddu", "laddoo"] }),
          i("jalebi", "Jalebi (4)", "Jalebi (4)", 450),
          i("kulfi", "Lassha kulfi", "Lassha kulfi", 599, { aliases: ["kulfi"] }),
          i("rasmalai", "Rasmalaï", "Rasmalai", 350, { aliases: ["ras malai"] }),
        ],
      },
    ],
  },
];

export const allItems: MenuItem[] = categories.flatMap((c) => c.subcategories.flatMap((s) => s.items));

export const itemById = (id: string): MenuItem => {
  const item = allItems.find((it) => it.id === id);
  if (!item) throw new Error(`Plat ${id} introuvable`);
  return item;
};

export const categoryOfItem = (id: string): Category => {
  const cat = categories.find((c) => c.subcategories.some((s) => s.items.some((it) => it.id === id)));
  if (!cat) throw new Error(`Catégorie du plat ${id} introuvable`);
  return cat;
};

/** Colonnes de la grille des caris. */
export const PROTEIN_ORDER: Protein[] = ["poulet", "agneau", "boeuf", "crevettes", "poisson"];
export const proteinLabel = (p: Protein): L => ({ fr: PROTEIN[p].fr, en: PROTEIN[p].en });

/** Signatures de l'accueil (sélection éditoriale — pas des best-sellers). */
export const signatureIds = [
  "biryani-poulet",
  "beurre-poulet",
  "kottu-boeuf",
  "masala-dosa",
  "palak-paneer",
  "cuisse-poulet-tandoori",
] as const;

export const dishAnchor = (id: string) => `plat-${id}`;

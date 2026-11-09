import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";

/** Capitales classiques, proches du logo « 5 RIVERS ». */
export const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Titres éditoriaux, avec italique. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Texte courant et interface. */
export const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  display: "swap",
});

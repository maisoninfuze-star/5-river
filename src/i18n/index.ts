import { dictionaries, type Dict } from "./dictionaries";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dict => dictionaries[locale];

export const otherLocale = (locale: Locale): Locale => (locale === "fr" ? "en" : "fr");

export type Page = "home" | "menu";

/** Chemin d'une page dans une langue, avec barre oblique finale (export statique). */
export const pagePath = (locale: Locale, page: Page, hash?: string) =>
  `/${locale}/${page === "menu" ? "menu/" : ""}${hash ? `#${hash}` : ""}`;

/** Remplace {clé} dans une chaîne. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));

export const LANG_STORAGE_KEY = "raja-lang";

export type { Dict };

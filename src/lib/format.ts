import type { Locale } from "@/i18n";

const NBSP = " ";

/**
 * Prix en cents → texte localisé, sans Intl pour un rendu identique serveur/navigateur.
 * fr : « 10,99 $ » · en : « $10.99 »
 */
export function formatPrice(cents: number, locale: Locale): string {
  const dollars = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, "0");
  return locale === "fr" ? `${dollars},${rest}${NBSP}$` : `$${dollars}.${rest}`;
}

/** « 11:00 » → fr « 11 h » · en « 11 a.m. » ; « 22:00 » → « 22 h » · « 10 p.m. » */
export function formatTime(hhmm: string, locale: Locale): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (locale === "fr") return m ? `${h}${NBSP}h${NBSP}${String(m).padStart(2, "0")}` : `${h}${NBSP}h`;
  const suffix = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""}${NBSP}${suffix}`;
}

/** Plage horaire : fr « 11 h à 22 h » · en « 11 a.m. to 10 p.m. » */
export function formatRange(from: string, to: string, locale: Locale): string {
  return `${formatTime(from, locale)} ${locale === "fr" ? "à" : "to"} ${formatTime(to, locale)}`;
}

/** Minuscules sans accents, pour la recherche. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe")
    .replace(/[’'`]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

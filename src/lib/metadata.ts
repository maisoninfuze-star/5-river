import type { Metadata } from "next";
import { site } from "@/config/business";
import { getDictionary, pagePath, type Locale, type Page } from "@/i18n";

/**
 * Métadonnées localisées. Canonique, hreflang et image Open Graph absolue
 * seulement quand le vrai domaine (site.url) est configuré.
 * Aperçu privé (site.indexing = false) : noindex, nofollow.
 */
export function pageMetadata(locale: Locale, page: Page): Metadata {
  const t = getDictionary(locale);
  const title = page === "home" ? t.meta.homeTitle : t.meta.menuTitle;
  const description = page === "home" ? t.meta.homeDescription : t.meta.menuDescription;
  const base = site.url;

  return {
    title,
    description,
    ...(base
      ? {
          metadataBase: new URL(base),
          alternates: {
            canonical: pagePath(locale, page),
            languages: { "fr-CA": pagePath("fr", page), "en-CA": pagePath("en", page), "x-default": pagePath("fr", page) },
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: "5 Rivers Restaurant",
      title,
      description,
      ...(base ? { url: pagePath(locale, page), images: [{ url: "/images/hero-1200.jpg", width: 1200, height: 1490 }] } : {}),
    },
    robots: site.indexing ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
    formatDetection: { telephone: false },
  };
}

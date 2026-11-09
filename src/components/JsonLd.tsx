import { business, site } from "@/config/business";

/**
 * Données structurées Restaurant — PRODUCTION seulement.
 * Rien n'est émis tant que `site.structuredData` est faux ou que le domaine est inconnu.
 * Seules les valeurs marquées `verified: true` dans la configuration sont incluses.
 */
export function buildRestaurantJsonLd(locale: "fr" | "en") {
  if (!site.structuredData || !site.url) return null;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    url: `${site.url}/${locale}/`,
    menu: `${site.url}/${locale}/menu/`,
  };
  if (business.name.verified) data.name = business.name.value;
  if (business.cuisine.verified) data.servesCuisine = business.cuisine.value[locale];
  if (business.phone.verified) data.telephone = business.phone.value.e164;
  if (business.address.verified) {
    const a = business.address.value;
    data.address = {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    };
  }
  if (business.hours.verified && business.hours.value) {
    const h = business.hours.value.daily;
    data.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: h.opens,
      closes: h.closes,
    };
  }
  if (!data.name) return null;
  return data;
}

export function JsonLd({ locale }: { locale: "fr" | "en" }) {
  const data = buildRestaurantJsonLd(locale);
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

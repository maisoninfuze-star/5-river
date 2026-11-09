/**
 * Configuration unique de l'entreprise et des intégrations.
 *
 * Tout ce qui concerne 5 Rivers (coordonnées, heures, commande, réseaux, indexation)
 * se modifie ICI, et nulle part ailleurs.
 *
 * Règle : une valeur inconnue reste `null` ou `enabled: false`. Le site affiche
 * alors une solution de rechange (le téléphone) au lieu d'une valeur inventée.
 *
 * `verified` = confirmé par le propriétaire. Seules les valeurs vérifiées entrent
 * dans les données structurées (JSON-LD) de production.
 */

export type Verifiable<T> = {
  value: T;
  /** Confirmé par le propriétaire pour la mise en ligne. */
  verified: boolean;
  /** D'où vient la valeur (usage interne, jamais affiché). */
  source: string;
};

export const business = {
  name: {
    value: "5 Rivers Restaurant",
    verified: false,
    source: "Couverture du menu imprimé fournie le 2026-11-09 (ancien nom : Restaurant Raja)",
  } satisfies Verifiable<string>,

  /** Mentions de la couverture du menu. */
  tagline: {
    value: { fr: "Saveurs de l’Inde", en: "Flavours of India" },
    verified: false,
    source: "Couverture du menu : « Flavours of India »",
  },

  cuisine: {
    value: { fr: "Cuisine indienne", en: "Indian cuisine" },
    verified: false,
    source: "Couverture du menu : « Cuisine Indian », « Authentic Indian Restaurant »",
  },

  address: {
    value: {
      street: "1151, rue Décarie",
      locality: "Montréal",
      borough: "Saint-Laurent",
      region: "QC",
      postalCode: "H4L 3M8",
      country: "CA",
    },
    verified: false,
    source: "Ancien menu Raja + fiche Uber Eats « Restaurant 5 Rivers » à la même adresse (à confirmer)",
  },

  phone: {
    value: {
      display: "514 748-1200",
      e164: "+15147481200",
    },
    verified: false,
    source: "Ancien menu Raja — absent du menu 5 Rivers, À CONFIRMER",
  },

  /**
   * Heures d'ouverture. Le menu 5 Rivers n'en indique pas : `null` = section heures masquée.
   * Format quand confirmé : { timeZone: "America/Toronto", daily: { opens: "11:00", closes: "22:00" } }.
   * Aucun statut « Ouvert maintenant » n'est calculé.
   */
  hours: {
    value: null as null | { timeZone: string; daily: { opens: string; closes: string } },
    verified: false,
    source: "Inconnues (l'ancien menu Raja indiquait 11 h – 22 h, non repris)",
  },

  /** Symbole halal imprimé sur le menu. Aucun organisme certificateur connu. */
  halal: {
    value: { printedOnMenu: true, display: true },
    verified: false,
    source: "Logo halal sur la couverture du menu 5 Rivers",
  },

  /** Adresse courriel : aucune connue. Ne pas en inventer. */
  email: { value: null as string | null, verified: false, source: "Aucune" },

  /** Réseaux sociaux : seulement des comptes confirmés. */
  social: [] as { label: string; url: string }[],
} as const;

export const ordering = {
  /**
   * URL de commande en ligne VÉRIFIÉE (système du restaurant).
   * Tant qu'elle est `null`, tous les boutons « Commander » appellent le restaurant.
   */
  onlineOrderUrl: null as string | null,

  /**
   * Plateformes de livraison. Les afficher seulement après confirmation des comptes
   * actifs au nom de 5 Rivers et des URL exactes. Ne pas deviner d'URL.
   */
  deliveryProviders: [
    { id: "ubereats", label: "Uber Eats", url: null as string | null, enabled: false },
    { id: "doordash", label: "DoorDash", url: null as string | null, enabled: false },
    { id: "skip", label: "SkipTheDishes", url: null as string | null, enabled: false },
  ],
} as const;

export const menuSettings = {
  /** Afficher les prix du menu fourni. `false` masque tous les prix du site. */
  showPrices: true,
  currency: "CAD",
} as const;

export const site = {
  /** Domaine réel une fois confirmé, ex. "https://www.5rivers.ca". */
  url: null as string | null,
  /**
   * Aperçu privé : `false` = noindex + robots.txt qui bloque tout.
   * Passer à `true` seulement après l'approbation du propriétaire.
   */
  indexing: false,
  /** Active le JSON-LD Restaurant (faits vérifiés seulement). */
  structuredData: false,
} as const;

export const telHref = `tel:${business.phone.value.e164}`;

export const fullAddress = (() => {
  const a = business.address.value;
  return `${a.street}, ${a.borough}, ${a.region} ${a.postalCode}`;
})();

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `5 Rivers Restaurant, ${business.address.value.street}, ${business.address.value.locality}, ${business.address.value.region} ${business.address.value.postalCode}`,
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${business.address.value.street}, ${business.address.value.locality}, ${business.address.value.region} ${business.address.value.postalCode}`,
)}&z=16&output=embed`;

export const activeDeliveryProviders = ordering.deliveryProviders.filter(
  (p) => p.enabled && p.url,
);

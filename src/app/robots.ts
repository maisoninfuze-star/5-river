import type { MetadataRoute } from "next";
import { site } from "@/config/business";

export const dynamic = "force-static";

/** Aperçu privé : tout est bloqué. Après approbation : site.indexing = true. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexing) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}

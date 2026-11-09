import type { NextConfig } from "next";

// Export statique : le site entier est du HTML pré-généré (hébergeable partout,
// aucun serveur requis). Voir docs/DEPLOYMENT.md.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

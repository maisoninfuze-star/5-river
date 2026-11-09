import type { Metadata } from "next";
import { site } from "@/config/business";
import { cinzel, cormorant, jost } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "5 Rivers Restaurant",
  robots: site.indexing ? { index: false, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}

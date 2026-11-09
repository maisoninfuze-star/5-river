import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionController } from "@/components/MotionController";
import { getDictionary, hasLocale, locales } from "@/i18n";
import { cinzel, cormorant, jost } from "@/lib/fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#651F2B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang === "fr" ? "fr-CA" : "en-CA"} className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body>
        <Header locale={lang} t={t} />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={lang} t={t} />
        <MobileActionBar locale={lang} t={t} />
        <MotionController />
        <JsonLd locale={lang} />
      </body>
    </html>
  );
}

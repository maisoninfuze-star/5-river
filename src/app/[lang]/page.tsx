import { notFound } from "next/navigation";
import { Curries } from "@/components/home/Curries";
import { Currents } from "@/components/home/Currents";
import { Hero } from "@/components/home/Hero";
import { OrderSection } from "@/components/home/OrderSection";
import { Signatures } from "@/components/home/Signatures";
import { Thali } from "@/components/home/Thali";
import { Visit } from "@/components/home/Visit";
import { getDictionary, hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "home");
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <Hero locale={lang} t={t} />
      <Signatures locale={lang} t={t} />
      <Curries locale={lang} t={t} />
      <Currents locale={lang} t={t} />
      <Thali locale={lang} t={t} />
      <OrderSection t={t} />
      <Visit locale={lang} t={t} />
    </>
  );
}

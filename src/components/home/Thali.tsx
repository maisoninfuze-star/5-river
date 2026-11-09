import Link from "next/link";
import { menuSettings } from "@/config/business";
import { categories } from "@/data/menu";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { ArrowIcon } from "../Icons";
import { Picture } from "../Picture";

/** Thalis et spécialités (aucune plage horaire : le menu 5 Rivers n'en indique pas). */
export function Thali({ locale, t }: { locale: Locale; t: Dict }) {
  const subs = categories.find((c) => c.id === "thali")!.subcategories;
  return (
    <section aria-labelledby="thali-title" className="dark section relative overflow-hidden">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-reveal="img">
          <div className="media aspect-[3/2] outline outline-1 outline-offset-[10px] outline-gold/60">
            <Picture name="thali" locale={locale} sizes="(min-width: 1400px) 640px, (min-width: 1024px) 46vw, 100vw" />
          </div>
        </div>
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">{t.thali.eyebrow}</p>
          <h2 id="thali-title" className="display h-lg mt-5 text-cream">
            {t.thali.title}
          </h2>
          <p className="lead mt-5">{t.thali.lead}</p>
          {subs.map((s) => (
            <ul key={s.id} className="mt-8 border-t border-gold/40">
              {s.items.map((it) => (
                <li key={it.id} className="flex items-baseline gap-3 border-b border-gold/15 py-3">
                  <span className="display text-[1.35rem] text-cream">{it.name[locale]}</span>
                  <span className="leader" aria-hidden="true" />
                  {menuSettings.showPrices && it.price !== null && (
                    <span className="price text-gold-light">{formatPrice(it.price, locale)}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
          <Link href={pagePath(locale, "menu", "thali")} className="link-gold mt-6">
            {t.thali.cta}
            <ArrowIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

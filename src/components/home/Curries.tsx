import Link from "next/link";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { CurryMatrix } from "../CurryMatrix";
import { ArrowIcon } from "../Icons";
import { Picture } from "../Picture";

/** Nos caris : la grille complète, sur fond vin. */
export function Curries({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section id="caris" aria-labelledby="curries-title" className="dark section relative scroll-mt-[var(--header-h)] overflow-hidden">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <p className="eyebrow">{t.curries.eyebrow}</p>
            <h2 id="curries-title" className="display h-lg mt-5 text-cream">
              {t.curries.title}
            </h2>
            <p className="lead mt-5">{t.curries.lead}</p>
            <div className="media mt-10 hidden aspect-[4/5] outline outline-1 outline-offset-[8px] outline-gold/50 lg:block">
              <Picture name="variete" locale={locale} sizes="(min-width: 1400px) 400px, 28vw" />
            </div>
            <Link href={pagePath(locale, "menu", "caris")} className="link-gold mt-8">
              {t.actions.exploreMenu}
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <CurryMatrix locale={locale} t={t} mode="home" tone="dark" />
        </div>
      </div>
    </section>
  );
}

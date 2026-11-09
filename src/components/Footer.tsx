import Link from "next/link";
import { business, directionsUrl, fullAddress, telHref } from "@/config/business";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { LangSwitch } from "./LangSwitch";
import { Wordmark } from "./Wordmark";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const links = [
    { href: pagePath(locale, "menu"), label: t.nav.menu },
    { href: pagePath(locale, "home", "caris"), label: t.nav.curries },
    { href: pagePath(locale, "home", "nous-trouver"), label: t.nav.visit },
  ];
  return (
    <footer className="dark relative overflow-hidden border-t border-gold/25">
      <div className="shell flex flex-col items-center pt-20 pb-10 text-center">
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="h-px w-20 bg-gold/50" />
          <span className="size-2 rotate-45 border border-gold" />
          <span className="h-px w-20 bg-gold/50" />
        </div>
        <Link href={pagePath(locale, "home")} aria-label={t.a11y.home} className="mt-8 inline-flex">
          <Wordmark size="lg" rivers />
        </Link>
        <p className="caps mt-6 text-[0.68rem] text-gold">
          {business.cuisine.value[locale]} · {t.strip.halal}
        </p>

        <nav aria-label={t.a11y.mainNav} className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center font-caps text-[0.72rem] tracking-[0.22em] text-cream/85 uppercase hover:text-gold-light"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="mt-8 flex flex-col items-center gap-1 text-[0.95rem] font-light text-cream/80 not-italic sm:flex-row sm:gap-6">
          <a href={directionsUrl} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-gold-light">
            {fullAddress}
            <span className="sr-only"> {t.a11y.newTab}</span>
          </a>
          <span className="hidden h-4 w-px bg-gold/40 sm:block" aria-hidden="true" />
          <a href={telHref} className="inline-flex min-h-11 items-center hover:text-gold-light">
            {business.phone.value.display}
          </a>
        </address>

        <div className="mt-6 flex items-center gap-3 text-[0.72rem] text-cream/60">
          <span className="caps text-[0.62rem]">{t.footer.language}</span>
          <LangSwitch locale={locale} label={t.a11y.switchTo} className="text-cream hover:text-gold-light" />
        </div>
      </div>
      <div className="shell">
        <hr className="rule" />
        <div className="flex flex-col gap-2 py-7 text-center text-[0.75rem] leading-relaxed font-light text-cream/60 md:flex-row md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="md:text-right">
            {t.footer.pricesNote} {t.footer.photosNote} {t.footer.allergyNote}
          </p>
        </div>
      </div>
    </footer>
  );
}

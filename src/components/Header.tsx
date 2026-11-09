import Link from "next/link";
import { telHref } from "@/config/business";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { PhoneIcon } from "./Icons";
import { LangSwitch } from "./LangSwitch";
import { MobileNav } from "./MobileNav";
import { OrderButton } from "./OrderButton";
import { Wordmark } from "./Wordmark";

/** En-tête : navigation à gauche, mot-symbole au centre, langue et commande à droite. */
export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const links = [
    { href: pagePath(locale, "menu"), label: t.nav.menu },
    { href: pagePath(locale, "home", "caris"), label: t.nav.curries },
    { href: pagePath(locale, "home", "nous-trouver"), label: t.nav.visit },
  ];
  const linkCls =
    "inline-flex min-h-11 items-center font-caps text-[0.7rem] font-medium tracking-[0.22em] text-cream/85 uppercase transition-colors hover:text-gold-light";
  return (
    <header className="dark sticky top-0 z-40 border-b border-gold/25 bg-wine/95 backdrop-blur-[3px]">
      <a
        href="#contenu"
        className="sr-only-focusable absolute top-2 left-2 z-50 bg-gold px-4 py-3 text-sm font-semibold text-wine"
      >
        {t.a11y.skip}
      </a>
      <div className="shell grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center">
          <MobileNav
            links={links}
            openLabel={t.a11y.openMenu}
            closeLabel={t.a11y.closeMenu}
            navLabel={t.a11y.mainNav}
          />
          <nav aria-label={t.a11y.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-7">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link href={pagePath(locale, "home")} aria-label={t.a11y.home} className="flex min-h-11 items-center justify-center">
          <span className="md:hidden">
            <Wordmark size="sm" />
          </span>
          <span className="hidden md:inline">
            <Wordmark size="md" />
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <LangSwitch locale={locale} label={t.a11y.switchTo} className="text-cream/85 hover:text-gold-light" />
          <OrderButton t={t} className="btn btn-line btn-sm hidden md:inline-flex" />
          <a
            href={telHref}
            aria-label={t.actions.callToOrder}
            className="inline-flex size-11 items-center justify-center text-gold md:hidden"
          >
            <PhoneIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}

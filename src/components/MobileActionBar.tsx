import { business, directionsUrl, telHref } from "@/config/business";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { MenuBookIcon, PhoneIcon, PinIcon } from "./Icons";

/** Barre d'actions mobile : Carte / Appeler / Itinéraire. Le body réserve sa hauteur (--bar-h). */
export function MobileActionBar({ locale, t }: { locale: Locale; t: Dict }) {
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1.5 font-caps text-[0.6rem] font-semibold tracking-[0.16em] uppercase";
  return (
    <nav
      aria-label={t.a11y.quickActions}
      className="dark fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex h-16 items-stretch divide-x divide-gold/20">
        <li className="flex flex-1">
          <a href={pagePath(locale, "menu")} className={item}>
            <MenuBookIcon className="size-5 text-gold" />
            {t.nav.menu}
          </a>
        </li>
        <li className="flex flex-1">
          <a href={telHref} className={`${item} bg-crimson`} aria-label={`${t.actions.call}${t.a11y.colon}${business.phone.value.display}`}>
            <PhoneIcon className="size-5 text-gold-light" />
            {t.actions.call}
          </a>
        </li>
        <li className="flex flex-1">
          <a href={directionsUrl} target="_blank" rel="noopener" className={item}>
            <PinIcon className="size-5 text-gold" />
            {t.actions.directions}
            <span className="sr-only">{t.a11y.newTab}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

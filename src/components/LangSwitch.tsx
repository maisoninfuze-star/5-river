"use client";

import { usePathname } from "next/navigation";
import { LANG_STORAGE_KEY, otherLocale, type Locale } from "@/i18n";

/**
 * Bascule FR / EN : même page, même ancre (#plat-72, #currys…).
 * Le choix est mémorisé pour la page d'accueil racine.
 */
export function LangSwitch({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const target = otherLocale(locale);
  const href = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${target}`);

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-caps text-[0.74rem] font-semibold tracking-[0.2em] uppercase transition-colors ${className}`}
      onClick={(e) => {
        try {
          localStorage.setItem(LANG_STORAGE_KEY, target);
        } catch {}
        // Conserver l'ancre courante (catégorie ou plat du menu).
        if (window.location.hash) {
          e.preventDefault();
          window.location.assign(href + window.location.hash);
        }
      }}
    >
      <span aria-hidden="true">{target}</span>
    </a>
  );
}

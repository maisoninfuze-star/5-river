import { menuSettings } from "@/config/business";
import type { ImageKey } from "@/data/images";
import { categoryOfItem, dishAnchor, itemById, signatureIds } from "@/data/menu";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { Picture } from "../Picture";
import { SignatureList } from "./SignatureList";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Signatures : index typographique à gauche, grande photo à droite qui change
 * au survol ou au focus d'un plat (desktop). Mobile : vignette à côté de chaque plat.
 */
export function Signatures({ locale, t }: { locale: Locale; t: Dict }) {
  const dishes = signatureIds.map((id, n) => {
    const it = itemById(id);
    return {
      id,
      roman: ROMAN[n],
      name: it.name[locale],
      category: categoryOfItem(id).name[locale],
      price: menuSettings.showPrices && it.price !== null ? formatPrice(it.price, locale) : null,
      href: pagePath(locale, "menu", dishAnchor(id)),
      thumb: <Picture name={it.image as ImageKey} locale={locale} sizes="80px" alt="" />,
      large: <Picture name={it.image as ImageKey} locale={locale} sizes="(min-width: 1400px) 560px, 40vw" />,
    };
  });
  return (
    <section aria-labelledby="signatures-title" className="paper section">
      <div className="shell">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow">{t.signatures.eyebrow}</p>
          <h2 id="signatures-title" className="display h-lg mt-5 max-w-[16ch] text-ink">
            {t.signatures.title}
          </h2>
          <p className="lead mt-5">{t.signatures.lead}</p>
        </div>
        <SignatureList dishes={dishes} seeLabel={t.actions.seeInMenu} />
      </div>
    </section>
  );
}

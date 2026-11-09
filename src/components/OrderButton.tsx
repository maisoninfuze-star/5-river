import { business, ordering, telHref } from "@/config/business";
import type { Dict } from "@/i18n";
import { ExternalIcon, PhoneIcon } from "./Icons";

type Props = {
  t: Dict;
  className?: string;
  /** Libellé court (en-tête mobile). */
  short?: boolean;
};

/**
 * Bouton de commande unique du site.
 * URL de commande vérifiée → « Commander en ligne ». Sinon → appel téléphonique.
 * Ce site ne prend aucune commande lui-même.
 */
export function OrderButton({ t, className = "btn", short = false }: Props) {
  const url = ordering.onlineOrderUrl;
  if (url) {
    return (
      <a href={url} className={className} target="_blank" rel="noopener">
        {short ? t.actions.orderShort : t.actions.orderOnline}
        <ExternalIcon />
        <span className="sr-only">{t.a11y.newTab}</span>
      </a>
    );
  }
  return (
    <a
      href={telHref}
      className={className}
      aria-label={`${t.actions.callToOrder}${t.a11y.colon}${business.phone.value.display}`}
    >
      <PhoneIcon />
      {short ? t.actions.orderShort : t.actions.callToOrder}
    </a>
  );
}

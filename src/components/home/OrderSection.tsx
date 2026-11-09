import { activeDeliveryProviders, business, ordering, telHref } from "@/config/business";
import type { Dict } from "@/i18n";
import { ExternalIcon } from "../Icons";
import { OrderButton } from "../OrderButton";
import { Rivers } from "../Rivers";

/**
 * Section cramoisie de commande. Sans URL de commande vérifiée : téléphone seulement.
 * Les plateformes de livraison n'apparaissent qu'une fois activées dans la configuration.
 */
export function OrderSection({ t }: { t: Dict }) {
  const online = Boolean(ordering.onlineOrderUrl);
  return (
    <section
      aria-labelledby="order-title"
      className="dark relative overflow-hidden"
      style={{ background: "radial-gradient(80% 90% at 70% 40%, #b01e30 0%, #8c1427 45%, #4a0a15 100%)" }}
    >
      {/* Grand « 5 » au trait doré, décoratif */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[2vw] -translate-y-[46%] font-serif text-[70vw] leading-none text-transparent italic select-none md:text-[44vw] lg:right-[6vw] lg:text-[34vw]"
        style={{ WebkitTextStroke: "1px rgba(230,194,124,.35)" }}
      >
        5
      </span>
      <div className="shell section relative">
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow">{t.order.eyebrow}</p>
          <h2 id="order-title" className="display h-xl mt-6 text-cream">
            {t.order.title}
          </h2>
          <Rivers width={150} className="mt-8" />
          <p className="lead mt-8 !text-cream/85">{online ? t.order.leadOnline : t.order.leadPhone}</p>
          {!online && (
            <a href={telHref} className="display mt-6 inline-block text-[clamp(2.8rem,1.8rem+4.4vw,5.4rem)] text-gold-light hover:text-cream">
              {business.phone.value.display}
            </a>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OrderButton t={t} className="btn" />
            {online && (
              <a href={telHref} className="btn btn-line">
                {t.actions.call} · {business.phone.value.display}
              </a>
            )}
          </div>
          {activeDeliveryProviders.length > 0 && (
            <div className="mt-10">
              <p className="caps text-[0.66rem] text-gold">{t.order.alsoOn}</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {activeDeliveryProviders.map((p) => (
                  <li key={p.id}>
                    <a href={p.url!} target="_blank" rel="noopener" className="btn btn-line btn-sm">
                      {p.label}
                      <ExternalIcon />
                      <span className="sr-only">{t.a11y.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

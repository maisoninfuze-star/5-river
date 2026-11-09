import { business, directionsUrl, fullAddress, telHref } from "@/config/business";
import type { Dict, Locale } from "@/i18n";
import { formatRange } from "@/lib/format";
import { PhoneIcon, PinIcon } from "../Icons";
import { MapCard } from "../MapCard";

/** Nous trouver : adresse, téléphone ; heures seulement une fois confirmées. */
export function Visit({ locale, t }: { locale: Locale; t: Dict }) {
  const a = business.address.value;
  const h = business.hours.value;
  return (
    <section id="nous-trouver" aria-labelledby="visit-title" className="paper section scroll-mt-[var(--header-h)]">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">{t.visit.eyebrow}</p>
          <h2 id="visit-title" className="display h-lg mt-5 max-w-[14ch] text-ink">
            {t.visit.title}
          </h2>
          <dl className="mt-12 border-t border-ink/70">
            <div className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[9rem_1fr]">
              <dt className="caps pt-1.5 text-[0.64rem] text-gold-deep">{t.visit.address}</dt>
              <dd>
                <address className="display text-[1.7rem] leading-tight text-ink not-italic">
                  {a.street}
                  <br />
                  {a.borough} ({a.locality}), {a.region} {a.postalCode}
                </address>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[9rem_1fr]">
              <dt className="caps pt-1.5 text-[0.64rem] text-gold-deep">{t.visit.phone}</dt>
              <dd>
                <a href={telHref} className="display text-[1.7rem] text-crimson hover:underline">
                  {business.phone.value.display}
                </a>
              </dd>
            </div>
            {h && (
              <div className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[9rem_1fr]">
                <dt className="caps pt-1.5 text-[0.64rem] text-gold-deep">{t.visit.hours}</dt>
                <dd className="text-[1.05rem]">
                  {t.visit.everyDay}, {formatRange(h.daily.opens, h.daily.closes, locale)}
                </dd>
              </div>
            )}
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-crimson">
              <PinIcon />
              {t.actions.directions}
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
            <a href={telHref} className="btn btn-ink">
              <PhoneIcon />
              {t.actions.call}
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal="img">
          <MapCard showLabel={t.visit.showMap} title={t.visit.mapTitle} note={t.visit.mapNote} address={fullAddress} />
        </div>
      </div>
    </section>
  );
}

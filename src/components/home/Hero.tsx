import Link from "next/link";
import { business, directionsUrl, telHref } from "@/config/business";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { ArrowIcon } from "../Icons";
import { OrderButton } from "../OrderButton";
import { Picture } from "../Picture";
import { Emblem } from "../Emblem";
import { FiligreeCorners } from "../Rivers";

/**
 * Première vue « couverture de menu » : cadre doré à filigranes, titre centré,
 * deux photos verticales en triptyque, bandeau d'informations doré dessous.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const a = business.address.value;
  return (
    <section aria-labelledby="hero-title" className="dark glow relative overflow-hidden">
      <div className="shell relative pt-5 pb-6 md:pt-8 lg:pt-10 lg:pb-10">
        <div className="relative border border-gold/45 p-[9px]">
          <div className="relative border border-gold/25 px-4 pt-6 pb-6 sm:px-8 md:pt-12 md:pb-8 lg:px-10 lg:py-12">
            <FiligreeCorners />
            <div className="grid items-center gap-y-8 lg:grid-cols-12 lg:gap-x-10">
              {/* Photo gauche (desktop) */}
              <figure className="hidden lg:col-span-3 lg:block">
                <div className="media settle aspect-[3/4.6] outline outline-1 outline-offset-[6px] outline-gold/50">
                  <Picture name="biryani-poulet" locale={locale} priority sizes="(min-width: 1400px) 300px, 21vw" />
                </div>
                <figcaption className="caps mt-5 text-center text-[0.6rem] text-gold/80">{t.hero.captionLeft}</figcaption>
              </figure>

              {/* Texte central */}
              <div className="text-center lg:col-span-6">
                <Emblem id="hero-em" label="" className="hero-emblem mx-auto block w-[176px] sm:w-[230px] lg:w-[300px]" />
                <h1 id="hero-title" className="display mt-5 text-[clamp(2.1rem,1rem+2.9vw,3.7rem)] text-cream lg:mt-7">
                  <span className="sr-only">5 Rivers Restaurant — </span>
                  <span className="rise-2 lg:whitespace-nowrap">{t.hero.titleA}</span>{" "}
                  <span className="rise-3 text-gold-light lg:whitespace-nowrap">
                    <em>{t.hero.titleB}</em>
                  </span>
                </h1>
                <p className="lead rise-4 mx-auto mt-4 text-center max-sm:hidden lg:mt-5">{t.hero.lead}</p>
                <div className="rise-4 mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:justify-center sm:gap-3 lg:mt-10">
                  <Link href={pagePath(locale, "menu")} className="btn max-sm:px-3 max-sm:tracking-[0.1em]">
                    {t.actions.seeMenu}
                    <ArrowIcon />
                  </Link>
                  <OrderButton t={t} short className="btn btn-line max-sm:px-3 max-sm:tracking-[0.1em] sm:hidden" />
                  <OrderButton t={t} className="btn btn-line hidden sm:inline-flex" />
                </div>
              </div>

              {/* Photo droite (desktop) */}
              <figure className="hidden lg:col-span-3 lg:block">
                <div className="media settle aspect-[3/4.6] outline outline-1 outline-offset-[6px] outline-gold/50">
                  <Picture name="poulet-beurre" locale={locale} priority sizes="(min-width: 1400px) 300px, 21vw" />
                </div>
                <figcaption className="caps mt-5 text-center text-[0.6rem] text-gold/80">{t.hero.captionRight}</figcaption>
              </figure>

              {/* Photos mobile / tablette : diptyque */}
              <div className="grid grid-cols-2 gap-3 lg:hidden">
                <div className="media settle aspect-[3/4] outline outline-1 outline-offset-4 outline-gold/45">
                  <Picture name="biryani-poulet" locale={locale} priority sizes="50vw" />
                </div>
                <div className="media settle aspect-[3/4] outline outline-1 outline-offset-4 outline-gold/45">
                  <Picture name="poulet-beurre" locale={locale} priority sizes="50vw" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau d'informations */}
        <ul className="mt-5 flex flex-col items-center justify-center gap-x-8 gap-y-1 text-center font-caps text-[0.66rem] tracking-[0.22em] text-cream/75 uppercase sm:flex-row lg:mt-7">
          <li>
            <a href={directionsUrl} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-gold-light">
              {a.street} · {a.borough}
              <span className="sr-only"> {t.a11y.newTab}</span>
            </a>
          </li>
          <li className="hidden h-px w-6 bg-gold/50 sm:block" aria-hidden="true" />
          <li>
            <a href={telHref} className="inline-flex min-h-11 items-center hover:text-gold-light">
              {business.phone.value.display}
            </a>
          </li>
          {business.halal.value.display && (
            <>
              <li className="hidden h-px w-6 bg-gold/50 sm:block" aria-hidden="true" />
              <li className="inline-flex min-h-11 items-center text-gold">{t.strip.halal}</li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

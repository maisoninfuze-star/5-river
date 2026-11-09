import Link from "next/link";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { ArrowIcon } from "../Icons";

const RIVER = [
  "var(--color-river-red)",
  "var(--color-river-orange)",
  "var(--color-river-green)",
  "var(--color-river-blue)",
  "var(--color-river-white)",
];
const ROMAN = ["I", "II", "III", "IV", "V"];

/** La carte en cinq courants : une colonne par famille, chacune coiffée d'une couleur du logo. */
export function Currents({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section aria-labelledby="currents-title" className="paper section">
      <div className="shell">
        <div className="text-center" data-reveal>
          <p className="eyebrow centered justify-center">{t.currents.eyebrow}</p>
          <h2 id="currents-title" className="display h-lg mx-auto mt-5 max-w-[18ch] text-ink">
            {t.currents.title}
          </h2>
        </div>
        <ol className="mt-14 grid border-t border-ink/70 md:grid-cols-5 lg:mt-20">
          {t.currents.items.map((c, n) => (
            <li key={c.cat} className="border-b border-rule md:border-b-0 md:border-l md:first:border-l-0" data-reveal>
              <Link href={pagePath(locale, "menu", c.cat)} className="group flex h-full flex-col px-1 py-8 md:px-6 md:py-10">
                <span
                  className="block h-[5px] w-14 rounded-full transition-[width] duration-500 group-hover:w-24"
                  style={{ background: RIVER[n], boxShadow: n === 4 ? "inset 0 0 0 1px var(--color-rule)" : undefined }}
                  aria-hidden="true"
                />
                <span className="mt-6 font-caps text-[0.8rem] tracking-[0.16em] text-gold-deep" aria-hidden="true">
                  {ROMAN[n]}
                </span>
                <span className="display mt-2 block text-[2.1rem] text-ink group-hover:text-crimson">{c.title}</span>
                <span className="mt-3 block text-[0.95rem] leading-relaxed font-light text-ink-soft">{c.text}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-crimson">
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

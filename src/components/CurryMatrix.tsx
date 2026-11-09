import { menuSettings } from "@/config/business";
import { categories, dishAnchor, PROTEIN_ORDER, proteinLabel, type MenuItem, type Subcategory } from "@/data/menu";
import { pagePath, type Dict, type Locale } from "@/i18n";
import { formatPrice } from "@/lib/format";

type Props = {
  locale: Locale;
  t: Dict;
  /** "home" : liens vers la carte. "menu" : ancres #plat-… dans la page. */
  mode: "home" | "menu";
  tone: "dark" | "paper";
  /** Sauces à afficher (filtrées par la recherche sur la page menu). */
  sauces?: Subcategory[];
};

/**
 * Grille des caris : sauces en lignes, protéines en colonnes.
 * Un seul balisage (tableau) ; sur mobile chaque ligne devient un bloc avec
 * l'étiquette de protéine visible dans chaque case.
 */
export function CurryMatrix({ locale, t, mode, tone, sauces }: Props) {
  const rows = sauces ?? categories.find((c) => c.id === "caris")!.subcategories;
  const dark = tone === "dark";
  const price = (it: MenuItem) =>
    menuSettings.showPrices && it.price !== null ? formatPrice(it.price, locale) : it.name[locale];
  const href = (it: MenuItem) => (mode === "home" ? pagePath(locale, "menu", dishAnchor(it.id)) : `#${dishAnchor(it.id)}`);

  const line = dark ? "border-gold/25" : "border-rule";
  const priceCls = dark ? "text-gold-light hover:text-cream" : "text-crimson hover:text-ink";
  const muted = dark ? "text-cream/65" : "text-ink-soft";

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{t.curries.title}</caption>
      <thead className="hidden md:table-header-group">
        <tr className={`border-b ${dark ? "border-gold/60" : "border-ink/70"}`}>
          <th scope="col" className={`caps py-4 pr-6 text-[0.66rem] ${dark ? "text-gold" : "text-gold-deep"}`}>
            {t.curries.sauce}
          </th>
          {PROTEIN_ORDER.map((p) => (
            <th key={p} scope="col" className={`caps px-2 py-4 text-right text-[0.66rem] ${dark ? "text-gold" : "text-gold-deep"}`}>
              {proteinLabel(p)[locale]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => {
          const byProtein = new Map(s.items.filter((i) => i.protein && i.protein !== "paneer").map((i) => [i.protein!, i]));
          const extras = s.items.filter((i) => !i.protein || i.protein === "paneer");
          return (
            <tr
              key={s.id}
              id={mode === "menu" ? `caris-${s.id}` : undefined}
              data-sub={mode === "menu" ? s.id : undefined}
              data-parent={mode === "menu" ? "caris" : undefined}
              className={`block border-b py-6 md:table-row md:py-0 ${line} ${
                mode === "menu" ? "scroll-mt-[calc(var(--header-h)+var(--menu-offset)+12px)]" : ""
              } ${dark ? "md:hover:bg-white/[0.03]" : "md:hover:bg-gold/[0.06]"} transition-colors`}
            >
              <th scope="row" className="block pr-6 align-top font-normal md:table-cell md:w-[38%] md:py-6">
                <span className={`display block text-[1.85rem] leading-none ${dark ? "text-cream" : "text-ink"}`}>{s.name![locale]}</span>
                {s.description && <span className={`mt-2 block max-w-[42ch] text-[0.9rem] leading-relaxed font-light ${muted}`}>{s.description[locale]}</span>}
                {extras.length > 0 && (
                  <span className={`mt-2 block text-[0.88rem] ${muted}`}>
                    <span className="caps text-[0.6rem]">{t.curries.also}</span>{" "}
                    {extras.map((x, n) => (
                      <span key={x.id} id={mode === "menu" ? dishAnchor(x.id) : undefined} className="dish">
                        {n > 0 && " · "}
                        <a href={href(x)} className={`${priceCls} underline-offset-4 hover:underline`}>
                          {x.protein === "paneer" ? proteinLabel("paneer")[locale] : x.name[locale]} {price(x)}
                        </a>
                      </span>
                    ))}
                  </span>
                )}
              </th>
              {PROTEIN_ORDER.map((p) => {
                const it = byProtein.get(p);
                return (
                  <td
                    key={p}
                    id={mode === "menu" && it ? dishAnchor(it.id) : undefined}
                    className={`dish mt-2 mr-2 inline-flex align-top md:mt-0 md:mr-0 md:table-cell md:px-2 md:py-6 md:text-right ${
                      mode === "menu" ? "scroll-mt-[calc(var(--header-h)+var(--menu-offset)+60px)]" : ""
                    } ${!it ? "max-md:hidden" : ""}`}
                  >
                    {it ? (
                      <a
                        href={href(it)}
                        className={`inline-flex min-h-11 flex-col items-start justify-center border px-3 py-1.5 md:items-end md:border-0 md:p-0 ${line} ${priceCls}`}
                        aria-label={`${it.name[locale]}, ${price(it)}`}
                      >
                        <span className={`caps text-[0.56rem] md:hidden ${muted}`}>{proteinLabel(p)[locale]}</span>
                        <span className="price text-[1.02rem]">{price(it)}</span>
                        {it.name.fr.includes("ebab") && (
                          <span className={`text-[0.72rem] font-light ${muted}`}>{locale === "fr" ? "kebab" : "kebab"}</span>
                        )}
                      </a>
                    ) : (
                      <span className={`${muted} opacity-60`}>
                        <span aria-hidden="true">—</span>
                        <span className="sr-only">{t.curries.notOffered}</span>
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

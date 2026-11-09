"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { menuSettings } from "@/config/business";
import { categories, dishAnchor, type Category, type MenuItem } from "@/data/menu";
import { fill, type Dict, type Locale } from "@/i18n";
import { formatPrice, normalize } from "@/lib/format";
import { CloseIcon, SearchIcon } from "../Icons";

type Props = {
  locale: Locale;
  t: Dict;
  /** Images de catégorie rendues côté serveur. */
  categoryImages: Record<string, React.ReactNode>;
  /** Grille des caris rendue côté serveur (affichée hors recherche). */
  curryMatrix: React.ReactNode;
  callButton: React.ReactNode;
};

/** Texte de recherche d'un plat. Espace initial : chaque terme doit commencer un mot. */
function searchText(item: MenuItem, extra: string[]) {
  return (
    " " +
    normalize(
      [item.name.fr, item.name.en, item.desc?.fr ?? "", item.desc?.en ?? "", ...(item.aliases ?? []), ...extra].join(" "),
    )
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export function MenuBrowser({ locale, t, categoryImages, curryMatrix, callButton }: Props) {
  const tm = t.menuPage;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(categories[0].id);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const chipBar = useRef<HTMLDivElement>(null);
  const subBar = useRef<HTMLDivElement>(null);

  const index = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categories)
      for (const s of c.subcategories)
        for (const it of s.items)
          map.set(it.id, searchText(it, [c.name.fr, c.name.en, s.name?.fr ?? "", s.name?.en ?? "", s.description?.fr ?? "", s.description?.en ?? ""]));
    return map;
  }, []);

  const q = normalize(query);
  const filtered = useMemo(() => {
    const terms = q ? q.split(" ") : [];
    const keep = (it: MenuItem) => !terms.length || terms.every((term) => index.get(it.id)!.includes(" " + term));
    return categories
      .map((c) => ({
        ...c,
        subcategories: c.subcategories.map((s) => ({ ...s, items: s.items.filter(keep) })).filter((s) => s.items.length > 0),
      }))
      .filter((c) => c.subcategories.length > 0);
  }, [q, index]);
  const count = filtered.reduce((n, c) => n + c.subcategories.reduce((m, s) => m + s.items.length, 0), 0);

  // Lien profond (#plat-…, #caris) : l'hydratation remet la page en haut, on y retourne.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    go();
    const timer = window.setTimeout(go, 60);
    let alive = true;
    document.fonts?.ready.then(() => alive && window.scrollY > 0 && go());
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, []);

  // Section et sous-section actives selon le défilement.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cat]"));
    const subs = Array.from(document.querySelectorAll<HTMLElement>("[data-sub]"));
    const update = () => {
      const bar = document.querySelector<HTMLElement>("[data-menubar]");
      const header = document.querySelector<HTMLElement>("header");
      const barVisible = bar && getComputedStyle(bar).display !== "none";
      const offset = ((barVisible ? bar.getBoundingClientRect().bottom : header?.getBoundingClientRect().bottom) ?? 80) + 32;
      let current = sections[0]?.dataset.cat;
      for (const s of sections) if (s.getBoundingClientRect().top <= offset) current = s.dataset.cat;
      let currentSub: string | null = null;
      for (const s of subs) if (s.dataset.parent === current && s.getBoundingClientRect().top <= offset + 8) currentSub = s.dataset.sub ?? null;
      if (current) setActive(current);
      setActiveSub(currentSub);
    };
    update();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [filtered]);

  // Garder la puce active visible dans les barres mobiles (défilement horizontal seulement).
  useEffect(() => {
    for (const bar of [chipBar.current, subBar.current]) {
      const chip = bar?.querySelector<HTMLElement>('[aria-current="true"]');
      if (!bar || !chip) continue;
      bar.scrollTo({ left: Math.max(0, chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2) });
    }
  }, [active, activeSub]);

  const activeCategory = filtered.find((c) => c.id === active) ?? filtered[0];
  const namedSubs = activeCategory?.subcategories.filter((s) => s.name) ?? [];

  const focusSearch = () => {
    input.current?.scrollIntoView({ block: "center" });
    input.current?.focus({ preventScroll: true });
  };
  const reset = () => {
    setQuery("");
    input.current?.focus();
  };

  return (
    <>
      {/* Recherche (dans le bandeau sombre de la page) */}
      <div className="dark">
        <div className="shell pb-12 md:pb-16">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-2xl">
            <label htmlFor="menu-search" className="caps block text-center text-[0.64rem] text-gold">
              {tm.searchLabel}
            </label>
            <div className="relative mt-3">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-gold" />
              <input
                ref={input}
                id="menu-search"
                type="search"
                inputMode="search"
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                placeholder={tm.searchPlaceholder}
                className="h-15 w-full border border-gold/50 bg-white/[0.04] pr-14 pl-14 text-[1.08rem] font-light text-cream placeholder:text-cream/45 focus:border-gold-light focus:bg-white/[0.07] focus:outline-2 focus:outline-offset-2 focus:outline-gold-light [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={tm.clear}
                  className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center text-cream hover:text-gold-light"
                >
                  <CloseIcon className="size-5" />
                </button>
              )}
            </div>
            <p className="mt-3 min-h-6 text-center text-[0.9rem] font-light text-cream/70" role="status" aria-live="polite">
              {q && count > 0 ? (count === 1 ? tm.resultsOne : fill(tm.resultsMany, { n: count })) : ""}
            </p>
          </form>
        </div>
      </div>

      {/* Barre collante mobile / tablette : sections + sous-sections */}
      <div data-menubar className="dark sticky top-[var(--header-h)] z-30 border-y border-gold/30 lg:hidden">
        <div className="shell flex items-center gap-2">
          <button
            type="button"
            onClick={focusSearch}
            aria-label={tm.searchLabel}
            className="-ml-2 inline-flex size-11 flex-none items-center justify-center text-gold"
          >
            <SearchIcon className="size-5" />
          </button>
          <span className="h-6 w-px flex-none bg-gold/30" aria-hidden="true" />
          <nav aria-label={tm.categoriesNav} className="min-w-0 flex-1">
            <div ref={chipBar} className="no-scrollbar flex gap-1 overflow-x-auto py-1.5 [mask-image:linear-gradient(90deg,#000_90%,transparent)]">
              {filtered.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  aria-current={c.id === activeCategory?.id ? "true" : undefined}
                  className="inline-flex min-h-11 flex-none items-center px-3 font-caps text-[0.66rem] font-medium tracking-[0.16em] whitespace-nowrap text-cream/70 uppercase aria-[current=true]:bg-gold aria-[current=true]:text-wine"
                >
                  {(c.short ?? c.name)[locale]}
                </a>
              ))}
            </div>
          </nav>
        </div>
        {namedSubs.length > 1 && activeCategory && (
          <div className="border-t border-gold/20">
            <nav aria-label={fill(tm.subNav, { cat: activeCategory.name[locale] })} className="shell">
              <div ref={subBar} className="no-scrollbar -ml-1 flex gap-1 overflow-x-auto py-0.5">
                {namedSubs.map((s) => (
                  <a
                    key={s.id}
                    href={`#${activeCategory.id}-${s.id}`}
                    aria-current={s.id === activeSub ? "true" : undefined}
                    className="inline-flex min-h-11 flex-none items-center px-2.5 text-[0.86rem] font-light whitespace-nowrap text-cream/70 underline-offset-[0.5em] aria-[current=true]:text-gold-light aria-[current=true]:underline"
                  >
                    {s.name![locale]}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Carte */}
      <div className="paper [--menu-offset:104px] lg:[--menu-offset:0px]">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Index vertical (desktop) */}
          <nav aria-label={tm.categoriesNav} className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--header-h)+40px)] max-h-[calc(100svh-var(--header-h)-60px)] overflow-y-auto py-16 pr-4">
              <button type="button" onClick={focusSearch} className="link-gold mb-6 !min-h-11">
                <SearchIcon className="size-4" />
                {tm.searchLabel}
              </button>
              <ol className="border-l border-rule">
                {filtered.map((c) => {
                  const on = c.id === activeCategory?.id;
                  const subs = c.subcategories.filter((s) => s.name);
                  return (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        aria-current={on ? "true" : undefined}
                        className={`-ml-px flex min-h-11 items-center gap-3 border-l-2 pl-4 font-caps text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
                          on ? "border-crimson text-crimson" : "border-transparent text-ink-soft hover:text-ink"
                        }`}
                      >
                        <span className="w-5 text-gold-deep">{pad(categories.findIndex((x) => x.id === c.id) + 1)}</span>
                        {(c.short ?? c.name)[locale]}
                      </a>
                      {on && subs.length > 1 && (
                        <ul className="mb-2 ml-12">
                          {subs.map((s) => (
                            <li key={s.id}>
                              <a
                                href={`#${c.id}-${s.id}`}
                                aria-current={s.id === activeSub ? "true" : undefined}
                                className="flex min-h-9 items-center text-[0.9rem] font-light text-ink-soft hover:text-crimson aria-[current=true]:font-normal aria-[current=true]:text-crimson"
                              >
                                {s.name![locale]}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-9">
            {count === 0 ? (
              <div className="py-24 text-center">
                <p className="display h-md mx-auto max-w-[22ch] text-ink">{fill(tm.emptyTitle, { q: query.trim() })}</p>
                <p className="lead mx-auto mt-4">{tm.emptyHint}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button type="button" className="btn btn-crimson" onClick={reset}>
                    {tm.clear}
                  </button>
                  {callButton}
                </div>
              </div>
            ) : (
              filtered.map((c) => (
                <CategoryBlock
                  key={c.id}
                  category={c}
                  number={categories.findIndex((x) => x.id === c.id) + 1}
                  locale={locale}
                  t={t}
                  image={q ? null : categoryImages[c.id]}
                  curryMatrix={c.id === "caris" && !q ? curryMatrix : null}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryBlock({
  category: c,
  number,
  locale,
  t,
  image,
  curryMatrix,
}: {
  category: Category;
  number: number;
  locale: Locale;
  t: Dict;
  image: React.ReactNode;
  curryMatrix: React.ReactNode;
}) {
  const margin = "scroll-mt-[calc(var(--header-h)+var(--menu-offset)+12px)]";
  return (
    <section id={c.id} data-cat={c.id} aria-labelledby={`${c.id}-title`} className={`border-b border-rule py-14 last:border-0 md:py-20 ${margin}`}>
      <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <span className="font-caps text-[0.8rem] tracking-[0.16em] text-gold-deep">{pad(number)}</span>
          <h2 id={`${c.id}-title`} className="display h-md mt-2 text-ink">
            {c.name[locale]}
          </h2>
          {c.description && <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed font-light text-ink-soft">{c.description[locale]}</p>}
        </div>
        {image && (
          <div className="media aspect-[5/2] outline outline-1 outline-offset-[6px] outline-gold/60 md:aspect-[4/5] md:w-[170px]">{image}</div>
        )}
      </header>

      {curryMatrix ? (
        <div className="mt-10">{curryMatrix}</div>
      ) : (
        c.subcategories.map((s) => (
          <div
            key={s.id}
            id={s.name ? `${c.id}-${s.id}` : undefined}
            data-sub={s.name ? s.id : undefined}
            data-parent={c.id}
            className={`mt-10 ${margin}`}
          >
            {s.name && (
              <div className="mb-2 flex items-center gap-5">
                <h3 className="display text-[1.7rem] leading-tight text-ink">{s.name[locale]}</h3>
                <span className="h-px flex-1 bg-gold/60" aria-hidden="true" />
              </div>
            )}
            {s.description && <p className="mb-3 text-[0.95rem] font-light text-ink-soft">{s.description[locale]}</p>}
            <ul className="grid xl:grid-cols-2 xl:gap-x-12">
              {s.items.map((it) => (
                <Dish key={it.id} item={it} locale={locale} t={t} />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}

function Dish({ item: it, locale, t }: { item: MenuItem; locale: Locale; t: Dict }) {
  const tm = t.menuPage;
  const show = menuSettings.showPrices;
  return (
    <li id={dishAnchor(it.id)} className="dish scroll-mt-[calc(var(--header-h)+var(--menu-offset)+20px)] border-b border-rule/70 py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="display min-w-0 text-[1.32rem] leading-snug text-ink">
          <a href={`#${dishAnchor(it.id)}`} className="hover:text-crimson" aria-label={`${it.name[locale]} — ${t.a11y.dishLink}`}>
            {it.addOn && <span className="mr-2 font-caps text-[0.6rem] tracking-[0.18em] text-gold-deep uppercase">{tm.addOn}</span>}
            {it.name[locale]}
          </a>
        </h4>
        {show && (it.price !== null || it.options) && <span className="leader" aria-hidden="true" />}
        {show && it.options ? (
          <span className="ml-auto flex flex-none flex-col items-end gap-0.5 sm:flex-row sm:gap-4">
            {it.options.map((o) => (
              <span key={o.label.fr} className="price text-crimson">
                <span className="mr-1.5 text-[0.8rem] font-light text-ink-soft">{o.label[locale]}</span>
                {formatPrice(o.price, locale)}
              </span>
            ))}
          </span>
        ) : (
          show &&
          it.price !== null && (
            <span className="price ml-auto flex-none text-crimson">
              {it.addOn ? "+ " : ""}
              {formatPrice(it.price, locale)}
            </span>
          )
        )}
      </div>
      {it.desc && <p className="mt-1 max-w-[56ch] text-[0.92rem] leading-relaxed font-light text-ink-soft">{it.desc[locale]}</p>}
      {it.choice && (
        <p className="mt-1 text-[0.9rem] font-light text-ink-soft">
          <span className="font-normal text-ink">{tm.choice}</span>
          {t.a11y.colon}
          {it.choice[locale]}
        </p>
      )}
    </li>
  );
}

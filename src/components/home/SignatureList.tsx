"use client";

import { useState } from "react";

type Dish = {
  id: string;
  roman: string;
  name: string;
  category: string;
  price: string | null;
  href: string;
  thumb: React.ReactNode;
  large: React.ReactNode;
};

/** Liste des signatures + grande photo qui suit le plat survolé ou focalisé (desktop). */
export function SignatureList({ dishes, seeLabel }: { dishes: Dish[]; seeLabel: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
      <ol className="border-t border-ink/70 lg:col-span-7">
        {dishes.map((d, n) => (
          <li key={d.id} className="border-b border-rule">
            <a
              href={d.href}
              onMouseEnter={() => setActive(n)}
              onFocus={() => setActive(n)}
              className="group flex items-center gap-4 py-5 sm:gap-6 lg:py-6"
            >
              <span className="media size-16 flex-none sm:size-20 lg:hidden">{d.thumb}</span>
              <span className="hidden w-10 flex-none font-caps text-[0.8rem] tracking-[0.12em] text-gold-deep lg:block" aria-hidden="true">
                {d.roman}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`display block text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-[1.02] transition-colors group-hover:text-crimson ${
                    active === n ? "lg:text-crimson" : "text-ink"
                  }`}
                >
                  {d.name}
                </span>
                <span className="mt-1.5 block font-caps text-[0.62rem] tracking-[0.22em] text-ink-soft uppercase">
                  {d.category}
                  <span className="sr-only"> — {seeLabel}</span>
                </span>
              </span>
              {d.price && <span className="price flex-none text-[1.05rem] text-crimson">{d.price}</span>}
            </a>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
        <div className="sticky top-[calc(var(--header-h)+32px)]">
          <div className="relative aspect-[4/5] outline outline-1 outline-offset-[10px] outline-gold/70">
            {dishes.map((d, n) => (
              <div
                key={d.id}
                className={`media absolute inset-0 transition-opacity duration-700 ${active === n ? "opacity-100" : "opacity-0"}`}
              >
                {d.large}
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-between font-caps text-[0.66rem] tracking-[0.22em] text-gold-deep uppercase">
            <span>{dishes[active].roman}</span>
            <span>{dishes[active].name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

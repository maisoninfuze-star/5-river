"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BurgerIcon, CloseIcon } from "./Icons";

type Props = {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  navLabel: string;
};

/** Menu de navigation mobile (bouton + panneau). Échap ou un lien le referme. */
export function MobileNav({ links, openLabel, closeLabel, navLabel }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="-ml-2 inline-flex size-11 items-center justify-center text-cream"
      >
        {open ? <CloseIcon className="size-6" /> : <BurgerIcon className="size-6" />}
      </button>
      <nav
        id={id}
        aria-label={navLabel}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-gold/30 bg-wine shadow-[0_24px_40px_-24px_rgba(0,0,0,.8)]"
      >
        <ul className="shell flex flex-col py-4">
          {links.map((l) => (
            <li key={l.href} className="border-b border-gold/15 last:border-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="display flex min-h-14 items-center text-[1.8rem] text-cream hover:text-gold-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

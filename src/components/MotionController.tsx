"use client";

import { useEffect } from "react";

/**
 * Active les révélations au défilement ([data-reveal]) seulement si JS fonctionne
 * et que l'utilisateur n'a pas demandé de réduire les animations.
 * Les éléments déjà visibles au chargement ne sont jamais masqués.
 */
export function MotionController() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    });
    root.classList.add("motion-ok");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

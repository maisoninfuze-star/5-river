"use client";

import { useEffect } from "react";
import { SPLASH_KEY } from "@/lib/splash";

/** Fin de l'ouverture : marque « done », mémorise pour la session, clic pour passer, retrait de secours. */
export function SplashController() {
  useEffect(() => {
    let splash = document.getElementById("splash");
    if (!splash) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (root.classList.contains("intro-skip") || reduce) {
      splash.remove();
      return;
    }
    const finish = () => {
      if (!splash) return;
      const node = splash;
      splash = null;
      node.classList.add("done");
      root.classList.add("intro-done");
      window.setTimeout(() => node.remove(), 900);
    };
    if (window.location.hash === "#introhold") {
      splash.classList.add("hold");
      return;
    }
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {}
    const timers = [window.setTimeout(finish, 3100), window.setTimeout(finish, 5500)];
    const skip = () => {
      if (splash) splash.style.display = "none";
      finish();
    };
    splash.addEventListener("click", skip);
    return () => timers.forEach(window.clearTimeout);
  }, []);
  return null;
}

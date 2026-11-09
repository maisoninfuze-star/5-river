"use client";

import { useState } from "react";
import { mapEmbedUrl } from "@/config/business";
import { PinIcon } from "./Icons";
import { FiligreeCorners } from "./Rivers";

/**
 * Carte Google chargée à la demande seulement (aucun script ni témoin tiers
 * avant le clic). Avant le chargement : un panneau cramoisi encadré d'or.
 */
export function MapCard({ showLabel, title, note, address }: { showLabel: string; title: string; note: string; address: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/5] w-full bg-crimson outline outline-1 outline-offset-[10px] outline-gold/60 sm:aspect-[5/6]">
      {loaded ? (
        <iframe
          src={mapEmbedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="dark glow absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <FiligreeCorners size="size-12" className="text-gold/80" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="#E6C27C" strokeWidth="1">
              <path d="M210 0 L190 480" strokeWidth="5" />
              <path d="M0 120 L400 150 M0 260 L400 290 M0 390 L400 410" />
              <path d="M80 0 L60 480 M320 0 L330 480" />
            </g>
          </svg>
          <span className="relative flex size-14 items-center justify-center rounded-full border border-gold/70">
            <PinIcon className="size-6 text-gold-light" />
          </span>
          <p className="display relative max-w-[16ch] text-[1.8rem] leading-tight text-cream">{address}</p>
          <button type="button" onClick={() => setLoaded(true)} className="btn relative">
            {showLabel}
          </button>
          <p className="relative max-w-[28ch] text-[0.78rem] leading-relaxed font-light text-cream/70">{note}</p>
        </div>
      )}
    </div>
  );
}

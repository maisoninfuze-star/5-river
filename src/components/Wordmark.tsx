import { Rivers } from "./Rivers";
import { TajSkyline } from "./Emblem";

/**
 * Logo horizontal compact (en-tête) : Taj Mahal, « 5 RIVERS », « RESTAURANT », d'après le logo.
 * L'emblème rond complet est dans Emblem.tsx.
 * Pour utiliser le logo officiel : remplacer le contenu par
 * <img src="/brand/5-rivers-logo.svg" alt="5 Rivers Restaurant" width=… height=… />.
 * (La photo de la couverture n'est pas assez nette pour servir de logo.)
 */
export function Wordmark({ size = "md", rivers = false }: { size?: "sm" | "md" | "lg"; rivers?: boolean }) {
  const s = {
    sm: { five: "text-[1.6rem]", word: "text-[0.98rem]", sub: "text-[0.4rem] tracking-[0.42em]" },
    md: { five: "text-[2.1rem]", word: "text-[1.25rem]", sub: "text-[0.46rem] tracking-[0.44em]" },
    lg: { five: "text-[5rem]", word: "text-[2.5rem]", sub: "text-[0.78rem] tracking-[0.5em]" },
  }[size];
  return (
    <span className="inline-flex flex-col items-center leading-none" aria-hidden="true">
      <TajSkyline fill="var(--color-gold)" cut="var(--color-wine)" className={`${size === "lg" ? "w-[150px]" : size === "md" ? "w-[96px]" : "w-[78px]"} mb-[0.2em] h-auto`} />
      <span className="flex items-end">
        <span className={`font-serif ${s.five} -mb-[0.08em] leading-[0.8] font-semibold text-gold`}>5</span>
        <span className={`font-caps ${s.word} ml-[0.06em] font-medium tracking-[0.08em] text-cream`}>RIVERS</span>
      </span>
      <span className={`font-caps ${s.sub} mt-[0.35em] mr-[-0.44em] font-medium text-gold`}>Restaurant</span>
      {rivers && <Rivers width={size === "lg" ? 150 : 90} className="mt-2" />}
    </span>
  );
}

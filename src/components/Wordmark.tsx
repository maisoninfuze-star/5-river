import { Rivers } from "./Rivers";

/**
 * Mot-symbole « 5 RIVERS / RESTAURANT », redessiné d'après la couverture du menu.
 * Pour utiliser le logo officiel : remplacer le contenu par
 * <img src="/brand/5-rivers-logo.svg" alt="5 Rivers Restaurant" width=… height=… />.
 * (La photo de la couverture n'est pas assez nette pour servir de logo.)
 */
export function Wordmark({ size = "md", rivers = false }: { size?: "sm" | "md" | "lg"; rivers?: boolean }) {
  const s = {
    sm: { five: "text-[2.1rem]", word: "text-[1.05rem]", sub: "text-[0.42rem] tracking-[0.42em]" },
    md: { five: "text-[2.7rem]", word: "text-[1.35rem]", sub: "text-[0.5rem] tracking-[0.44em]" },
    lg: { five: "text-[5rem]", word: "text-[2.5rem]", sub: "text-[0.78rem] tracking-[0.5em]" },
  }[size];
  return (
    <span className="inline-flex flex-col items-center leading-none" aria-hidden="true">
      <span className="flex items-end">
        <span className={`font-serif ${s.five} -mb-[0.08em] leading-[0.8] font-medium text-gold italic`}>5</span>
        <span className={`font-caps ${s.word} ml-[0.06em] font-medium tracking-[0.08em] text-cream`}>RIVERS</span>
      </span>
      <span className={`font-caps ${s.sub} mt-[0.35em] mr-[-0.44em] font-medium text-gold`}>Restaurant</span>
      {rivers && <Rivers width={size === "lg" ? 150 : 90} className="mt-2" />}
    </span>
  );
}

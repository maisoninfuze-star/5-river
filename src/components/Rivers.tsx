/**
 * Les cinq traits de couleur du logo 5 Rivers (bleu, vert, crème, orange, rouge),
 * redessinés en vecteur. Purement décoratif.
 */
const COLORS = [
  "var(--color-river-blue)",
  "var(--color-river-green)",
  "var(--color-river-white)",
  "var(--color-river-orange)",
  "var(--color-river-red)",
];

export function Rivers({ className = "", animate = false, width = 220 }: { className?: string; animate?: boolean; width?: number }) {
  return (
    <svg
      viewBox="0 0 200 64"
      width={width}
      height={(width * 64) / 200}
      aria-hidden="true"
      focusable="false"
      className={`${animate ? "river-draw" : ""} ${className}`}
      fill="none"
      strokeLinecap="round"
    >
      {COLORS.map((c, n) => {
        const x = 6 + n * 30;
        return (
          <path
            key={c}
            pathLength={1}
            d={`M${x} 58 C ${x + 34} 58, ${x + 22} 8, ${x + 66} 7`}
            stroke={c}
            strokeWidth={n === 2 ? 5.5 : 6.5}
            opacity={0.95}
          />
        );
      })}
    </svg>
  );
}

/** Coin en filigrane doré (simplifié), à placer dans les quatre coins d'un cadre. */
export function Filigree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M2 30 V6 a4 4 0 0 1 4 -4 H30" />
      <path d="M8 40 V14 a6 6 0 0 1 6 -6 H40" opacity=".6" />
      <path d="M14 14 c6 0 10 4 10 10 c0 4 -3 6 -6 6 c-3 0 -4 -2 -4 -4 c0 -2 2 -3 3 -2" />
      <path d="M24 10 c4 -2 9 -1 11 3 M10 24 c-2 4 -1 9 3 11" opacity=".75" />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Quatre coins en filigrane autour d'un bloc positionné (relative). */
export function FiligreeCorners({ className = "text-gold", size = "size-10 md:size-14" }: { className?: string; size?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <Filigree className={`absolute top-0 left-0 ${size}`} />
      <Filigree className={`absolute top-0 right-0 ${size} -scale-x-100`} />
      <Filigree className={`absolute bottom-0 left-0 ${size} -scale-y-100`} />
      <Filigree className={`absolute right-0 bottom-0 ${size} -scale-100`} />
    </span>
  );
}

/**
 * Emblème 5 Rivers redessiné en vecteur d'après le logo du restaurant :
 * anneau doré, « FLAVOURS OF INDIA », silhouette du Taj Mahal, « 5 RIVERS »,
 * « RESTAURANT », les cinq rivières colorées et « CUISINE INDIAN ».
 *
 * Le logo fourni (243 × 244 px) est trop petit pour le web ; cette version est nette
 * à toutes les tailles. À remplacer par le fichier officiel du restaurant si disponible.
 * Les classes em-* servent à l'animation d'ouverture (voir globals.css, .splash).
 */

const GOLD = ["#f7de93", "#d9a94d", "#a8742a"];
const RIVER = ["#2f6db5", "#2e8b57", "#f3ede3", "#e28a2b", "#c62e3a"];

/** Formes du Taj Mahal (repère 400 × 142, ligne de sol à y = 140), sans <svg> englobant. */
function TajShapes({ fill, cut }: { fill: string; cut: string }) {
  const minaret = (x: number) => (
    <g key={x}>
      <rect x={x - 3.5} y={52} width={7} height={88} />
      <rect x={x - 5.5} y={76} width={11} height={3} />
      <rect x={x - 5.5} y={102} width={11} height={3} />
      <rect x={x - 5.5} y={50} width={11} height={3} />
      <path d={`M${x - 6} 50 C ${x - 6} 43, ${x} 41, ${x} 36 C ${x} 41, ${x + 6} 43, ${x + 6} 50 Z`} />
      <rect x={x - 0.6} y={30} width={1.2} height={7} />
    </g>
  );
  const chhatri = (x: number, y: number, w: number) => (
    <g key={`c${x}`}>
      <rect x={x - w / 2} y={y} width={w} height={8} />
      <path d={`M${x - w / 2 - 2} ${y + 1} C ${x - w / 2 - 2} ${y - 8}, ${x} ${y - 10}, ${x} ${y - 15} C ${x} ${y - 10}, ${x + w / 2 + 2} ${y - 8}, ${x + w / 2 + 2} ${y + 1} Z`} />
      <rect x={x - 0.6} y={y - 21} width={1.2} height={7} />
    </g>
  );
  const sideHall = (x0: number) => (
    <g key={`h${x0}`}>
      <rect x={x0} y={112} width={56} height={28} />
      <path d={`M${x0 + 16} 113 C ${x0 + 16} 102, ${x0 + 28} 99, ${x0 + 28} 92 C ${x0 + 28} 99, ${x0 + 40} 102, ${x0 + 40} 113 Z`} />
      <rect x={x0 + 27.4} y={86} width={1.2} height={7} />
      {chhatri(x0 + 7, 105, 8)}
      {chhatri(x0 + 49, 105, 8)}
    </g>
  );
  return (
    <>
      <g fill={fill}>
        {/* Pavillons lointains */}
        <path d="M2 140 V124 H24 V140 Z M6 125 C6 118, 13 116, 13 111 C13 116, 20 118, 20 125 Z" />
        <path d="M376 140 V124 H398 V140 Z M380 125 C380 118, 387 116, 387 111 C387 116, 394 118, 394 125 Z" />
        {sideHall(36)}
        {sideHall(308)}
        {minaret(112)}
        {minaret(288)}
        {/* Socle, façade, tambour, dôme principal, pinacle */}
        <rect x={104} y={128} width={192} height={12} />
        <rect x={138} y={92} width={124} height={37} />
        <rect x={170} y={80} width={60} height={13} />
        <path d="M168 82 C 156 70, 157 50, 180 38 C 191 32, 197 27, 200 16 C 203 27, 209 32, 220 38 C 243 50, 244 70, 232 82 Z" />
        <rect x={199.2} y={2} width={1.6} height={15} />
        <circle cx={200} cy={9} r={2.2} />
        {chhatri(150, 84, 14)}
        {chhatri(250, 84, 14)}
        <rect x={0} y={138.6} width={400} height={2.4} />
      </g>
      {/* Arcs de la façade (découpes) */}
      <g fill={cut}>
        <path d="M187 128 V108 C 187 100, 200 95, 200 90 C 200 95, 213 100, 213 108 V128 Z" />
        <path d="M148 127 V114 C 148 109, 155 107, 155 104 C 155 107, 162 109, 162 114 V127 Z" />
        <path d="M238 127 V114 C 238 109, 245 107, 245 104 C 245 107, 252 109, 252 114 V127 Z" />
        <path d="M167 110 V102 C 167 99, 171 98, 171 96 C 171 98, 175 99, 175 102 V110 Z" />
        <path d="M225 110 V102 C 225 99, 229 98, 229 96 C 229 98, 233 99, 233 102 V110 Z" />
        <path d="M58 140 V128 C 58 124, 64 122, 64 119 C 64 122, 70 124, 70 128 V140 Z" />
        <path d="M330 140 V128 C 330 124, 336 122, 336 119 C 336 122, 342 124, 342 128 V140 Z" />
      </g>
    </>
  );
}

/** Silhouette du Taj Mahal seule (en-tête, ornements). */
export function TajSkyline({ fill, cut, className }: { fill: string; cut: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 142" className={className} aria-hidden="true" focusable="false">
      <TajShapes fill={fill} cut={cut} />
    </svg>
  );
}

type Props = {
  /** Préfixe unique pour les identifiants SVG (plusieurs emblèmes par page). */
  id: string;
  className?: string;
  /** Disque cramoisi derrière l'emblème (logo autonome). */
  disk?: boolean;
  /** Texte alternatif ; "" = décoratif (aria-hidden). */
  label?: string;
};

export function Emblem({ id, className, disk = true, label = "5 Rivers Restaurant — Flavours of India — Cuisine Indian" }: Props) {
  const g = `${id}-gold`;
  const w = `${id}-white`;
  const d = `${id}-disk`;
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false })}
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD[0]} />
          <stop offset="0.55" stopColor={GOLD[1]} />
          <stop offset="1" stopColor={GOLD[2]} />
        </linearGradient>
        <linearGradient id={w} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#efe7da" />
          <stop offset="1" stopColor="#c9bfb2" />
        </linearGradient>
        <radialGradient id={d} cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#c0202f" />
          <stop offset="0.65" stopColor="#951628" />
          <stop offset="1" stopColor="#6c0e1d" />
        </radialGradient>
        <path id={`${id}-arc-top`} d="M 86 300 A 214 214 0 0 1 514 300" />
        <path id={`${id}-arc-bottom`} d="M 58 300 A 242 242 0 0 0 542 300" />
      </defs>

      {disk && <circle cx="300" cy="300" r="290" fill={`url(#${d})`} />}

      {/* Anneaux */}
      <g fill="none" stroke={`url(#${g})`}>
        <circle className="em-ring" pathLength={1} cx="300" cy="300" r="282" strokeWidth="4" />
        <circle className="em-ring em-ring-2" pathLength={1} cx="300" cy="300" r="270" strokeWidth="1.4" />
      </g>

      {/* FLAVOURS OF INDIA */}
      <text className="em-arc-top" fill={`url(#${g})`} fontFamily="var(--font-cinzel), serif" fontSize="23" fontWeight="600" letterSpacing="7">
        <textPath href={`#${id}-arc-top`} startOffset="50%" textAnchor="middle">
          • FLAVOURS OF INDIA •
        </textPath>
      </text>
      <g className="em-ornament" fill={`url(#${g})`}>
        <path d="M300 112 c -6 -8 -16 -8 -22 -2 c 8 0 14 3 22 10 c 8 -7 14 -10 22 -10 c -6 -6 -16 -6 -22 2 Z" />
      </g>

      {/* Taj Mahal */}
      <g className="em-taj">
        <svg x="112" y="116" width="376" height="134" viewBox="0 0 400 142">
          <TajShapes fill={`url(#${g})`} cut={disk ? "#8a1324" : "#1b080c"} />
        </svg>
      </g>
      <g className="em-rule" stroke={`url(#${g})`} strokeWidth="2">
        <line x1="130" y1="262" x2="470" y2="262" />
      </g>

      {/* 5 RIVERS */}
      <text className="em-five" x="66" y="384" fill={`url(#${g})`} fontFamily="var(--font-cormorant), serif" fontSize="200" fontWeight="600">
        5
      </text>
      <text
        className="em-word"
        x="176"
        y="352"
        fill={`url(#${w})`}
        fontFamily="var(--font-cinzel), serif"
        fontSize="86"
        fontWeight="600"
        letterSpacing="3"
        textLength="352"
        lengthAdjust="spacingAndGlyphs"
      >
        RIVERS
      </text>
      <g className="em-ornament em-ornament-2" fill={`url(#${g})`}>
        <path d="M352 368 l 6 -6 l 6 6 l -6 6 Z" />
        <rect x="290" y="367.2" width="56" height="1.6" />
        <rect x="370" y="367.2" width="56" height="1.6" />
      </g>

      {/* RESTAURANT */}
      <g className="em-restaurant">
        <text
          x="358"
          y="402"
          textAnchor="middle"
          fill={`url(#${g})`}
          fontFamily="var(--font-cinzel), serif"
          fontSize="27"
          fontWeight="600"
          letterSpacing="9"
        >
          RESTAURANT
        </text>
        <rect x="150" y="392" width="34" height="1.6" fill={`url(#${g})`} />
        <rect x="528" y="392" width="34" height="1.6" fill={`url(#${g})`} />
      </g>

      {/* Les cinq rivières */}
      <g className="em-rivers" fill="none" strokeLinecap="round">
        {RIVER.map((c, n) => {
          const x = 178 + n * 50;
          return (
            <path
              key={c}
              pathLength={1}
              d={`M${x} 470 C ${x + 26} 472, ${x + 14} 432, ${x + 52} 426 C ${x + 64} 424, ${x + 70} 428, ${x + 78} 424`}
              stroke={c}
              strokeWidth={n === 2 ? 14 : 15}
            />
          );
        })}
      </g>

      {/* CUISINE INDIAN */}
      <text className="em-arc-bottom" fill={`url(#${g})`} fontFamily="var(--font-cinzel), serif" fontSize="21" fontWeight="600" letterSpacing="7">
        <textPath href={`#${id}-arc-bottom`} startOffset="50%" textAnchor="middle">
          CUISINE INDIAN
        </textPath>
      </text>
      <g className="em-ornament" fill={`url(#${g})`}>
        <path d="M300 566 c -5 -7 -14 -7 -19 -2 c 7 0 12 3 19 9 c 7 -6 12 -9 19 -9 c -5 -5 -14 -5 -19 2 Z" />
      </g>
    </svg>
  );
}

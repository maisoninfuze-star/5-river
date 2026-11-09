import { Emblem } from "./Emblem";
import { FiligreeCorners } from "./Rivers";

/**
 * Ouverture animée (repris du projet BMS) : l'emblème se dessine, puis le rideau se lève.
 * - Livré dans le HTML pour posséder le tout premier affichage ; animation 100 % CSS.
 * - Une fois par session ; jamais avec prefers-reduced-motion (script pré-affichage, layout).
 * - #intro dans l'URL la rejoue ; #introhold la fige pour la revue de design.
 * - SplashController gère la fin, le clic pour passer et le retrait de secours.
 */
export function Splash() {
  return (
    <div className="splash" id="splash" aria-hidden="true">
      <FiligreeCorners className="splash-corners text-gold/70" size="size-14 md:size-20" />
      <div className="splash-badge">
        <Emblem id="splash-em" label="" />
      </div>
    </div>
  );
}

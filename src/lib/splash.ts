/** Clé de session de l'ouverture animée (une fois par session). */
export const SPLASH_KEY = "fiveRiversIntro";

/** Script pré-affichage : ajoute .intro-skip avant le premier rendu si l'ouverture ne doit pas jouer. */
export const splashPrepaint = `try{var h=location.hash;var r=h==="#intro"||h==="#introhold";if(!r&&(sessionStorage.getItem("${SPLASH_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)){document.documentElement.classList.add("intro-skip")}}catch(e){}`;

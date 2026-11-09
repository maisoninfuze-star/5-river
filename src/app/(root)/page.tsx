import Link from "next/link";
import { LANG_STORAGE_KEY } from "@/i18n";

/**
 * Racine « / » : redirige vers la langue mémorisée, sinon vers le français.
 * Sans JS, le méta-refresh mène au français après une seconde.
 */
const script = `try{var l=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)});location.replace(l==="en"?"/en/":"/fr/")}catch(e){location.replace("/fr/")}`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <meta httpEquiv="refresh" content="1;url=/fr/" />
      <div className="flex min-h-svh items-center justify-center gap-6 p-6 text-sm font-semibold">
        <Link href="/fr/" lang="fr" className="link-arrow">
          Français
        </Link>
        <Link href="/en/" lang="en" className="link-arrow">
          English
        </Link>
      </div>
    </>
  );
}

import { images, IMAGE_WIDTHS, type ImageKey } from "@/data/images";
import type { Locale } from "@/i18n";

type Props = {
  name: ImageKey;
  locale: Locale;
  /** Attribut sizes du srcset (ex. "(min-width: 1024px) 40vw, 90vw"). */
  sizes: string;
  /** Image de la première vue : chargement prioritaire, pas de lazy-load. */
  priority?: boolean;
  className?: string;
  /** Remplace le texte alternatif (ex. "" si l'image est décorative). */
  alt?: string;
};

const srcset = (name: string, ext: string) => IMAGE_WIDTHS.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");

/** <picture> AVIF → WebP → JPEG, dimensions explicites, lazy-load hors première vue. */
export function Picture({ name, locale, sizes, priority = false, className, alt }: Props) {
  const meta = images[name];
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
      <img
        src={`/images/${name}-1200.jpg`}
        alt={alt ?? meta.alt[locale]}
        width={meta.width}
        height={meta.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={meta.focus ? { objectPosition: meta.focus } : undefined}
      />
    </picture>
  );
}

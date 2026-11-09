import { notFound } from "next/navigation";
import { CurryMatrix } from "@/components/CurryMatrix";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { OrderButton } from "@/components/OrderButton";
import { Picture } from "@/components/Picture";
import { FiligreeCorners, Rivers } from "@/components/Rivers";
import { categories } from "@/data/menu";
import { getDictionary, hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "menu");
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const tm = t.menuPage;

  const categoryImages = Object.fromEntries(
    categories
      .filter((c) => c.image)
      .map((c) => [c.id, <Picture key={c.id} name={c.image!} locale={lang} sizes="(min-width: 768px) 170px, 100vw" />]),
  );

  return (
    <>
      <section aria-labelledby="menu-title" className="dark glow">
        <div className="shell pt-6 md:pt-10">
          <div className="relative border border-gold/40 p-[9px]">
            <div className="relative border border-gold/20 px-4 py-14 text-center md:py-20">
              <FiligreeCorners />
              <p className="eyebrow centered rise justify-center">{tm.eyebrow}</p>
              <h1 id="menu-title" className="display h-xxl rise-2 mt-6 text-cream">
                <em>{tm.title}</em>
              </h1>
              <div className="mt-6 flex justify-center">
                <Rivers animate width={150} />
              </div>
              <p className="lead rise-3 mx-auto mt-6">{tm.lead}</p>
              <div className="rise-4 mt-8 flex flex-col items-center gap-3">
                <OrderButton t={t} className="btn" />
                <p className="text-[0.85rem] font-light text-cream/65">{tm.priceNote}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 md:h-14" />
      </section>

      <MenuBrowser
        locale={lang}
        t={t}
        categoryImages={categoryImages}
        curryMatrix={<CurryMatrix locale={lang} t={t} mode="menu" tone="paper" />}
        callButton={<OrderButton t={t} className="btn btn-ink" />}
      />

      <section className="dark border-t border-gold/25" aria-labelledby="menu-order-title">
        <div className="shell flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="menu-order-title" className="display h-md text-cream">
              {tm.orderTitle}
            </h2>
            <p className="lead mt-3">{tm.orderLead}</p>
            <p className="mt-2 text-sm font-light text-cream/60">{tm.allergyNote}</p>
          </div>
          <OrderButton t={t} className="btn self-start md:self-auto" />
        </div>
      </section>
    </>
  );
}

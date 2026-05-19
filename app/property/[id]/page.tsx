import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { PropertyCard } from "@/components/home/PropertyCard";
import { PropertyFavoriteButton } from "@/components/property/PropertyFavoriteButton";
import { PropertyShareButton } from "@/components/property/PropertyShareButton";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { catalogHrefHasFilters, resolveCatalogFromParam } from "@/lib/catalogFrom";
import { getPropertyById, getPropertyImages, getSimilarProperties } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

type PropertyPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DESCRIPTION_FALLBACK =
  "Подробное описание скоро появится здесь. Сейчас вы смотрите тестовую карточку объявления на моковых данных Turaq.";

/** Mock-номер продавца до подключения профилей (как в футере). */
const CONTACT_PHONE_E164 = "77270000000";

type PropertyRouteProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PropertyRouteProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const priceLabel = formatPrice(property.price, property.pricePerMonth);

  return {
    title: `${property.title} — Turaq`,
    description: `${priceLabel} · ${property.city}, ${property.district}`,
  };
}

function pickString(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return undefined;
}

export default async function PropertyPage({ params, searchParams }: PropertyPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const fromRaw = pickString(query.from) ?? pickString(query.fromSearch);
  const catalogHref = resolveCatalogFromParam(fromRaw);
  const showBackToResults = catalogHrefHasFilters(catalogHref);
  const images = getPropertyImages(property);
  const similar = getSimilarProperties(property);
  const descriptionText = property.description?.trim() || DESCRIPTION_FALLBACK;

  const priceLabel = formatPrice(property.price, property.pricePerMonth);

  return (
    <div className="min-h-screen bg-surface pb-24 text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[960px] px-4 pb-32 pt-6 sm:px-6">
        <nav className="text-sm text-text-secondary" aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-brand">
                Главная
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={catalogHref} className="transition-colors duration-200 hover:text-brand">
                Каталог
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-text-primary">{property.title}</li>
          </ol>
        </nav>

        {showBackToResults ? (
          <p className="mt-3">
            <Link
              href={catalogHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              К результатам поиска
            </Link>
          </p>
        ) : null}

        <div className="relative mt-6">
          <PropertyGallery images={images} alt={property.title} isVerified={property.isVerified} />
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <PropertyShareButton />
            <PropertyFavoriteButton propertyId={property.id} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[28px] font-bold leading-tight tracking-[-0.5px] text-text-primary">
                {property.title}
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                {property.district}, {property.city} · {property.rooms}-комн · {property.area} м² · этаж{" "}
                {property.floor}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[26px] font-semibold tabular-nums text-brand">{priceLabel}</p>
              {property.isFairPrice ? (
                <p className="mt-1 text-sm text-brand">Честная цена по оценке рынка</p>
              ) : (
                <p className="mt-1 text-sm text-warning">
                  Цена выше типичной по району — торгуйтесь или сравните аналоги.
                </p>
              )}
            </div>
          </div>

          <section className="rounded-card border border-border bg-surface-secondary p-5" aria-labelledby="desc-heading">
            <h2 id="desc-heading" className="text-lg font-semibold text-text-primary">
              Описание
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{descriptionText}</p>
          </section>

          {similar.length > 0 ? (
            <section className="pt-2" aria-labelledby="similar-heading">
              <h2 id="similar-heading" className="text-lg font-semibold text-text-primary">
                Похожие объявления
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {property.city} · {property.type === "rent" ? "аренда" : "продажа"}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2">
                {similar.map((item) => (
                  <PropertyCard key={item.id} property={item} catalogFrom="/search" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <aside
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface-secondary/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6"
        aria-label="Связаться с продавцом"
      >
        <div className="mx-auto flex w-full max-w-[960px] gap-2">
          <a
            href={`tel:+${CONTACT_PHONE_E164}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep sm:flex-none sm:px-6"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            Позвонить
          </a>
          <a
            href={`https://wa.me/${CONTACT_PHONE_E164}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-border px-5 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface sm:flex-none sm:px-6"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            Написать
          </a>
        </div>
      </aside>

      <Footer />
    </div>
  );
}

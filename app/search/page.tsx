import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { PropertyCard } from "@/components/home/PropertyCard";
import {
  filterProperties,
  parseBoolFlagParam,
  parseRoomsParam,
  parseUnsignedNumberParam,
  roomsParamForForm,
} from "@/lib/mockData";
import { buildSearchUrl, parseCityFromQuery } from "@/lib/searchUrl";
import type { PropertyCity } from "@/types/property";

const cities: { value: PropertyCity | "all"; label: string }[] = [
  { value: "all", label: "Все города" },
  { value: "Алматы", label: "Алматы" },
  { value: "Астана", label: "Астана" },
  { value: "Шымкент", label: "Шымкент" },
];

const dealTypes: { value: "all" | "sale" | "rent"; label: string }[] = [
  { value: "all", label: "Купить и снять" },
  { value: "sale", label: "Купить" },
  { value: "rent", label: "Снять" },
];

const roomOptions: { value: string; label: string }[] = [
  { value: "all", label: "Любое" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4+" },
];

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pickString(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return undefined;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const cityParam = pickString(params.city);
  const typeParam = pickString(params.type);
  const qParam = pickString(params.q);
  const minPriceParam = pickString(params.minPrice);
  const maxPriceParam = pickString(params.maxPrice);
  const roomsParam = pickString(params.rooms);
  const areaMinParam = pickString(params.areaMin);
  const fairOnlyParam = pickString(params.fairOnly);
  const verifiedOnlyParam = pickString(params.verifiedOnly);

  let cityFilter = cityParam && cityParam !== "all" ? cityParam : "all";
  let queryFilter = qParam?.trim() ? qParam.trim() : undefined;

  if (cityFilter === "all" && queryFilter) {
    const parsed = parseCityFromQuery(queryFilter);
    if (parsed.city) {
      cityFilter = parsed.city;
      queryFilter = parsed.query || undefined;
    }
  }

  const typeFilter = typeParam && (typeParam === "sale" || typeParam === "rent") ? typeParam : "all";
  const minPrice = parseUnsignedNumberParam(minPriceParam);
  const maxPrice = parseUnsignedNumberParam(maxPriceParam);
  const roomsFilter = parseRoomsParam(roomsParam);
  const areaMin = parseUnsignedNumberParam(areaMinParam);
  const fairOnly = parseBoolFlagParam(fairOnlyParam);
  const verifiedOnly = parseBoolFlagParam(verifiedOnlyParam);

  const filtered = filterProperties({
    city: cityFilter,
    type: typeFilter,
    query: queryFilter,
    minPrice,
    maxPrice,
    rooms: roomsFilter,
    areaMin,
    fairOnly: fairOnly || undefined,
    verifiedOnly: verifiedOnly || undefined,
  });

  const roomsForUrl =
    roomsFilter === "all" || roomsFilter === undefined
      ? undefined
      : roomsFilter === "fourPlus"
        ? ("4" as const)
        : (`${roomsFilter}` as "1" | "2" | "3");

  const catalogFrom = buildSearchUrl({
    type: typeFilter === "all" ? undefined : typeFilter,
    city: cityFilter === "all" ? undefined : (cityFilter as PropertyCity),
    q: queryFilter,
    minPrice,
    maxPrice,
    rooms: roomsForUrl,
    areaMin,
    fairOnly: fairOnly || undefined,
    verifiedOnly: verifiedOnly || undefined,
  });

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <h1 className="text-[28px] font-bold tracking-[-0.5px] text-text-primary">Каталог</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Фильтры работают на тестовых данных — позже здесь будет запрос к серверу.
        </p>

        <form
          className="mt-6 rounded-card border border-border bg-surface-secondary p-4"
          action="/search"
          method="get"
          aria-label="Фильтры каталога"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <label className="flex min-w-[200px] flex-[2] flex-col gap-1 text-sm text-text-secondary sm:min-w-[240px]">
              Район, ЖК или ключевые слова
              <input
                name="q"
                type="search"
                placeholder="например, Самал или парк"
                defaultValue={qParam ?? ""}
                autoComplete="off"
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </label>

            <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Город
              <select
                name="city"
                defaultValue={cityFilter === "all" ? "all" : cityFilter}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Сделка
              <select
                name="type"
                defaultValue={typeFilter}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                {dealTypes.map((deal) => (
                  <option key={deal.value} value={deal.value}>
                    {deal.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-[100px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Цена от, ₸
              <input
                name="minPrice"
                type="number"
                min={0}
                step={1000}
                placeholder="нет"
                defaultValue={minPriceParam ?? ""}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </label>

            <label className="flex min-w-[100px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Цена до, ₸
              <input
                name="maxPrice"
                type="number"
                min={0}
                step={1000}
                placeholder="нет"
                defaultValue={maxPriceParam ?? ""}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </label>

            <label className="flex min-w-[120px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Комнат
              <select
                name="rooms"
                defaultValue={roomsParamForForm(roomsFilter)}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                {roomOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-[100px] flex-1 flex-col gap-1 text-sm text-text-secondary">
              Площадь от, м²
              <input
                name="areaMin"
                type="number"
                min={0}
                step={1}
                placeholder="нет"
                defaultValue={areaMinParam ?? ""}
                className="rounded-button border border-border bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors duration-200 placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </label>

            <div className="flex w-full min-w-[200px] flex-[2] flex-col gap-2 sm:min-w-[240px]">
              <span className="text-sm text-text-secondary">Дополнительно</span>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-button border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-200 hover:bg-surface-secondary">
                  <input
                    type="checkbox"
                    name="fairOnly"
                    value="1"
                    defaultChecked={fairOnly}
                    className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                  />
                  Только честная цена
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-button border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-200 hover:bg-surface-secondary">
                  <input
                    type="checkbox"
                    name="verifiedOnly"
                    value="1"
                    defaultChecked={verifiedOnly}
                    className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                  />
                  Только проверенные
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep sm:mb-0.5"
            >
              Показать
            </button>
          </div>
          <p className="mt-3 text-xs text-text-secondary">
            Для аренды цена в месяц, для продажи — полная стоимость (как в объявлении).
          </p>
        </form>

        <p className="mt-4 text-sm text-text-secondary">
          Найдено объявлений:{" "}
          <span className="font-medium tabular-nums text-text-primary">{filtered.length}</span>
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} catalogFrom={catalogFrom} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-card border border-dashed border-border bg-surface-secondary p-6 text-center text-sm text-text-secondary">
            По выбранным фильтрам ничего не нашлось.{" "}
            <Link href="/search" className="text-brand hover:text-brand-deep">
              Сбросить фильтры
            </Link>
          </p>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

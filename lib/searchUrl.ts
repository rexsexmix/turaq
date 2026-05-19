import type { PropertyCity } from "@/types/property";

const CITIES: PropertyCity[] = ["Алматы", "Астана", "Шымкент"];

export type SearchUrlParams = {
  type?: "sale" | "rent" | "all";
  city?: PropertyCity | "all";
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: "all" | "1" | "2" | "3" | "4";
  areaMin?: number;
  fairOnly?: boolean;
  verifiedOnly?: boolean;
};

/** Собирает ссылку на каталог с query-параметрами (пустые не добавляем). */
export function buildSearchUrl(params: SearchUrlParams): string {
  const sp = new URLSearchParams();

  if (params.type && params.type !== "all") {
    sp.set("type", params.type);
  }
  if (params.city && params.city !== "all") {
    sp.set("city", params.city);
  }
  if (params.q?.trim()) {
    sp.set("q", params.q.trim());
  }
  if (params.minPrice !== undefined && params.minPrice > 0) {
    sp.set("minPrice", String(params.minPrice));
  }
  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    sp.set("maxPrice", String(params.maxPrice));
  }
  if (params.rooms && params.rooms !== "all") {
    sp.set("rooms", params.rooms);
  }
  if (params.areaMin !== undefined && params.areaMin > 0) {
    sp.set("areaMin", String(params.areaMin));
  }
  if (params.fairOnly) {
    sp.set("fairOnly", "1");
  }
  if (params.verifiedOnly) {
    sp.set("verifiedOnly", "1");
  }

  const qs = sp.toString();
  return qs ? `/search?${qs}` : "/search";
}

/**
 * Если в строке поиска указан город («Алматы, Самал»), отделяем city и остаток для q.
 */
export function parseCityFromQuery(raw: string): {
  city?: PropertyCity;
  query: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { query: "" };
  }

  const lower = trimmed.toLowerCase();

  for (const city of CITIES) {
    const cityLower = city.toLowerCase();
    if (lower === cityLower) {
      return { city, query: "" };
    }
    if (lower.startsWith(cityLower)) {
      const rest = trimmed.slice(city.length).replace(/^[\s,.-]+/, "").trim();
      return { city, query: rest };
    }
  }

  return { query: trimmed };
}

/** Параметры из формы hero (табы + поле поиска) → URL каталога. */
export function buildSearchUrlFromHeroForm(form: HTMLFormElement): string {
  const fd = new FormData(form);
  const typeRaw = fd.get("type");
  const qRaw = fd.get("q");

  let type: SearchUrlParams["type"] = "sale";
  if (typeRaw === "rent" || typeRaw === "sale" || typeRaw === "all") {
    type = typeRaw;
  }

  const qString = typeof qRaw === "string" ? qRaw : "";
  const { city, query } = parseCityFromQuery(qString);

  return buildSearchUrl({
    type: type === "all" ? undefined : type,
    city,
    q: query || undefined,
  });
}

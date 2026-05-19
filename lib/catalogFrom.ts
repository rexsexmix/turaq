/** Безопасно восстанавливает href каталога из query `from` / `fromSearch`. */
export function resolveCatalogFromParam(encoded: string | undefined): string {
  if (!encoded?.trim()) {
    return "/search";
  }

  let path: string;
  try {
    path = decodeURIComponent(encoded.trim());
  } catch {
    return "/search";
  }

  if (!path.startsWith("/search") || path.startsWith("//") || path.includes("://")) {
    return "/search";
  }

  try {
    const url = new URL(path, "https://turaq.local");
    if (url.pathname !== "/search") {
      return "/search";
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return "/search";
  }
}

/** Ссылка на карточку объекта с сохранением пути возврата в каталог. */
export function buildPropertyDetailUrl(propertyId: string, catalogFrom?: string): string {
  const base = `/property/${propertyId}`;
  if (!catalogFrom?.trim() || !catalogFrom.startsWith("/search")) {
    return base;
  }
  return `${base}?from=${encodeURIComponent(catalogFrom)}`;
}

export function catalogHrefHasFilters(href: string): boolean {
  return href.includes("?");
}

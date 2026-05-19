export const FAVORITES_STORAGE_KEY = "turaq:favorites";
export const FAVORITES_CHANGED_EVENT = "turaq:favorites-changed";

function parseIds(raw: string | null): string[] {
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id): id is string => typeof id === "string" && id.length > 0);
  } catch {
    return [];
  }
}

/** Читает сохранённые id (только в браузере; на сервере вернёт []). */
export function readFavoriteIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  return parseIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY));
}

export function writeFavoriteIds(ids: string[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

/** Добавляет id в конец или убирает из списка, сохраняя порядок добавления. */
export function toggleFavoriteId(id: string): void {
  const current = readFavoriteIds();
  if (current.includes(id)) {
    writeFavoriteIds(current.filter((x) => x !== id));
    return;
  }
  writeFavoriteIds([...current, id]);
}

export function subscribeFavoriteIds(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  const onCustom = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(FAVORITES_CHANGED_EVENT, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(FAVORITES_CHANGED_EVENT, onCustom);
  };
}

/** Кэш последнего снимка для useSyncExternalStore — всегда одна и та же ссылка, пока список id не изменился. */
let favoriteIdsSnapshotCache: string[] = [];
let favoriteIdsSnapshotKey = "";

export function getFavoriteIdsSnapshot(): string[] {
  const next = readFavoriteIds();
  const key = JSON.stringify(next);
  if (key === favoriteIdsSnapshotKey) {
    return favoriteIdsSnapshotCache;
  }
  favoriteIdsSnapshotKey = key;
  favoriteIdsSnapshotCache = next;
  return favoriteIdsSnapshotCache;
}

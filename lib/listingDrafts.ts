import type { PropertyCity } from "@/types/property";

export const LISTING_DRAFTS_STORAGE_KEY = "turaq:listing-drafts";
export const LISTING_DRAFTS_CHANGED_EVENT = "turaq:listing-drafts-changed";

export type ListingDraft = {
  id: string;
  createdAt: string;
  dealType: "rent" | "sale";
  city: PropertyCity;
  district: string;
  rooms: number;
  area: number;
  floor: string;
  price: number;
  title: string;
  imageUrl: string;
  description?: string;
};

export type ListingDraftInput = Omit<ListingDraft, "id" | "createdAt">;

function parseDrafts(raw: string | null): ListingDraft[] {
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isListingDraft);
  } catch {
    return [];
  }
}

function isListingDraft(value: unknown): value is ListingDraft {
  if (!value || typeof value !== "object") {
    return false;
  }
  const d = value as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.createdAt === "string" &&
    (d.dealType === "rent" || d.dealType === "sale") &&
    typeof d.city === "string" &&
    typeof d.district === "string" &&
    typeof d.rooms === "number" &&
    typeof d.area === "number" &&
    typeof d.floor === "string" &&
    typeof d.price === "number" &&
    typeof d.title === "string" &&
    typeof d.imageUrl === "string" &&
    (d.description === undefined || typeof d.description === "string")
  );
}

export function readListingDrafts(): ListingDraft[] {
  if (typeof window === "undefined") {
    return [];
  }
  return parseDrafts(window.localStorage.getItem(LISTING_DRAFTS_STORAGE_KEY));
}

export function writeListingDrafts(drafts: ListingDraft[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LISTING_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  window.dispatchEvent(new Event(LISTING_DRAFTS_CHANGED_EVENT));
}

export function removeListingDraft(id: string): void {
  writeListingDrafts(readListingDrafts().filter((draft) => draft.id !== id));
}

export function getListingDraftById(id: string): ListingDraft | undefined {
  return readListingDrafts().find((draft) => draft.id === id);
}

export function updateListingDraft(id: string, data: ListingDraftInput): ListingDraft | undefined {
  const drafts = readListingDrafts();
  const index = drafts.findIndex((draft) => draft.id === id);
  if (index === -1) {
    return undefined;
  }
  const updated: ListingDraft = {
    ...drafts[index],
    ...data,
    id,
    createdAt: drafts[index].createdAt,
  };
  const next = [...drafts];
  next[index] = updated;
  writeListingDrafts(next);
  return updated;
}

export function addListingDraft(draft: ListingDraftInput): ListingDraft {
  const entry: ListingDraft = {
    ...draft,
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  writeListingDrafts([entry, ...readListingDrafts()]);
  return entry;
}

export function subscribeListingDrafts(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === LISTING_DRAFTS_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  const onCustom = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(LISTING_DRAFTS_CHANGED_EVENT, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LISTING_DRAFTS_CHANGED_EVENT, onCustom);
  };
}

let listingDraftsSnapshotCache: ListingDraft[] = [];
let listingDraftsSnapshotKey = "";

export function getListingDraftsSnapshot(): ListingDraft[] {
  const next = readListingDrafts();
  const key = JSON.stringify(next);
  if (key === listingDraftsSnapshotKey) {
    return listingDraftsSnapshotCache;
  }
  listingDraftsSnapshotKey = key;
  listingDraftsSnapshotCache = next;
  return listingDraftsSnapshotCache;
}

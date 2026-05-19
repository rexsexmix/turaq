"use client";

import { useSyncExternalStore } from "react";
import {
  getListingDraftsSnapshot,
  subscribeListingDrafts,
  type ListingDraft,
} from "@/lib/listingDrafts";

const emptyServerSnapshot: ListingDraft[] = [];

export function useListingDrafts(): ListingDraft[] {
  return useSyncExternalStore(
    subscribeListingDrafts,
    getListingDraftsSnapshot,
    () => emptyServerSnapshot,
  );
}

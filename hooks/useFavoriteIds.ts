"use client";

import { useSyncExternalStore } from "react";
import {
  getFavoriteIdsSnapshot,
  subscribeFavoriteIds,
} from "@/lib/favorites";

const emptyServerSnapshot: string[] = [];

export function useFavoriteIds(): string[] {
  return useSyncExternalStore(
    subscribeFavoriteIds,
    getFavoriteIdsSnapshot,
    () => emptyServerSnapshot,
  );
}

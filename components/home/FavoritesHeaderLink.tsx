"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoriteIds } from "@/hooks/useFavoriteIds";

export function FavoritesHeaderLink() {
  const ids = useFavoriteIds();
  const count = ids.length;

  return (
    <Link
      href="/favorites"
      className="relative inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-pill border border-border bg-surface-secondary px-2.5 text-text-primary transition-all duration-200 hover:bg-surface hover:text-brand md:px-3"
      aria-label={count > 0 ? `Избранное, ${count}` : "Избранное"}
    >
      <Heart
        className={`h-[18px] w-[18px] shrink-0 ${count > 0 ? "fill-current text-brand" : ""}`}
        aria-hidden
      />
      <span className="hidden text-sm font-medium md:inline">Избранное</span>
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-none text-white md:static md:h-5 md:min-w-5 md:rounded-full md:px-1.5 md:text-[11px]">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}

"use client";

import { Heart } from "lucide-react";
import { useFavoriteIds } from "@/hooks/useFavoriteIds";
import { toggleFavoriteId } from "@/lib/favorites";

type PropertyFavoriteButtonProps = {
  propertyId: string;
  className?: string;
};

export function PropertyFavoriteButton({ propertyId, className = "" }: PropertyFavoriteButtonProps) {
  const favoriteIds = useFavoriteIds();
  const isFavorite = favoriteIds.includes(propertyId);

  return (
    <button
      type="button"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-pill bg-black/45 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 ${isFavorite ? "text-brand" : ""} ${className}`}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={isFavorite}
      onClick={() => toggleFavoriteId(propertyId)}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} aria-hidden />
    </button>
  );
}

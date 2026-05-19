"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Heart } from "lucide-react";
import { useFavoriteIds } from "@/hooks/useFavoriteIds";
import { buildPropertyDetailUrl } from "@/lib/catalogFrom";
import { toggleFavoriteId } from "@/lib/favorites";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
  /** Путь каталога для возврата с фильтрами, например /search?city=Алматы&type=rent */
  catalogFrom?: string;
};

export function PropertyCard({ property, catalogFrom }: PropertyCardProps) {
  const router = useRouter();
  const favoriteIds = useFavoriteIds();
  const isFavorite = favoriteIds.includes(property.id);

  const openProperty = () => {
    router.push(buildPropertyDetailUrl(property.id, catalogFrom));
  };

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-card bg-surface-secondary transition-all duration-200 hover:scale-[1.02]"
      onClick={openProperty}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProperty();
        }
      }}
      tabIndex={0}
      aria-label={`Открыть объявление: ${property.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={`Объявление: ${property.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {property.isFairPrice ? (
          <span className="absolute left-3 top-3 rounded-pill bg-brand px-2.5 py-1 text-[11px] font-medium text-white">
            Честная цена
          </span>
        ) : (
          <span className="absolute left-3 top-3 rounded-pill bg-warning/90 px-2.5 py-1 text-[11px] font-medium text-text-primary">
            Выше рынка
          </span>
        )}

        <button
          type="button"
          className={`absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-pill bg-black/45 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 ${isFavorite ? "text-brand" : ""}`}
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          aria-pressed={isFavorite}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavoriteId(property.id);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {property.isVerified ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-pill bg-gold px-2 py-1 text-[11px] font-medium text-black">
            <Check className="h-3 w-3" />
            Проверено
          </span>
        ) : null}
      </div>

      <div className="space-y-1.5 p-4">
        <p className="text-xl font-semibold tabular-nums text-brand">
          {formatPrice(property.price, property.pricePerMonth)}
        </p>
        <h3 className="line-clamp-1 text-sm font-medium text-text-primary">{property.title}</h3>
        <p className="text-xs text-text-secondary">
          {property.rooms}-комн · {property.area} м² · {property.floor}
        </p>
        <p className="text-xs text-text-secondary">
          {property.district}, {property.city}
        </p>
      </div>
    </article>
  );
}

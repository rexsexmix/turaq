"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PropertyCard } from "@/components/home/PropertyCard";
import { useFavoriteIds } from "@/hooks/useFavoriteIds";
import { properties } from "@/lib/mockData";
import type { Property } from "@/types/property";

function propertiesInFavoriteOrder(ids: string[]): Property[] {
  const byId = new Map(properties.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Property => p !== undefined);
}

export function FavoritesGrid() {
  const ids = useFavoriteIds();
  const items = useMemo(() => propertiesInFavoriteOrder(ids), [ids]);

  if (ids.length === 0) {
    return (
      <div className="mt-8 rounded-card border border-dashed border-border bg-surface-secondary p-8 text-center">
        <p className="text-base font-medium text-text-primary">В избранном пока пусто</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Нажмите на сердечко на карточке объявления на главной или в каталоге — ссылка сохранится в этом браузере и
          отобразится здесь после обновления страницы.
        </p>
        <Link
          href="/search"
          className="mt-5 inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-card border border-dashed border-border bg-surface-secondary p-8 text-center">
        <p className="text-base font-medium text-text-primary">Сохранённые объявления не найдены</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          В списке избранного есть устаревшие записи, которых нет в текущих тестовых данных. Очистите избранное,
          добавляя объявления заново из каталога.
        </p>
        <Link
          href="/search"
          className="mt-5 inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
        >
          Открыть каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {items.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

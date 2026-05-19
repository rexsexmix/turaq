export type PropertyType = "rent" | "sale";
export type PropertyCity = "Алматы" | "Астана" | "Шымкент";

export type Property = {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  pricePerMonth: boolean;
  area: number;
  rooms: number;
  floor: string;
  city: PropertyCity;
  district: string;
  imageUrl: string;
  /** Дополнительные фото; при length > 1 на карточке показывается галерея. */
  imageUrls?: string[];
  /** Текст объявления (2–4 предложения). */
  description?: string;
  isFairPrice: boolean;
  isVerified: boolean;
  /** Широта объекта в градусах. Опционально — на ранних страницах не используется. */
  lat?: number;
  /** Долгота объекта в градусах. Опционально — на ранних страницах не используется. */
  lng?: number;
};

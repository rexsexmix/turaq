import type { Property, PropertyCity } from "@/types/property";

export const properties: Property[] = [
  {
    id: "p-1",
    title: "2-комнатная с видом на парк",
    type: "rent",
    price: 280000,
    pricePerMonth: true,
    area: 68,
    rooms: 2,
    floor: "7/12",
    city: "Алматы",
    district: "Самал-2",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Светлая двухкомнатная квартира с видом на парк в Самал-2. Планировка раздельная, кухня-гостиная около 18 м², спальня с гардеробной. Дом 2018 года, консьерж, подземный паркинг. Рядом школы, кафе и остановка общественного транспорта в пяти минутах ходьбы.",
    isFairPrice: true,
    isVerified: true,
    lat: 43.2351,
    lng: 76.9181,
  },
  {
    id: "p-2",
    title: "Светлая квартира у набережной",
    type: "sale",
    price: 49500000,
    pricePerMonth: false,
    area: 74,
    rooms: 2,
    floor: "10/16",
    city: "Астана",
    district: "Есиль",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Просторная квартира в районе Есиль с панорамой на набережную. Окна в пол, качественная отделка, встроенная техника. Жилой комплекс с закрытой территорией и детской площадкой. Удобный выезд на основные магистрали Астаны.",
    isFairPrice: true,
    isVerified: false,
    lat: 51.1311,
    lng: 71.4209,
  },
  {
    id: "p-3",
    title: "3-комнатная с террасой",
    type: "sale",
    price: 82000000,
    pricePerMonth: false,
    area: 122,
    rooms: 3,
    floor: "4/9",
    city: "Алматы",
    district: "Медеу",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Трёхкомнатная квартира в Медеу с просторной террасой и видом на горы. Два санузла, кухня-столовая, мастер-спальня. Тихий двор, рядом тропы и канатная дорога. Подходит для семьи, ценящей приватность и природу.",
    isFairPrice: false,
    isVerified: true,
    lat: 43.1556,
    lng: 76.9854,
  },
  {
    id: "p-4",
    title: "Уютная студия в новом ЖК",
    type: "rent",
    price: 190000,
    pricePerMonth: true,
    area: 39,
    rooms: 1,
    floor: "12/18",
    city: "Шымкент",
    district: "Нурсат",
    imageUrl:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
    description:
      "Компактная студия в новом жилом комплексе Нурсат. Функциональная планировка, мебель по запросу, вид во двор. Идеально для одного человека или пары: рядом супермаркеты, аптеки и остановки.",
    isFairPrice: true,
    isVerified: false,
    lat: 42.3501,
    lng: 69.5953,
  },
  {
    id: "p-5",
    title: "Семейная 4-комнатная у школы",
    type: "sale",
    price: 96500000,
    pricePerMonth: false,
    area: 146,
    rooms: 4,
    floor: "5/7",
    city: "Астана",
    district: "Сарыарка",
    imageUrl:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Большая четырёхкомнатная квартира в Сарыарке, в шаговой доступности от школы и поликлиники. Три изолированные спальни, гостиная, кладовая. Двор без машин, детская площадка и парковка для резидентов.",
    isFairPrice: true,
    isVerified: true,
    lat: 51.1801,
    lng: 71.4178,
  },
  {
    id: "p-6",
    title: "2-комнатная в тихом дворе",
    type: "rent",
    price: 240000,
    pricePerMonth: true,
    area: 61,
    rooms: 2,
    floor: "3/9",
    city: "Алматы",
    district: "Ауэзов",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Уютная двухкомнатная в тихом дворе Ауэзова. Недавний косметический ремонт, тёплые полы в ванной, балкон застеклён. Рядом парк и остановки, до метро около 15 минут на транспорте.",
    isFairPrice: false,
    isVerified: true,
    lat: 43.2305,
    lng: 76.8512,
  },
  {
    id: "p-7",
    title: "Квартира с панорамными окнами",
    type: "sale",
    price: 73000000,
    pricePerMonth: false,
    area: 98,
    rooms: 3,
    floor: "15/20",
    city: "Шымкент",
    district: "Туран",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: false,
    isVerified: false,
    lat: 42.3284,
    lng: 69.6401,
  },
  {
    id: "p-8",
    title: "Новая 1-комнатная рядом с метро",
    type: "rent",
    price: 230000,
    pricePerMonth: true,
    area: 46,
    rooms: 1,
    floor: "9/14",
    city: "Алматы",
    district: "Алмалинский",
    imageUrl:
      "https://images.unsplash.com/photo-1616594039964-3eaee4ad1f4f?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: true,
    isVerified: true,
    lat: 43.2528,
    lng: 76.9376,
  },
  {
    id: "p-9",
    title: "3-комнатная для большой семьи",
    type: "sale",
    price: 64500000,
    pricePerMonth: false,
    area: 105,
    rooms: 3,
    floor: "8/13",
    city: "Астана",
    district: "Байконур",
    imageUrl:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: true,
    isVerified: false,
    lat: 51.1372,
    lng: 71.4332,
  },
  {
    id: "p-10",
    title: "Стильная квартира в центре",
    type: "rent",
    price: 320000,
    pricePerMonth: true,
    area: 72,
    rooms: 2,
    floor: "11/17",
    city: "Шымкент",
    district: "Каратау",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: false,
    isVerified: true,
    lat: 42.3491,
    lng: 69.6168,
  },
  {
    id: "p-11",
    title: "Пентхаус с видом на горы",
    type: "sale",
    price: 154000000,
    pricePerMonth: false,
    area: 188,
    rooms: 4,
    floor: "20/20",
    city: "Алматы",
    district: "Бостандык",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: true,
    isVerified: true,
    lat: 43.2188,
    lng: 76.9302,
  },
  {
    id: "p-12",
    title: "2-комнатная у парка First President",
    type: "rent",
    price: 260000,
    pricePerMonth: true,
    area: 64,
    rooms: 2,
    floor: "6/10",
    city: "Астана",
    district: "Нура",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80",
    isFairPrice: true,
    isVerified: false,
    lat: 51.0921,
    lng: 71.3982,
  },
];

/** Найти объявление по id (для страницы объекта). */
export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

/** Список URL фото: галерея или одно основное изображение. */
export function getPropertyImages(property: Property): string[] {
  if (property.imageUrls && property.imageUrls.length > 0) {
    return property.imageUrls;
  }
  return [property.imageUrl];
}

/** Похожие объявления: тот же город и тип сделки, без текущего id. */
export function getSimilarProperties(current: Property, limit = 4): Property[] {
  return properties
    .filter((p) => p.id !== current.id && p.city === current.city && p.type === current.type)
    .slice(0, limit);
}

export type NewBuilding = {
  id: string;
  name: string;
  city: PropertyCity;
  district: string;
  imageUrl: string;
  /** Цена «от», в тенге. */
  fromPrice: number;
};

/** Примеры ЖК для блока на главной (позже — из API). */
export const newBuildings: NewBuilding[] = [
  {
    id: "nb-1",
    name: "Green Line",
    city: "Алматы",
    district: "Самал-2",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    fromPrice: 42000000,
  },
  {
    id: "nb-2",
    name: "Nura Towers",
    city: "Астана",
    district: "Есиль",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    fromPrice: 38000000,
  },
  {
    id: "nb-3",
    name: "Turan Residence",
    city: "Шымкент",
    district: "Туран",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    fromPrice: 19500000,
  },
];

export type CatalogFilterOptions = {
  city?: string;
  type?: string;
  /** Подстрока по названию, району или городу (без учёта регистра). */
  query?: string;
  /** В тенге: для аренды — цена/мес, для продажи — полная цена (как в данных). */
  minPrice?: number;
  maxPrice?: number;
  /** Точное число комнат или «4+» через значение `fourPlus`. */
  rooms?: "all" | number | "fourPlus";
  /** Минимальная площадь, м². */
  areaMin?: number;
  /** Только объявления с отметкой «честная цена». */
  fairOnly?: boolean;
  /** Только проверенные собственники. */
  verifiedOnly?: boolean;
};

/** Отбор для каталога по query-параметрам. */
export function filterProperties({
  city,
  type,
  query,
  minPrice,
  maxPrice,
  rooms,
  areaMin,
  fairOnly,
  verifiedOnly,
}: CatalogFilterOptions): Property[] {
  const qNorm = query?.trim().toLowerCase();
  return properties.filter((property) => {
    if (city && city !== "all" && property.city !== city) {
      return false;
    }
    if (qNorm) {
      const haystack = `${property.title} ${property.district} ${property.city}`.toLowerCase();
      if (!haystack.includes(qNorm)) {
        return false;
      }
    }
    if (type === "sale" && property.type !== "sale") {
      return false;
    }
    if (type === "rent" && property.type !== "rent") {
      return false;
    }
    if (minPrice !== undefined && property.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && property.price > maxPrice) {
      return false;
    }
    if (rooms !== undefined && rooms !== "all") {
      if (rooms === "fourPlus") {
        if (property.rooms < 4) return false;
      } else if (property.rooms !== rooms) {
        return false;
      }
    }
    if (areaMin !== undefined && property.area < areaMin) {
      return false;
    }
    if (fairOnly && !property.isFairPrice) {
      return false;
    }
    if (verifiedOnly && !property.isVerified) {
      return false;
    }
    return true;
  });
}

/** Флаг из query, например `fairOnly=1`. */
export function parseBoolFlagParam(value: string | undefined): boolean {
  return value === "1";
}

/** Парсинг `minPrice` / `maxPrice` / `areaMin` из query. */
export function parseUnsignedNumberParam(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

/**
 * Парсинг `rooms`: `all`, число 1–3, или `4` для «4 и более».
 */
export function parseRoomsParam(value: string | undefined): CatalogFilterOptions["rooms"] {
  if (!value || value === "all") return "all";
  if (value === "4") return "fourPlus";
  const n = parseInt(value, 10);
  if (!Number.isFinite(n) || n < 1 || n > 3) return "all";
  return n;
}

/** Значение для `<select name="rooms">` из распарсенного фильтра. */
export function roomsParamForForm(rooms: CatalogFilterOptions["rooms"]): string {
  if (rooms === undefined || rooms === "all") return "all";
  if (rooms === "fourPlus") return "4";
  return String(rooms);
}

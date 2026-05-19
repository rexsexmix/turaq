import { headers } from "next/headers";
import type { Property } from "@/types/property";

type PropertiesResponse = {
  properties: Property[];
};

/** Каталог через Route Handler (Phase 2); на сервере в RSC. */
export async function fetchProperties(): Promise<Property[]> {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) {
    throw new Error("Не удалось определить host для запроса к /api/properties");
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GET /api/properties: ${res.status}`);
  }

  const data = (await res.json()) as PropertiesResponse;
  if (!Array.isArray(data.properties)) {
    throw new Error("Некорректный ответ /api/properties");
  }

  return data.properties;
}

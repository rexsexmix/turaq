import { NextResponse } from "next/server";
import { properties } from "@/lib/mockData";

/**
 * Заглушка Phase 2: каталог из mock без БД.
 * Страницы приложения по-прежнему читают lib/mockData напрямую.
 */
export async function GET() {
  return NextResponse.json(
    { properties },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

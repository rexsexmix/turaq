import { NextResponse } from "next/server";
import { properties } from "@/lib/mockData";

/**
 * Заглушка Phase 2: каталог из mock без БД.
 * Каталог `/search` читает этот endpoint через lib/api/properties.ts.
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

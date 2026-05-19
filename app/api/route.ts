import { NextResponse } from "next/server";

/** Индекс API-заглушки Phase 2 (не HTML-страница). */
export async function GET() {
  return NextResponse.json({
    name: "Turaq API",
    phase: 2,
    endpoints: {
      properties: "/api/properties",
    },
    hint: "Интерфейс сайта — на / (главная), не в /api",
  });
}

"use client";

import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { buildSearchUrlFromHeroForm } from "@/lib/searchUrl";

export function HeroSearchFormActions() {
  const router = useRouter();

  function goToCatalog(form: HTMLFormElement | null) {
    if (!form) {
      return;
    }
    router.push(buildSearchUrlFromHeroForm(form));
  }

  return (
    <div className="w-full max-w-[600px] rounded-2xl border border-border bg-surface p-2 shadow-sm transition-all duration-200 md:rounded-pill">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 px-2 py-2">
          <MapPin className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden />
          <input
            name="q"
            type="search"
            placeholder="Алматы, район или ЖК..."
            className="w-full min-w-0 bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
            autoComplete="off"
            aria-label="Район, город или ЖК"
          />
        </div>
        <div className="mx-2 hidden h-6 w-px bg-border md:block" aria-hidden />
        <button
          type="button"
          onClick={(event) => goToCatalog(event.currentTarget.closest("form"))}
          className="rounded-pill px-3 py-2 text-left text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary md:text-center"
        >
          любая цена
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden />
          Найти
        </button>
      </div>
    </div>
  );
}

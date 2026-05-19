import Link from "next/link";
import { HeroSearchFormActions } from "@/components/home/HeroSearchFormActions";
import { HeroSearchFormShell } from "@/components/home/HeroSearchFormShell";
import { buildSearchUrl } from "@/lib/searchUrl";

const searchHints: { label: string; href: string }[] = [
  {
    label: "2-комн в Самале",
    href: buildSearchUrl({ city: "Алматы", q: "Самал", rooms: "2", type: "rent" }),
  },
  {
    label: "До 30 млн ₸",
    href: buildSearchUrl({ type: "sale", maxPrice: 30_000_000 }),
  },
  {
    label: "Новостройки",
    href: buildSearchUrl({ type: "sale", fairOnly: true }),
  },
  {
    label: "С парковкой",
    href: buildSearchUrl({ q: "парк" }),
  },
];

export function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-12 sm:px-6 md:pt-16">
      <div className="mx-auto flex min-h-[400px] w-full max-w-[1200px] flex-col items-center justify-center rounded-large bg-surface-secondary px-4 py-10 text-center sm:px-8 md:min-h-[440px] md:py-14">
        <h1 className="text-[36px] font-semibold leading-[1.05] tracking-[-1.1px] text-text-primary md:text-[56px] md:tracking-[-1.5px]">
          Найди своё место
        </h1>
        <p className="mt-4 text-sm text-text-secondary md:text-base">
          12 384 объявления · честные цены · проверенные собственники
        </p>

        <HeroSearchFormShell>
          <div
            className="inline-flex items-center gap-2 rounded-pill bg-surface px-2 py-2"
            role="group"
            aria-label="Тип сделки"
          >
            <label className="inline-flex cursor-pointer items-center rounded-pill px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary hover:text-text-primary has-[:checked]:bg-brand/15 has-[:checked]:font-medium has-[:checked]:text-brand">
              <input type="radio" name="type" value="sale" defaultChecked className="sr-only" />
              Купить
            </label>
            <label className="inline-flex cursor-pointer items-center rounded-pill px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary hover:text-text-primary has-[:checked]:bg-brand/15 has-[:checked]:font-medium has-[:checked]:text-brand">
              <input type="radio" name="type" value="rent" className="sr-only" />
              Снять
            </label>
            <label className="inline-flex cursor-pointer items-center rounded-pill px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary hover:text-text-primary has-[:checked]:bg-brand/15 has-[:checked]:font-medium has-[:checked]:text-brand">
              <input type="radio" name="type" value="all" className="sr-only" />
              Посуточно
            </label>
          </div>

          <HeroSearchFormActions />
        </HeroSearchFormShell>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {searchHints.map((hint) => (
            <Link
              key={hint.label}
              href={hint.href}
              className="rounded-pill border border-border bg-surface px-3 py-1.5 text-[12px] text-text-secondary transition-all duration-200 hover:border-brand hover:text-brand"
            >
              {hint.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

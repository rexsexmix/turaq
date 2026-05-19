import Link from "next/link";
import { Building, Building2, Construction, Home } from "lucide-react";
import { buildSearchUrl } from "@/lib/searchUrl";

const categories = [
  {
    title: "Квартиры",
    count: "8 456 предложений",
    icon: Building2,
    href: buildSearchUrl({}),
  },
  {
    title: "Дома и дачи",
    count: "2 341 предложений",
    icon: Home,
    href: buildSearchUrl({ q: "дом" }),
  },
  {
    title: "Коммерч.",
    count: "891 предложений",
    icon: Building,
    href: buildSearchUrl({ q: "коммерч" }),
  },
  {
    title: "Новостройки",
    count: "696 предложений",
    icon: Construction,
    href: buildSearchUrl({ type: "sale", fairOnly: true }),
  },
];

export function CategoryGrid() {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map(({ title, count, icon: Icon, href }) => (
          <Link
            key={title}
            href={href}
            className="group flex cursor-pointer items-center gap-3 rounded-card border border-border bg-surface-secondary p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:border-brand"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-medium text-text-primary">{title}</span>
              <span className="mt-1 block text-xs text-text-secondary">{count}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

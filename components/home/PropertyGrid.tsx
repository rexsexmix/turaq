import Link from "next/link";
import { PropertyCard } from "@/components/home/PropertyCard";
import { properties } from "@/lib/mockData";

export function PropertyGrid() {
  const featuredProperties = properties.slice(0, 8);

  return (
    <section className="w-full py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-medium text-text-primary">Лучшие предложения</h2>
        <Link
          href="/search"
          className="text-sm text-brand transition-colors duration-200 hover:text-brand-deep"
        >
          Смотреть все →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}

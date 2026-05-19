import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { newBuildings } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

/** Блок новостроек на главной — позже ведёт в каталог ЖК. */
export function NewBuildingsSection() {
  return (
    <section className="w-full py-10" aria-labelledby="newbuildings-heading">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand">Новостройки</p>
            <h2 id="newbuildings-heading" className="mt-1 text-[28px] font-bold tracking-[-0.5px] text-text-primary">
              Подборка ЖК в трёх городах
            </h2>
          </div>
          <Link
            href="/search?type=sale"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
          >
            Все новостройки
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {newBuildings.map((complex) => (
            <Link
              key={complex.id}
              href="/search?type=sale"
              className="group overflow-hidden rounded-card border border-border bg-surface-secondary transition-all duration-200 hover:border-brand/50"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={complex.imageUrl}
                  alt={`Жилой комплекс ${complex.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-4">
                <h3 className="text-lg font-semibold text-text-primary">{complex.name}</h3>
                <p className="text-sm text-text-secondary">
                  {complex.district}, {complex.city}
                </p>
                <p className="pt-1 text-[22px] font-semibold tabular-nums text-brand">
                  от {formatPrice(complex.fromPrice, false)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

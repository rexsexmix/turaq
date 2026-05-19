import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

const filterSlots = Array.from({ length: 7 });
const cardSlots = Array.from({ length: 8 });

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <div className="animate-pulse" aria-hidden>
          <div className="h-8 w-44 rounded-button bg-border" />
          <div className="mt-3 h-4 w-72 max-w-full rounded-button bg-border" />

          <div className="mt-6 rounded-card border border-border bg-surface-secondary p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              {filterSlots.map((_, idx) => (
                <div key={idx} className="flex min-w-[140px] flex-1 flex-col gap-2">
                  <div className="h-3 w-16 rounded-button bg-border" />
                  <div className="h-10 w-full rounded-button border border-border bg-surface" />
                </div>
              ))}
              <div className="h-10 w-32 rounded-pill bg-border sm:mb-0.5" />
            </div>
            <div className="mt-3 h-3 w-2/3 max-w-md rounded-button bg-border" />
          </div>

          <div className="mt-4 h-4 w-48 rounded-button bg-border" />

          <div className="mt-6 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {cardSlots.map((_, idx) => (
              <article key={idx} className="overflow-hidden rounded-card bg-surface-secondary">
                <div className="aspect-[4/3] w-full bg-border" />
                <div className="space-y-2 p-4">
                  <div className="h-6 w-2/3 rounded-button bg-border" />
                  <div className="h-4 w-5/6 rounded-button bg-border" />
                  <div className="h-3 w-1/2 rounded-button bg-border" />
                  <div className="h-3 w-2/5 rounded-button bg-border" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          Загружаем каталог объявлений…
        </span>
      </main>
      <Footer />
    </div>
  );
}

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

const descriptionLineWidths = ["w-full", "w-11/12", "w-10/12", "w-9/12"] as const;

export default function PropertyLoading() {
  return (
    <div className="min-h-screen bg-surface pb-24 text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[960px] px-4 pb-32 pt-6 sm:px-6">
        <div className="animate-pulse" aria-hidden>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="h-3 w-16 rounded-button bg-border" />
            <span className="text-text-secondary/40">/</span>
            <div className="h-3 w-20 rounded-button bg-border" />
            <span className="text-text-secondary/40">/</span>
            <div className="h-3 w-40 rounded-button bg-border" />
          </div>

          <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-large bg-border" />

          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 space-y-3">
                <div className="h-7 w-3/4 rounded-button bg-border" />
                <div className="h-4 w-2/3 rounded-button bg-border" />
              </div>
              <div className="space-y-2 sm:text-right">
                <div className="h-7 w-40 rounded-button bg-border sm:ml-auto" />
                <div className="h-3 w-48 rounded-button bg-border sm:ml-auto" />
              </div>
            </div>

            <section className="rounded-card border border-border bg-surface-secondary p-5">
              <div className="h-5 w-32 rounded-button bg-border" />
              <div className="mt-3 space-y-2">
                {descriptionLineWidths.map((width) => (
                  <div key={width} className={`h-3 ${width} rounded-button bg-border`} />
                ))}
              </div>
            </section>
          </div>
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          Загружаем объявление…
        </span>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface-secondary/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-2 sm:flex-row sm:justify-end">
          <div
            className="h-11 w-full animate-pulse rounded-pill border border-border bg-surface sm:order-2 sm:w-36"
            aria-hidden
          />
          <div
            className="h-11 w-full animate-pulse rounded-pill bg-border sm:order-1 sm:w-36"
            aria-hidden
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto flex w-full max-w-[640px] flex-col items-center px-4 pb-24 pt-16 text-center sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">404</p>
        <h1 className="mt-3 text-[28px] font-bold tracking-[-0.5px]">Страница не найдена</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          Возможно, объявление снято с публикации или ссылка устарела. Проверьте адрес или перейдите в каталог.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-pill bg-brand px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep"
          >
            На главную
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-pill border border-border px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary"
          >
            В каталог
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

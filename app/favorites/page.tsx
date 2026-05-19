import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { FavoritesGrid } from "@/components/home/FavoritesGrid";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <h1 className="text-[28px] font-bold tracking-[-0.5px] text-text-primary">Избранное</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Сохранённые объявления хранятся в этом браузере и останутся после перезагрузки страницы.
        </p>
        <FavoritesGrid />
        <p className="mt-8 text-sm text-text-secondary">
          <Link href="/search" className="text-brand transition-colors duration-200 hover:text-brand-deep">
            Перейти в каталог
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

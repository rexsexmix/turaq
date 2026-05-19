import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { MapExplorerClient } from "@/components/map/MapExplorerClient";

export const metadata: Metadata = {
  title: "Карта — Turaq",
  description:
    "Поиск недвижимости на карте Казахстана: нарисуйте зону, чтобы увидеть подходящие объявления.",
};

export default function MapPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold tracking-[-0.5px] text-text-primary">
            Поиск на карте
          </h1>
          <p className="text-sm text-text-secondary">
            Карта центрирована на Алматы. Нарисуйте многоугольник, чтобы отобрать объявления по
            нужной территории — данные пока тестовые, без обращения к серверу.
          </p>
        </header>

        <section className="mt-6">
          <MapExplorerClient />
        </section>
      </main>
      <Footer />
    </div>
  );
}

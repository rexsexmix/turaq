import { Suspense } from "react";
import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { SubmitListingForm } from "@/components/submit/SubmitListingForm";
import { SubmitPageGuard } from "@/components/submit/SubmitPageGuard";

export default function SubmitPage() {
  return (
    <SubmitPageGuard>
      <div className="min-h-screen bg-surface text-text-primary">
        <Header />
        <main className="mx-auto w-full max-w-[720px] px-4 pb-24 pt-6 sm:px-6">
          <nav className="text-sm text-text-secondary" aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-brand">
                  Главная
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text-primary">Подать объявление</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-[28px] font-bold tracking-[-0.5px] text-text-primary">Подать объявление</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Заполните поля — мы проверим ввод в браузере. Размещение на сайте подключим позже вместе с сервером и
            аккаунтом.
          </p>

          <Suspense
            fallback={
              <p className="mt-8 text-sm text-text-secondary" role="status">
                Загрузка формы…
              </p>
            }
          >
            <SubmitListingForm />
          </Suspense>
        </main>
        <Footer />
      </div>
    </SubmitPageGuard>
  );
}

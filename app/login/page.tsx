import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { LoginStubForm } from "@/components/login/LoginStubForm";

export const metadata: Metadata = {
  title: "Вход — Turaq",
  description: "Вход в аккаунт (скоро)",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Header />
      <main className="mx-auto w-full max-w-[480px] px-4 pb-24 pt-6 sm:px-6">
        <nav className="text-sm text-text-secondary" aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-brand">
                Главная
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-text-primary">Вход</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-[28px] font-bold tracking-[-0.5px] text-text-primary">Вход</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Email или телефон и пароль — проверка только в браузере, без сервера.
        </p>

        <Suspense
          fallback={
            <p className="mt-8 text-sm text-text-secondary" role="status">
              Загрузка…
            </p>
          }
        >
          <LoginStubForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

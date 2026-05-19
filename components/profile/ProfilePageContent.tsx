"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/hooks/useDemoAuth";
import { useListingDrafts } from "@/hooks/useListingDrafts";
import { setDemoLoggedIn } from "@/lib/demoSession";
import { removeListingDraft } from "@/lib/listingDrafts";
import { formatPrice } from "@/lib/utils";

const dealTypeLabels = {
  rent: "Аренда",
  sale: "Продажа",
} as const;

function formatDraftDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ProfilePageContent() {
  const { loggedIn, ready } = useDemoAuth();
  const router = useRouter();
  const drafts = useListingDrafts();

  useEffect(() => {
    if (ready && !loggedIn) {
      router.replace("/login");
    }
  }, [ready, loggedIn, router]);

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <div className="h-8 w-48 max-w-full rounded bg-surface-secondary" aria-hidden />
        <div className="mt-8 h-40 w-full rounded-card border border-border bg-surface-secondary/80" aria-hidden />
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
        <p className="text-sm text-text-secondary">Перенаправление на вход…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6">
      <nav className="text-sm text-text-secondary" aria-label="Хлебные крошки">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors duration-200 hover:text-brand">
              Главная
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text-primary">Профиль</li>
        </ol>
      </nav>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.5px] text-text-primary">Профиль</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Демо-аккаунт: разделы ниже — заглушки до подключения личного кабинета.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDemoLoggedIn(false);
            router.push("/");
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill border border-border px-4 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Выйти
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-card border border-border bg-surface-secondary p-5">
          <h2 className="text-base font-semibold text-text-primary">Черновики объявлений</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Сохранённые с формы подачи — только в этом браузере, до подключения сервера.
          </p>
          {drafts.length === 0 ? (
            <p className="mt-4 rounded-button border border-dashed border-border bg-surface px-3 py-8 text-center text-sm text-text-secondary">
              Пока пусто.{" "}
              <Link href="/submit" className="text-brand hover:text-brand-deep">
                Подать объявление
              </Link>
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {drafts.map((draft) => (
                <li
                  key={draft.id}
                  className="rounded-button border border-border bg-surface px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-text-primary">{draft.title}</p>
                    <button
                      type="button"
                      onClick={() => removeListingDraft(draft.id)}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-text-secondary transition-colors duration-200 hover:bg-surface-secondary hover:text-error"
                      aria-label="Удалить черновик"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{formatDraftDate(draft.createdAt)}</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {draft.city}, {draft.district} · {dealTypeLabels[draft.dealType]}
                  </p>
                  <p className="mt-1 text-base font-semibold tabular-nums text-brand">
                    {formatPrice(draft.price, draft.dealType === "rent")}
                  </p>
                  <Link
                    href={`/submit?draftId=${encodeURIComponent(draft.id)}`}
                    className="mt-3 inline-flex text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
                  >
                    Продолжить
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-card border border-border bg-surface-secondary p-5">
          <h2 className="text-base font-semibold text-text-primary">Настройки</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Уведомления, способ связи и параметры поиска — скоро в этом блоке.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            <li className="rounded-button border border-border bg-surface px-3 py-2">Уведомления по email</li>
            <li className="rounded-button border border-border bg-surface px-3 py-2">Контакты для связи</li>
            <li className="rounded-button border border-border bg-surface px-3 py-2">Тема и язык</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useDemoAuth } from "@/hooks/useDemoAuth";
import { useFavoriteIds } from "@/hooks/useFavoriteIds";
import { setDemoLoggedIn } from "@/lib/demoSession";
import { mainNavItems } from "@/lib/nav";

/**
 * Боковая панель навигации для узких экранов: те же ссылки, что и в шапке на lg+.
 * Закрывается по клику вне панели, по Escape и после перехода по ссылке.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const favoriteIds = useFavoriteIds();
  const favoriteCount = favoriteIds.length;
  const { loggedIn, ready } = useDemoAuth();
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-border bg-surface-secondary text-text-primary transition-all duration-200 hover:bg-surface"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Открыть меню"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          {/* Затемнение — клик закрывает меню */}
          <div
            className="absolute inset-0 z-0 bg-black/50 transition-opacity duration-200"
            aria-hidden
            onClick={close}
          />

          {/* Панель поверх затемнения */}
          <div
            id={panelId}
            className="absolute inset-y-0 right-0 z-10 flex h-full w-full max-w-[min(100%,360px)] flex-col border-l border-border bg-surface-secondary shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <p id={titleId} className="text-lg font-semibold text-text-primary">
                Меню
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-border text-text-primary transition-all duration-200 hover:bg-surface"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Мобильное меню">
              <Link
                href="/favorites"
                onClick={close}
                className="flex items-center justify-between rounded-button px-4 py-3 text-base font-medium text-text-primary transition-colors duration-200 hover:bg-surface"
              >
                Избранное
                {favoriteCount > 0 ? (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </span>
                ) : null}
              </Link>
              {mainNavItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={close}
                  className="rounded-button px-4 py-3 text-base font-medium text-text-primary transition-colors duration-200 hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border p-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-pill border border-border px-4 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface"
                >
                  ru ▾
                </button>
                {!ready ? (
                  <div
                    className="h-12 w-full rounded-pill bg-surface-secondary/80"
                    aria-hidden
                  />
                ) : loggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={close}
                      className="inline-flex items-center justify-center rounded-pill border border-border px-4 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface"
                    >
                      Профиль
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDemoLoggedIn(false);
                        close();
                        router.refresh();
                      }}
                      className="inline-flex items-center justify-center rounded-pill px-4 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-surface hover:text-text-primary"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={close}
                      className="inline-flex items-center justify-center rounded-pill border border-border px-4 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface"
                    >
                      Регистрация
                    </Link>
                    <Link
                      href="/login"
                      onClick={close}
                      className="inline-flex items-center justify-center rounded-pill border border-border px-4 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface"
                    >
                      Войти
                    </Link>
                  </>
                )}
                <Link
                  href="/submit"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-pill bg-brand px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep"
                >
                  Подать объявление
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/hooks/useDemoAuth";
import { setDemoLoggedIn } from "@/lib/demoSession";

export function HeaderAuthActions() {
  const { loggedIn, ready } = useDemoAuth();
  const router = useRouter();

  if (!ready) {
    return <div className="h-10 w-[88px] shrink-0 rounded-pill bg-surface-secondary/80 md:w-[100px]" aria-hidden />;
  }
  if (loggedIn) {
    return (
      <>
        <Link
          href="/profile"
          className="rounded-pill border border-border px-4 py-2 text-sm text-text-primary transition-all duration-200 hover:bg-surface-secondary"
        >
          Профиль
        </Link>
        <button
          type="button"
          onClick={() => {
            setDemoLoggedIn(false);
            router.refresh();
          }}
          className="rounded-pill px-3 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary hover:text-text-primary"
        >
          Выйти
        </button>
      </>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-pill border border-border px-4 py-2 text-sm text-text-primary transition-all duration-200 hover:bg-surface-secondary"
    >
      Войти
    </Link>
  );
}

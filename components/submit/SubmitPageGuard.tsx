"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/hooks/useDemoAuth";

type SubmitPageGuardProps = {
  children: React.ReactNode;
};

export function SubmitPageGuard({ children }: SubmitPageGuardProps) {
  const { loggedIn, ready } = useDemoAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !loggedIn) {
      router.replace("/login?next=/submit");
    }
  }, [ready, loggedIn, router]);

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-[720px] px-4 pb-24 pt-6 sm:px-6">
        <div className="h-8 w-56 max-w-full animate-pulse rounded bg-surface-secondary" aria-hidden />
        <p className="mt-6 text-sm text-text-secondary">Загрузка…</p>
        <div
          className="mt-8 h-64 w-full animate-pulse rounded-card border border-border bg-surface-secondary"
          aria-hidden
        />
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto w-full max-w-[720px] px-4 pb-24 pt-6 sm:px-6">
        <p className="text-sm text-text-secondary">Перенаправление на вход…</p>
      </main>
    );
  }

  return <>{children}</>;
}

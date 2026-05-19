"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * Показывается после «входа»-заглушки (?demo=1), чтобы дать явную обратную связь.
 */
export function DemoLoginNotice() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || searchParams.get("demo") !== "1") {
    return null;
  }

  return (
    <div
      className="border-b border-brand/30 bg-brand/10 px-4 py-3 text-center sm:px-6"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
        <p className="text-sm font-medium text-text-primary">Скоро вход через аккаунт — сейчас это демонстрация.</p>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            router.replace("/");
          }}
          className="shrink-0 rounded-pill border border-border bg-surface-secondary px-3 py-1.5 text-xs font-medium text-text-primary transition-colors duration-200 hover:bg-surface"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

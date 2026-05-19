"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function PropertyShareButton() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) {
      return;
    }
    const timer = window.setTimeout(() => setToastVisible(false), 5500);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToastVisible(true);
    } catch {
      setToastVisible(true);
    }
  };

  return (
    <>
      {toastVisible ? (
        <div
          className="fixed bottom-6 left-1/2 z-[100] max-w-[min(100%,420px)] -translate-x-1/2 px-4"
          role="status"
          aria-live="polite"
        >
          <div className="rounded-card border border-brand/50 bg-surface-secondary px-4 py-3 shadow-lg">
            <p className="text-sm font-medium text-text-primary">Ссылка скопирована</p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => void handleShare()}
        className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-black/45 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60"
        aria-label="Поделиться"
      >
        <Share2 className="h-5 w-5" aria-hidden />
      </button>
    </>
  );
}

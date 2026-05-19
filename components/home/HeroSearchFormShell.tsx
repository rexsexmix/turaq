"use client";

import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { buildSearchUrlFromHeroForm } from "@/lib/searchUrl";

type HeroSearchFormShellProps = {
  children: ReactNode;
};

/** Обёртка формы hero: собирает параметры и ведёт на каталог. */
export function HeroSearchFormShell({ children }: HeroSearchFormShellProps) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(buildSearchUrlFromHeroForm(event.currentTarget));
  }

  return (
    <form
      className="mt-6 flex w-full flex-col items-center gap-6"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

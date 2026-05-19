import Link from "next/link";
import { FavoritesHeaderLink } from "@/components/home/FavoritesHeaderLink";
import { HeaderAuthActions } from "@/components/home/HeaderAuthActions";
import { MobileNav } from "@/components/home/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mainNavItems } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[-0.5px] text-brand transition-colors duration-200 hover:text-brand-deep"
        >
          turaq
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основное меню">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FavoritesHeaderLink />
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="rounded-pill px-3 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface-secondary hover:text-text-primary"
            >
              ru ▾
            </button>
            <ThemeToggle />
            <HeaderAuthActions />
            <Link
              href="/submit"
              className="rounded-pill bg-brand px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep"
            >
              Подать объявление
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link
              href="/submit"
              className="rounded-pill bg-brand px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-deep"
            >
              Подать
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

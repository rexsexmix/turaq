"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resolveSafeRedirectPath, setDemoLoggedIn } from "@/lib/demoSession";
import { isValidDemoLogin } from "@/lib/demoLoginValidation";

/**
 * Демо-вход: валидация на клиенте, без сервера. Успех — sessionStorage и переход в профиль.
 */
export function LoginStubForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const loginId = useId();
  const passwordId = useId();
  const hintId = useId();
  const loginErrorId = useId();
  const passwordErrorId = useId();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const loginRaw = (form.elements.namedItem("login") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    let ok = true;
    if (!isValidDemoLogin(loginRaw)) {
      setLoginError("Укажите корректный email или мобильный (10 цифр, с 7…).");
      ok = false;
    } else {
      setLoginError(null);
    }
    if (password.length < 6) {
      setPasswordError("Пароль не короче 6 символов.");
      ok = false;
    } else {
      setPasswordError(null);
    }
    if (!ok) return;

    setDemoLoggedIn(true);
    setSuccess(true);
    router.replace(resolveSafeRedirectPath(nextPath));
  }

  return (
    <form
      className="mt-8 flex flex-col gap-6 rounded-card border border-border bg-surface-secondary p-5 sm:p-6"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Вход в аккаунт"
      aria-describedby={hintId}
    >
      <p id={hintId} className="text-sm leading-relaxed text-text-secondary">
        Демонстрация: данные не отправляются на сервер. После входа откроется выбранный раздел.
      </p>

      {success ? (
        <p className="rounded-button border border-brand/40 bg-brand/10 px-3 py-2 text-sm font-medium text-text-primary">
          Готово — перенаправляем…
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor={loginId} className="text-sm text-text-secondary">
          Email или телефон
        </label>
        <input
          id={loginId}
          name="login"
          type="text"
          autoComplete="username"
          inputMode="text"
          aria-invalid={loginError ? true : undefined}
          aria-describedby={loginError ? loginErrorId : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="you@example.com или +7 700 000 00 00"
        />
        {loginError ? (
          <p id={loginErrorId} className="text-xs text-error">
            {loginError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={passwordId} className="text-sm text-text-secondary">
          Пароль
        </label>
        <input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          aria-invalid={passwordError ? true : undefined}
          aria-describedby={passwordError ? passwordErrorId : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="••••••••"
        />
        {passwordError ? (
          <p id={passwordErrorId} className="text-xs text-error">
            {passwordError}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="rounded-pill bg-brand px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-secondary"
      >
        Войти
      </button>

      <p className="text-center text-sm text-text-secondary">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="font-medium text-brand transition-colors duration-200 hover:text-brand-deep"
        >
          Создать аккаунт
        </Link>
      </p>
    </form>
  );
}

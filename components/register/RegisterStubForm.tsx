"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { setDemoLoggedIn } from "@/lib/demoSession";
import { isValidDemoLogin } from "@/lib/demoLoginValidation";

/**
 * Демо-регистрация: без сервера. Успех — та же демо-сессия, что и после входа, переход в профиль.
 */
export function RegisterStubForm() {
  const router = useRouter();
  const nameId = useId();
  const loginId = useId();
  const passwordId = useId();
  const password2Id = useId();
  const hintId = useId();
  const nameErrorId = useId();
  const loginErrorId = useId();
  const passwordErrorId = useId();
  const password2ErrorId = useId();

  const [nameError, setNameError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [password2Error, setPassword2Error] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameRaw = (form.elements.namedItem("name") as HTMLInputElement).value;
    const loginRaw = (form.elements.namedItem("login") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const password2 = (form.elements.namedItem("password2") as HTMLInputElement).value;

    let ok = true;

    if (nameRaw.trim().length < 2) {
      setNameError("Имя — минимум 2 символа.");
      ok = false;
    } else {
      setNameError(null);
    }

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

    if (password !== password2) {
      setPassword2Error("Пароли должны совпадать.");
      ok = false;
    } else {
      setPassword2Error(null);
    }

    if (!ok) return;

    setDemoLoggedIn(true);
    setSuccess(true);
    router.replace("/profile");
  }

  return (
    <form
      className="mt-8 flex flex-col gap-6 rounded-card border border-border bg-surface-secondary p-5 sm:p-6"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Регистрация"
      aria-describedby={hintId}
    >
      <p id={hintId} className="text-sm leading-relaxed text-text-secondary">
        Демонстрация: аккаунт не создаётся на сервере. После заполнения формы вы попадёте в профиль, как после входа.
      </p>

      {success ? (
        <p className="rounded-button border border-brand/40 bg-brand/10 px-3 py-2 text-sm font-medium text-text-primary">
          Готово — перенаправляем в профиль…
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor={nameId} className="text-sm text-text-secondary">
          Имя
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? nameErrorId : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="Как к вам обращаться"
        />
        {nameError ? (
          <p id={nameErrorId} className="text-xs text-error">
            {nameError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={loginId} className="text-sm text-text-secondary">
          Email или телефон
        </label>
        <input
          id={loginId}
          name="login"
          type="text"
          autoComplete="email"
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
          autoComplete="new-password"
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor={password2Id} className="text-sm text-text-secondary">
          Повторите пароль
        </label>
        <input
          id={password2Id}
          name="password2"
          type="password"
          autoComplete="new-password"
          minLength={6}
          aria-invalid={password2Error ? true : undefined}
          aria-describedby={password2Error ? password2ErrorId : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="••••••••"
        />
        {password2Error ? (
          <p id={password2ErrorId} className="text-xs text-error">
            {password2Error}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="rounded-pill bg-brand px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-secondary"
      >
        Зарегистрироваться
      </button>

      <p className="text-center text-sm text-text-secondary">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-brand transition-colors duration-200 hover:text-brand-deep">
          Войти
        </Link>
      </p>
    </form>
  );
}

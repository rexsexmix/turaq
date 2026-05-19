/** Ключ sessionStorage для демо-входа (без сервера). */
export const DEMO_LOGGED_IN_KEY = "turaq_demo_logged_in";

export const DEMO_AUTH_EVENT = "turaq-demo-auth";

export function readDemoLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DEMO_LOGGED_IN_KEY) === "1";
}

/** Безопасный внутренний путь после входа (без open redirect). */
export function resolveSafeRedirectPath(path: string | null | undefined, fallback = "/profile"): string {
  if (!path?.trim()) {
    return fallback;
  }
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("://")) {
    return fallback;
  }
  return trimmed;
}

export function setDemoLoggedIn(loggedIn: boolean): void {
  if (typeof window === "undefined") return;
  if (loggedIn) {
    sessionStorage.setItem(DEMO_LOGGED_IN_KEY, "1");
  } else {
    sessionStorage.removeItem(DEMO_LOGGED_IN_KEY);
  }
  window.dispatchEvent(new Event(DEMO_AUTH_EVENT));
}

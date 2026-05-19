/** Проверка email или казахстанского мобильного для демо-форм входа и регистрации. */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    digits = digits.slice(1);
  }
  return digits;
}

export function isValidDemoLogin(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (emailRe.test(trimmed)) return true;
  const d = normalizePhoneDigits(trimmed);
  return /^7\d{9}$/.test(d);
}

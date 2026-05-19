export function formatPrice(price: number, isMonthly: boolean): string {
  const formattedPrice = new Intl.NumberFormat("ru-RU")
    .format(price)
    .replaceAll("\u00A0", " ");

  return `${formattedPrice} ₸${isMonthly ? "/мес" : ""}`;
}

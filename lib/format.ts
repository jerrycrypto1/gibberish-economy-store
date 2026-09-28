export function money(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function orderNumber() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `GE-${new Date().getFullYear()}-${n}`;
}

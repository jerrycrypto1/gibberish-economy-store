export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  variantId?: string;
  variantName?: string;
  priceCents: number;
  qty: number;
};

const KEY = "ge-cart-v1";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("ge-cart"));
}

export function countCart() {
  return readCart().reduce((n, l) => n + l.qty, 0);
}

export function addLine(line: CartLine) {
  const cur = readCart();
  const i = cur.findIndex((x) => x.sku === line.sku);
  if (i >= 0) cur[i].qty += line.qty;
  else cur.push(line);
  writeCart(cur);
}

export function setQty(sku: string, qty: number) {
  const cur = readCart().map((l) => (l.sku === sku ? { ...l, qty } : l)).filter((l) => l.qty > 0);
  writeCart(cur);
}

export function clearCart() {
  writeCart([]);
}

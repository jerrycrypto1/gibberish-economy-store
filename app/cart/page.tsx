"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart, setQty, type CartLine } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => setLines(readCart()), []);
  const total = lines.reduce((n, l) => n + l.priceCents * l.qty, 0);

  return (
    <main className="section">
      <div className="wrap">
        <div className="kicker">Atelier bag</div>
        <h1 style={{ fontSize: 44, margin: "8px 0 24px" }}>Selected artifacts</h1>
        {lines.length === 0 ? (
          <p className="mute">
            The bag is empty. <Link href="/collection">Enter the collection.</Link>
          </p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Piece</th>
                  <th>Edition</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.sku}>
                    <td>
                      {l.name}
                      <div className="mute">{l.sku}</div>
                    </td>
                    <td>{l.variantName ?? "—"}</td>
                    <td>
                      <select
                        value={l.qty}
                        onChange={(e) => {
                          setQty(l.sku, Number(e.target.value));
                          setLines(readCart());
                        }}
                        style={{ width: 80 }}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                        <option value={0}>Remove</option>
                      </select>
                    </td>
                    <td>{money(l.priceCents * l.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="section-head" style={{ marginTop: 28 }}>
              <h2>{money(total)}</h2>
              <Link className="btn" href="/checkout">
                Proceed to allocation
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

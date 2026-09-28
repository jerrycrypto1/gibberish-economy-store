"use client";

import { FormEvent, useEffect, useState } from "react";
import { clearCart, readCart, type CartLine } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CheckoutPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => setLines(readCart()), []);
  const total = lines.reduce((n, l) => n + l.priceCents * l.qty, 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        name: fd.get("name"),
        phone: fd.get("phone"),
        line1: fd.get("line1"),
        city: fd.get("city"),
        region: fd.get("region"),
        postal: fd.get("postal"),
        country: fd.get("country"),
        notes: fd.get("notes"),
        method: fd.get("method"),
        items: lines,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "Allocation failed");
      setBusy(false);
      return;
    }
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    clearCart();
    window.location.href = `/checkout/success?order=${data.number}`;
  }

  return (
    <main className="section">
      <div className="wrap split">
        <form onSubmit={onSubmit} className="panel">
          <div className="kicker">Private allocation</div>
          <h2 style={{ margin: "10px 0 8px" }}>Client details</h2>
          <label>Full name</label>
          <input name="name" required placeholder="Name as it should appear on the ledger" />
          <label>Email</label>
          <input name="email" type="email" required />
          <label>Phone</label>
          <input name="phone" />
          <label>Address</label>
          <input name="line1" placeholder="Street" />
          <label>City</label>
          <input name="city" defaultValue="Dubai" />
          <label>Region</label>
          <input name="region" />
          <label>Postal</label>
          <input name="postal" />
          <label>Country</label>
          <input name="country" defaultValue="AE" />
          <label>Settlement</label>
          <select name="method" defaultValue="DEMO">
            <option value="DEMO">Complimentary demo allocation (no charge)</option>
            <option value="WIRE">Bank wire / private client desk</option>
            <option value="CRYPTO">USDT / USDC on receipt</option>
            <option value="STRIPE">Card via Stripe (if configured)</option>
          </select>
          <label>Notes for the atelier</label>
          <textarea name="notes" placeholder="Fit, delivery window, concierge instructions" />
          {err && <p style={{ color: "var(--danger)", marginTop: 12 }}>{err}</p>}
          <button className="btn" style={{ marginTop: 20 }} disabled={busy || lines.length === 0}>
            {busy ? "Allocating…" : "Confirm allocation"}
          </button>
        </form>
        <aside className="panel">
          <div className="kicker">Bag</div>
          {lines.map((l) => (
            <p key={l.sku} style={{ marginTop: 14 }}>
              {l.name}
              <br />
              <span className="mute">
                {l.variantName} · ×{l.qty} · {money(l.priceCents * l.qty)}
              </span>
            </p>
          ))}
          <h2 style={{ marginTop: 24 }}>{money(total)}</h2>
          <p className="notice" style={{ marginTop: 16 }}>
            Shipping is arranged by the house after allocation. Duties may apply
            outside the UAE.
          </p>
        </aside>
      </div>
    </main>
  );
}

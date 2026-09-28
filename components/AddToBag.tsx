"use client";

import { useState } from "react";
import { addLine } from "@/lib/cart";

type Variant = { id: string; name: string; sku: string; stock: number; priceCents?: number | null };

export function AddToBag(props: {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  variants: Variant[];
}) {
  const [variantId, setVariantId] = useState(props.variants[0]?.id ?? "");
  const [done, setDone] = useState(false);
  const v = props.variants.find((x) => x.id === variantId) ?? props.variants[0];

  return (
    <div>
      {props.variants.length > 0 && (
        <>
          <label>Edition / size</label>
          <select value={variantId} onChange={(e) => setVariantId(e.target.value)}>
            {props.variants.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name} · {opt.stock} remaining
              </option>
            ))}
          </select>
        </>
      )}
      <div className="cta-row">
        <button
          className="btn"
          type="button"
          onClick={() => {
            addLine({
              productId: props.productId,
              slug: props.slug,
              name: props.name,
              sku: v?.sku ?? props.slug,
              variantId: v?.id,
              variantName: v?.name,
              priceCents: v?.priceCents ?? props.priceCents,
              qty: 1,
            });
            setDone(true);
          }}
        >
          Place in atelier bag
        </button>
        <a className="btn ghost" href="/cart">
          Review bag
        </a>
      </div>
      {done && <p className="notice" style={{ marginTop: 14 }}>Reserved locally. Complete checkout to bind the serial.</p>}
    </div>
  );
}

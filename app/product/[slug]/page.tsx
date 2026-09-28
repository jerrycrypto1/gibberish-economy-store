import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalog";
import { money } from "@/lib/format";
import { AddToBag } from "@/components/AddToBag";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) notFound();

  return (
    <main className="section">
      <div className="wrap split">
        <div className="hero-card" style={{ minHeight: 520 }}>
          <img src={product.images[0]} alt={product.name} style={{ height: 280, margin: "40px auto" }} />
          <div className="kicker">{product.sku}</div>
        </div>
        <div>
          <div className="kicker">
            {product.collection} · {product.edition}
          </div>
          <h1 style={{ fontSize: 48, marginTop: 10 }}>{product.name}</h1>
          <p className="lede">{product.subtitle}</p>
          <p className="price" style={{ fontSize: 28, marginTop: 18 }}>
            {money(product.priceCents)}
          </p>
          {product.compareCents && (
            <p className="mute">Edition ceiling {money(product.compareCents)}</p>
          )}
          <p className="lede">{product.description}</p>
          <p className="lede">{product.story}</p>
          <p className="meta" style={{ marginTop: 16 }}>
            {product.materials}
            <br />
            {product.origin}
            {product.nfcEnabled ? " · NFC digital twin" : ""}
          </p>
          <div style={{ marginTop: 24 }}>
            <AddToBag
              productId={product.id}
              slug={product.slug}
              name={product.name}
              priceCents={product.priceCents}
              variants={product.variants}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

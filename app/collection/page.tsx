import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  const products = await listProducts().catch(() => []);

  return (
    <main className="section">
      <div className="wrap">
        <div className="kicker">Serialized chapters</div>
        <h1 style={{ fontSize: 48, margin: "12px 0 28px" }}>The collection</h1>
        <div className="grid">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="card">
              <div className="thumb">
                <img src={p.images[0]} alt={p.name} style={{ height: 150 }} />
              </div>
              <div className="meta">
                {p.category} · {p.remaining} remaining
              </div>
              <h3>{p.name}</h3>
              <p className="mute">{p.subtitle}</p>
              <div className="price">{money(p.priceCents)}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

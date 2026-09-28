import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await listProducts().catch(() => []);
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <main>
      <section className="wrap hero">
        <div>
          <div className="kicker">Genesis Collection · Narrative Luxury</div>
          <h1 style={{ marginTop: 18 }}>
            The rejected stone
            <br />
            becomes the cornerstone.
          </h1>
          <p className="lede">
            Gibberish Economy is the luxury house for the digital age — Italian
            haute couture craftsmanship bound to cryptographic provenance.
            Wear the story the market tried to dismiss.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/collection">
              Enter the collection
            </Link>
            <Link className="btn ghost" href="/atelier">
              Read the house
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="kicker">Artifact 001</div>
          <h2 style={{ marginTop: 16, fontSize: 36 }}>Genesis Vault Voyager</h2>
          <p className="lede">
            Olive calf. Constellation stitch. Gold chain belt. NFC twin.
            The first object built as a cultural status symbol for cryptographic
            conviction.
          </p>
          <p className="price" style={{ marginTop: 20 }}>
            From $2,000 — $5,000
          </p>
          <Link className="btn" href="/product/genesis-vault-voyager" style={{ marginTop: 24 }}>
            View artifact
          </Link>
        </div>
      </section>

      <section className="wrap">
        <div className="stats">
          <div className="stat">
            <b>70%+</b>
            <span>Target gross margin</span>
          </div>
          <div className="stat">
            <b>$3,500+</b>
            <span>Average order value</span>
          </div>
          <div className="stat">
            <b>NFC + NFT</b>
            <span>Physical-digital twin</span>
          </div>
          <div className="stat">
            <b>Dubai</b>
            <span>House headquarters</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Chapter I</div>
              <h2>Foundational vocabulary</h2>
            </div>
            <Link href="/collection" className="gold">
              All artifacts →
            </Link>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="card">
                <div className="thumb">
                  <img src={p.images[0]} alt={p.name} style={{ height: 160 }} />
                </div>
                <div className="meta">
                  {p.collection} · {p.edition}
                </div>
                <h3>{p.name}</h3>
                <div className="price">{money(p.priceCents)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

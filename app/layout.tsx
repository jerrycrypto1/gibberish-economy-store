import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Gibberish Economy — Narrative Luxury",
  description:
    "The first luxury fashion house at the intersection of haute couture and cryptographic provenance. Wear your story of transformation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <footer className="footer">
          <div className="wrap footer-grid">
            <div>
              <div className="brand-name">Gibberish Economy</div>
              <p style={{ marginTop: 12, maxWidth: 360 }}>
                Wear your story of transformation. Italian craftsmanship, blockchain
                provenance, serialized chapters. Dubai · Milan · the network.
              </p>
            </div>
            <div>
              <div className="kicker">House</div>
              <p style={{ marginTop: 10 }}>
                <a href="/atelier">Atelier</a>
                <br />
                <a href="/journal">Journal</a>
                <br />
                <a href="/collection">Genesis Collection</a>
              </p>
            </div>
            <div>
              <div className="kicker">Contact</div>
              <p style={{ marginTop: 10 }}>
                kwahjeremiah@gibberisheconomy.com
                <br />
                Meydan Free Zone, Dubai
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

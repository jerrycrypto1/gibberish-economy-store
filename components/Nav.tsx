"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { countCart } from "@/lib/cart";

export function Nav() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const sync = () => setN(countCart());
    sync();
    window.addEventListener("ge-cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ge-cart", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">G</span>
          <span className="brand-name">Gibberish Economy</span>
        </Link>
        <nav className="nav-links">
          <Link href="/collection">Collection</Link>
          <Link href="/atelier">Atelier</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/waitlist">Private client</Link>
        </nav>
        <Link href="/cart" className="cart-pill">
          Atelier bag · {n}
        </Link>
      </div>
    </header>
  );
}

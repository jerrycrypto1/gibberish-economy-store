"use client";

import { FormEvent, useState } from "react";

export default function WaitlistPage() {
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), interest: fd.get("interest") }),
    });
    const data = await res.json();
    setMsg(data.message || data.error || "Received.");
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 560 }}>
        <div className="kicker">Private client desk</div>
        <h1 style={{ marginTop: 12 }}>Request allocation</h1>
        <p className="lede">
          Drops are finite. Leave a note and the desk will reply with the next
          chapter that fits.
        </p>
        <form onSubmit={onSubmit} className="panel" style={{ marginTop: 20 }}>
          <label>Email</label>
          <input name="email" type="email" required />
          <label>Interest</label>
          <input name="interest" placeholder="Voyager, Suit, Capsule 0…" />
          <button className="btn" style={{ marginTop: 18 }}>
            Submit
          </button>
          {msg && <p className="notice" style={{ marginTop: 14 }}>{msg}</p>}
        </form>
      </div>
    </main>
  );
}

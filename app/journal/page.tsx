export default function JournalPage() {
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="kicker">Serialized storytelling</div>
        <h1 style={{ marginTop: 12 }}>Journal</h1>
        <article className="panel" style={{ marginTop: 24 }}>
          <div className="kicker">Chapter I</div>
          <h2 style={{ marginTop: 8 }}>On the 10,000 BTC pizza</h2>
          <p className="lede">
            In 2010 the market priced two pizzas at ten thousand coins and
            called it a punchline. The punchline became liturgy. The Pizza
            Legacy Suit is not a costume of that joke — it is the garment of
            people who now understand what the laugh cost.
          </p>
        </article>
        <article className="panel" style={{ marginTop: 16 }}>
          <div className="kicker">Doctrine</div>
          <h2 style={{ marginTop: 8 }}>The rejected stone</h2>
          <p className="lede">
            Every cycle has a room that refuses the new standard. We cut
            clothes for the walk out of that room. Owners do not buy a logo.
            They enter a chapter.
          </p>
        </article>
      </div>
    </main>
  );
}

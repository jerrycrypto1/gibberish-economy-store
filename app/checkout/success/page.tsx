export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <div className="kicker">Allocation received</div>
        <h1 style={{ marginTop: 12 }}>The chapter is reserved.</h1>
        <p className="lede">
          Order {order ?? "pending"} is on the house ledger. A client advisor will
          confirm provenance binding, fit, and delivery.
        </p>
        <a className="btn" href="/collection" style={{ marginTop: 24 }}>
          Return to collection
        </a>
      </div>
    </main>
  );
}

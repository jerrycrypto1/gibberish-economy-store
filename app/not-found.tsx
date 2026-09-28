export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="kicker">404</div>
        <h1>This chapter does not exist.</h1>
        <a className="btn" href="/collection" style={{ marginTop: 24 }}>
          Return to collection
        </a>
      </div>
    </main>
  );
}

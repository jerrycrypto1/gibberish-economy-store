import { prisma } from "@/lib/prisma";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return (
      <main className="section">
        <div className="wrap">
          <h1>Restricted</h1>
          <p className="lede">Pass ?key= with ADMIN_KEY.</p>
        </div>
      </main>
    );
  }

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="section">
      <div className="wrap">
        <div className="kicker">House ledger</div>
        <h1 style={{ marginTop: 8 }}>Orders</h1>
        <table className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Client</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.number}</td>
                <td>
                  {o.name}
                  <div className="mute">{o.email}</div>
                </td>
                <td>
                  {o.status} · {o.paymentMethod}
                </td>
                <td>{money(o.totalCents, o.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

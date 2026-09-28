import { getProvenance } from "@/lib/catalog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProvenancePage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;
  const rec = await getProvenance(serial).catch(() => null);
  if (!rec) notFound();

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <div className="kicker">Provenance ledger</div>
        <h1 style={{ marginTop: 12 }}>{rec.serial}</h1>
        <div className="panel" style={{ marginTop: 20 }}>
          <p>Chapter · {rec.chapter}</p>
          <p style={{ marginTop: 8 }}>Artifact · {rec.productSlug}</p>
          <p style={{ marginTop: 8 }}>NFC · {rec.nfcUid}</p>
          <p style={{ marginTop: 8 }}>Holder · {rec.ownerAlias ?? "Unbound"}</p>
          <p style={{ marginTop: 8 }} className="mute">
            {rec.chainHint}
          </p>
        </div>
      </div>
    </main>
  );
}

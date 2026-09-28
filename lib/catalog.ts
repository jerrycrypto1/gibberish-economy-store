import { prisma } from "./prisma";
import { FALLBACK_PRODUCTS } from "./fallback-products";

export async function listProducts() {
  try {
    const rows = await prisma.product.findMany({
      include: { variants: true },
      orderBy: [{ featured: "desc" }, { priceCents: "desc" }],
    });
    if (rows.length) return rows;
  } catch {
    /* first boot without Postgres */
  }
  return FALLBACK_PRODUCTS as any;
}

export async function getProduct(slug: string) {
  try {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: { variants: true },
    });
    if (row) return row;
  } catch {
    /* fallback */
  }
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getProvenance(serial: string) {
  try {
    return await prisma.provenance.findUnique({ where: { serial } });
  } catch {
    if (serial === "GE-GV-001-0001") {
      return {
        id: "pr1",
        serial,
        productSlug: "genesis-vault-voyager",
        ownerAlias: "Founder vault",
        nfcUid: "04:A1:7C:GE:00:01",
        chapter: "Genesis · Chapter I",
        chainHint: "Ethereum L2 · forthcoming mainnet bind",
        mintedAt: new Date(),
      };
    }
    return null;
  }
}

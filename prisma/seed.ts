import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "genesis-vault-voyager",
    name: "Genesis Vault Voyager",
    subtitle: "Flagship olive duffel · NFC twin",
    collection: "Genesis",
    category: "Travel",
    priceCents: 350000,
    compareCents: 500000,
    edition: "Founding drop",
    editionSize: 108,
    remaining: 41,
    sku: "GE-GV-001",
    featured: true,
    description:
      "The introductory artifact of the Genesis Collection. An olive-green duffel cut in Italian vegetable-tanned calf, constellation-stitched on the face, finished with a gold chain belt and a sealed NFC provenance tag.",
    story:
      "Crypto created trillions and left them culturally naked. The Voyager is the first object built to carry that wealth — a vault you can hold. Every stitch maps a node. Every tag binds a chapter.",
    materials: "Vegetable-tanned Italian calf · brass hardware · 18k-gold-plated chain · NFC inlay",
    origin: "Atelier partnership, Italy · finishing Dubai",
    images: ["/products/voyager.svg"],
    variants: [
      { name: "Olive / Gold", sku: "GE-GV-001-OG", stock: 24 },
      { name: "Midnight / Gold", sku: "GE-GV-001-MG", stock: 17 },
    ],
  },
  {
    slug: "pizza-legacy-suit",
    name: "Pizza Legacy Suit",
    subtitle: "10,000 BTC, tailored in cream",
    collection: "Genesis",
    category: "Tailoring",
    priceCents: 1800000,
    compareCents: 2500000,
    edition: "Bespoke + made-to-measure",
    editionSize: 21,
    remaining: 9,
    sku: "GE-PL-001",
    featured: true,
    description:
      "Cream double-breasted masterpiece honoring the 10,000 BTC pizza transaction. A triangular leather patch sits where a pocket square would — wearable crypto history, cut for the room that still underprices conviction.",
    story:
      "Laszlo bought two pizzas. The market called it a joke. The joke became the cornerstone. This suit is cut for the people who understood the punchline late — and decided to wear the lesson.",
    materials: "Super 150s wool-silk blend · triangular calf patch · horn buttons · NFC cuff token",
    origin: "Bespoke bench, Italy",
    images: ["/products/suit.svg"],
    variants: [
      { name: "Made to measure", sku: "GE-PL-001-MTM", stock: 7 },
      { name: "Bespoke commission", sku: "GE-PL-001-BS", stock: 2 },
    ],
  },
  {
    slug: "rejection-stone-loafer",
    name: "Rejection Stone Loafer",
    subtitle: "The stone the builders refused",
    collection: "Genesis",
    category: "Shoes",
    priceCents: 240000,
    edition: "Capsule I",
    editionSize: 200,
    remaining: 86,
    sku: "GE-RS-001",
    featured: true,
    description:
      "Hand-welted loafer in olive box calf. A single faceted hardware stone sits on the vamp — the rejected stone, now the cornerstone.",
    story:
      "Every cycle has a room that laughs. This last is for the walk out of that room.",
    materials: "Box calf · stacked leather heel · brass cornerstone hardware",
    origin: "Italian last, Goodyear welt",
    images: ["/products/loafer.svg"],
    variants: [
      { name: "Olive", sku: "GE-RS-001-OL", stock: 50 },
      { name: "Black", sku: "GE-RS-001-BK", stock: 36 },
    ],
  },
  {
    slug: "constellation-belt",
    name: "Constellation Belt",
    subtitle: "Mapped nodes in brass",
    collection: "Genesis Accessories",
    category: "SLG",
    priceCents: 89000,
    edition: "Open edition, serialized",
    remaining: 140,
    sku: "GE-CB-001",
    featured: false,
    description:
      "Calf belt with a constellation buckle. Each node on the plate corresponds to a block-era in the brand chronology.",
    story: "Accessories carry the language without diluting the drop.",
    materials: "Calf strap · solid brass plate · NFC keeper",
    origin: "Italy",
    images: ["/products/belt.svg"],
    variants: [
      { name: "95 cm", sku: "GE-CB-001-95", stock: 40 },
      { name: "105 cm", sku: "GE-CB-001-105", stock: 50 },
      { name: "115 cm", sku: "GE-CB-001-115", stock: 50 },
    ],
  },
  {
    slug: "hashline-card-holder",
    name: "Hashline Card Holder",
    subtitle: "Entry artifact",
    collection: "Genesis Accessories",
    category: "SLG",
    priceCents: 48000,
    edition: "Open edition, serialized",
    remaining: 320,
    sku: "GE-HC-001",
    featured: false,
    description:
      "Six-pocket card holder in olive or cream calf. Edge-painted hashline. The object most owners will touch every day.",
    story: "The first piece most clients commission. Small enough to gift. Serious enough to keep.",
    materials: "Italian calf · edge paint · foil hashline",
    origin: "Italy",
    images: ["/products/card.svg"],
    variants: [
      { name: "Olive", sku: "GE-HC-001-OL", stock: 160 },
      { name: "Cream", sku: "GE-HC-001-CR", stock: 160 },
    ],
  },
  {
    slug: "cornerstone-weekender",
    name: "Cornerstone Weekender",
    subtitle: "Hold the chapter",
    collection: "Genesis",
    category: "Travel",
    priceCents: 420000,
    edition: "Limited",
    editionSize: 64,
    remaining: 22,
    sku: "GE-CW-001",
    featured: true,
    description:
      "Structured weekender with a rigid vault floor and a removable jewelry / seed-phrase tray. Built for the flight from Dubai to Milan.",
    story: "A bag that behaves like a safe without looking like one.",
    materials: "Full-grain calf · canvas lining · brass feet · NFC plate",
    origin: "Italy / Dubai finish",
    images: ["/products/weekender.svg"],
    variants: [{ name: "Olive / Cream lining", sku: "GE-CW-001-OC", stock: 22 }],
  },
  {
    slug: "block-zero-overcoat",
    name: "Block Zero Overcoat",
    subtitle: "Future capsule · Episode 0",
    collection: "Future Capsule",
    category: "Tailoring",
    priceCents: 980000,
    edition: "Episode 0",
    editionSize: 33,
    remaining: 33,
    sku: "GE-BZ-001",
    featured: true,
    description:
      "Double-faced cashmere overcoat. Hidden inner pocket sized for a hardware wallet. Serialized lining numeral.",
    story: "Episode Zero is the prequel drop — the coat worn before the first public chapter.",
    materials: "Double-faced cashmere · horn buttons · silk numeral lining",
    origin: "Italy",
    images: ["/products/coat.svg"],
    variants: [
      { name: "48", sku: "GE-BZ-001-48", stock: 8 },
      { name: "50", sku: "GE-BZ-001-50", stock: 12 },
      { name: "52", sku: "GE-BZ-001-52", stock: 13 },
    ],
  },
  {
    slug: "olive-hash-scarf",
    name: "Olive Hash Scarf",
    subtitle: "Soft language",
    collection: "Genesis Accessories",
    category: "Apparel",
    priceCents: 62000,
    edition: "Seasonal",
    remaining: 90,
    sku: "GE-OH-001",
    featured: false,
    description:
      "Undyed merino with an olive hash border. Quiet enough for a boardroom. Specific enough for the initiated.",
    story: "Serialized textile. The cheapest way to wear the house.",
    materials: "Merino · olive silk-hash border",
    origin: "Italy",
    images: ["/products/scarf.svg"],
    variants: [{ name: "One size", sku: "GE-OH-001-OS", stock: 90 }],
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.provenance.deleteMany();

  for (const p of products) {
    const { variants, ...data } = p;
    await prisma.product.create({
      data: {
        ...data,
        variants: { create: variants },
      },
    });
  }

  await prisma.provenance.createMany({
    data: [
      {
        serial: "GE-GV-001-0001",
        productSlug: "genesis-vault-voyager",
        ownerAlias: "Founder vault",
        nfcUid: "04:A1:7C:GE:00:01",
        chapter: "Genesis · Chapter I",
      },
      {
        serial: "GE-PL-001-0001",
        productSlug: "pizza-legacy-suit",
        ownerAlias: "House archive",
        nfcUid: "04:A1:7C:GE:00:02",
        chapter: "Genesis · Pizza Legacy",
      },
    ],
  });

  console.log(`Seeded ${products.length} products`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

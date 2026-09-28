-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'RESERVED', 'FULFILLING', 'SHIPPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'WIRE', 'CRYPTO', 'DEMO');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "compareCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "edition" TEXT NOT NULL,
    "editionSize" INTEGER,
    "remaining" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "nfcEnabled" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "priceCents" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'DEMO',
    "stripeSessionId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postal" TEXT,
    "country" TEXT NOT NULL DEFAULT 'AE',
    "notes" TEXT,
    "subtotalCents" INTEGER NOT NULL,
    "shippingCents" INTEGER NOT NULL DEFAULT 0,
    "totalCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "serialHint" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "interest" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provenance" (
    "id" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "productSlug" TEXT NOT NULL,
    "ownerAlias" TEXT,
    "mintedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chainHint" TEXT NOT NULL DEFAULT 'Ethereum L2 · forthcoming mainnet bind',
    "nfcUid" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,

    CONSTRAINT "Provenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE UNIQUE INDEX "Variant_sku_key" ON "Variant"("sku");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist"("email");
CREATE UNIQUE INDEX "Provenance_serial_key" ON "Provenance"("serial");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Seed catalog (idempotent-enough for first migrate)
INSERT INTO "Product" ("id","slug","name","subtitle","collection","category","priceCents","compareCents","currency","edition","editionSize","remaining","sku","description","story","materials","origin","nfcEnabled","featured","images","createdAt","updatedAt") VALUES
('p_voyager','genesis-vault-voyager','Genesis Vault Voyager','Flagship olive duffel · NFC twin','Genesis','Travel',350000,500000,'USD','Founding drop',108,41,'GE-GV-001','The introductory artifact of the Genesis Collection. An olive-green duffel cut in Italian vegetable-tanned calf, constellation-stitched on the face, finished with a gold chain belt and a sealed NFC provenance tag.','Crypto created trillions and left them culturally naked. The Voyager is the first object built to carry that wealth — a vault you can hold.','Vegetable-tanned Italian calf · brass hardware · 18k-gold-plated chain · NFC inlay','Atelier partnership, Italy · finishing Dubai',true,true,ARRAY['/products/voyager.svg'],NOW(),NOW()),
('p_suit','pizza-legacy-suit','Pizza Legacy Suit','10,000 BTC, tailored in cream','Genesis','Tailoring',1800000,2500000,'USD','Bespoke + made-to-measure',21,9,'GE-PL-001','Cream double-breasted masterpiece honoring the 10,000 BTC pizza transaction. A triangular leather patch sits where a pocket square would — wearable crypto history.','Laszlo bought two pizzas. The market called it a joke. The joke became the cornerstone.','Super 150s wool-silk blend · triangular calf patch · horn buttons · NFC cuff token','Bespoke bench, Italy',true,true,ARRAY['/products/suit.svg'],NOW(),NOW()),
('p_loafer','rejection-stone-loafer','Rejection Stone Loafer','The stone the builders refused','Genesis','Shoes',240000,NULL,'USD','Capsule I',200,86,'GE-RS-001','Hand-welted loafer in olive box calf. A single faceted hardware stone sits on the vamp — the rejected stone, now the cornerstone.','Every cycle has a room that laughs. This last is for the walk out of that room.','Box calf · stacked leather heel · brass cornerstone hardware','Italian last, Goodyear welt',true,true,ARRAY['/products/loafer.svg'],NOW(),NOW()),
('p_belt','constellation-belt','Constellation Belt','Mapped nodes in brass','Genesis Accessories','SLG',89000,NULL,'USD','Open edition, serialized',NULL,140,'GE-CB-001','Calf belt with a constellation buckle. Each node on the plate corresponds to a block-era in the brand chronology.','Accessories carry the language without diluting the drop.','Calf strap · solid brass plate · NFC keeper','Italy',true,false,ARRAY['/products/belt.svg'],NOW(),NOW()),
('p_card','hashline-card-holder','Hashline Card Holder','Entry artifact','Genesis Accessories','SLG',48000,NULL,'USD','Open edition, serialized',NULL,320,'GE-HC-001','Six-pocket card holder in olive or cream calf. Edge-painted hashline.','The first piece most clients commission.','Italian calf · edge paint · foil hashline','Italy',true,false,ARRAY['/products/card.svg'],NOW(),NOW()),
('p_week','cornerstone-weekender','Cornerstone Weekender','Hold the chapter','Genesis','Travel',420000,NULL,'USD','Limited',64,22,'GE-CW-001','Structured weekender with a rigid vault floor and a removable jewelry / seed-phrase tray.','A bag that behaves like a safe without looking like one.','Full-grain calf · canvas lining · brass feet · NFC plate','Italy / Dubai finish',true,true,ARRAY['/products/weekender.svg'],NOW(),NOW()),
('p_coat','block-zero-overcoat','Block Zero Overcoat','Future capsule · Episode 0','Future Capsule','Tailoring',980000,NULL,'USD','Episode 0',33,33,'GE-BZ-001','Double-faced cashmere overcoat. Hidden inner pocket sized for a hardware wallet. Serialized lining numeral.','Episode Zero is the prequel drop — the coat worn before the first public chapter.','Double-faced cashmere · horn buttons · silk numeral lining','Italy',true,true,ARRAY['/products/coat.svg'],NOW(),NOW()),
('p_scarf','olive-hash-scarf','Olive Hash Scarf','Soft language','Genesis Accessories','Apparel',62000,NULL,'USD','Seasonal',NULL,90,'GE-OH-001','Undyed merino with an olive hash border. Quiet enough for a boardroom.','Serialized textile. The cheapest way to wear the house.','Merino · olive silk-hash border','Italy',true,false,ARRAY['/products/scarf.svg'],NOW(),NOW());

INSERT INTO "Variant" ("id","productId","name","sku","stock") VALUES
('v1','p_voyager','Olive / Gold','GE-GV-001-OG',24),
('v2','p_voyager','Midnight / Gold','GE-GV-001-MG',17),
('v3','p_suit','Made to measure','GE-PL-001-MTM',7),
('v4','p_suit','Bespoke commission','GE-PL-001-BS',2),
('v5','p_loafer','Olive','GE-RS-001-OL',50),
('v6','p_loafer','Black','GE-RS-001-BK',36),
('v7','p_belt','95 cm','GE-CB-001-95',40),
('v8','p_belt','105 cm','GE-CB-001-105',50),
('v9','p_belt','115 cm','GE-CB-001-115',50),
('v10','p_card','Olive','GE-HC-001-OL',160),
('v11','p_card','Cream','GE-HC-001-CR',160),
('v12','p_week','Olive / Cream lining','GE-CW-001-OC',22),
('v13','p_coat','48','GE-BZ-001-48',8),
('v14','p_coat','50','GE-BZ-001-50',12),
('v15','p_coat','52','GE-BZ-001-52',13),
('v16','p_scarf','One size','GE-OH-001-OS',90);

INSERT INTO "Provenance" ("id","serial","productSlug","ownerAlias","nfcUid","chapter","chainHint","mintedAt") VALUES
('pr1','GE-GV-001-0001','genesis-vault-voyager','Founder vault','04:A1:7C:GE:00:01','Genesis · Chapter I','Ethereum L2 · forthcoming mainnet bind',NOW()),
('pr2','GE-PL-001-0001','pizza-legacy-suit','House archive','04:A1:7C:GE:00:02','Genesis · Pizza Legacy','Ethereum L2 · forthcoming mainnet bind',NOW());

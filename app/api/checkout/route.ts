import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { orderNumber } from "@/lib/format";

const Item = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  sku: z.string(),
  variantId: z.string().optional(),
  variantName: z.string().optional(),
  priceCents: z.number().int().positive(),
  qty: z.number().int().positive(),
});

const Body = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().optional().nullable(),
  line1: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  postal: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  method: z.enum(["STRIPE", "WIRE", "CRYPTO", "DEMO"]),
  items: z.array(Item).min(1),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid allocation payload" }, { status: 400 });
  }
  const body = parsed.data;
  const subtotal = body.items.reduce((n, i) => n + i.priceCents * i.qty, 0);
  const number = orderNumber();

  try {
    const customer = await prisma.customer.upsert({
      where: { email: body.email },
      update: { name: body.name },
      create: { email: body.email, name: body.name },
    });

    const order = await prisma.order.create({
      data: {
        number,
        status: body.method === "DEMO" ? "RESERVED" : "PENDING",
        paymentMethod: body.method,
        email: body.email,
        name: body.name,
        phone: body.phone || undefined,
        line1: body.line1 || undefined,
        city: body.city || undefined,
        region: body.region || undefined,
        postal: body.postal || undefined,
        country: body.country || "AE",
        notes: body.notes || undefined,
        subtotalCents: subtotal,
        shippingCents: 0,
        totalCents: subtotal,
        customerId: customer.id,
        items: {
          create: body.items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            name: i.name,
            sku: i.sku,
            quantity: i.qty,
            priceCents: i.priceCents,
          })),
        },
      },
    });

    if (body.method === "STRIPE" && process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: body.email,
        success_url: `${origin}/checkout/success?order=${order.number}`,
        cancel_url: `${origin}/checkout`,
        metadata: { orderId: order.id, number: order.number },
        line_items: body.items.map((i) => ({
          quantity: i.qty,
          price_data: {
            currency: "usd",
            unit_amount: i.priceCents,
            product_data: { name: `${i.name}${i.variantName ? ` · ${i.variantName}` : ""}` },
          },
        })),
      });
      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
      });
      return NextResponse.json({ url: session.url, number: order.number });
    }

    return NextResponse.json({ number: order.number, id: order.id });
  } catch (err) {
    console.error("checkout ledger unavailable", err);
    return NextResponse.json({
      number,
      id: "local",
      warning: "Ledger unavailable — allocation number issued without persistence.",
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  await prisma.waitlist.upsert({
    where: { email },
    update: { interest: body.interest || undefined },
    create: { email, interest: body.interest || undefined },
  });
  return NextResponse.json({ message: "The desk has your name." });
}

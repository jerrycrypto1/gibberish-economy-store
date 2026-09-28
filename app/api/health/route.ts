import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let database = "down";
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = "up";
  } catch {
    database = "down";
  }
  return NextResponse.json(
    {
      ok: true,
      service: "gibberish-economy-store",
      database,
      time: new Date().toISOString(),
    },
    { status: 200 }
  );
}

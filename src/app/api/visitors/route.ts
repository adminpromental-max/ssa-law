import { NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ count: db.visitorCount });
}

export async function POST() {
  const db = await updateDb((data) => {
    data.visitorCount += 1;
  });
  return NextResponse.json({ count: db.visitorCount });
}

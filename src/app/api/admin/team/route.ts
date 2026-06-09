import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import type { TeamStructure } from "@/data/team";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.team);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const team = (await request.json()) as TeamStructure;
    await updateDb((db) => {
      db.team = team;
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "فشل الحفظ" }, { status: 500 });
  }
}

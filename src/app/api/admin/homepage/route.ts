import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { revalidateSiteContent } from "@/lib/revalidate";
import type { HomepageContent } from "@/lib/db/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.homepage);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const homepage = (await request.json()) as HomepageContent;
    await updateDb((db) => {
      db.homepage = homepage;
    });
    revalidateSiteContent();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/homepage]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل الحفظ" },
      { status: 500 }
    );
  }
}

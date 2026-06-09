import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import type { ImportantLink } from "@/lib/db/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.importantLinks);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const link = (await request.json()) as Omit<ImportantLink, "id">;
    const newLink: ImportantLink = {
      ...link,
      id: `link-${Date.now()}`,
    };
    await updateDb((db) => {
      db.importantLinks.push(newLink);
    });
    return NextResponse.json(newLink);
  } catch {
    return NextResponse.json({ error: "فشل الإضافة" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const link = (await request.json()) as ImportantLink;
    await updateDb((db) => {
      const idx = db.importantLinks.findIndex((l) => l.id === link.id);
      if (idx >= 0) db.importantLinks[idx] = link;
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "معرف مطلوب" }, { status: 400 });
  }

  await updateDb((db) => {
    db.importantLinks = db.importantLinks.filter((l) => l.id !== id);
  });
  return NextResponse.json({ success: true });
}

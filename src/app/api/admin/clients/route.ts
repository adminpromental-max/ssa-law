import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { revalidateSiteContent } from "@/lib/revalidate";
import type { ClientRecord } from "@/lib/db/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.clients);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const clients = (await request.json()) as ClientRecord[];
    await updateDb((db) => {
      db.clients = clients;
    });
    revalidateSiteContent();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل الحفظ" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ClientRecord>;
  const newClient: ClientRecord = {
    id: `client-${Date.now()}`,
    name: body.name || "جهة جديدة",
    shortName: body.shortName || "جهة",
    description: body.description || "",
    initials: body.initials || "LOGO",
    logo: body.logo,
  };

  await updateDb((db) => {
    db.clients.push(newClient);
  });
  revalidateSiteContent();
  return NextResponse.json(newClient);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  }

  await updateDb((db) => {
    db.clients = db.clients.filter((c) => c.id !== id);
  });
  revalidateSiteContent();
  return NextResponse.json({ success: true });
}

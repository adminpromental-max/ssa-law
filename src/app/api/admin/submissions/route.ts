import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  const db = await readDb();

  if (type === "contact") {
    return NextResponse.json(db.contactSubmissions);
  }
  if (type === "booking") {
    return NextResponse.json(db.bookingSubmissions);
  }

  return NextResponse.json({
    contact: db.contactSubmissions,
    booking: db.bookingSubmissions,
  });
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { type, id, read } = await request.json();

  await updateDb((db) => {
    if (type === "contact") {
      const item = db.contactSubmissions.find((s) => s.id === id);
      if (item) item.read = read;
    } else if (type === "booking") {
      const item = db.bookingSubmissions.find((s) => s.id === id);
      if (item) item.read = read;
    }
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  await updateDb((db) => {
    if (type === "contact") {
      db.contactSubmissions = db.contactSubmissions.filter((s) => s.id !== id);
    } else {
      db.bookingSubmissions = db.bookingSubmissions.filter((s) => s.id !== id);
    }
  });

  return NextResponse.json({ success: true });
}

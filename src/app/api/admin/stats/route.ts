import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const db = await readDb();
  const unreadContact = db.contactSubmissions.filter((s) => !s.read).length;
  const unreadBooking = db.bookingSubmissions.filter((s) => !s.read).length;

  return NextResponse.json({
    visitorCount: db.visitorCount,
    totalContact: db.contactSubmissions.length,
    totalBooking: db.bookingSubmissions.length,
    unreadContact,
    unreadBooking,
    totalSubmissions: db.contactSubmissions.length + db.bookingSubmissions.length,
  });
}

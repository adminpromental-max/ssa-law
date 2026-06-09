import { NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, preferredDate, preferredTime, notes } =
      body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    await updateDb((db) => {
      db.bookingSubmissions.unshift({
        id: crypto.randomUUID(),
        name,
        phone,
        email,
        service,
        preferredDate,
        preferredTime,
        notes,
        createdAt: new Date().toISOString(),
        read: false,
      });
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال طلب الحجز" },
      { status: 500 }
    );
  }
}

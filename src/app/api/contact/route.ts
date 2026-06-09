import { NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    await updateDb((db) => {
      db.contactSubmissions.unshift({
        id: crypto.randomUUID(),
        name,
        phone,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
        read: false,
      });
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال الرسالة" },
      { status: 500 }
    );
  }
}

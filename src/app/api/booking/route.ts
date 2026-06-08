import { NextResponse } from "next/server";

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

    // TODO: Integrate email service (e.g. Resend, SendGrid) on deployment
    console.log("Booking form submission:", {
      name,
      phone,
      email,
      service,
      preferredDate,
      preferredTime,
      notes,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال طلب الحجز" },
      { status: 500 }
    );
  }
}

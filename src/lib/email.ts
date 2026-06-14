import { BOOKING_NOTIFY_EMAIL } from "@/data/contact";

interface SendEmailOptions {
  subject: string;
  html: string;
  to?: string;
}

export async function sendEmail({
  subject,
  html,
  to = BOOKING_NOTIFY_EMAIL,
}: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM || "مكتب صالح العمري <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email] Resend error:", err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] send failed:", error);
    return false;
  }
}

export function buildBookingEmailHtml(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}): string {
  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>طلب حجز استشارة جديد</h2>
      <p><strong>الاسم:</strong> ${data.name}</p>
      <p><strong>الجوال:</strong> ${data.phone}</p>
      ${data.email ? `<p><strong>البريد:</strong> ${data.email}</p>` : ""}
      <p><strong>نوع الاستشارة:</strong> ${data.service}</p>
      ${data.preferredDate ? `<p><strong>التاريخ:</strong> ${data.preferredDate}</p>` : ""}
      ${data.preferredTime ? `<p><strong>الوقت:</strong> ${data.preferredTime}</p>` : ""}
      ${data.notes ? `<p><strong>ملاحظات:</strong> ${data.notes}</p>` : ""}
    </div>
  `;
}

import { NextResponse } from "next/server";
import { isAuthenticated, changePassword, clearSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "كلمة المرور الجديدة غير متطابقة" },
        { status: 400 }
      );
    }

    const result = await changePassword(currentPassword, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "فشل تغيير كلمة المرور" },
        { status: 400 }
      );
    }

    await clearSessionCookie();

    return NextResponse.json({
      success: true,
      message: "تم تغيير كلمة المرور. سجّل الدخول بالكلمة الجديدة.",
    });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

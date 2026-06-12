import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  isAllowedUploadFolder,
  uploadAdminFile,
} from "@/lib/upload";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "general");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "لم يُرفَع ملف" }, { status: 400 });
    }

    if (!isAllowedUploadFolder(folder)) {
      return NextResponse.json({ error: "مجلد غير صالح" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "حجم الملف يجب ألا يتجاوز 5 ميجابايت" },
        { status: 400 }
      );
    }

    const url = await uploadAdminFile(file, folder);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل الرفع" },
      { status: 500 }
    );
  }
}

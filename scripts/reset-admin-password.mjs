/**
 * إعادة تعيين كلمة مرور لوحة التحكم على Vercel Blob.
 *
 * الاستخدام:
 *   BLOB_READ_WRITE_TOKEN=your_token node scripts/reset-admin-password.mjs كلمة_السر_الجديدة
 *
 * التوكن من: Vercel → المشروع → Settings → Environment Variables → BLOB_READ_WRITE_TOKEN
 */

import { randomBytes, scryptSync } from "crypto";
import { get, put, BlobNotFoundError } from "@vercel/blob";

const BLOB_PATHNAME = "ssa-law/database.json";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const newPassword = process.argv[2];

  if (!newPassword || newPassword.length < 8) {
    console.error("\n❌ كلمة المرور يجب أن تكون 8 أحرف على الأقل.\n");
    console.error("الاستخدام:");
    console.error(
      "  BLOB_READ_WRITE_TOKEN=xxx node scripts/reset-admin-password.mjs YourNewPassword\n"
    );
    process.exit(1);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("\n❌ متغير BLOB_READ_WRITE_TOKEN غير موجود.\n");
    console.error("انسخيه من Vercel → Settings → Environment Variables\n");
    process.exit(1);
  }

  const opts = { token };

  let db;
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      useCache: false,
      ...opts,
    });

    if (result?.statusCode !== 200 || !result.stream) {
      throw new Error("لم يُعثر على ملف قاعدة البيانات");
    }

    const text = await new Response(result.stream).text();
    db = JSON.parse(text);
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      console.error("\n❌ ملف database.json غير موجود على Blob.\n");
    } else {
      console.error("\n❌ فشل قراءة قاعدة البيانات:", error.message, "\n");
    }
    process.exit(1);
  }

  db.adminPasswordHash = hashPassword(newPassword);

  await put(BLOB_PATHNAME, JSON.stringify(db, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...opts,
  });

  console.log("\n✅ تم إعادة تعيين كلمة المرور بنجاح!");
  console.log("   سجّلي الدخول من: https://lawer-office-delta.vercel.app/admin/login\n");
}

main().catch((error) => {
  console.error("\n❌ خطأ:", error.message, "\n");
  process.exit(1);
});

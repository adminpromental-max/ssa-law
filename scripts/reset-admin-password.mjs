/**
 * إعادة تعيين كلمة مرور لوحة التحكم.
 *
 * Supabase (موصى):
 *   SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/reset-admin-password.mjs NewPass123
 *
 * Blob (قديم):
 *   BLOB_READ_WRITE_TOKEN=xxx node scripts/reset-admin-password.mjs NewPass123
 */

import { randomBytes, scryptSync } from "crypto";
import { get, put, BlobNotFoundError } from "@vercel/blob";
import { createClient } from "@supabase/supabase-js";

const BLOB_PATHNAME = "ssa-law/database.json";
const SITE_DATA_TABLE = "site_data";
const SITE_DATA_ID = "main";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function resetViaSupabase(newPassword) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return false;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from(SITE_DATA_TABLE)
    .select("data")
    .eq("id", SITE_DATA_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase read: ${error.message}`);
  }

  const db = data?.data && typeof data.data === "object" ? { ...data.data } : {};
  db.adminPasswordHash = hashPassword(newPassword);

  const { error: writeError } = await supabase.from(SITE_DATA_TABLE).upsert(
    {
      id: SITE_DATA_ID,
      data: db,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (writeError) {
    throw new Error(`Supabase write: ${writeError.message}`);
  }

  return true;
}

async function resetViaBlob(newPassword) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;

  const opts = { token };
  const result = await get(BLOB_PATHNAME, {
    access: "private",
    useCache: false,
    ...opts,
  });

  if (result?.statusCode !== 200 || !result.stream) {
    throw new Error("لم يُعثر على database.json على Blob");
  }

  const text = await new Response(result.stream).text();
  const db = JSON.parse(text);
  db.adminPasswordHash = hashPassword(newPassword);

  await put(BLOB_PATHNAME, JSON.stringify(db, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...opts,
  });

  return true;
}

async function main() {
  const newPassword = process.argv[2];

  if (!newPassword || newPassword.length < 8) {
    console.error("\n❌ كلمة المرور يجب أن تكون 8 أحرف على الأقل.\n");
    console.error("الاستخدام:");
    console.error(
      "  SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/reset-admin-password.mjs YourNewPassword\n"
    );
    process.exit(1);
  }

  try {
    if (await resetViaSupabase(newPassword)) {
      console.log("\n✅ تم إعادة التعيين عبر Supabase!");
      console.log("   /admin/login\n");
      return;
    }

    if (await resetViaBlob(newPassword)) {
      console.log("\n✅ تم إعادة التعيين عبر Blob!");
      console.log("   /admin/login\n");
      return;
    }

    console.error("\n❌ أضيفي SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY أو BLOB_READ_WRITE_TOKEN\n");
    process.exit(1);
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      console.error("\n❌ ملف Blob غير موجود.\n");
    } else {
      console.error("\n❌", error.message, "\n");
    }
    process.exit(1);
  }
}

main();

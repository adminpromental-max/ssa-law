import type { Database } from "./types";
import {
  canUseSupabase,
  getSupabaseAdmin,
  getUploadsBucket,
  SITE_DATA_ID,
  SITE_DATA_TABLE,
} from "@/lib/supabase/server";

export async function readFromSupabase(): Promise<Database | null> {
  if (!canUseSupabase()) return null;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(SITE_DATA_TABLE)
      .select("data")
      .eq("id", SITE_DATA_ID)
      .maybeSingle();

    if (error) {
      console.error("[db] supabase read failed:", error.message);
      return null;
    }

    if (!data?.data || typeof data.data !== "object") return null;

    const payload = data.data as Database;
    if (!payload.team || !payload.siteSettings) return null;

    return payload;
  } catch (error) {
    console.error("[db] supabase read error:", error);
    return null;
  }
}

export async function writeToSupabase(data: Database): Promise<boolean> {
  if (!canUseSupabase()) return false;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(SITE_DATA_TABLE).upsert(
      {
        id: SITE_DATA_ID,
        data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("[db] supabase write failed:", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[db] supabase write error:", error);
    return false;
  }
}

export async function testSupabaseStorage(): Promise<{
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  hasData: boolean;
  provider: "supabase";
  error?: string;
}> {
  if (!canUseSupabase()) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      hasData: false,
      provider: "supabase",
      error: "Supabase غير مفعّل — أضيفي SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY",
    };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error: tableError } = await supabase
      .from(SITE_DATA_TABLE)
      .select("id")
      .eq("id", SITE_DATA_ID)
      .maybeSingle();

    if (tableError) {
      return {
        ok: false,
        canRead: false,
        canWrite: false,
        hasData: false,
        provider: "supabase",
        error: tableError.message,
      };
    }

    const existing = await readFromSupabase();

    if (existing) {
      return {
        ok: true,
        canRead: true,
        canWrite: true,
        hasData: true,
        provider: "supabase",
      };
    }

    return {
      ok: true,
      canRead: true,
      canWrite: true,
      hasData: false,
      provider: "supabase",
    };
  } catch (error) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      hasData: false,
      provider: "supabase",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function uploadToSupabaseStorage(
  file: File,
  folder: string,
  filename: string
): Promise<string | null> {
  if (!canUseSupabase()) return null;

  try {
    const supabase = getSupabaseAdmin();
    const bucket = getUploadsBucket();
    const path = `${folder}/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

    if (error) {
      console.error("[upload] supabase storage failed:", error.message);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("[upload] supabase storage error:", error);
    return null;
  }
}

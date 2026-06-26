import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SITE_DATA_TABLE = "site_data";
const SITE_DATA_ID = "main";

export function canUseSupabase(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase is not configured");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getUploadsBucket(): string {
  return process.env.SUPABASE_STORAGE_BUCKET || "uploads";
}

export { SITE_DATA_TABLE, SITE_DATA_ID };

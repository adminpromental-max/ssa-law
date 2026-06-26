import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  testRemoteStorage,
  canUseSupabase,
  canUseBlob,
} from "@/lib/db";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const test = await testRemoteStorage();

  return NextResponse.json({
    remote: test.ok,
    supabase: canUseSupabase(),
    blob: canUseBlob(),
    hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    hasStoreId: Boolean(process.env.BLOB_STORE_ID),
    ...test,
  });
}

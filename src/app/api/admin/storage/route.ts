import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { testBlobStorage, canUseBlob } from "@/lib/db";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const test = await testBlobStorage();

  return NextResponse.json({
    remote: canUseBlob(),
    hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    hasStoreId: Boolean(process.env.BLOB_STORE_ID),
    hasOidc: Boolean(process.env.VERCEL_OIDC_TOKEN),
    ...test,
  });
}

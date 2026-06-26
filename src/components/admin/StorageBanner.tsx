"use client";

import { useEffect, useState } from "react";

interface StorageStatus {
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  hasData?: boolean;
  provider?: "supabase" | "blob" | "local";
  supabase?: boolean;
  error?: string;
}

export function StorageBanner() {
  const [status, setStatus] = useState<StorageStatus | null>(null);

  useEffect(() => {
    fetch("/api/admin/storage")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() =>
        setStatus({
          ok: false,
          canRead: false,
          canWrite: false,
          error: "تعذر فحص التخزين",
        })
      );
  }, []);

  if (!status) return null;

  if (status.ok && status.canWrite) {
    const label =
      status.provider === "supabase"
        ? "Supabase"
        : status.provider === "blob"
          ? "Vercel Blob"
          : "محلي";

    return (
      <div className="mb-8 p-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm">
        ✓ التخزين الدائم يعمل عبر {label} — التعديلات تُحفظ على الموقع.
        {!status.hasData && (
          <span className="block mt-1 text-emerald-200/80">
            لم تُحفظ بيانات بعد — عدّلي واحفظي من أي قسم في اللوحة.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-200 text-sm leading-relaxed">
      <strong className="text-amber-100">تنبيه تخزين:</strong>{" "}
      {status.error || "التخزين الدائم غير مفعّل بالكامل."}
      <p className="mt-2 text-amber-100/90">
        تأكدي من إعداد Supabase على Vercel (SUPABASE_URL +
        SUPABASE_SERVICE_ROLE_KEY) ثم Redeploy.
      </p>
    </div>
  );
}

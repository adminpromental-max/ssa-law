"use client";

import { useEffect, useState } from "react";

interface StorageStatus {
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  hasToken: boolean;
  hasStoreId: boolean;
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
          hasToken: false,
          hasStoreId: false,
          error: "تعذر فحص التخزين",
        })
      );
  }, []);

  if (!status) return null;

  if (status.ok) {
    return (
      <div className="mb-8 p-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm">
        ✓ التخزين الدائم يعمل — التعديلات تُحفظ على الموقع.
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-200 text-sm leading-relaxed">
      <strong className="text-amber-100">تنبيه تخزين:</strong>{" "}
      {status.error || "التخزين الدائم غير مفعّل بالكامل."}
      {!status.hasToken && (
        <p className="mt-2">
          من Vercel → Storage → Projects → فعّلي ✓ على Production و Preview
          لـ <span dir="ltr">BLOB_READ_WRITE_TOKEN</span> ثم Redeploy.
        </p>
      )}
      <p className="mt-2 text-amber-100/80">
        اللوحة تعمل حالياً — لكن التعديلات قد لا تظهر على الموقع حتى تفعيل
        التخزين.
      </p>
    </div>
  );
}

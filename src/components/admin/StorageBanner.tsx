"use client";

import { useEffect, useState } from "react";

interface StorageStatus {
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  hasData?: boolean;
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

  if (status.ok && status.canWrite) {
    return (
      <div className="mb-8 p-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm">
        ✓ التخزين الدائم يعمل — التعديلات تُحفظ على الموقع.
        {!status.hasData && (
          <span className="block mt-1 text-emerald-200/80">
            لم تُحفظ بيانات بعد — عدّلي واحفظي من فريق العمل أو الروابط.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-200 text-sm leading-relaxed">
      <strong className="text-amber-100">تنبيه تخزين:</strong>{" "}
      {status.error || "التخزين الدائم غير مفعّل بالكامل."}
      <p className="mt-2">
        <strong>الخطوات:</strong>
      </p>
      <ol className="mt-1 list-decimal list-inside space-y-1 text-amber-100/90">
        <li>
          Vercel → مشروع <span dir="ltr">lawer-office</span> → Storage →
          Projects
        </li>
        <li>
          جنب <span dir="ltr">BLOB_READ_WRITE_TOKEN</span> علّمي ✓ Production
          و Preview
        </li>
        <li>اضغطي Save ثم Deployments → Redeploy</li>
      </ol>
    </div>
  );
}

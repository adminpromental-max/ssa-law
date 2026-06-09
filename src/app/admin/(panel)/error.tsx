"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin error]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="card-elevated rounded-sm p-8 max-w-md text-center">
        <h2 className="text-xl font-bold text-cream mb-3">حدث خطأ مؤقت</h2>
        <p className="text-cream/60 text-sm mb-6 leading-relaxed">
          تعذر تحميل هذه الصفحة. جرّبي مرة أخرى أو ارجعي للوحة التحكم.
        </p>
        <button
          onClick={reset}
          className="bg-gold text-black font-bold px-6 py-2.5 rounded-sm hover:bg-gold-light transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}

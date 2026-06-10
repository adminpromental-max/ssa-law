"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "فشل تغيير كلمة المرور");
      return;
    }

    setMessage(data.message);
    setTimeout(() => {
      router.push("/admin/login");
      router.refresh();
    }, 2000);
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-2">
        <KeyRound className="w-6 h-6 text-gold" />
        <h1 className="text-2xl font-bold text-cream">إعدادات الأمان</h1>
      </div>
      <p className="text-cream/50 text-sm mb-8">
        غيّر كلمة مرور لوحة التحكم. يُنصح بتغييرها فور استلام الموقع.
      </p>

      <form onSubmit={handleSubmit} className="card-elevated rounded-sm p-6 space-y-4">
        <div>
          <label className="block text-cream/70 text-sm mb-2">
            كلمة المرور الحالية
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-sm"
            required
          />
        </div>

        <div>
          <label className="block text-cream/70 text-sm mb-2">
            كلمة المرور الجديدة
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-sm"
            minLength={8}
            required
          />
          <p className="text-cream/40 text-xs mt-1">8 أحرف على الأقل</p>
        </div>

        <div>
          <label className="block text-cream/70 text-sm mb-2">
            تأكيد كلمة المرور الجديدة
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-sm"
            minLength={8}
            required
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}

        {message && (
          <p className="text-emerald-300 text-sm bg-emerald-500/10 px-3 py-2 rounded-sm">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black font-bold py-3 rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            "تغيير كلمة المرور"
          )}
        </button>
      </form>

      <div className="mt-6 p-4 rounded-sm border border-gold/15 text-cream/50 text-xs leading-relaxed">
        بعد التغيير، كلمة المرور تُحفظ بشكل مشفّر داخل التخزين الخاص بالموقع
        فقط. لا تشاركيها مع أي شخص.
      </div>
    </div>
  );
}

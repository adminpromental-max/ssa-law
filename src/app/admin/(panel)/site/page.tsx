"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import type { SiteSettings } from "@/lib/db/types";

export default function AdminSitePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setMessage(res.ok ? "تم الحفظ — حدّث الموقع للتأكد" : "فشل الحفظ");
  }

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div>
      <AdminSaveBar
        title="إعدادات الموقع"
        description="بيانات التواصل، الترخيص، وقواعد الإحصائيات"
        saving={saving}
        message={message}
        onSave={save}
      />

      <div className="space-y-6">
        <section className="card-elevated rounded-sm p-6 space-y-4">
          <h2 className="text-gold font-bold">معلومات المكتب</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="اسم المكتب" value={settings.name} onChange={(v) => set("name", v)} />
            <AdminField label="الاسم الكامل" value={settings.fullName} onChange={(v) => set("fullName", v)} />
            <AdminField label="الشعار" value={settings.tagline} onChange={(v) => set("tagline", v)} />
            <AdminField label="رقم الترخيص" value={settings.license} onChange={(v) => set("license", v)} />
            <AdminField label="سنة التأسيس" value={settings.foundedYear} onChange={(v) => set("foundedYear", v)} />
            <AdminField label="الموقع الإلكتروني" value={settings.website} onChange={(v) => set("website", v)} dir="ltr" />
          </div>
          <AdminField label="وصف المكتب" value={settings.description} onChange={(v) => set("description", v)} multiline />
        </section>

        <section className="card-elevated rounded-sm p-6 space-y-4">
          <h2 className="text-gold font-bold">التواصل</h2>
          <AdminField label="العنوان" value={settings.address} onChange={(v) => set("address", v)} />
          <AdminField label="البريد الإلكتروني" value={settings.email} onChange={(v) => set("email", v)} dir="ltr" />
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="هاتف / واتساب" value={settings.phone} onChange={(v) => set("phone", v)} dir="ltr" />
            <AdminField label="فاكس" value={settings.fax} onChange={(v) => set("fax", v)} dir="ltr" />
          </div>
        </section>

        <section className="card-elevated rounded-sm p-6 space-y-4">
          <h2 className="text-gold font-bold">إحصائيات الرئيسية</h2>
          <p className="text-cream/50 text-xs">عدد الزوار يُحسب تلقائياً. القضايا والطلبات تبدأ من هذه الأرقام + الطلبات الفعلية.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField
              label="قاعدة عدد القضايا"
              type="number"
              value={String(settings.casesBase)}
              onChange={(v) => set("casesBase", Number(v) || 0)}
              dir="ltr"
            />
            <AdminField
              label="قاعدة عدد الطلبات"
              type="number"
              value={String(settings.requestsBase)}
              onChange={(v) => set("requestsBase", Number(v) || 0)}
              dir="ltr"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

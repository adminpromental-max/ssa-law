"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import type { Service } from "@/data/services";

const ICONS = ["Scale", "FileText", "Gavel", "Building2", "Stamp", "Briefcase"];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(services),
    });
    setSaving(false);
    setMessage(res.ok ? "تم الحفظ" : "فشل الحفظ");
  }

  async function addService() {
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "خدمة جديدة" }),
    });
    const s = await res.json();
    setServices((prev) => [...prev, s]);
    setOpenSlug(s.slug);
  }

  async function removeService(slug: string) {
    if (!confirm("حذف هذه الخدمة؟")) return;
    await fetch(`/api/admin/services?slug=${slug}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.slug !== slug));
  }

  function updateService(slug: string, patch: Partial<Service>) {
    setServices((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, ...patch } : s))
    );
  }

  function updateLines(slug: string, field: "items" | "steps", text: string) {
    updateService(slug, { [field]: text.split("\n").filter(Boolean) });
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <AdminSaveBar
            title="الخدمات"
            description="إدارة مجالات الخدمات القانونية"
            saving={saving}
            message={message}
            onSave={save}
          />
        </div>
        <button
          onClick={addService}
          className="flex items-center gap-2 bg-gold text-black font-bold px-4 py-2.5 rounded-sm text-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> خدمة جديدة
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const open = openSlug === service.slug;
          return (
            <div key={service.slug} className="card-elevated rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenSlug(open ? null : service.slug)}
                className="w-full flex items-center justify-between p-4 text-start hover:bg-gold/5"
              >
                <span className="text-cream font-bold">{service.title}</span>
                {open ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-cream/40" />}
              </button>
              {open && (
                <div className="p-4 pt-0 space-y-4 border-t border-gold/10">
                  <div className="grid md:grid-cols-2 gap-4">
                    <AdminField label="العنوان" value={service.title} onChange={(v) => updateService(service.slug, { title: v })} />
                    <AdminField label="Slug (رابط)" value={service.slug} onChange={(v) => updateService(service.slug, { slug: v })} dir="ltr" />
                    <div>
                      <label className="block text-cream/60 text-xs mb-1">الأيقونة</label>
                      <select
                        value={service.icon}
                        onChange={(e) => updateService(service.slug, { icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-sm text-sm"
                      >
                        {ICONS.map((ic) => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <AdminField label="وصف مختصر (شريط الخدمات)" value={service.shortDescription} onChange={(v) => updateService(service.slug, { shortDescription: v })} multiline />
                  <AdminField label="الوصف الكامل" value={service.description} onChange={(v) => updateService(service.slug, { description: v })} multiline />
                  <AdminField label="البنود (سطر لكل بند)" value={service.items.join("\n")} onChange={(v) => updateLines(service.slug, "items", v)} multiline />
                  <AdminField label="الخطوات (سطر لكل خطوة)" value={service.steps.join("\n")} onChange={(v) => updateLines(service.slug, "steps", v)} multiline />
                  <button onClick={() => removeService(service.slug)} className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" /> حذف الخدمة
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

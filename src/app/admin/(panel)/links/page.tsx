"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import type { ImportantLink } from "@/lib/db/types";

export default function AdminLinksPage() {
  const [links, setLinks] = useState<ImportantLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/links")
      .then((r) => r.json())
      .then(setLinks)
      .finally(() => setLoading(false));
  }, []);

  async function addLink() {
    const res = await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "رابط جديد", href: "https://" }),
    });
    const newLink = await res.json();
    setLinks((prev) => [...prev, newLink]);
  }

  async function saveLink(link: ImportantLink) {
    setSaving(link.id);
    const res = await fetch("/api/admin/links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "فشل الحفظ");
    }
    setSaving(null);
  }

  async function deleteLink(id: string) {
    if (!confirm("هل تريد حذف هذا الرابط؟")) return;
    await fetch(`/api/admin/links?id=${id}`, { method: "DELETE" });
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, field: keyof ImportantLink, value: string) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-cream">روابط هامة</h1>
          <p className="text-cream/50 text-sm mt-1">إضافة وتعديل وحذف الروابط</p>
        </div>
        <button
          onClick={addLink}
          className="flex items-center gap-2 bg-gold text-black font-bold px-5 py-2.5 rounded-sm hover:bg-gold-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة رابط
        </button>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="card-elevated rounded-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/60 text-xs mb-1">العنوان</label>
                <input
                  value={link.title}
                  onChange={(e) => updateLink(link.id, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-cream/60 text-xs mb-1">الرابط</label>
                <input
                  value={link.href}
                  onChange={(e) => updateLink(link.id, "href", e.target.value)}
                  className="w-full px-3 py-2 rounded-sm text-sm"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => saveLink(link)}
                disabled={saving === link.id}
                className="flex items-center gap-1 text-sm text-gold hover:text-gold-light"
              >
                {saving === link.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
                حفظ
              </button>
              <button
                onClick={() => deleteLink(link.id)}
                className="flex items-center gap-1 text-sm text-cream/50 hover:text-red-400"
              >
                <Trash2 className="w-3 h-3" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

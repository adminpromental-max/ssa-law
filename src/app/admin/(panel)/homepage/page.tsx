"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import type { HomepageContent } from "@/lib/db/types";

export default function AdminHomepagePage() {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((r) => r.json())
      .then(setHomepage)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!homepage) return;
    setSaving(true);
    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(homepage),
    });
    setSaving(false);
    setMessage(res.ok ? "تم الحفظ" : "فشل الحفظ");
  }

  if (loading || !homepage) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <AdminSaveBar
        title="محتوى الرئيسية"
        description="نصوص أقسام الصفحة الرئيسية"
        saving={saving}
        message={message}
        onSave={save}
      />

      <div className="space-y-6">
        <Section title="الهيرو">
          <AdminField label="الوصف" value={homepage.heroDescription} onChange={(v) => setHomepage({ ...homepage, heroDescription: v })} multiline />
        </Section>

        <Section title="من نحن">
          <AdminField label="العنوان الفرعي" value={homepage.aboutSubtitle} onChange={(v) => setHomepage({ ...homepage, aboutSubtitle: v })} />
          <AdminField label="العنوان" value={homepage.aboutTitle} onChange={(v) => setHomepage({ ...homepage, aboutTitle: v })} />
          {homepage.aboutParagraphs.map((p, i) => (
            <AdminField
              key={i}
              label={`فقرة ${i + 1}`}
              value={p}
              onChange={(v) => {
                const paragraphs = [...homepage.aboutParagraphs];
                paragraphs[i] = v;
                setHomepage({ ...homepage, aboutParagraphs: paragraphs });
              }}
              multiline
            />
          ))}
        </Section>

        <Section title="قيم المكتب">
          {homepage.values.map((val, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3 pb-3 border-b border-gold/10 last:border-0">
              <AdminField label="العنوان" value={val.title} onChange={(v) => {
                const values = [...homepage.values];
                values[i] = { ...values[i], title: v };
                setHomepage({ ...homepage, values });
              }} />
              <AdminField label="الوصف" value={val.description} onChange={(v) => {
                const values = [...homepage.values];
                values[i] = { ...values[i], description: v };
                setHomepage({ ...homepage, values });
              }} />
            </div>
          ))}
        </Section>

        <Section title="لماذا نحن">
          {homepage.whyUsItems.map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              <AdminField label={`نقطة ${i + 1}`} value={item} onChange={(v) => {
                const whyUsItems = [...homepage.whyUsItems];
                whyUsItems[i] = v;
                setHomepage({ ...homepage, whyUsItems });
              }} />
              <button type="button" onClick={() => setHomepage({ ...homepage, whyUsItems: homepage.whyUsItems.filter((_, j) => j !== i) })} className="text-cream/40 hover:text-red-400 mt-6">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setHomepage({ ...homepage, whyUsItems: [...homepage.whyUsItems, ""] })} className="text-sm text-gold flex items-center gap-1">
            <Plus className="w-4 h-4" /> إضافة نقطة
          </button>
        </Section>

        <Section title="قسم فريق العمل (النص)">
          <AdminField label="العنوان الرئيسي" value={homepage.teamPreviewHeading} onChange={(v) => setHomepage({ ...homepage, teamPreviewHeading: v })} multiline />
          <AdminField label="سطر القيادة" value={homepage.teamLeaderLine} onChange={(v) => setHomepage({ ...homepage, teamLeaderLine: v })} />
          <p className="text-cream/40 text-xs">نبذة المحامي وصورته من تاب «فريق العمل»</p>
        </Section>

        <Section title="الخدمات والمقالات">
          <AdminField label="عنوان قسم الخدمات" value={homepage.servicesSectionTitle} onChange={(v) => setHomepage({ ...homepage, servicesSectionTitle: v })} />
          <AdminField label="وصف قسم الخدمات" value={homepage.servicesSectionDescription} onChange={(v) => setHomepage({ ...homepage, servicesSectionDescription: v })} />
          <AdminField label="عنوان المقالات" value={homepage.articlesSectionTitle} onChange={(v) => setHomepage({ ...homepage, articlesSectionTitle: v })} />
          <AdminField label="وصف المقالات" value={homepage.articlesSectionDescription} onChange={(v) => setHomepage({ ...homepage, articlesSectionDescription: v })} />
        </Section>

        <Section title="دعوة للتواصل">
          <AdminField label="العنوان" value={homepage.ctaTitle} onChange={(v) => setHomepage({ ...homepage, ctaTitle: v })} />
          <AdminField label="الوصف" value={homepage.ctaDescription} onChange={(v) => setHomepage({ ...homepage, ctaDescription: v })} multiline />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-elevated rounded-sm p-6 space-y-4">
      <h2 className="text-gold font-bold">{title}</h2>
      {children}
    </section>
  );
}

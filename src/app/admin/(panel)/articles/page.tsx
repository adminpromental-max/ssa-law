"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DragSortItem, useDragReorder } from "@/components/admin/DragSort";
import { IMAGE_SIZE_HINTS } from "@/lib/db/defaults";
import type { ArticleRecord } from "@/lib/db/types";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const drag = useDragReorder(articles, setArticles);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/articles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articles),
    });
    setSaving(false);
    setMessage(res.ok ? "تم الحفظ" : "فشل الحفظ");
  }

  async function addArticle() {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "مقال جديد" }),
    });
    const a = await res.json();
    setArticles((prev) => [a, ...prev]);
  }

  async function removeArticle(id: string) {
    if (!confirm("حذف هذا المقال؟")) return;
    await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  function updateArticle(id: string, patch: Partial<ArticleRecord>) {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
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
      <div className="flex flex-wrap justify-between gap-4 mb-2">
        <AdminSaveBar
          title="المقالات"
          description="المقالات المعروضة في الرئيسية — اسحب لترتيب الظهور"
          saving={saving}
          message={message}
          onSave={save}
        />
        <button onClick={addArticle} className="flex items-center gap-2 bg-gold/15 text-gold px-4 py-2 rounded-sm text-sm h-fit">
          <Plus className="w-4 h-4" /> مقال جديد
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {articles.map((article, index) => (
          <DragSortItem
            key={article.id}
            index={index}
            onDragStart={drag.onDragStart}
            onDragOver={drag.onDragOver}
            onDrop={drag.onDrop}
            isDragging={drag.isDragging(index)}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="العنوان" value={article.title} onChange={(v) => updateArticle(article.id, { title: v })} />
              <AdminField label="تاريخ النشر" value={article.publishDate} onChange={(v) => updateArticle(article.id, { publishDate: v })} type="date" dir="ltr" />
              <AdminField label="Slug" value={article.slug} onChange={(v) => updateArticle(article.id, { slug: v })} dir="ltr" />
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <AdminField label="مقتطف" value={article.excerpt || ""} onChange={(v) => updateArticle(article.id, { excerpt: v })} multiline />
              <ImageUploadField
                label="صورة الغلاف"
                value={article.image}
                onChange={(url) => updateArticle(article.id, { image: url })}
                folder="articles"
                sizeHint={IMAGE_SIZE_HINTS.article}
              />
            </div>
            <AdminField label="المحتوى (للمستقبل)" value={article.content || ""} onChange={(v) => updateArticle(article.id, { content: v })} multiline />
            <button onClick={() => removeArticle(article.id)} className="mt-3 flex items-center gap-1 text-sm text-red-400">
              <Trash2 className="w-4 h-4" /> حذف
            </button>
          </DragSortItem>
        ))}
      </div>
    </div>
  );
}

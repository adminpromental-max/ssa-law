"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DragSortItem, useDragReorder } from "@/components/admin/DragSort";
import { IMAGE_SIZE_HINTS } from "@/lib/db/defaults";
import type { ClientRecord } from "@/lib/db/types";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const drag = useDragReorder(clients, setClients);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/clients", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clients),
    });
    setSaving(false);
    setMessage(res.ok ? "تم الحفظ" : "فشل الحفظ");
  }

  async function addClient() {
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const c = await res.json();
    setClients((prev) => [...prev, c]);
  }

  async function removeClient(id: string) {
    if (!confirm("حذف هذا العميل؟")) return;
    await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  function updateClient(id: string, patch: Partial<ClientRecord>) {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
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
          title="العملاء"
          description="لوجوهات الجهات — اسحب لإعادة الترتيب في السلاider"
          saving={saving}
          message={message}
          onSave={save}
        />
        <button onClick={addClient} className="flex items-center gap-2 bg-gold/15 text-gold px-4 py-2 rounded-sm text-sm h-fit">
          <Plus className="w-4 h-4" /> عميل جديد
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {clients.map((client, index) => (
          <DragSortItem
            key={client.id}
            index={index}
            onDragStart={drag.onDragStart}
            onDragOver={drag.onDragOver}
            onDrop={drag.onDrop}
            isDragging={drag.isDragging(index)}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="الاسم الكامل" value={client.name} onChange={(v) => updateClient(client.id, { name: v })} />
              <AdminField label="الاسم المختصر" value={client.shortName} onChange={(v) => updateClient(client.id, { shortName: v })} />
              <AdminField label="الاختصار (بدون لogo)" value={client.initials} onChange={(v) => updateClient(client.id, { initials: v })} dir="ltr" />
              <AdminField label="الوصف" value={client.description} onChange={(v) => updateClient(client.id, { description: v })} />
            </div>
            <div className="mt-4">
              <ImageUploadField
                label="لوجو العميل"
                value={client.logo}
                onChange={(url) => updateClient(client.id, { logo: url })}
                folder="clients"
                sizeHint={IMAGE_SIZE_HINTS.clientLogo}
              />
            </div>
            <button onClick={() => removeClient(client.id)} className="mt-3 flex items-center gap-1 text-sm text-red-400">
              <Trash2 className="w-4 h-4" /> حذف
            </button>
          </DragSortItem>
        ))}
      </div>
    </div>
  );
}

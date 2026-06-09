"use client";

import { useEffect, useState } from "react";
import { Trash2, Check, Loader2, Mail, CalendarCheck } from "lucide-react";
import type { ContactSubmission, BookingSubmission } from "@/lib/db/types";

export default function AdminSubmissionsPage() {
  const [contact, setContact] = useState<ContactSubmission[]>([]);
  const [booking, setBooking] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"contact" | "booking">("contact");

  async function load() {
    const res = await fetch("/api/admin/submissions");
    const data = await res.json();
    setContact(data.contact);
    setBooking(data.booking);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(type: "contact" | "booking", id: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, read: true }),
    });
    load();
  }

  async function remove(type: "contact" | "booking", id: string) {
    if (!confirm("هل تريد حذف هذا الطلب؟")) return;
    await fetch(`/api/admin/submissions?type=${type}&id=${id}`, {
      method: "DELETE",
    });
    load();
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
      <h1 className="text-2xl font-bold text-cream mb-2">الطلبات الواردة</h1>
      <p className="text-cream/50 text-sm mb-6">
        طلبات التواصل والحجز من الموقع
      </p>

      <div className="flex gap-2 mb-8">
        <TabButton
          active={tab === "contact"}
          onClick={() => setTab("contact")}
          icon={Mail}
          label={`تواصل (${contact.length})`}
        />
        <TabButton
          active={tab === "booking"}
          onClick={() => setTab("booking")}
          icon={CalendarCheck}
          label={`حجز (${booking.length})`}
        />
      </div>

      {tab === "contact" && (
        <SubmissionList
          items={contact}
          type="contact"
          onMarkRead={markRead}
          onDelete={remove}
          render={(s) => (
            <>
              <p className="text-cream font-medium">{s.name}</p>
              <p className="text-cream/50 text-sm" dir="ltr">
                {s.phone}
              </p>
              <p className="text-gold text-sm mt-1">{s.subject}</p>
              <p className="text-cream/60 text-sm mt-2 leading-relaxed">
                {s.message}
              </p>
            </>
          )}
        />
      )}

      {tab === "booking" && (
        <SubmissionList
          items={booking}
          type="booking"
          onMarkRead={markRead}
          onDelete={remove}
          render={(s) => (
            <>
              <p className="text-cream font-medium">{s.name}</p>
              <p className="text-cream/50 text-sm" dir="ltr">
                {s.phone}
              </p>
              <p className="text-gold text-sm mt-1">{s.service}</p>
              {(s.preferredDate || s.preferredTime) && (
                <p className="text-cream/60 text-sm mt-1">
                  {s.preferredDate} — {s.preferredTime}
                </p>
              )}
              {s.notes && (
                <p className="text-cream/60 text-sm mt-2">{s.notes}</p>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-colors ${
        active
          ? "bg-gold/15 text-gold border border-gold/25"
          : "text-cream/60 hover:text-cream border border-gold/10"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function SubmissionList<T extends { id: string; read: boolean; createdAt: string }>({
  items,
  type,
  onMarkRead,
  onDelete,
  render,
}: {
  items: T[];
  type: "contact" | "booking";
  onMarkRead: (type: "contact" | "booking", id: string) => void;
  onDelete: (type: "contact" | "booking", id: string) => void;
  render: (item: T) => React.ReactNode;
}) {
  if (items.length === 0) {
    return <p className="text-cream/40 text-sm">لا توجد طلبات</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`card-elevated rounded-sm p-5 ${!item.read ? "border-gold/30" : ""}`}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">{render(item)}</div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              {!item.read && (
                <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-sm">
                  جديد
                </span>
              )}
              <span className="text-cream/40 text-xs">
                {new Date(item.createdAt).toLocaleDateString("ar-SA")}
              </span>
              <div className="flex gap-2">
                {!item.read && (
                  <button
                    onClick={() => onMarkRead(type, item.id)}
                    className="text-cream/50 hover:text-gold"
                    title="تحديد كمقروء"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(type, item.id)}
                  className="text-cream/50 hover:text-red-400"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

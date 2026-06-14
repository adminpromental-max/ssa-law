"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { CalendarCheck, CheckCircle } from "lucide-react";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          service: data.get("service"),
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          notes: data.get("notes"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-cream mb-2">
          تم استلام طلب الحجز
        </h3>
        <p className="text-cream/60 max-w-md mx-auto">
          شكراً لثقتكم. سيقوم فريق المكتب بالتواصل معكم لتأكيد الموعد في أقرب
          وقت ممكن.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-gold hover:underline text-sm"
        >
          حجز موعد آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-cream/80 text-sm mb-2">
            الاسم الكامل *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-sm"
            placeholder="أدخل اسمك"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-cream/80 text-sm mb-2">
            رقم الجوال *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-sm"
            placeholder="05xxxxxxxx"
            dir="ltr"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-cream/80 text-sm mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 rounded-sm"
          placeholder="example@email.com"
          dir="ltr"
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-cream/80 text-sm mb-2">
          نوع الاستشارة *
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full px-4 py-3 rounded-sm"
        >
          <option value="">اختر نوع الاستشارة</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="أخرى">أخرى</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="preferredDate"
            className="block text-cream/80 text-sm mb-2"
          >
            التاريخ المفضل
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className="w-full px-4 py-3 rounded-sm"
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor="preferredTime"
            className="block text-cream/80 text-sm mb-2"
          >
            الوقت المفضل
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            className="w-full px-4 py-3 rounded-sm"
          >
            <option value="">اختر الوقت</option>
            <option value="صباحاً (10:00 AM - 12:00 PM)">
              صباحاً (10:00 AM - 12:00 PM)
            </option>
            <option value="مساءً (12:00 PM - 3:30 PM)">
              مساءً (12:00 PM - 3:30 PM)
            </option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="block text-cream/80 text-sm mb-2">
          تفاصيل إضافية
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full px-4 py-3 rounded-sm resize-none"
          placeholder="أخبرنا باختصار عن استشارتك..."
        />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        <CalendarCheck className="w-5 h-5 ml-2" />
        {loading ? "جاري الإرسال..." : "إرسال طلب الحجز"}
      </Button>
    </form>
  );
}

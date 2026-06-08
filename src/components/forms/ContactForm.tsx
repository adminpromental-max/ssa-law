"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
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
        <h3 className="text-2xl font-bold text-cream mb-2">تم إرسال رسالتك</h3>
        <p className="text-cream/60">
          شكراً لتواصلك معنا. سيقوم فريق المكتب بالرد عليك في أقرب وقت.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-gold hover:underline text-sm"
        >
          إرسال رسالة أخرى
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
        <label htmlFor="subject" className="block text-cream/80 text-sm mb-2">
          الموضوع *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-sm"
          placeholder="موضوع الرسالة"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-cream/80 text-sm mb-2">
          الرسالة *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-sm resize-none"
          placeholder="اكتب رسالتك هنا..."
        />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        <Send className="w-5 h-5 ml-2" />
        {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
      </Button>
    </form>
  );
}

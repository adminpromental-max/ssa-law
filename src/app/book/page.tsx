import type { Metadata } from "next";
import { CalendarCheck, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "حجز استشارة",
  description: "احجز موعد استشارتك القانونية مع مكتب صالح بن سلمان العمري",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        subtitle="حجز استشارة"
        title="احجز موعد استشارتك"
        description="املأ النموذج وسيتواصل معك فريق المكتب لتأكيد الموعد"
      />

      <section className="py-24 section-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-black-light border border-gold/10 rounded-sm p-6">
                <CalendarCheck className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-cream font-bold mb-2">كيف يعمل الحجز؟</h3>
                <ol className="text-cream/60 text-sm space-y-3 list-decimal list-inside">
                  <li>املأ نموذج الحجز بالبيانات المطلوبة</li>
                  <li>سيستلم فريق المكتب طلبك</li>
                  <li>سيتواصل معك أحد المختصين لتأكيد الموعد</li>
                  <li>احضر للاستشارة في الموعد المحدد</li>
                </ol>
              </div>

              <div className="bg-black-light border border-gold/10 rounded-sm p-6">
                <Clock className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-cream font-bold mb-2">أوقات العمل</h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  الأحد — الخميس
                  <br />
                  8:00 صباحاً — 5:00 مساءً
                </p>
              </div>

              <div className="bg-black-light border border-gold/10 rounded-sm p-6">
                <h3 className="text-cream font-bold mb-2">للاستفسار العاجل</h3>
                <p className="text-cream/60 text-sm mb-4">
                  تواصل مباشرة عبر واتساب
                </p>
                <WhatsAppLink
                  phone={siteConfig.contact.mobile}
                  className="text-gold"
                  showNumber="always"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-black-light border border-gold/10 rounded-sm p-8 md:p-10">
                <h2 className="text-2xl font-bold text-cream mb-2">
                  نموذج حجز الاستشارة
                </h2>
                <p className="text-cream/60 text-sm mb-8">
                  جميع الحقول المميزة بـ (*) إلزامية
                </p>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

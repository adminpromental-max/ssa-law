import type { Metadata } from "next";
import { Phone, Mail, MapPin, Printer, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "العنوان",
    value: siteConfig.contact.address,
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Phone,
    label: "الجوال",
    value: siteConfig.contact.mobile,
    href: `tel:${siteConfig.contact.mobile}`,
  },
  {
    icon: Printer,
    label: "الفاكس",
    value: siteConfig.contact.fax,
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Clock,
    label: "الموقع الإلكتروني",
    value: siteConfig.contact.website,
    href: `https://${siteConfig.contact.website}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        subtitle="تواصل معنا"
        title="نحن هنا لخدمتكم"
        description="لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة قانونية"
      />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-cream mb-8">
                بيانات التواصل
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-sm mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-cream hover:text-gold transition-colors"
                          dir="ltr"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-cream">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-black-light border border-gold/10 rounded-sm p-6">
                <h3 className="text-gold font-bold mb-3">واتساب</h3>
                <p className="text-cream/60 text-sm mb-4">
                  للتواصل السريع عبر واتساب
                </p>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-sm text-sm hover:opacity-90 transition-opacity"
                >
                  تواصل عبر واتساب
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-black-light border border-gold/10 rounded-sm p-8 md:p-10">
                <h2 className="text-2xl font-bold text-cream mb-2">
                  أرسل لنا رسالة
                </h2>
                <p className="text-cream/60 text-sm mb-8">
                  املأ النموذج وسيتواصل معك فريق المكتب في أقرب وقت
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

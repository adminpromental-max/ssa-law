import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactPhones } from "@/components/ui/ContactPhones";
import { OfficeMap } from "@/components/ui/OfficeMap";
import { MAP_URL } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { getSiteSettings } from "@/lib/content";
import { resolveSiteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const site = await getSiteSettings();
  const contact = resolveSiteContact(site);

  return (
    <>
      <PageHero
        subtitle="تواصل معنا"
        title="نحن هنا لخدمتكم"
        description="لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة قانونية"
      />

      <section className="py-24 section-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-cream mb-8 leading-snug">
                بيانات التواصل
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/50 text-sm mb-1">العنوان</p>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      {contact.address}
                    </a>
                  </div>
                </div>

                <ContactPhones site={site} size="md" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/50 text-sm mb-1">البريد الإلكتروني</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-cream hover:text-gold transition-colors"
                    >
                      أرسل إيميل
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/50 text-sm mb-1">أوقات العمل</p>
                    <p className="text-cream text-sm">
                      {siteConfig.workingHours.days}
                      <br />
                      <span dir="ltr">{siteConfig.workingHours.hours}</span>
                    </p>
                  </div>
                </div>

                <OfficeMap />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="card-elevated rounded-sm p-8 md:p-10">
                <h2 className="text-2xl font-bold text-cream mb-2 leading-snug">
                  أرسل لنا رسالة
                </h2>
                <p className="text-cream/60 text-sm mb-8">
                  املأ النموذج وسيتواصل معك فريق المكتب في أقرب وقت. الطلبات
                  تصل أيضاً إلى لوحة التحكم.
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

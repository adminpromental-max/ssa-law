import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات قانونية شاملة: استشارات، عقود، تحكيم، تأسيس شركات، توثيق، وقضايا متخصصة",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        subtitle="خدماتنا"
        title="مجالات الخدمات القانونية"
        description="نقدم حزمة متكاملة من الخدمات القانونية تغطي جميع احتياجاتكم الفردية والتجارية"
      />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="هل تحتاج خدمة قانونية محددة؟"
            description="تواصل معنا أو احجز استشارة وسيقوم فريقنا بمساعدتك في تحديد الخدمة المناسبة لحالتك"
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/book" size="lg">
              احجز استشارة
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

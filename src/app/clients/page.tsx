import type { Metadata } from "next";
import { Users, Building, Award } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients } from "@/data/clients";

export const metadata: Metadata = {
  title: "عملاؤنا",
  description:
    "جهات وشركات اعتمدت على خدمات مكتب صالح بن سلمان العمري للمحاماة",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        subtitle="عملاؤنا"
        title="ثقة عملائنا شهادة نعتز بها"
        description="اكتسبنا ثقة العديد من الجهات الرسمية والشركات الوطنية الرائدة في المملكة"
      />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="شركاء النجاح"
            title="جهات اعتمدت على خدماتنا"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clients.map((client) => (
              <div
                key={client.shortName}
                className="bg-black-light border border-gold/10 rounded-sm p-10 text-center hover:border-gold/30 hover:gold-glow transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-cream mb-2">
                  {client.shortName}
                </h3>
                <p className="text-cream/60 text-sm mb-4">{client.name}</p>
                <span className="inline-block text-xs bg-gold/10 text-gold px-3 py-1 rounded-sm">
                  {client.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-light section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="لماذا يثقون بنا"
            title="ما يميز علاقتنا بعملائنا"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <Award className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">
                خبرة مثبتة
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                سجل حافل في تقديم خدمات قانونية لجهات رسمية وشركات كبرى
              </p>
            </div>
            <div className="text-center p-8">
              <Users className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">
                فريق متخصص
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                خبراء قانونيون بمؤهلات عالية يخدمون كل عميل بعناية فائقة
              </p>
            </div>
            <div className="text-center p-8">
              <Building className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">
                نتائج ملموسة
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                استراتيجيات فعالة لحماية مصالح عملائنا وتحقيق أهدافهم
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

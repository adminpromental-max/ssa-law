import type { Metadata } from "next";
import { Shield, Target, Heart, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { communityWork } from "@/data/clients";
import { values } from "@/data/site";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        subtitle="من نحن"
        title="مكتب صالح بن سلمان العمري"
        description="شركة مهنية متخصصة في تقديم الخدمات القانونية والاستشارات والتوثيق"
      />

      <section className="py-24 section-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                subtitle="قصتنا"
                title="خبرة تمتد عبر السنوات"
                align="right"
                light
              />
              <div className="space-y-6 text-cream/70 leading-relaxed">
                <p>
                  مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية
                  والتوثيق شركة مهنية يوفر حزمة شاملة من الخدمات القانونية.
                  نحن قادرون على التعامل مع القضايا بشتى أصنافها من جنائية
                  وعمالية والنزاعات التجارية المعقدة، وتأسيس الشركات بأنواعها،
                  وتقسيم التركات.
                </p>
                <p>
                  نؤمن بقوة مكتبنا من خلال ممارستنا الطويلة ومزيج المهارات
                  المتخصصة عالية المستوى والحاصلة على التأهيل المهني والعلمي،
                  مما أتاح لنا أن نكون من أكثر المؤسسات القانونية فعالية في
                  المملكة العربية السعودية.
                </p>
                <p>
                  هدفنا توفير وتنفيذ استراتيجيات لحماية الأصول التجارية
                  لعملائنا ومصالحهم. ندرك أن احتياجات عملائنا فريدة من نوعها،
                  وبالتالي نقدم خدمات تتناسب مع متطلبات كل عميل بعينه.
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                subtitle="فلسفتنا"
                title="قيمنا ورسالتنا"
                align="right"
                light
              />
              <div className="card-elevated border border-gold/10 rounded-sm p-8">
                <p className="text-cream/70 leading-relaxed mb-6">
                  فلسفتنا هي التفاني الكامل للجودة النوعية والاستجابة والسرية
                  والفعالية، والاستخدام الأمثل للتكنولوجيا. ندرك الحاجة إلى
                  المرونة والانفتاحية والإبداع في جميع مجالات الأعمال
                  القانونية.
                </p>
                <div className="space-y-4">
                  {values.map((v) => (
                    <div key={v.title} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="text-cream font-medium">{v.title}</p>
                        <p className="text-cream/50 text-sm">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 section-warm section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="رؤيتنا"
            title="ما نسعى لتحقيقه"
            description="نطمح لأن نكون الخيار الأول للخدمات القانونية في المملكة"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="section-deep border border-gold/10 rounded-sm p-8 text-center">
              <Target className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">رسالتنا</h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                تقديم خدمات قانونية متميزة تحمي مصالح عملائنا وتحقق نتائج
                استثنائية
              </p>
            </div>
            <div className="section-deep border border-gold/10 rounded-sm p-8 text-center">
              <Heart className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">قيمنا</h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                الجودة، السرية، الاستجابة، الفعالية، والتفاني في خدمة
                العملاء
              </p>
            </div>
            <div className="section-deep border border-gold/10 rounded-sm p-8 text-center">
              <GraduationCap className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-cream font-bold text-lg mb-3">خبرتنا</h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                فريق مؤهل بمؤهلات علمية ومهنية عالية في جميع مجالات القانون
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 section-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="المسؤولية المجتمعية"
            title="العمل المجتمعي"
            description="نساهم في تنمية الكوادر الوطنية من خلال برامج التدريب والتأهيل"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {communityWork.map((item) => (
              <div
                key={item.title}
                className="card-elevated border border-gold/10 rounded-sm p-8 hover:border-gold/30 transition-colors"
              >
                <GraduationCap className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-cream font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-cream/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import {
  ArrowLeft,
  Shield,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { HeroNamePlate } from "@/components/ui/HeroNamePlate";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VisitorCounter } from "@/components/ui/VisitorCounter";
import { ImportantLinks } from "@/components/sections/ImportantLinks";
import { TeamOrgChart } from "@/components/team/TeamOrgChart";
import { getServices, getTeamStructure } from "@/lib/content";
import { clients } from "@/data/clients";
import { siteConfig, values, stats } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, teamStructure] = await Promise.all([
    getServices(),
    getTeamStructure(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center section-hero-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/8 via-transparent to-gold-muted/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />
        <div className="hidden md:block absolute bottom-10 left-10 w-64 h-64 bg-gold/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-14">
            <div className="w-full lg:flex-1 flex justify-center lg:justify-start order-1">
              <HeroNamePlate />
            </div>

            <div className="w-full lg:flex-1 order-2 text-center lg:text-end">
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 mb-5">
                <div className="inline-flex items-center gap-2 bg-white/75 border border-gold/30 rounded-sm px-3 py-2 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span className="text-gold-dark text-xs font-medium whitespace-nowrap">
                    ترخيص {siteConfig.license}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/75 border border-gold/30 rounded-sm px-3 py-2 shadow-sm">
                  <span className="text-gold-dark text-xs font-medium whitespace-nowrap">
                    تأسس منذ عام {siteConfig.foundedYear}
                  </span>
                </div>
              </div>

              <p className="text-black/70 text-sm sm:text-base leading-relaxed mb-7 max-w-md mx-auto lg:mx-0 lg:ms-auto">
                خبرة قانونية متميزة في جميع المجالات — من الاستشارات والعقود إلى
                التحكيم والتوثيق. نضمن لكم أفضل الخدمات القانونية بسرية وفعالية.
              </p>

              <div className="flex flex-col items-center lg:items-end gap-5">
                <Button
                  href="/services"
                  size="lg"
                  className="w-full max-w-sm sm:max-w-md px-10"
                >
                  خدماتنا
                </Button>
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 section-warm border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-2">
                <p className="text-3xl md:text-4xl font-bold gold-text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-cream/60 text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 sm:py-24 section-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                subtitle="من نحن"
                title="خبرة قانونية تضمن نتائج"
                align="right"
              />
              <p className="text-cream/70 leading-relaxed mb-6">
                مكتب صالح بن سلمان العمري شركة مهنية متخصصة في تقديم حزمة
                شاملة من الخدمات القانونية. نتعامل مع القضايا بشتى أصنافها من
                جنائية وعمالية والنزاعات التجارية المعقدة، وتأسيس الشركات
                وتقسيم التركات.
              </p>
              <p className="text-cream/70 leading-relaxed mb-8">
                هدفنا توفير استراتيجيات لحماية الأصول التجارية لعملائنا
                ومصالحهم، مع تقديم خدمات تتناسب مع متطلبات كل عميل بعينه.
              </p>
              <Button href="/about" variant="secondary">
                اعرف المزيد عنا
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, index) => (
                <ScrollReveal
                  key={v.title}
                  variant="fade-up"
                  delay={index * 100}
                >
                  <div className="value-card-motion card-elevated rounded-sm p-6 h-full">
                    <Shield className="w-8 h-8 text-gold mb-4" />
                    <h3 className="text-cream font-bold mb-2 leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 section-soft section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="خدماتنا"
            title="مجالات الخدمات القانونية"
            description="نقدم حزمة متكاملة من الخدمات القانونية تغطي جميع احتياجاتكم"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.slug}
                variant={index % 2 === 0 ? "slide-right" : "slide-left"}
                delay={index * 80}
              >
                <ServiceCard {...service} goldFrame />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/services" variant="outline">
              عرض جميع الخدمات
            </Button>
          </div>
        </div>
      </section>

      <ImportantLinks />

      {/* Clients */}
      <section className="py-16 sm:py-24 section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="ثقة عملائنا"
            title="جهات اعتمدت على خدماتنا"
            description="اكتسبنا ثقة العديد من الجهات الرسمية والشركات الوطنية الرائدة"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.shortName}
                className="card-elevated rounded-sm p-8 text-center hover:border-gold/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-cream font-bold mb-2 leading-snug">
                  {client.shortName}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-16 sm:py-24 section-accent section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="فريق العمل"
            title="الهيكل الإداري للمكتب"
            description="فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته"
          />
          <TeamOrgChart structure={teamStructure} compact />
          <div className="text-center mt-12">
            <Button href="/team" variant="outline">
              تعرف على الفريق بالكامل
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 section-deep section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="لماذا نحن" title="ما يميز مكتبنا" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "خبرة طويلة في ممارسة القانون بشتى مجالاته",
              "فريق متخصص ذو مؤهلات علمية ومهنية عالية",
              "ثقة جهات رسمية وشركات وطنية رائدة",
              "سرية تامة وفعالية في تحقيق النتائج",
              "مرونة وإبداع في جميع مجالات الأعمال القانونية",
              "خدمات مخصصة تتناسب مع احتياجات كل عميل",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-cream/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 section-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-text-gradient mb-6 leading-snug px-2">
            هل تحتاج استشارة قانونية؟
          </h2>
          <p className="text-cream/70 text-lg mb-10 leading-relaxed">
            تواصل معنا اليوم واحجز موعد استشارتك. فريقنا جاهز لخدمتكم.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button href="/book" size="lg">
              احجز استشارة
            </Button>
            <WhatsAppLink
              phone={siteConfig.contact.mobiles[0]}
              label="جوال"
              className="text-cream border border-gold/30 rounded-sm px-6 py-3 hover:border-[#25D366]"
              showNumber="always"
            />
          </div>
        </div>
      </section>
    </>
  );
}

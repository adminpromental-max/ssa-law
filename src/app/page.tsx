import {
  ArrowLeft,
  Shield,
  Award,
  Users,
  CheckCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TeamCard } from "@/components/ui/TeamCard";
import { services } from "@/data/services";
import { teamMembers } from "@/data/team";
import { clients } from "@/data/clients";
import { siteConfig, values, stats } from "@/data/site";

export default function HomePage() {
  const leadMember = teamMembers.find((m) => m.isLead);
  const otherMembers = teamMembers.filter((m) => !m.isLead).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center bg-black section-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/10 via-transparent to-transparent" />
        <div className="hidden md:block absolute top-1/4 left-1/4 w-72 md:w-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-sm px-3 sm:px-4 py-2 mb-6 sm:mb-8 max-w-full">
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span className="text-gold text-xs sm:text-sm">
                شركة مهنية · ترخيص {siteConfig.license}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6 break-words">
              <span className="text-cream">{siteConfig.name}</span>
              <br />
              <span className="gold-text-gradient">
                للمحاماة والاستشارات القانونية
              </span>
            </h1>
            <p className="text-cream/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              خبرة قانونية متميزة في جميع المجالات — من الاستشارات والعقود إلى
              التحكيم والتوثيق. نضمن لكم أفضل الخدمات القانونية بسرية وفعالية.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button href="/book" size="lg" className="w-full sm:w-auto">
                احجز استشارة
              </Button>
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                استكشف خدماتنا
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-black-light border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold gold-text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-cream/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 sm:py-24 bg-black">
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
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-black-light border border-gold/10 rounded-sm p-6 hover:border-gold/30 transition-colors"
                >
                  <Shield className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-cream font-bold mb-2">{v.title}</h3>
                  <p className="text-cream/50 text-sm">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-black-light section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="خدماتنا"
            title="مجالات الخدمات القانونية"
            description="نقدم حزمة متكاملة من الخدمات القانونية تغطي جميع احتياجاتكم"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/services" variant="outline">
              عرض جميع الخدمات
            </Button>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 sm:py-24 bg-black">
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
                className="bg-black-light border border-gold/10 rounded-sm p-8 text-center hover:border-gold/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-cream font-bold mb-2">{client.shortName}</h3>
                <p className="text-cream/50 text-sm">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-16 sm:py-24 bg-black-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="فريق العمل"
            title="خبراء قانونيون مؤهلون"
            description="فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadMember && <TeamCard member={leadMember} />}
            {otherMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/team" variant="outline">
              تعرف على الفريق بالكامل
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 bg-black section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="لماذا نحن"
            title="ما يميز مكتبنا"
          />
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
                <p className="text-cream/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-black-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold gold-text-gradient mb-6">
            هل تحتاج استشارة قانونية؟
          </h2>
          <p className="text-cream/70 text-lg mb-10">
            تواصل معنا اليوم واحجز موعد استشارتك. فريقنا جاهز لخدمتكم.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/book" size="lg">
              احجز استشارة
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              <Phone className="w-5 h-5 ml-2" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

import { ArrowLeft, Shield, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactQuickActions } from "@/components/ui/ContactQuickActions";
import { HeroNamePlate } from "@/components/ui/HeroNamePlate";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatsBanner } from "@/components/sections/StatsBanner";
import { ServicesBar } from "@/components/sections/ServicesBar";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { TeamLeaderPreview } from "@/components/sections/TeamLeaderPreview";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { ImportantLinks } from "@/components/sections/ImportantLinks";
import {
  getServices,
  getTeamStructure,
  getSiteSettings,
  getHomepageContent,
  getClients,
  getLatestArticles,
  getStatsCounts,
  getVisitorCount,
} from "@/lib/content";
import { getOfficeExperienceYears, formatFoundedYearDisplay } from "@/lib/experience";
import { resolveSiteContact } from "@/lib/site-contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    services,
    teamStructure,
    site,
    homepage,
    clients,
    latestArticles,
    stats,
    visitorCount,
  ] = await Promise.all([
    getServices(),
    getTeamStructure(),
    getSiteSettings(),
    getHomepageContent(),
    getClients(),
    getLatestArticles(3),
    getStatsCounts(),
    getVisitorCount(),
  ]);

  const contact = resolveSiteContact(site);

  return (
    <>
      <section className="relative min-h-[100dvh] flex items-center justify-center section-hero-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/8 via-transparent to-gold-muted/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />
        <div className="hidden md:block absolute bottom-10 left-10 w-64 h-64 bg-gold/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 flex justify-center">
          <div className="flex flex-col items-center text-center w-full max-w-2xl">
            <HeroNamePlate />

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <div className="inline-flex items-center gap-2 bg-white/75 border border-gold/30 rounded-sm px-3 py-2 shadow-sm">
                <Award className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                <span className="text-gold-dark text-xs font-medium whitespace-nowrap">
                  ترخيص {site.license}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/75 border border-gold/30 rounded-sm px-3 py-2 shadow-sm">
                <span className="text-gold-dark text-xs font-medium whitespace-nowrap">
                  تأسس منذ عام {formatFoundedYearDisplay(site.foundedYear)}
                </span>
              </div>
            </div>

            <p className="text-black/70 text-sm sm:text-base leading-relaxed mt-6 mb-8 max-w-xl mx-auto text-center">
              {homepage.heroDescription}
            </p>

            <Button href="/services" size="lg" className="w-full max-w-sm sm:max-w-md px-10 mx-auto">
              خدماتنا
            </Button>
          </div>
        </div>
      </section>

      <StatsBanner
        casesBase={stats.casesBase}
        experienceYears={getOfficeExperienceYears()}
        requestsCount={stats.requestsCount}
        initialVisitors={visitorCount}
      />

      <section className="py-16 sm:py-24 section-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                subtitle={homepage.aboutSubtitle}
                title={homepage.aboutTitle}
                align="right"
              />
              {homepage.aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-cream/70 leading-relaxed mb-6 last:mb-8"
                >
                  {paragraph}
                </p>
              ))}
              <Button href="/about" variant="secondary">
                اعرف المزيد عنا
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {homepage.values.map((v, index) => (
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

      <section className="py-12 sm:py-16 section-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <SectionHeading
            subtitle={homepage.servicesSectionSubtitle}
            title={homepage.servicesSectionTitle}
            description={homepage.servicesSectionDescription}
          />
        </div>
        <ServicesBar services={services} />
        <div className="text-center mt-10 px-4">
          <Button href="/services" variant="outline">
            عرض جميع الخدمات
          </Button>
        </div>
      </section>

      <ImportantLinks />

      <ClientsMarquee clients={clients} />

      <TeamLeaderPreview
        leader={teamStructure.generalManager}
        heading={homepage.teamPreviewHeading}
        leaderLine={homepage.teamLeaderLine}
      />

      <section className="py-24 section-deep section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="لماذا نحن" title="ما يميز مكتبنا" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {homepage.whyUsItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-cream/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 section-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-text-gradient mb-6 leading-snug px-2">
            {homepage.ctaTitle}
          </h2>
          <p className="text-cream/70 text-lg mb-10 leading-relaxed">
            {homepage.ctaDescription}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button href="/book" size="lg">
              احجز استشارة
            </Button>
            <ContactQuickActions phone={contact.phone} size="md" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 section-accent section-pattern border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={homepage.articlesSectionSubtitle}
            title={homepage.articlesSectionTitle}
            description={homepage.articlesSectionDescription}
          />
          <LatestArticles articles={latestArticles} />
          <div className="text-center mt-10">
            <Button href="/articles" variant="outline">
              عرض جميع المقالات
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

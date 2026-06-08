import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "فريق العمل",
  description:
    "تعرف على فريق مكتب صالح بن سلمان العمري من الخبراء القانونيين والمستشارين",
};

export default function TeamPage() {
  const lead = teamMembers.find((m) => m.isLead);
  const others = teamMembers.filter((m) => !m.isLead);

  return (
    <>
      <PageHero
        subtitle="فريق العمل"
        title="خبراء قانونيون مؤهلون"
        description="فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته ومؤهلات علمية ومهنية عالية"
      />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {lead && (
            <div className="mb-16">
              <SectionHeading
                subtitle="القيادة"
                title="المدير العام"
                align="center"
                light
              />
              <div className="max-w-2xl mx-auto">
                <TeamCard member={lead} />
              </div>
            </div>
          )}

          <SectionHeading
            subtitle="الفريق"
            title="أعضاء فريق العمل"
            description="نخبة من المستشارين القانونيين والمتخصصين"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

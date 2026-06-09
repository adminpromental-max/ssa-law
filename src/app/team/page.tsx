import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TeamOrgChart } from "@/components/team/TeamOrgChart";
import { getTeamStructure } from "@/lib/content";

export const metadata: Metadata = {
  title: "فريق العمل",
  description:
    "تعرف على الهيكل الإداري وفريق مكتب صالح بن سلمان العمري من الخبراء القانونيين والمستشارين",
};

export default async function TeamPage() {
  const structure = await getTeamStructure();

  return (
    <>
      <PageHero
        subtitle="فريق العمل"
        title="الهيكل الإداري للمكتب"
        description="فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته ومؤهلات علمية ومهنية عالية"
      />

      <section className="py-16 sm:py-24 section-warm section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamOrgChart structure={structure} />
        </div>
      </section>
    </>
  );
}

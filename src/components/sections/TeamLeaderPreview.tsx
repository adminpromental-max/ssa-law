import Image from "next/image";
import Link from "next/link";
import { Landmark, ArrowLeft } from "lucide-react";
import type { TeamMember } from "@/data/team";

interface TeamLeaderPreviewProps {
  leader: TeamMember;
  heading?: string;
  leaderLine?: string;
}

export function TeamLeaderPreview({
  leader,
  heading = "فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته",
  leaderLine = "تحت قيادة المحامي: صالح بن سلمان العمري",
}: TeamLeaderPreviewProps) {
  const imageSrc =
    leader.homepageImage ??
    leader.image ??
    "/images/team/saleh-al-amri-home.png";

  return (
    <section className="section-team-light py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text — right side in RTL */}
          <div className="text-center lg:text-start order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black/85 leading-snug mb-5">
              {heading}
            </h2>

            <div className="flex justify-center lg:justify-start mb-6">
              <Landmark
                className="w-8 h-8 text-gold-dark"
                strokeWidth={1.25}
              />
            </div>

            <p className="text-gold-dark font-bold text-base sm:text-lg mb-5">
              {leaderLine}
            </p>

            <div className="space-y-4 text-black/65 text-sm sm:text-base leading-relaxed text-justify max-w-xl mx-auto lg:mx-0">
              {leader.bio ? (
                leader.bio.split("\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    {leader.qualifications ??
                      "مستشار قانوني ذو خبرة واسعة في مختلف مجالات القانون."}
                  </p>
                  <p>
                    يقود فريقاً متخصصاً من الخبراء القانونيين والمستشارين
                    لتقديم حلول قانونية متكاملة تلبي احتياجات الأفراد
                    والشركات والجهات الرسمية.
                  </p>
                </>
              )}
            </div>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Link
                href="/team"
                className="team-leader-cta inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                تعرف على فريق العمل
              </Link>
            </div>
          </div>

          {/* Photo — left side in RTL */}
          <div className="order-2 flex justify-center lg:justify-end">
            <div className="team-leader-photo relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(20,18,16,0.18)] bg-cream/5">
              <Image
                src={imageSrc}
                alt="المحامي صالح بن سلمان العمري"
                fill
                className="object-contain object-center p-2"
                sizes="(max-width: 1024px) 90vw, 420px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

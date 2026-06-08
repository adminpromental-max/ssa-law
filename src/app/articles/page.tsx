import type { Metadata } from "next";
import { BookOpen, Video, FileText, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "المقالات",
  description:
    "المقالات والفيديوهات القانونية — مرجع معرفي من مكتب صالح بن سلمان العمري",
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        subtitle="المعرفة القانونية"
        title="المقالات والمراجع"
        description="مكتبة معرفية قانونية تضم مقالات وفيديوهات تثقيفية — قريباً"
      />

      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black-light border border-gold/20 rounded-sm p-12 md:p-16">
            <div className="flex justify-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-sm bg-gold/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <div className="w-16 h-16 rounded-sm bg-gold/10 flex items-center justify-center">
                <Video className="w-8 h-8 text-gold" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-cream mb-4">
              قريباً — مكتبة معرفية قانونية
            </h2>
            <p className="text-cream/60 leading-relaxed mb-8 max-w-xl mx-auto">
              نعمل على إعداد مكتبة شاملة تضم مقالات قانونية وفيديوهات تثقيفية
              تغطي أهم المواضيع في القانون السعودي. ترقبوا المحتوى قريباً.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-black border border-gold/10 rounded-sm p-6">
                <FileText className="w-6 h-6 text-gold mx-auto mb-3" />
                <p className="text-cream/70 text-sm">مقالات قانونية</p>
              </div>
              <div className="bg-black border border-gold/10 rounded-sm p-6">
                <Video className="w-6 h-6 text-gold mx-auto mb-3" />
                <p className="text-cream/70 text-sm">فيديوهات تثقيفية</p>
              </div>
              <div className="bg-black border border-gold/10 rounded-sm p-6">
                <Clock className="w-6 h-6 text-gold mx-auto mb-3" />
                <p className="text-cream/70 text-sm">تحديثات دورية</p>
              </div>
            </div>

            <p className="text-cream/40 text-sm mb-6">
              هل لديكم محتوى جاهز للنشر؟ تواصلوا معنا لإضافته للمكتبة.
            </p>
            <Button href="/contact" variant="outline">
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="مواضيع متوقعة"
            title="ما ستجدونه في المكتبة"
            description="مجموعة من المواضيع القانونية المهمة التي سنغطيها"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              "نظام العمل السعودي وأهم التعديلات",
              "دليل التحكيم التجاري",
              "خطوات تأسيس شركة في السعودية",
              "حقوق الملكية الفكرية والعلامات التجارية",
              "التوثيق: ما تحتاج معرفته",
              "تقسيم التركات والوصايا الشرعية",
            ].map((topic) => (
              <div
                key={topic}
                className="bg-black border border-gold/10 rounded-sm px-6 py-4 text-cream/60 text-sm"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

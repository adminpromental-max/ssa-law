import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
  CheckCircle,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { services, getServiceBySlug } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "خدمة غير موجودة" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Scale;

  return (
    <>
      <PageHero subtitle="خدماتنا" title={service.title} />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-sm bg-gold/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <p className="text-cream/70 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-cream mb-6">
                ما نقدمه في هذه الخدمة
              </h2>
              <ul className="space-y-4 mb-12">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <span className="text-cream/70">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-cream mb-6">
                خطوات العمل
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {service.steps.map((step, i) => (
                  <div
                    key={step}
                    className="bg-black-light border border-gold/10 rounded-sm p-6"
                  >
                    <span className="text-gold font-bold text-2xl mb-2 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-cream/70">{step}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-cream mb-6">
                أسئلة شائعة
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-black-light border border-gold/10 rounded-sm p-6"
                  >
                    <h3 className="text-cream font-bold mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-black-light border border-gold/20 rounded-sm p-8 sticky top-28">
                <h3 className="text-xl font-bold text-cream mb-4">
                  اطلب هذه الخدمة
                </h3>
                <p className="text-cream/60 text-sm mb-6 leading-relaxed">
                  احجز استشارة مع أحد خبرائنا المتخصصين في هذا المجال
                </p>
                <Button href="/book" className="w-full mb-4">
                  احجز استشارة
                </Button>
                <Button href="/contact" variant="outline" className="w-full">
                  تواصل معنا
                </Button>
                <div className="divider-gold my-6" />
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-gold text-sm hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  جميع الخدمات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

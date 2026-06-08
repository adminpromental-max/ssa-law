import Link from "next/link";
import {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
}

export function ServiceCard({
  slug,
  title,
  shortDescription,
  icon,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Scale;

  return (
    <Link
      href={`/services/${slug}`}
      className="group card-surface block bg-black-light border border-gold/10 rounded-sm p-6 sm:p-8 md:hover:border-gold/40 md:hover:gold-glow transition-[border-color,box-shadow] duration-300"
    >
      <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="text-cream/60 leading-relaxed mb-6">{shortDescription}</p>
      <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
        اقرأ المزيد
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

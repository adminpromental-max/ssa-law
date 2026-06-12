import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServiceIcon } from "@/lib/serviceIcons";

interface ServiceCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  goldFrame?: boolean;
  compact?: boolean;
}

export function ServiceCard({
  slug,
  title,
  shortDescription,
  icon,
  goldFrame = false,
  compact = false,
}: ServiceCardProps) {
  const Icon = getServiceIcon(icon);

  return (
    <Link
      href={`/services/${slug}`}
      className={`group card-surface block card-elevated rounded-sm transition-all duration-500 h-full ${
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8"
      } ${
        goldFrame
          ? "border-2 border-gold/40 shadow-[inset_0_0_0_1px_rgba(201,162,39,0.15)] md:hover:border-gold md:hover:-translate-y-1 md:hover:shadow-[0_12px_30px_rgba(201,162,39,0.15)]"
          : "border border-gold/10 md:hover:border-gold/40 md:hover:gold-glow"
      }`}
    >
      <div
        className={`service-icon-ring flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 ${
          compact ? "w-12 h-12" : "w-14 h-14 mb-6"
        }`}
      >
        <Icon
          className={`text-gold ${compact ? "w-5 h-5" : "w-7 h-7"}`}
          strokeWidth={1.75}
        />
      </div>
      <h3
        className={`font-bold text-cream group-hover:text-gold transition-colors leading-snug ${
          compact ? "text-base mb-2" : "text-xl mb-3"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-cream/60 leading-relaxed ${
          compact ? "text-sm mb-4 line-clamp-3" : "mb-6"
        }`}
      >
        {shortDescription}
      </p>
      <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
        اقرأ المزيد
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

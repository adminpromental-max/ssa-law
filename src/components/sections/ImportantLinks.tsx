import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getImportantLinks } from "@/lib/content";
import { getLinkIcon } from "@/lib/linkIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function ImportantLinks() {
  const importantLinks = await getImportantLinks();

  return (
    <section className="py-16 sm:py-24 section-accent border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="مصادر مفيدة"
          title="روابط هامة"
          description="روابط رسمية لجهات قضائية وحكومية ومصادر قانونية"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {importantLinks.map((link, index) => {
            const Icon = getLinkIcon(link.title);
            return (
              <ScrollReveal key={link.id} variant="zoom-in" delay={index * 60}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 card-elevated rounded-sm px-4 py-4 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                >
                  <div className="link-icon-wrap shrink-0">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.75} />
                  </div>
                  <span className="flex-1 text-cream group-hover:text-gold transition-colors text-sm sm:text-base leading-snug">
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gold/40 group-hover:text-gold shrink-0 transition-colors" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

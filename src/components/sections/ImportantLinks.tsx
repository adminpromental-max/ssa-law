import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { importantLinks } from "@/data/links";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ImportantLinks() {
  return (
    <section className="py-16 sm:py-24 bg-black border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="مصادر مفيدة"
          title="روابط هامة"
          description="روابط رسمية لجهات قضائية وحكومية ومصادر قانونية"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {importantLinks.map((link, index) => (
            <ScrollReveal key={link.title} variant="zoom-in" delay={index * 60}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 bg-black-light border border-gold/25 rounded-sm px-5 py-4 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                <span className="text-cream group-hover:text-gold transition-colors text-sm sm:text-base">
                  {link.title}
                </span>
                <ExternalLink className="w-4 h-4 text-gold/50 group-hover:text-gold shrink-0" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

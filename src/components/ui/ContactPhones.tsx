import { Printer } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { resolveSiteContact } from "@/lib/site-contact";
import type { SiteSettings } from "@/lib/db/types";

interface ContactPhonesProps {
  site?: Partial<SiteSettings> | null;
  className?: string;
  showNumber?: "always" | "desktop" | "never";
  linkClassName?: string;
}

export function ContactPhones({
  site,
  className = "",
  showNumber = "desktop",
  linkClassName = "",
}: ContactPhonesProps) {
  const { phone, fax } = resolveSiteContact(site);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <p className="text-cream/50 text-sm mb-2">هاتف / واتساب</p>
        <WhatsAppLink
          phone={phone}
          className={linkClassName}
          showNumber={showNumber}
        />
      </div>
      <div>
        <p className="text-cream/50 text-sm mb-2">فاكس</p>
        <a
          href={`tel:${fax.replace(/-/g, "")}`}
          className={`inline-flex items-center gap-2 hover:text-gold transition-colors ${linkClassName}`}
          dir="ltr"
        >
          <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <Printer className="w-4 h-4 text-gold" />
          </span>
          {fax}
        </a>
      </div>
    </div>
  );
}

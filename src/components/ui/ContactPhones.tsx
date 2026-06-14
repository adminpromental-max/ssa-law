import { Printer } from "lucide-react";
import { ContactQuickActions } from "@/components/ui/ContactQuickActions";
import { resolveSiteContact } from "@/lib/site-contact";
import type { SiteSettings } from "@/lib/db/types";

interface ContactPhonesProps {
  site?: Partial<SiteSettings> | null;
  className?: string;
  size?: "sm" | "md";
}

export function ContactPhones({
  site,
  className = "",
  size = "md",
}: ContactPhonesProps) {
  const { phone, fax } = resolveSiteContact(site);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <p className="text-cream/50 text-sm mb-3">هاتف / واتساب</p>
        <ContactQuickActions phone={phone} size={size} />
      </div>
      <div>
        <p className="text-cream/50 text-sm mb-2">فاكس</p>
        <a
          href={`tel:${fax.replace(/-/g, "")}`}
          className="inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors text-sm"
          dir="ltr"
        >
          <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <Printer className="w-3.5 h-3.5 text-gold" />
          </span>
          {fax}
        </a>
      </div>
    </div>
  );
}

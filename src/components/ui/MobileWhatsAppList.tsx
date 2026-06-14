import { ContactPhones } from "@/components/ui/ContactPhones";
import type { SiteSettings } from "@/lib/db/types";

interface MobileWhatsAppListProps {
  className?: string;
  showNumber?: "always" | "desktop" | "never";
  linkClassName?: string;
  phones?: string[];
  site?: Partial<SiteSettings> | null;
}

/** @deprecated use ContactPhones */
export function MobileWhatsAppList({
  className = "",
  showNumber = "desktop",
  linkClassName = "",
  site,
}: MobileWhatsAppListProps) {
  return (
    <ContactPhones
      site={site}
      className={className}
      showNumber={showNumber}
      linkClassName={linkClassName}
    />
  );
}

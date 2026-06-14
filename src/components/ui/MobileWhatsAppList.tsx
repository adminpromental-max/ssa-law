import { ContactPhones } from "@/components/ui/ContactPhones";
import type { SiteSettings } from "@/lib/db/types";

interface MobileWhatsAppListProps {
  className?: string;
  site?: Partial<SiteSettings> | null;
  size?: "sm" | "md";
}

/** @deprecated use ContactPhones */
export function MobileWhatsAppList({
  className = "",
  site,
  size = "md",
}: MobileWhatsAppListProps) {
  return <ContactPhones site={site} className={className} size={size} />;
}

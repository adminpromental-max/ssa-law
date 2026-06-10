import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/data/site";

interface MobileWhatsAppListProps {
  className?: string;
  showNumber?: "always" | "desktop" | "never";
  linkClassName?: string;
}

export function MobileWhatsAppList({
  className = "",
  showNumber = "desktop",
  linkClassName = "",
}: MobileWhatsAppListProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {siteConfig.contact.mobiles.map((phone) => (
        <div key={phone}>
          <p className="text-cream/50 text-sm mb-2">جوال</p>
          <WhatsAppLink
            phone={phone}
            className={linkClassName}
            showNumber={showNumber}
          />
        </div>
      ))}
    </div>
  );
}

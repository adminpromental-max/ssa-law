import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/data/site";

interface MobileWhatsAppListProps {
  className?: string;
  showNumber?: "always" | "desktop" | "never";
  linkClassName?: string;
  phones?: string[];
}

export function MobileWhatsAppList({
  className = "",
  showNumber = "desktop",
  linkClassName = "",
  phones,
}: MobileWhatsAppListProps) {
  const list = phones?.length ? phones : siteConfig.contact.mobiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {list.map((phone) => (
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

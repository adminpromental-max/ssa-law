import { MessageCircle } from "lucide-react";
import { toWhatsAppUrl } from "@/lib/phone";

interface WhatsAppLinkProps {
  phone: string;
  label?: string;
  className?: string;
  showNumber?: "always" | "desktop" | "never";
}

export function WhatsAppLink({
  phone,
  label,
  className = "",
  showNumber = "desktop",
}: WhatsAppLinkProps) {
  const display = label ?? phone;

  return (
    <a
      href={toWhatsAppUrl(phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 hover:text-[#25D366] transition-colors group ${className}`}
      aria-label={`تواصل عبر واتساب ${display}`}
    >
      <span className="w-9 h-9 rounded-full bg-[#25D366]/15 group-hover:bg-[#25D366] flex items-center justify-center transition-colors shrink-0">
        <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
      </span>
      {showNumber !== "never" && (
        <span
          className={`text-sm ${showNumber === "desktop" ? "hidden sm:inline" : ""}`}
          dir="ltr"
        >
          {display}
        </span>
      )}
    </a>
  );
}

import { MAP_EMBED_URL, MAP_URL } from "@/data/contact";

interface OfficeMapProps {
  className?: string;
  heightClass?: string;
}

export function OfficeMap({
  className = "",
  heightClass = "h-48",
}: OfficeMapProps) {
  return (
    <a
      href={MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-sm overflow-hidden border border-gold/20 hover:border-gold/40 transition-colors ${className}`}
      aria-label="عرض موقع المكتب على الخريطة"
    >
      <iframe
        title="موقع المكتب على الخريطة"
        src={MAP_EMBED_URL}
        className={`w-full ${heightClass} border-0 pointer-events-none`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </a>
  );
}

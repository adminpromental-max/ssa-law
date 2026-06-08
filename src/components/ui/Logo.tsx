import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}

export function Logo({ showText = true, size = "md", onClick }: LogoProps) {
  const iconSize = size === "sm" ? 36 : 44;

  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-3 group min-w-0"
    >
      <Image
        src="/images/lawyer-logo.png"
        alt={siteConfig.name}
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
        priority
      />
      {showText && (
        <div className="hidden sm:block min-w-0">
          <p className="text-cream font-bold text-sm leading-tight group-hover:text-gold transition-colors truncate">
            {siteConfig.name}
          </p>
          <p className="text-gold/60 text-xs truncate">
            للمحاماة والاستشارات القانونية
          </p>
        </div>
      )}
    </Link>
  );
}

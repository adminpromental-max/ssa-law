interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "center" | "right";
  light?: boolean;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-right";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {subtitle && (
        <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-cream" : "gold-text-gradient"}`}
      >
        {title}
      </h2>
      <div className={`divider-gold w-24 mb-6 ${align === "center" ? "mx-auto" : ""}`} />
      {description && (
        <p className="text-cream/70 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}

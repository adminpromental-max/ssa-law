interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHero({ title, subtitle, description }: PageHeroProps) {
  return (
    <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 bg-black-light section-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subtitle && (
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gold-text-gradient mb-6 px-2">
          {title}
        </h1>
        <div className="divider-gold w-24 mx-auto mb-6" />
        {description && (
          <p className="text-cream/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

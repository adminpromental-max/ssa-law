"use client";

import Image from "next/image";
import type { Client } from "@/data/clients";

interface ClientsMarqueeProps {
  clients: Client[];
}

export function ClientsMarquee({ clients }: ClientsMarqueeProps) {
  const loop = [...clients, ...clients];

  return (
    <section className="banner-image-section clients-marquee relative overflow-hidden">
      <Image
        src="/images/clients-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="banner-image-overlay banner-image-overlay-clients" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="clients-marquee-title shrink-0 text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
          عملاؤنا
        </h2>

        <div className="clients-marquee-viewport flex-1 w-full overflow-hidden">
          <div className="clients-marquee-track">
            {loop.map((client, i) => (
              <div
                key={`${client.shortName}-${i}`}
                className="client-marquee-item group"
              >
                <div className="client-marquee-logo">
                  {client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={client.shortName}
                      className="h-10 sm:h-12 w-auto max-w-[140px] object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="client-marquee-initials">
                      {client.initials}
                    </span>
                  )}
                </div>
                <div className="client-marquee-tooltip">
                  <p className="text-white text-sm font-bold">{client.shortName}</p>
                  <p className="text-white/65 text-xs mt-1 leading-relaxed">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

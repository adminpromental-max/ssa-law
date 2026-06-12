"use client";

import { Carousel } from "@/components/ui/Carousel";
import type { Client } from "@/data/clients";

interface ClientsSliderProps {
  clients: Client[];
}

export function ClientsSlider({ clients }: ClientsSliderProps) {
  return (
    <Carousel
      ariaLabel="جهات اعتمدت على خدماتنا"
      slidesMobile={1}
      slidesDesktop={3}
      className="carousel-clients"
    >
      {clients.map((client) => (
        <div
          key={client.shortName}
          className="client-logo-card group relative flex flex-col items-center justify-center mx-auto"
        >
          <div className="client-logo-inner w-full">
            <span className="client-logo-text">{client.initials}</span>
          </div>
          <div className="client-logo-tooltip" aria-hidden="true">
            <p className="text-cream text-sm font-bold leading-snug">
              {client.shortName}
            </p>
            <p className="text-cream/60 text-xs mt-1 leading-relaxed">
              {client.name}
            </p>
          </div>
          <p className="client-logo-mobile-name">{client.shortName}</p>
        </div>
      ))}
    </Carousel>
  );
}

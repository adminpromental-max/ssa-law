"use client";

import { Carousel } from "@/components/ui/Carousel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/data/services";

interface ServicesSliderProps {
  services: Service[];
}

export function ServicesSlider({ services }: ServicesSliderProps) {
  return (
    <Carousel
      ariaLabel="مجالات الخدمات القانونية"
      slidesMobile={1}
      slidesDesktop={3}
      className="carousel-services"
    >
      {services.map((service) => (
        <ServiceCard key={service.slug} {...service} compact goldFrame />
      ))}
    </Carousel>
  );
}

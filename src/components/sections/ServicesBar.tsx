"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getServiceIcon } from "@/lib/serviceIcons";
import type { Service } from "@/data/services";

interface ServicesBarProps {
  services: Service[];
}

export function ServicesBar({ services }: ServicesBarProps) {
  return (
    <div className="services-bar relative overflow-hidden">
      <Image
        src="/images/services-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="banner-image-overlay banner-image-overlay-services" />

      <div className="relative z-10 services-bar-scroll">
        <div className="services-bar-track">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-bar-item group"
              >
                <div className="service-bar-default">
                  <Icon
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white/90 mb-3 sm:mb-4"
                    strokeWidth={1.25}
                  />
                  <h3 className="text-white text-xs sm:text-sm font-bold leading-snug text-center px-1">
                    {service.title}
                  </h3>
                </div>

                <div className="service-bar-hover">
                  <h3 className="text-white text-xs sm:text-sm font-bold leading-snug mb-2">
                    {service.title}
                  </h3>
                  <div className="service-bar-divider" />
                  <p className="text-white/75 text-[11px] sm:text-xs leading-relaxed line-clamp-4">
                    {service.shortDescription}
                  </p>
                  <span className="service-bar-arrow mt-3">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Gavel,
  Calendar,
  Eye,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface StatsBannerProps {
  casesBase: number;
  experienceYears: number;
  requestsCount: number;
  initialVisitors: number;
}

const statItems: {
  key: string;
  label: string;
  suffix?: string;
  icon: LucideIcon;
}[] = [
  { key: "casesBase", label: "عدد القضايا", icon: Gavel },
  { key: "experienceYears", label: "سنوات الخبرة", icon: Calendar },
  { key: "visitors", label: "عدد الزوار", icon: Eye },
  { key: "requestsCount", label: "عدد الطلبات", icon: ClipboardList },
];

export function StatsBanner({
  casesBase,
  experienceYears,
  requestsCount,
  initialVisitors,
}: StatsBannerProps) {
  const [visitors, setVisitors] = useState(initialVisitors);

  useEffect(() => {
    const sessionKey = "ssa_visitor_counted";

    async function track() {
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          const res = await fetch("/api/visitors", { method: "POST" });
          const data = await res.json();
          setVisitors(data.count);
          sessionStorage.setItem(sessionKey, "1");
        } else {
          const res = await fetch("/api/visitors");
          const data = await res.json();
          setVisitors(data.count);
        }
      } catch {
        setVisitors(initialVisitors);
      }
    }

    track();
  }, [initialVisitors]);

  const values: Record<string, number> = {
    casesBase,
    experienceYears,
    visitors,
    requestsCount,
  };

  return (
    <section className="banner-image-section relative overflow-hidden">
      <Image
        src="/images/stats-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="banner-image-overlay banner-image-overlay-stats" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center text-center px-2"
            >
              <div className="banner-stat-icon mb-3">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums leading-none">
                <AnimatedCounter value={values[key]} className="text-white" />
              </p>
              <p className="text-white/75 text-xs sm:text-sm leading-snug">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

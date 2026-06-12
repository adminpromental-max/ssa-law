"use client";

import { useEffect, useState } from "react";
import {
  Gavel,
  Layers,
  Eye,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface StatsBannerProps {
  servicesCount: number;
  casesBase: number;
  requestsCount: number;
  initialVisitors: number;
}

const statItems: {
  key: keyof Pick<
    StatsBannerProps,
    "servicesCount" | "casesBase" | "requestsCount"
  > | "visitors";
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "casesBase", label: "عدد القضايا", icon: Gavel },
  { key: "servicesCount", label: "عدد الخدمات", icon: Layers },
  { key: "visitors", label: "عدد الزوار", icon: Eye },
  { key: "requestsCount", label: "عدد الطلبات", icon: ClipboardList },
];

export function StatsBanner({
  servicesCount,
  casesBase,
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
    servicesCount,
    visitors,
    requestsCount,
  };

  return (
    <section className="section-stats-bridge py-10 sm:py-14 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="stat-card group flex flex-col items-center text-center px-3 py-5 sm:py-6 rounded-sm"
            >
              <div className="stat-icon-wrap mb-3 sm:mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold-dark" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-dark mb-1.5 tabular-nums">
                <AnimatedCounter value={values[key]} />
              </p>
              <p className="text-black/55 text-xs sm:text-sm leading-snug">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

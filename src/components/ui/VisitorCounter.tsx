"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = "ssa_visitor_counted";

    async function track() {
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          const res = await fetch("/api/visitors", { method: "POST" });
          const data = await res.json();
          setCount(data.count);
          sessionStorage.setItem(sessionKey, "1");
        } else {
          const res = await fetch("/api/visitors");
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        setCount(4000);
      }
    }

    track();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-white/60 border border-gold/20 rounded-sm px-4 py-2 text-black/70 text-sm">
      <Eye className="w-4 h-4 text-gold-dark shrink-0" />
      <span>
        عدد الزوار:{" "}
        <span className="text-gold-dark font-bold tabular-nums" dir="ltr">
          {count !== null ? count.toLocaleString("ar-SA") : "..."}
        </span>
      </span>
    </div>
  );
}

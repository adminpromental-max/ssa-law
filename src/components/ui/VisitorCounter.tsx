"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const BASE_COUNT = 500;
const STORAGE_KEY = "ssa_visitor_count";

export function VisitorCounter() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    const sessionKey = "ssa_visitor_counted";
    const stored = localStorage.getItem(STORAGE_KEY);
    let current = stored ? parseInt(stored, 10) : BASE_COUNT;

    if (!sessionStorage.getItem(sessionKey)) {
      current += 1;
      localStorage.setItem(STORAGE_KEY, String(current));
      sessionStorage.setItem(sessionKey, "1");
    }

    setCount(current);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-white/60 border border-gold/20 rounded-sm px-4 py-2 text-black/70 text-sm">
      <Eye className="w-4 h-4 text-gold-dark shrink-0" />
      <span>
        عدد الزوار:{" "}
        <span className="text-gold-dark font-bold tabular-nums" dir="ltr">
          {count.toLocaleString("ar-SA")}
        </span>
      </span>
    </div>
  );
}

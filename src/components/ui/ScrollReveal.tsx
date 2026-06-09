"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "fade-up" | "slide-right" | "slide-left" | "zoom-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

const variantClass: Record<RevealVariant, string> = {
  "fade-up": "reveal-fade-up",
  "slide-right": "reveal-slide-right",
  "slide-left": "reveal-slide-left",
  "zoom-in": "reveal-zoom-in",
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

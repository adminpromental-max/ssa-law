"use client";

import {
  Children,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CarouselProps {
  children: ReactNode;
  slidesMobile?: number;
  slidesDesktop?: number;
  ariaLabel: string;
  className?: string;
}

export function Carousel({
  children,
  slidesMobile = 1,
  slidesDesktop = 3,
  ariaLabel,
  className = "",
}: CarouselProps) {
  const items = Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(slidesMobile);
  const [isRtl, setIsRtl] = useState(true);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");

    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setPerView(mq.matches ? slidesDesktop : slidesMobile);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [slidesDesktop, slidesMobile]);

  const maxIndex = Math.max(0, items.length - perView);
  const slidePercent = 100 / perView;

  const goNext = useCallback(
    () => setCurrent((c) => Math.min(c + 1, maxIndex)),
    [maxIndex]
  );
  const goPrev = useCallback(
    () => setCurrent((c) => Math.max(c - 1, 0)),
    []
  );

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  if (items.length === 0) return null;

  const offset = current * slidePercent;
  const transform = isRtl
    ? `translateX(${offset}%)`
    : `translateX(-${offset}%)`;

  const showNav = items.length > perView;

  return (
    <div className={`relative ${className}`} aria-label={ariaLabel}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 px-2 sm:px-3"
              style={{ width: `${slidePercent}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showNav && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={current === 0}
            aria-label="السابق"
            className="carousel-nav carousel-nav-prev"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={current >= maxIndex}
            aria-label="التالي"
            className="carousel-nav carousel-nav-next"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </>
      )}

      {showNav && (
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`شريحة ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-gold"
                  : "w-1.5 bg-gold/30 hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

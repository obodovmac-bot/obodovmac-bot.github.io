"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeSlides } from "@/data/slider";

const wait = 6500;

export function HomeSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const off = () => document.documentElement.dataset.motion === "off" || media.matches;
    if (off() || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % homeSlides.length);
    }, wait);
    return () => window.clearInterval(timer);
  }, [paused]);

  function step(delta: number) {
    setIndex((current) => (current + delta + homeSlides.length) % homeSlides.length);
  }

  return (
    <section
      className="relative h-72 overflow-hidden bg-hero sm:h-96 lg:h-[32rem]"
      aria-roledescription="карусель"
      aria-label="Снимки училища"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {homeSlides.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slideIndex === index ? slide.alt : ""}
          aria-hidden={slideIndex !== index}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: slideIndex === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
        <p className="max-w-3xl text-sm font-semibold text-white sm:text-base">{homeSlides[index].alt}</p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="site-player-icon" aria-label="Предыдущий снимок" onClick={() => step(-1)}>
            <ChevronLeft aria-hidden size={20} />
          </button>
          <button type="button" className="site-player-icon" aria-label="Следующий снимок" onClick={() => step(1)}>
            <ChevronRight aria-hidden size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

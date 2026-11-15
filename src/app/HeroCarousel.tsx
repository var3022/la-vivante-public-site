"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-front-1",
    image: "/images/property/common-areas/mainpropertyfrontview-1--jpg-hero.webp",
    alt: "La Vivante Homestay architectural front facade in Ramanathapuram, Coimbatore",
    caption: "Main Building Facade · Ramanathapuram, Coimbatore",
  },
  {
    id: "hero-reception-1",
    image: "/images/property/common-areas/reception-1--heic-hero.webp",
    alt: "Welcoming reception desk and guest arrival lounge at La Vivante Homestay",
    caption: "Welcoming Reception & Arrival Lounge",
  },
  {
    id: "hero-front-4",
    image: "/images/property/common-areas/mainpropertyfrontview-4--heic-hero.webp",
    alt: "Daytime front architectural elevation of La Vivante Homestay",
    caption: "Daytime Architectural Elevation",
  },
  {
    id: "hero-balcony-1",
    image: "/images/property/common-areas/commanbalcony-1--jpg-hero.webp",
    alt: "Shared outdoor balcony terrace with open-air views at La Vivante Homestay",
    caption: "Open-Air Balcony Terrace & Greenery",
  },
  {
    id: "hero-entrance",
    image: "/images/property/common-areas/entrance-heic-hero.webp",
    alt: "Secure gated property entrance and stairway at La Vivante Homestay",
    caption: "Gated Property Entrance & Welcoming Stairway",
  },
  {
    id: "hero-reception-2",
    image: "/images/property/common-areas/reception-2--heic-hero.webp",
    alt: "Comfortable guest seating area in reception lobby at La Vivante Homestay",
    caption: "Comfortable Guest Arrival Lounge",
  },
  {
    id: "hero-side-1",
    image: "/images/property/common-areas/mainpropertysideview-1--jpg-hero.webp",
    alt: "Side architectural elevation and approach of La Vivante Homestay",
    caption: "Side Architectural Elevation & Approach",
  },
  {
    id: "hero-parking-1",
    image: "/images/property/common-areas/parking-1--jpg-hero.webp",
    alt: "Secure on-premise vehicular parking at La Vivante Homestay",
    caption: "Secure On-Premise Compound Parking",
  },
];

export default function HeroCarousel() {
  const total = HERO_SLIDES.length;

  // Track state with boundary clones for seamless infinite looping
  // trackIndex starts at 1 (real slide 0)
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isTransitioningRef = useRef(false);
  const trackIndexRef = useRef(1);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
    trackIndexRef.current = trackIndex;
  }, [isTransitioning, trackIndex]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const realIndex = (trackIndex - 1 + total) % total;
  const currentSlide = HERO_SLIDES[realIndex] || HERO_SLIDES[0];

  const slideNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  const slidePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  const goToSlide = (idx: number) => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    setTrackIndex(idx + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (trackIndexRef.current === total + 1) {
      setTrackIndex(1);
    } else if (trackIndexRef.current === 0) {
      setTrackIndex(total);
    }
  };

  // 5-second automatic sliding progression
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;
    }

    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      slideNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slideNext]);

  // Pause when the browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      touchStartY.current === null ||
      touchEndY.current === null
    ) {
      return;
    }

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        slideNext();
      } else {
        slidePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  // Cloned boundary slides for seamless infinite loop
  const slidesWithClones = [HERO_SLIDES[total - 1], ...HERO_SLIDES, HERO_SLIDES[0]];

  return (
    <section
      className="hero relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="La Vivante Homestay Exterior & Common Spaces"
    >
      {/* Physical Horizontal Sliding Track (translateX 800ms) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="flex h-full w-full"
          style={{
            transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
            transition: isTransitioning
              ? "transform 800ms cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesWithClones.map((slide, sIdx) => {
            const isPriority = sIdx === 1 || sIdx === 2;
            return (
              <div
                key={`${slide.id}-${sIdx}`}
                className="relative h-full w-full flex-shrink-0 flex-grow-0"
                style={{ flexBasis: "100%" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={isPriority}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Shade for consistent contrast & readability */}
      <div className="hero-shade pointer-events-none z-[1]" />

      {/* Main Hero Content */}
      <div className="hero-content relative z-[2]">
        <p className="eyebrow light-eyebrow">
          <span /> A STAY THAT FEELS DIFFERENT
        </p>
        <h1>
          Come as you are.
          <br />
          <em>Feel at home.</em>
        </h1>
        <p className="hero-description">
          Thoughtful spaces, unhurried mornings and the comfort of feeling
          like you belong somewhere.
        </p>
        <a className="hero-button" href="#booking">
          Find your kind of stay <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-6 right-6 z-[3] flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* Slide Counter & Caption Tag */}
        <div className="bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-white text-[10px] sm:text-[11px] font-medium flex items-center gap-2 shadow-lg">
          <span className="text-[#d6c29a] font-bold">
            {realIndex + 1 < 10 ? `0${realIndex + 1}` : realIndex + 1} / {total < 10 ? `0${total}` : total}
          </span>
          <span className="text-white/40">&bull;</span>
          <span className="hidden sm:inline max-w-[240px] truncate text-white/95">
            {currentSlide.caption}
          </span>
        </div>

        {/* Previous / Next Buttons & Dots */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 p-1 rounded-full shadow-lg">
          <button
            type="button"
            onClick={slidePrev}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-sm sm:text-base transition cursor-pointer"
            aria-label="Previous hero image"
          >
            &#8249;
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1 px-1.5">
            {HERO_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === realIndex
                    ? "w-4 bg-[#d6c29a]"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={slideNext}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-sm sm:text-base transition cursor-pointer"
            aria-label="Next hero image"
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Bottom Text Caption */}
      <div className="hero-caption relative z-[2]">
        <span>YOUR OWN LITTLE CORNER OF COMFORT</span>
        <span>A PLACE TO BELONG</span>
      </div>
    </section>
  );
}

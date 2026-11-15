"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export interface SlidingPhotoItem {
  id: string;
  url: string;
  heroUrl?: string;
  thumbUrl?: string;
  caption: string;
  roomTag?: string;
  alt?: string;
}

interface HorizontalSlidingTrackProps {
  items: SlidingPhotoItem[];
  aspectRatioClass?: string; // e.g. "aspect-[4/3]" or "h-full w-full"
  onSlideClick?: (index: number) => void;
  priority?: boolean;
  autoPlayInterval?: number; // default 5000ms
  showControls?: boolean;
  showCaptionOverlay?: boolean;
  objectFit?: "cover" | "contain";
  sizes?: string;
  categoryTag?: string;
  totalUnitsBadge?: string;
}

export default function HorizontalSlidingTrack({
  items,
  aspectRatioClass = "aspect-[4/3]",
  onSlideClick,
  priority = false,
  autoPlayInterval = 5000,
  showControls = true,
  showCaptionOverlay = true,
  objectFit = "cover",
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
  categoryTag,
  totalUnitsBadge,
}: HorizontalSlidingTrackProps) {
  const total = items.length;

  // Infinite track setup: [items[N-1], ...items, items[0]]
  // Track index 1 corresponds to items[0].
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // References for state inside callbacks & touch tracking
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

  // Real index of the active slide (0 .. total-1)
  const realIndex = total > 0 ? (trackIndex - 1 + total) % total : 0;
  const currentPhoto = items[realIndex] || items[0];

  const slideNext = useCallback(() => {
    if (total <= 1 || isTransitioningRef.current) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  }, [total]);

  const slidePrev = useCallback(() => {
    if (total <= 1 || isTransitioningRef.current) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  }, [total]);

  // Seamless boundary wrap when the transition ends
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (trackIndexRef.current === total + 1) {
      // Slid forward to the clone of slide 0 -> jump instantly to real slide 0
      setTrackIndex(1);
    } else if (trackIndexRef.current === 0) {
      // Slid backward to the clone of slide N-1 -> jump instantly to real slide N-1
      setTrackIndex(total);
    }
  };

  // Autoplay timer
  useEffect(() => {
    if (total <= 1) return;

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
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slideNext, total, autoPlayInterval]);

  // Pause autoplay when browser tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Touch handlers for mobile horizontal swipe
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

    // Horizontal swipe must exceed vertical drag and minimum distance threshold
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

  if (total === 0) return null;

  // Single slide fallback
  if (total === 1) {
    const single = items[0];
    return (
      <div
        className={`relative ${aspectRatioClass} overflow-hidden bg-[#e9e5dc] cursor-pointer border-b border-[#eee8dc]`}
        onClick={() => onSlideClick && onSlideClick(0)}
      >
        <Image
          src={single.url}
          alt={single.alt || single.caption}
          fill
          priority={priority}
          sizes={sizes}
          className={objectFit === "contain" ? "object-contain" : "object-cover"}
        />
        {categoryTag && (
          <span className="absolute top-3 left-3 rounded-md bg-[#294b3b]/90 px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase text-white backdrop-blur-xs z-10 shadow-xs">
            {categoryTag}
          </span>
        )}
      </div>
    );
  }

  // Augmented array with boundary clones for seamless infinite looping
  const slidesWithClones = [items[total - 1], ...items, items[0]];

  return (
    <div
      className="relative flex flex-col group select-none border-b border-[#eee8dc]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Viewport Box */}
      <div
        className={`relative ${aspectRatioClass} overflow-hidden bg-[#e9e5dc] cursor-pointer`}
        onClick={() => onSlideClick && onSlideClick(realIndex)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        title="Click to view full uncropped photo"
      >
        {/* Horizontal Sliding Track (Moves via translateX 800ms) */}
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
            const isPriority = priority && (sIdx === 1 || sIdx === 2);
            return (
              <div
                key={`${slide.id}-${sIdx}`}
                className="relative h-full w-full flex-shrink-0 flex-grow-0"
                style={{ flexBasis: "100%" }}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt || slide.caption}
                  fill
                  priority={isPriority}
                  sizes={sizes}
                  className={objectFit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
            );
          })}
        </div>

        {/* Subtle Category & Photo Counter Header (Top) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {categoryTag && (
              <span className="rounded bg-[#294b3b]/90 px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase text-white/95 backdrop-blur-xs shadow-xs">
                {categoryTag}
              </span>
            )}
            {totalUnitsBadge && (
              <span className="rounded bg-black/60 px-2 py-0.5 text-[9px] font-medium tracking-wide text-white/90 backdrop-blur-xs shadow-xs">
                {totalUnitsBadge}
              </span>
            )}
          </div>

          <span className="rounded bg-black/60 px-2 py-0.5 text-[9px] font-medium tracking-wide text-white/90 backdrop-blur-xs shadow-xs">
            {realIndex + 1} / {total}
          </span>
        </div>

        {/* Previous / Next Overlay Buttons */}
        {showControls && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                slidePrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center text-sm sm:text-base opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
              aria-label="Previous photograph"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                slideNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center text-sm sm:text-base opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
              aria-label="Next photograph"
            >
              &#8250;
            </button>
          </>
        )}

        {/* Caption Overlay (Bottom) */}
        {showCaptionOverlay && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 pt-6 flex items-end justify-between text-white z-20 pointer-events-none">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] sm:text-[11px] font-medium leading-tight drop-shadow-xs block truncate text-white/95">
                {currentPhoto.caption}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-white font-medium flex items-center gap-1 flex-shrink-0">
              <span>View</span>
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

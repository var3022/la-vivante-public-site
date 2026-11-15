"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

export interface LightboxImageItem {
  id?: string;
  url: string;
  heroUrl?: string;
  thumbUrl?: string;
  caption: string;
  roomTag?: string;
  alt?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImageItem[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  onEnquire?: () => void;
  enquireLabel?: string;
}

export default function ImageLightbox({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
  title,
  subtitle,
  onEnquire,
  enquireLabel = "Enquire About This Room →",
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (initialIndex !== prevInitialIndex || isOpen !== prevIsOpen) {
    setPrevInitialIndex(initialIndex);
    setPrevIsOpen(isOpen);
    setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
    setImageError(false);
    setIsLoading(true);
  }

  // Touch tracking for mobile swipe navigation
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setImageError(false);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setImageError(false);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation: Escape to close, Left/Right arrows to step
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];
  const imageSource = currentImage.heroUrl || currentImage.url;
  const imageAlt = currentImage.alt || currentImage.caption || "La Vivante Homestay property photo";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4 md:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer lightbox"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative flex flex-col w-full max-w-5xl h-[92vh] max-h-[94vh] bg-[#14231b] border border-white/10 text-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Lightbox Header Bar */}
        <header className="flex-shrink-0 flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3 bg-black/40">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#d6c29a] font-semibold truncate">
                {title || currentImage.roomTag || "Authentic Homestay Photo"}
              </span>
              {currentImage.roomTag && title && (
                <span className="rounded bg-white/15 px-2 py-0.5 text-[9px] font-semibold text-white/90">
                  {currentImage.roomTag}
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm md:text-base font-serif font-medium text-white truncate mt-0.5">
              {currentImage.caption || subtitle || title || "Property Photograph"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] text-white/60">
              Esc to close · &larr; &rarr; to navigate
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              &times;
            </button>
          </div>
        </header>

        {/* Lightbox Main Image Viewing Pane (Fixed explicit height & uncropped aspect-ratio preservation) */}
        <div className="relative flex-1 min-h-0 w-full bg-black/80 flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden">
          {/* Navigation Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center text-2xl transition hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous photograph"
            >
              &#8249;
            </button>
          )}

          {/* Dedicated Sized Container for Next.js Image fill */}
          <div className="relative w-full h-full flex items-center justify-center">
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d6c29a] animate-spin" />
              </div>
            )}

            {!imageError ? (
              <Image
                key={imageSource}
                src={imageSource}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-contain transition-opacity duration-300"
                priority
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setImageError(true);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-white/80 max-w-sm">
                <svg
                  className="w-12 h-12 text-[#d6c29a] mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-medium text-sm text-white">Photograph could not be displayed</p>
                <p className="text-xs text-white/60 mt-1">Please try navigating to the next photo or refresh.</p>
                <button
                  type="button"
                  onClick={() => {
                    setImageError(false);
                    setIsLoading(true);
                  }}
                  className="mt-3 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs text-white font-medium transition cursor-pointer"
                >
                  Retry Loading
                </button>
              </div>
            )}
          </div>

          {/* Navigation Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center text-2xl transition hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next photograph"
            >
              &#8250;
            </button>
          )}
        </div>

        {/* Lightbox Footer Bar */}
        <footer className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 px-4 sm:px-6 py-3 bg-black/50 text-xs">
          <div className="flex items-center gap-3 text-white/70">
            <span className="font-medium text-white">
              Photo {currentIndex + 1} of {images.length}
            </span>
            <span className="hidden sm:inline text-white/40">&bull;</span>
            <span className="text-[11px] text-[#d6c29a] hidden sm:inline">
              Authentic high-resolution capture &bull; Uncropped aspect ratio
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onEnquire && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnquire();
                }}
                className="rounded-full bg-[#f8f6f0] px-4 py-2 text-xs font-semibold !text-[#294638] hover:bg-white shadow-xs transition active:scale-95 cursor-pointer"
              >
                {enquireLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-white/80 hover:bg-white/10 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

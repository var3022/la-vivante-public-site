"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROPERTY_GALLERY_ITEMS, PropertyGalleryItem } from "./pricingData";
import ImageLightbox from "./ImageLightbox";
import HorizontalSlidingTrack from "./HorizontalSlidingTrack";

const INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 8;

export default function PropertyGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const categories = [
    "All",
    "Exterior",
    "Lounge & Reception",
    "Outdoor Terraces",
    "Grounds & Parking",
    "Interior Circulation",
    "Operations & Dining",
  ];

  const filteredItems =
    activeCategory === "All"
      ? PROPERTY_GALLERY_ITEMS
      : PROPERTY_GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const remaining = filteredItems.length - visibleCount;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const handleOpenLightboxByItem = (item: PropertyGalleryItem) => {
    const idxInMaster = PROPERTY_GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    setLightboxIdx(idxInMaster >= 0 ? idxInMaster : 0);
    setLightboxOpen(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
      <div className="rounded-2xl border border-[#ded7c8] bg-white p-6 sm:p-8 shadow-xs">
        {/* Section Header */}
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b8050] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9b8050]" />
            COMPLETE PROPERTY ARCHITECTURE &amp; SPACES · 29 ORIGINAL PHOTOGRAPHS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1f372a] mt-1.5">
            Architecture, grounds &amp; common spaces.
          </h2>
          <p className="text-xs sm:text-sm text-[#68746b] mt-2 max-w-3xl leading-relaxed">
            Every authentic capture of La Vivante Homestay in Ramanathapuram, Coimbatore—including building front and side elevations, welcoming reception, open-air balcony terraces, vehicular parking, quiet garden, and guest circulation spaces.
          </p>
        </div>

        {/* Filter Navigation Bar - Compact, neat with uniform spacing */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5" role="group" aria-label="Gallery category filter">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer ${isSelected
                    ? "bg-[#294b3b] text-white shadow-xs ring-1 ring-[#294b3b]"
                    : "bg-[#f8f6f0] border border-[#ded8cb] text-[#2c3d34] hover:bg-white hover:border-[#294b3b]"
                  }`}
                aria-pressed={isSelected}
              >
                <span>{cat === "All" ? "All Spaces" : cat}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Horizontal Sliding Showcase (Auto-advancing 5s with physical translateX slide) */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-[#ded8cb] bg-[#faf8f4]">
          <div className="p-4 border-b border-[#eee8dc] bg-[#f4f1e8] flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#294b3b] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#9b8050]" />
              Property Architecture &amp; Common Spaces
            </span>
          </div>

          <HorizontalSlidingTrack
            items={PROPERTY_GALLERY_ITEMS}
            aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
            onSlideClick={handleOpenLightbox}
            autoPlayInterval={5000}
            sizes="100vw"
            categoryTag="Property Architecture"
          />
        </div>

        {/* Property Cards Grid (Initially showing a few images, expandable via Load More) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-[#eee8dc] bg-[#faf8f4] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleOpenLightboxByItem(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e5dc]">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Area Tag */}
                <span className="absolute top-2.5 left-2.5 rounded bg-black/65 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/95 backdrop-blur-xs font-semibold z-10">
                  {item.tag}
                </span>

                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[#1f372a] text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <span>View Uncropped</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-sm sm:text-base text-[#1f372a]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#6d7568] mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#ede7dc] flex items-center justify-between text-[10px] text-[#9b8050] font-medium">
                  <span>{item.category}</span>
                  <span className="text-[#294b3b] uppercase tracking-wider font-semibold">Click to enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More & Show Less Action Bar */}
        {(hasMore || visibleCount > INITIAL_COUNT) && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredItems.length))}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#294b3b] text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#1f372a] transition-all cursor-pointer ring-1 ring-[#294b3b]"
                aria-label={`Load more photographs (${remaining} remaining)`}
              >
                <span>Load More Photos</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-white/90">
                  {remaining} remaining
                </span>
                <svg
                  className="w-4 h-4 text-white/80 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {visibleCount > INITIAL_COUNT && (
              <button
                type="button"
                onClick={() => setVisibleCount(INITIAL_COUNT)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#ded8cb] bg-white text-[#294b3b] text-xs font-semibold hover:bg-[#f8f6f0] hover:border-[#294b3b] transition-all cursor-pointer"
                aria-label="Show fewer photographs"
              >
                <span>Show Less</span>
                <svg
                  className="w-3.5 h-3.5 text-[#294b3b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox for Property Gallery (Contains all 29 photos) */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={PROPERTY_GALLERY_ITEMS}
        initialIndex={lightboxIdx}
        onClose={() => setLightboxOpen(false)}
        title="La Vivante Homestay · Property Grounds & Common Spaces"
      />
    </section>
  );
}

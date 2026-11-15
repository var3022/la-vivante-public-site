"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROPERTY_GALLERY_ITEMS, PropertyGalleryItem } from "./pricingData";
import ImageLightbox from "./ImageLightbox";
import HorizontalSlidingTrack from "./HorizontalSlidingTrack";

export default function PropertyGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b8050]">
              COMPLETE PROPERTY ARCHITECTURE &amp; SPACES · 29 ORIGINAL PHOTOGRAPHS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1f372a] mt-1">
              Architecture, grounds &amp; common spaces.
            </h2>
            <p className="text-xs sm:text-sm text-[#68746b] mt-2 leading-relaxed">
              Every authentic capture of La Vivante Homestay in Ramanathapuram, Coimbatore—including building front and side elevations, welcoming reception, open-air balcony terraces, vehicular parking, quiet garden, and guest circulation spaces.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Gallery category filter">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#294b3b] text-white shadow-xs"
                      : "bg-[#f8f6f0] border border-[#ded8cb] text-[#2c3d34] hover:bg-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{cat === "All" ? "All Spaces" : cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Horizontal Sliding Showcase (Auto-advancing 5s with physical translateX slide) */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-[#ded8cb] bg-[#faf8f4]">
          <div className="p-4 border-b border-[#eee8dc] bg-[#f4f1e8] flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#294b3b] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#9b8050] animate-pulse" />
              Auto-Advancing Property Showcase (29 Photographs)
            </span>
            <span className="text-[10px] text-[#6d7568]">
              Slides automatically every 5s &bull; Swipe or use arrows to navigate
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

        {/* 29 Original Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
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

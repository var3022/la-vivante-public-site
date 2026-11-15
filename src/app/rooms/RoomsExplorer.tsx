"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ROOM_CATEGORIES,
  PACKAGES,
  DEFAULT_PACKAGE_ID,
  PackageId,
  RoomCategory,
  calculateDiscountPercent,
  formatCurrency,
} from "../pricingData";
import EnquiryModal from "../EnquiryModal";
import RoomCardCarousel from "../RoomCardCarousel";
import PropertyGallerySection from "../PropertyGallerySection";
import ImageLightbox from "../ImageLightbox";

export default function RoomsExplorer() {
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>(DEFAULT_PACKAGE_ID);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoom, setModalRoom] = useState("Standard Room");

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxRoom, setLightboxRoom] = useState<RoomCategory | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const currentPackage = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[0];

  const handleEnquireRoom = (roomName: string) => {
    setModalRoom(roomName);
    setModalOpen(true);
  };

  const handleOpenLightbox = (room: RoomCategory, initialIdx: number = 0) => {
    setLightboxRoom(room);
    setLightboxIdx(initialIdx);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxRoom(null);
  };

  return (
    <>
      {/* Intro Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 pt-12 md:pb-12 md:pt-16">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.25em] text-[#9b8050] uppercase">
          AUTHENTIC ACCOMMODATION &amp; TARIFFS
        </p>
        <h1 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl text-[#1f372a]">
          Rooms made for slowing down.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#68746b] sm:text-base">
          Explore genuine photography of our five homestay room categories in Ramanathapuram, Coimbatore. Select a comfort package below to preview transparent promotional tariffs.
        </p>

        {/* Two Compact Tariff Controls: Air-Conditioning & Breakfast */}
        <div className="mt-8 rounded-2xl border border-[#ded7c8] bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b8050] flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9b8050]" />
                CUSTOMISE TARIFF &amp; STAY COMFORT
              </span>
              <p className="text-xs text-[#6e756b] mt-0.5 max-w-xl">
                Choose cooling and morning breakfast. Extra person charges apply above base room occupancy.
              </p>
            </div>

            {/* Two Compact Segmented Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Control 1: AC Toggle */}
              <div
                className="flex items-center gap-1 rounded-full bg-[#f6f3eb] p-1 border border-[#ded8cb]"
                role="group"
                aria-label="Air conditioning selection"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a857b] px-2.5">
                  Cooling
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const target = PACKAGES.find(
                      (p) => !p.hasAc && p.hasBreakfast === currentPackage.hasBreakfast
                    );
                    if (target) setSelectedPackageId(target.id);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    !currentPackage.hasAc
                      ? "bg-[#294b3b] text-white shadow-xs"
                      : "text-[#3e4c41] hover:text-[#1f372a]"
                  }`}
                  aria-pressed={!currentPackage.hasAc}
                >
                  Non-AC
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = PACKAGES.find(
                      (p) => p.hasAc && p.hasBreakfast === currentPackage.hasBreakfast
                    );
                    if (target) setSelectedPackageId(target.id);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    currentPackage.hasAc
                      ? "bg-[#294b3b] text-white shadow-xs"
                      : "text-[#3e4c41] hover:text-[#1f372a]"
                  }`}
                  aria-pressed={currentPackage.hasAc}
                >
                  AC
                </button>
              </div>

              {/* Control 2: Breakfast Toggle */}
              <div
                className="flex items-center gap-1 rounded-full bg-[#f6f3eb] p-1 border border-[#ded8cb]"
                role="group"
                aria-label="Meal plan selection"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a857b] px-2.5">
                  Meal
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const target = PACKAGES.find(
                      (p) => p.hasAc === currentPackage.hasAc && !p.hasBreakfast
                    );
                    if (target) setSelectedPackageId(target.id);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    !currentPackage.hasBreakfast
                      ? "bg-[#294b3b] text-white shadow-xs"
                      : "text-[#3e4c41] hover:text-[#1f372a]"
                  }`}
                  aria-pressed={!currentPackage.hasBreakfast}
                >
                  Room Only
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = PACKAGES.find(
                      (p) => p.hasAc === currentPackage.hasAc && p.hasBreakfast
                    );
                    if (target) setSelectedPackageId(target.id);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    currentPackage.hasBreakfast
                      ? "bg-[#294b3b] text-white shadow-xs"
                      : "text-[#3e4c41] hover:text-[#1f372a]"
                  }`}
                  aria-pressed={currentPackage.hasBreakfast}
                >
                  With Breakfast
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#f0ebe0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6d7367]">
            <span>
              <strong>Active Tariff:</strong> {currentPackage.name} &bull; {currentPackage.description}
            </span>
            <span className="text-[#9b8050] font-semibold">
              Extra person: {formatCurrency(currentPackage.extraPersonCharge)}/night (above base occupancy)
            </span>
          </div>
        </div>
      </section>

      {/* Five Room Categories Grid with Auto-playing Carousel */}
      <section className="mx-auto grid max-w-7xl gap-6 sm:gap-8 px-4 sm:px-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {ROOM_CATEGORIES.map((room) => {
          const pricing = currentPackage.prices[room.id];
          const discountPct = calculateDiscountPercent(pricing.original, pricing.discounted);

          return (
            <article
              key={room.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                {/* Auto-playing Room Photo Carousel with Manual Navigation & Lightbox Trigger */}
                <RoomCardCarousel
                  room={room}
                  onOpenLightbox={(idx) => handleOpenLightbox(room, idx)}
                />

                {/* Content */}
                <div className="p-5 sm:p-6 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl text-[#1f372a]">
                      {room.name}
                    </h2>
                  </div>

                  {/* Occupancy pill */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#556056]">
                    <span className="inline-flex items-center rounded-md bg-[#f4f1e8] px-2 py-0.5 font-medium">
                      Base: {room.baseGuests} guests &bull; Max: {room.maxGuests} guests
                    </span>
                    {room.maxGuests > room.baseGuests && (
                      <span className="text-[10px] text-[#9b8050] font-medium">
                        (+{formatCurrency(currentPackage.extraPersonCharge)}/extra guest)
                      </span>
                    )}
                  </div>

                  {/* Photographed Rooms Note */}
                  {room.photographedRoomsNote && (
                    <p className="mt-2 text-[10px] text-[#7a8274] leading-relaxed">
                      &bull; {room.photographedRoomsNote}
                    </p>
                  )}

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#68746b]">
                    {room.description}
                  </p>

                  <p className="mt-3 text-[11px] leading-relaxed text-[#81897c] border-t border-[#f0ece3] pt-3">
                    <strong>Features:</strong> {room.features}
                  </p>
                </div>
              </div>

              {/* Pricing & CTA Card Footer - Perfectly aligned across cards */}
              <div className="mt-auto border-t border-[#eee9df] bg-[#faf8f4] p-5 sm:p-6 pt-4 flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b8050] block">
                      {currentPackage.shortLabel}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <del className="text-xs text-[#9aa092]">
                        {formatCurrency(pricing.original)}
                      </del>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#1f372a]">
                        {formatCurrency(pricing.discounted)}
                      </span>
                      <span className="text-xs text-[#6e756b]">/ night</span>
                    </div>
                  </div>

                  <span className="rounded-md bg-[#294b3b]/10 text-[#294b3b] border border-[#294b3b]/20 px-2 py-0.5 text-[11px] font-bold">
                    {discountPct}% OFF
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnquireRoom(room.name)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#294b3b] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#1d362a] active:scale-[0.99] cursor-pointer"
                  aria-label={`Enquire about ${room.name}`}
                >
                  <span>Enquire About This Room</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Property Common Areas & Facade Showcase (All 12 Genuine Spaces) */}
      <PropertyGallerySection />

      {/* Transparent Enquiry Notice Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="rounded-2xl border border-[#ded7c8] bg-[#fdfbf6] p-5 text-center text-xs text-[#697063] leading-relaxed">
          <p className="font-semibold text-[#30382d] mb-1">
            Enquiry Disclaimer &amp; Booking Information
          </p>
          <p className="max-w-3xl mx-auto">
            All displayed photographs are authentic captures of La Vivante Homestay in Ramanathapuram, Coimbatore. Tariffs displayed above are promotional starting estimates for booking enquiries and exclude any incidental charges. Final room allocations, floor preferences, and confirmed quotes are provided upon direct enquiry review by La Vivante Homestay.
          </p>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#294638] px-4 sm:px-6 py-12 text-center text-white md:py-20">
        <p className="text-[11px] tracking-[0.25em] text-[#d6c29a] uppercase">
          YOUR NEXT STAY STARTS HERE
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-2xl sm:text-3xl md:text-4xl">
          A little more comfort. A little more you.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-white/75">
          Share your dates and group size with us to enquire about your homestay in Coimbatore.
        </p>
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleEnquireRoom("No specific preference")}
            className="rounded-full bg-[#f8f6f0] px-6 py-3.5 text-xs sm:text-sm font-semibold !text-[#294638] transition hover:bg-white cursor-pointer"
          >
            Enquire Now &rarr;
          </button>
          <Link
            href="/#booking"
            className="rounded-full border border-white/30 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Check Calendar Dates
          </Link>
        </div>
      </section>

      {/* Full-Screen Uncropped Lightbox Viewer (Aspect Ratio Preserved & Responsive) */}
      {lightboxOpen && lightboxRoom && (
        <ImageLightbox
          isOpen={lightboxOpen}
          images={lightboxRoom.gallery}
          initialIndex={lightboxIdx}
          onClose={handleCloseLightbox}
          title={lightboxRoom.name}
          subtitle={lightboxRoom.gallery[lightboxIdx]?.caption}
          onEnquire={() => handleEnquireRoom(lightboxRoom.name)}
          enquireLabel={`Enquire About ${lightboxRoom.name} →`}
        />
      )}

      {/* Modal for Enquiry */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRoom={modalRoom}
        initialPackage={selectedPackageId}
      />
    </>
  );
}

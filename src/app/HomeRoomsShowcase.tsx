"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ROOM_CATEGORIES,
  PACKAGES,
  formatCurrency,
  calculateDiscountPercent,
  RoomCategory,
} from "./pricingData";
import RoomCardCarousel from "./RoomCardCarousel";
import RoomEnquireButton from "./RoomEnquireButton";
import ImageLightbox from "./ImageLightbox";

export default function HomeRoomsShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxRoom, setLightboxRoom] = useState<RoomCategory | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const handleOpenLightbox = (room: RoomCategory, initialIdx: number = 0) => {
    setLightboxRoom(room);
    setLightboxIdx(initialIdx);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxRoom(null);
  };

  const basePackage = PACKAGES[0]; // Non-AC / Room Only promotional base

  return (
    <>
      <div className="room-grid">
        {ROOM_CATEGORIES.map((room) => {
          const pricing = basePackage.prices[room.id];
          const discountPct = calculateDiscountPercent(pricing.original, pricing.discounted);

          return (
            <article className="room-card" key={room.id}>
              {/* Interactive Carousel Header */}
              <div className="overflow-hidden rounded-t-xl">
                <RoomCardCarousel
                  room={room}
                  onOpenLightbox={(idx) => handleOpenLightbox(room, idx)}
                />
              </div>

              {/* Room Card Content */}
              <div className="room-card-content">
                <h3>{room.name}</h3>
                <span className="room-occupancy-pill">
                  Base: {room.baseGuests} · Max: {room.maxGuests} guests
                </span>
                {room.photographedRoomsNote && (
                  <span className="text-[10px] text-[#788075] block mt-1">
                    {room.photographedRoomsNote}
                  </span>
                )}
                <p>{room.description}</p>
                <span className="room-features">{room.features}</span>

                <div className="room-pricing-row">
                  <div className="room-pricing-main">
                    <span className="room-pricing-label">Starting tariff</span>
                    <div className="room-pricing-figures">
                      <del className="room-price-original">
                        {formatCurrency(pricing.original)}
                      </del>
                      <strong className="room-price-discounted">
                        {formatCurrency(pricing.discounted)}
                      </strong>
                      <span className="room-price-unit">/ night</span>
                    </div>
                  </div>
                  <span className="room-discount-badge">{discountPct}% OFF</span>
                </div>

                <RoomEnquireButton roomName={room.name} packageId={basePackage.id} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="rooms-footer-cta">
        <Link href="/rooms" className="rooms-explore-button">
          <span>Explore All 5 Rooms &amp; 4 Stay Packages</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <p className="room-disclaimer">
          All requests are booking enquiries. Tariffs shown are estimated rates;
          final quotes and room allocations are confirmed directly by La Vivante Homestay upon enquiry submission.
        </p>
      </div>

      {/* Lightbox for Homepage Room Cards */}
      {lightboxOpen && lightboxRoom && (
        <ImageLightbox
          isOpen={lightboxOpen}
          images={lightboxRoom.gallery}
          initialIndex={lightboxIdx}
          onClose={handleCloseLightbox}
          title={lightboxRoom.name}
          subtitle={lightboxRoom.gallery[lightboxIdx]?.caption}
        />
      )}
    </>
  );
}

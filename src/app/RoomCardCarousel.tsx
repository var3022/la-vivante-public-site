"use client";

import React from "react";
import { RoomCategory } from "./pricingData";
import HorizontalSlidingTrack from "./HorizontalSlidingTrack";

interface RoomCardCarouselProps {
  room: RoomCategory;
  onOpenLightbox?: (index: number) => void;
  priority?: boolean;
}

export default function RoomCardCarousel({
  room,
  onOpenLightbox,
  priority = false,
}: RoomCardCarouselProps) {
  return (
    <HorizontalSlidingTrack
      items={room.gallery}
      aspectRatioClass="aspect-[4/3]"
      onSlideClick={onOpenLightbox}
      priority={priority}
      categoryTag={room.categoryTag}
      totalUnitsBadge={`${room.totalUnits} ${room.totalUnits === 1 ? "room" : "rooms"}`}
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
    />
  );
}

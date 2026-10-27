"use client";

import React from "react";

export default function RoomEnquireButton({
  roomName,
  className = "room-link",
}: {
  roomName: string;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-enquiry-modal", {
          detail: { room: roomName },
        })
      );
      // Also scroll gently to booking section if modal closes or as fallback
      const bookingEl = document.getElementById("booking");
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={`Enquire about ${roomName}`}
    >
      <span>Enquire about this room</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}

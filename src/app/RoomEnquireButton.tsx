"use client";

import React from "react";

export default function RoomEnquireButton({
  roomName,
  packageId,
  className = "room-link",
  children,
}: {
  roomName: string;
  packageId?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-enquiry-modal", {
          detail: { room: roomName, packageId },
        })
      );
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
      {children || (
        <>
          <span>Enquire about this room</span>
          <span aria-hidden="true">↗</span>
        </>
      )}
    </button>
  );
}

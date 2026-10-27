"use client";

import { useState } from "react";

const EARLIEST_CHECK_IN = "2026-11-01";
const DEFAULT_CHECK_OUT_MIN = "2026-11-02";

function getNextDay(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().split("T")[0];
}

export default function BookingDateInputs() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkOutMin, setCheckOutMin] = useState(DEFAULT_CHECK_OUT_MIN);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    if (newCheckIn && newCheckIn >= EARLIEST_CHECK_IN) {
      const nextDay = getNextDay(newCheckIn);
      setCheckOutMin(nextDay);
      if (checkOut && checkOut <= newCheckIn) {
        setCheckOut(nextDay);
      }
    } else {
      setCheckOutMin(DEFAULT_CHECK_OUT_MIN);
      if (checkOut && checkOut < DEFAULT_CHECK_OUT_MIN) {
        setCheckOut(DEFAULT_CHECK_OUT_MIN);
      }
    }
  };

  return (
    <>
      <label className="booking-field">
        <span>CHECK-IN</span>
        <input
          type="date"
          name="checkIn"
          aria-label="Check-in date"
          min={EARLIEST_CHECK_IN}
          value={checkIn}
          onChange={handleCheckInChange}
        />
      </label>

      <label className="booking-field">
        <span>CHECK-OUT</span>
        <input
          type="date"
          name="checkOut"
          aria-label="Check-out date"
          min={checkOutMin}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>
    </>
  );
}

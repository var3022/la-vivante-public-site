"use client";

import { useState } from "react";
import { useTodayDate, getTodayDateString, getNextDay } from "./dateUtils";

export default function BookingDateInputs() {
  const today = useTodayDate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const checkOutMin = checkIn ? getNextDay(checkIn) : (today ? getNextDay(today) : undefined);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    const currentToday = getTodayDateString();
    if (newCheckIn && newCheckIn >= currentToday) {
      const nextDay = getNextDay(newCheckIn);
      if (checkOut && checkOut <= newCheckIn) {
        setCheckOut(nextDay);
      }
    } else {
      const defaultNext = getNextDay(currentToday);
      if (checkOut && checkOut < defaultNext) {
        setCheckOut(defaultNext);
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
          min={today || undefined}
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

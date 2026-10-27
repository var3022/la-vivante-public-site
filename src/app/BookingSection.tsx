"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EARLIEST_CHECK_IN, DEFAULT_CHECK_OUT_MIN, getNextDay } from "./dateUtils";
import EnquiryModal from "./EnquiryModal";

export default function BookingSection() {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [checkOutMin, setCheckOutMin] = useState(DEFAULT_CHECK_OUT_MIN);
	const [guests, setGuests] = useState("2 guests");
	const [selectedRoom, setSelectedRoom] = useState("No specific preference");
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Listen for custom "open-enquiry" events (e.g. from room cards or header links)
	useEffect(() => {
		const handleOpenEnquiry = (event: Event) => {
			const customEvent = event as CustomEvent<{ room?: string }>;
			if (customEvent.detail?.room) {
				setSelectedRoom(customEvent.detail.room);
			}
			setIsModalOpen(true);
		};

		window.addEventListener("open-enquiry-modal", handleOpenEnquiry);
		return () => window.removeEventListener("open-enquiry-modal", handleOpenEnquiry);
	}, []);

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

	const handleOpenModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<>
			<section className="booking-wrap" id="booking" aria-label="Check availability and enquire about your stay">
				<div className="booking-panel">
					<div className="booking-intro">
						<span className="booking-icon" aria-hidden="true">✳</span>
						<div>
							<strong>Make yourself at home</strong>
							<p>Start planning your next stay.</p>
						</div>
					</div>

					<label className="booking-field" htmlFor="booking-checkin">
						<span>CHECK-IN</span>
						<input
							id="booking-checkin"
							type="date"
							name="checkIn"
							aria-label="Check-in date"
							min={EARLIEST_CHECK_IN}
							value={checkIn}
							onChange={handleCheckInChange}
						/>
					</label>

					<label className="booking-field" htmlFor="booking-checkout">
						<span>CHECK-OUT</span>
						<input
							id="booking-checkout"
							type="date"
							name="checkOut"
							aria-label="Check-out date"
							min={checkOutMin}
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
						/>
					</label>

					<label className="booking-field guest-field" htmlFor="booking-guests">
						<span>GUESTS</span>
						<select
							id="booking-guests"
							name="guests"
							aria-label="Number of guests"
							value={guests}
							onChange={(e) => setGuests(e.target.value)}
						>
							<option value="1 guest">1 guest</option>
							<option value="2 guests">2 guests</option>
							<option value="3 guests">3 guests</option>
							<option value="4 guests">4 guests</option>
							<option value="5+ guests">5+ guests</option>
						</select>
					</label>

					<div className="booking-actions">
						<button
							type="button"
							className="btn-enquire-cta"
							onClick={handleOpenModal}
							id="enquire-now-button"
						>
							<span>Enquire About Your Stay</span>
							<span className="cta-arrow" aria-hidden="true">✦</span>
						</button>

						<Link href="/rooms" className="btn-explore-cta" id="explore-rooms-link">
							<span>Explore Now</span>
							<span aria-hidden="true">→</span>
						</Link>
					</div>
				</div>

				<p className="booking-note">
					This is an enquiry only. Your stay is not confirmed until La Vivante responds. Bookings open from November 1, 2026.
				</p>
			</section>

			<EnquiryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				initialCheckIn={checkIn}
				initialCheckOut={checkOut}
				initialGuests={guests}
				initialRoom={selectedRoom}
			/>
		</>
	);
}

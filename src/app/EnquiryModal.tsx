"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { EARLIEST_CHECK_IN, DEFAULT_CHECK_OUT_MIN, getNextDay } from "./dateUtils";
import { WhatsAppIcon, EmailIcon, CloseIcon } from "./Icons";
import {
  ROOM_CATEGORIES,
  PACKAGES,
  DEFAULT_PACKAGE_ID,
  PackageId,
  RoomCategory,
  calculateStayEstimate,
  calculateNightsBetween,
  formatCurrency,
  getRoomById,
} from "./pricingData";

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
  initialRoom?: string;
  initialPackage?: PackageId;
}

function parseGuestsInput(val?: string): number {
  if (!val) return 2;
  const match = val.match(/\d+/);
  return match ? parseInt(match[0], 10) : 2;
}

function EnquiryDialog({
  onClose,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = "2",
  initialRoom = "No specific preference",
  initialPackage = DEFAULT_PACKAGE_ID,
}: Omit<EnquiryModalProps, "isOpen">) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [selectedRoomName, setSelectedRoomName] = useState(() => {
    // Check if initialRoom matches a category
    const found = getRoomById(initialRoom);
    return found ? found.name : initialRoom || "No specific preference";
  });
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>(initialPackage);
  const [guestsCount, setGuestsCount] = useState<number>(() => {
    const parsed = parseGuestsInput(initialGuests);
    const found = getRoomById(initialRoom);
    if (found && parsed > found.maxGuests) {
      return found.maxGuests;
    }
    return parsed;
  });
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Identify selected room category object if any
  const selectedRoom: RoomCategory | undefined = useMemo(() => {
    return ROOM_CATEGORIES.find((r) => r.name.toLowerCase() === selectedRoomName.toLowerCase());
  }, [selectedRoomName]);

  const handleRoomChange = (roomName: string) => {
    setSelectedRoomName(roomName);
    const room = ROOM_CATEGORIES.find((r) => r.name.toLowerCase() === roomName.toLowerCase());
    if (room && guestsCount > room.maxGuests) {
      setGuestsCount(room.maxGuests);
    }
  };

  // Manage body scroll lock and escape key handling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Compute minimum check-out date based on current checkIn
  const minCheckOut = checkIn && checkIn >= EARLIEST_CHECK_IN ? getNextDay(checkIn) : DEFAULT_CHECK_OUT_MIN;

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (errors.checkIn) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.checkIn;
        return copy;
      });
    }

    if (val && val >= EARLIEST_CHECK_IN) {
      const nextDay = getNextDay(val);
      if (checkOut && checkOut <= val) {
        setCheckOut(nextDay);
      }
    }
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
    if (errors.checkOut) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.checkOut;
        return copy;
      });
    }
  };

  // Pricing calculation
  const estimate = useMemo(() => {
    if (!selectedRoom) return null;
    return calculateStayEstimate({
      roomId: selectedRoom.id,
      packageId: selectedPackageId,
      guestsCount,
      checkIn,
      checkOut,
    });
  }, [selectedRoom, selectedPackageId, guestsCount, checkIn, checkOut]);

  const numberOfNights = useMemo(() => {
    return checkIn && checkOut ? calculateNightsBetween(checkIn, checkOut) : 0;
  }, [checkIn, checkOut]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (trimmedPhone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits).";
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address or leave it blank.";
      }
    }

    if (!checkIn) {
      newErrors.checkIn = "Please select a check-in date.";
    } else if (checkIn < EARLIEST_CHECK_IN) {
      newErrors.checkIn = "Please select a valid check-in date.";
    }

    if (!checkOut) {
      newErrors.checkOut = "Please select a check-out date.";
    } else if (checkIn && checkOut <= checkIn) {
      newErrors.checkOut = "Check-out date must be at least one day after check-in.";
    }

    // Occupancy enforcement
    if (selectedRoom && guestsCount > selectedRoom.maxGuests) {
      newErrors.guests = `${selectedRoom.name} accommodates a maximum of ${selectedRoom.maxGuests} guests.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateEnquiryText = (): string => {
    const pkg = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[0];
    const nightsText = numberOfNights > 0 ? `${numberOfNights} night${numberOfNights > 1 ? "s" : ""}` : "Dates pending";

    const lines = [
      "Hello La Vivante Homestay Team,",
      "",
      "I would like to enquire about staying at La Vivante Homestay (Enquiry Only):",
      "",
      `• Guest Name: ${name.trim()}`,
      `• Phone Number: ${phone.trim()}`,
      `• Email: ${email.trim() ? email.trim() : "Not provided"}`,
      `• Check-in Date: ${checkIn}`,
      `• Check-out Date: ${checkOut} (${nightsText})`,
      `• Number of Guests: ${guestsCount} guest${guestsCount > 1 ? "s" : ""}`,
      `• Room Preference: ${selectedRoomName}${selectedRoom ? ` (Base: ${selectedRoom.baseGuests} / Max: ${selectedRoom.maxGuests} guests)` : ""}`,
      `• Selected Package: ${pkg.name}`,
    ];

    if (estimate && numberOfNights > 0) {
      const extraGuestText =
        estimate.extraGuests > 0
          ? ` (incl. ${estimate.extraGuests} extra guest @ ${formatCurrency(estimate.extraPersonRatePerNight)}/night)`
          : "";
      lines.push(
        `• Nightly Rate: ${formatCurrency(estimate.effectiveNightlyRate)}/night${extraGuestText} [was ${formatCurrency(estimate.baseOriginalPrice + estimate.totalExtraPersonPerNight)}, ${estimate.discountPercent}% OFF base]`,
        `• Estimated Total Amount: ${formatCurrency(estimate.estimatedTotal)} for ${numberOfNights} night${numberOfNights > 1 ? "s" : ""} (Estimate for enquiry only)`
      );
    } else if (estimate) {
      lines.push(
        `• Estimated Nightly Rate: ${formatCurrency(estimate.effectiveNightlyRate)}/night [was ${formatCurrency(estimate.baseOriginalPrice + estimate.totalExtraPersonPerNight)}, ${estimate.discountPercent}% OFF base] (Final total requires check-in & check-out dates)`
      );
    } else {
      lines.push(
        `• Estimated Pricing: Customized quote requested based on preferred package (${pkg.name})`
      );
    }

    if (notes.trim()) {
      lines.push(`• Special Requests / Notes: ${notes.trim()}`);
    }

    lines.push(
      "",
      "Please note: This is an enquiry only and does not constitute a confirmed booking. Please share availability and details. Thank you!"
    );

    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const text = generateEnquiryText();
    const whatsappUrl = `https://wa.me/916369137468?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setActionNotice(
      "WhatsApp has opened in a new tab with your pre-filled enquiry. Please click 'Send' in WhatsApp to deliver your message to La Vivante."
    );
  };

  const handleEmail = () => {
    if (!validate()) return;
    const text = generateEnquiryText();
    const subject = `Stay Enquiry - ${name.trim()} (${checkIn} to ${checkOut} · ${selectedRoomName})`;
    const mailtoUrl = `mailto:stay@lavivantegroups.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoUrl;
    setActionNotice(
      "Your email client is opening with your pre-filled enquiry to stay@lavivantegroups.com. Please review and click 'Send' in your email app."
    );
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        aria-describedby="enquiry-modal-desc"
        ref={dialogRef}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">LA VIVANTE HOMESTAY</p>
            <h2 id="enquiry-modal-title" className="modal-title">
              Enquire About <em>Your Stay</em>
            </h2>
            <p id="enquiry-modal-desc" className="modal-subtitle">
              Share your preferred room, package, and dates for an estimated quote.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close enquiry modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Enquiry Notice */}
        <div className="rounded-lg bg-[#fbf8ee] border border-[#e5ddc8] p-3 text-xs text-[#524d40] mb-4 flex items-start gap-2.5">
          <span className="text-[#9b8050] text-sm mt-0.5">ℹ</span>
          <p className="m-0 leading-relaxed">
            <strong>Enquiry only:</strong> This request does not confirm a booking or guarantee availability. Rates shown are preliminary promotional estimates. Final confirmation is provided by La Vivante upon direct contact.
          </p>
        </div>

        {actionNotice && (
          <div className="action-feedback-box" role="alert">
            <span aria-hidden="true">✓</span>
            <p>{actionNotice}</p>
          </div>
        )}

        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleWhatsApp();
          }}
          noValidate
        >
          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="enquiry-name">
                Your Full Name <span className="req">*</span>
              </label>
              <input
                id="enquiry-name"
                ref={firstInputRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((p) => {
                      const c = { ...p };
                      delete c.name;
                      return c;
                    });
                  }
                }}
                placeholder="e.g. Anand Sharma"
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="enquiry-phone">
                Phone Number <span className="req">*</span>
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors((p) => {
                      const c = { ...p };
                      delete c.phone;
                      return c;
                    });
                  }
                }}
                placeholder="e.g. 6369137468 or +91 98765 43210"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
              />
              {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-email">
              Email Address <span className="optional">(optional)</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((p) => {
                    const c = { ...p };
                    delete c.email;
                    return c;
                  });
                }
              }}
              placeholder="e.g. guest@example.com"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
          </div>

          {/* Dates & Guests */}
          <div className="form-grid-3">
            <div className="form-field">
              <label htmlFor="enquiry-checkin">
                Check-in Date <span className="req">*</span>
              </label>
              <input
                id="enquiry-checkin"
                type="date"
                min={EARLIEST_CHECK_IN}
                value={checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                aria-required="true"
                aria-invalid={errors.checkIn ? "true" : "false"}
              />
              <span className="field-hint">From Nov 1, 2026</span>
              {errors.checkIn && <span className="field-error" role="alert">{errors.checkIn}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="enquiry-checkout">
                Check-out Date <span className="req">*</span>
              </label>
              <input
                id="enquiry-checkout"
                type="date"
                min={minCheckOut}
                value={checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                aria-required="true"
                aria-invalid={errors.checkOut ? "true" : "false"}
              />
              <span className="field-hint">
                {numberOfNights > 0 ? `${numberOfNights} night${numberOfNights > 1 ? "s" : ""}` : "Min 1 night"}
              </span>
              {errors.checkOut && <span className="field-error" role="alert">{errors.checkOut}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="enquiry-guests">
                Guests <span className="req">*</span>
              </label>
              <select
                id="enquiry-guests"
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
              >
                {selectedRoom ? (
                  Array.from({ length: selectedRoom.maxGuests }, (_, i) => i + 1).map((num) => {
                    let label = `${num} guest${num > 1 ? "s" : ""}`;
                    if (num > selectedRoom.baseGuests) {
                      label += ` (+ extra guest)`;
                    } else if (num === selectedRoom.baseGuests) {
                      label += ` (base)`;
                    }
                    return (
                      <option key={num} value={num}>
                        {label}
                      </option>
                    );
                  })
                ) : (
                  <>
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                  </>
                )}
              </select>
              {selectedRoom && (
                <span className="field-hint">
                  Max {selectedRoom.maxGuests} guests for {selectedRoom.name}
                </span>
              )}
            </div>
          </div>

          {/* Room Selection */}
          <div className="form-field">
            <label htmlFor="enquiry-room">
              Room Category <span className="optional">(5 categories available)</span>
            </label>
            <select
              id="enquiry-room"
              value={selectedRoomName}
              onChange={(e) => handleRoomChange(e.target.value)}
            >
              <option value="No specific preference">No specific preference (Recommend best)</option>
              {ROOM_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.totalUnits} unit{cat.totalUnits > 1 ? "s" : ""} · Base {cat.baseGuests} / Max {cat.maxGuests} guests)
                </option>
              ))}
            </select>
          </div>

          {/* Package Selection */}
          <div className="form-field">
            <label htmlFor="enquiry-package">
              Stay Package Option <span className="req">*</span>
            </label>
            <select
              id="enquiry-package"
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value as PackageId)}
            >
              {PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — Extra person: {formatCurrency(pkg.extraPersonCharge)}/night
                </option>
              ))}
            </select>
            <span className="field-hint">
              Includes natural or AC options, with or without breakfast.
            </span>
          </div>

          {/* Live Pricing Breakdown Box */}
          {estimate && (
            <div className="rounded-xl border border-[#ded6c5] bg-[#faf7ef] p-4 mb-4 text-xs">
              <div className="flex items-start justify-between gap-2 border-b border-[#ece4d3] pb-2.5 mb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8b764b]">
                    {estimate.room?.name} · {estimate.package.shortLabel}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <del className="text-[#8c9182] text-xs">
                      {formatCurrency(estimate.baseOriginalPrice)}
                    </del>
                    <span className="text-base font-bold text-[#1f372a]">
                      {formatCurrency(estimate.baseDiscountedPrice)}
                    </span>
                    <span className="text-[11px] text-[#6f756a]">/ night (base)</span>
                    <span className="rounded bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold">
                      {estimate.discountPercent}% OFF
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-[#f0ede3] px-2 py-0.5 text-[10px] font-medium text-[#4a5046]">
                    Base: {estimate.baseGuests} | Max: {estimate.room?.maxGuests} guests
                  </span>
                </div>
              </div>

              {/* Extra person calculation note */}
              {estimate.extraGuests > 0 ? (
                <div className="text-[#656c5e] mb-2 flex items-center justify-between">
                  <span>
                    Extra guests ({estimate.extraGuests} guest{estimate.extraGuests > 1 ? "s" : ""} above base {estimate.baseGuests}):
                  </span>
                  <span className="font-semibold text-[#294b3b]">
                    +{formatCurrency(estimate.totalExtraPersonPerNight)} / night
                  </span>
                </div>
              ) : (
                <div className="text-[#7c8274] mb-2 text-[11px]">
                  Standard base occupancy applies (no extra guest fee).
                </div>
              )}

              {/* Nightly & Total Calculation */}
              <div className="pt-2 border-t border-[#ece4d3] flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#2f352b]">
                    Nightly Rate ({guestsCount} guest{guestsCount > 1 ? "s" : ""}):
                  </span>
                  <span className="block text-[11px] text-[#7a8072]">
                    {numberOfNights > 0 ? `For ${numberOfNights} night${numberOfNights > 1 ? "s" : ""}` : "Select check-in & check-out dates"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#1f372a]">
                    {formatCurrency(estimate.effectiveNightlyRate)} / night
                  </span>
                  {numberOfNights > 0 && (
                    <div className="text-base font-bold text-[#1c352a]">
                      Est. Total: {formatCurrency(estimate.estimatedTotal)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="enquiry-notes">
              Special Requests / Questions <span className="optional">(optional)</span>
            </label>
            <textarea
              id="enquiry-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Arrival timing, extra bed query, meal preferences, or local travel guidance..."
            />
          </div>

          {/* Action buttons */}
          <div className="modal-actions-wrap">
            <p className="actions-prompt">Choose how you would like to send your enquiry:</p>
            <div className="modal-button-row">
              <button
                type="button"
                className="btn-modal-whatsapp"
                onClick={handleWhatsApp}
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                <span>Enquire via WhatsApp</span>
              </button>

              <button
                type="button"
                className="btn-modal-email"
                onClick={handleEmail}
              >
                <EmailIcon className="w-5 h-5 flex-shrink-0" />
                <span>Enquire via Email</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EnquiryModal(props: EnquiryModalProps) {
  if (!props.isOpen) return null;
  return (
    <EnquiryDialog
      key={`${props.initialCheckIn}_${props.initialCheckOut}_${props.initialGuests}_${props.initialRoom}_${props.initialPackage}`}
      {...props}
    />
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { EARLIEST_CHECK_IN, DEFAULT_CHECK_OUT_MIN, getNextDay } from "./dateUtils";
import { WhatsAppIcon, EmailIcon, CloseIcon } from "./Icons";

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
  initialRoom?: string;
}

const ROOM_OPTIONS = [
  "No specific preference",
  "The Deluxe Room",
  "The Balcony Room",
  "The Family Room",
  "Shared Accommodation",
];

function EnquiryDialog({
  onClose,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = "2",
  initialRoom = "No specific preference",
}: Omit<EnquiryModalProps, "isOpen">) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests || "2");
  const [room, setRoom] = useState(initialRoom || "No specific preference");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [copied, setCopied] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

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
      newErrors.checkIn = "Check-in date must be on or after November 1, 2026.";
    }

    if (!checkOut) {
      newErrors.checkOut = "Please select a check-out date.";
    } else if (checkIn && checkOut <= checkIn) {
      newErrors.checkOut = "Check-out date must be at least one day after check-in.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateEnquiryText = (): string => {
    const lines = [
      "Hello La Vivante Homestay Team,",
      "",
      "I would like to enquire about staying at La Vivante Homestay:",
      "",
      `• Guest Name: ${name.trim()}`,
      `• Phone Number: ${phone.trim()}`,
      `• Email: ${email.trim() ? email.trim() : "Not provided"}`,
      `• Check-in Date: ${checkIn}`,
      `• Check-out Date: ${checkOut}`,
      `• Number of Guests: ${guests}`,
      `• Preferred Room: ${room}`,
    ];

    if (notes.trim()) {
      lines.push(`• Special Requests / Notes: ${notes.trim()}`);
    }

    lines.push(
      "",
      "Please let me know about availability and booking details. Thank you!"
    );

    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const text = generateEnquiryText();
    const whatsappUrl = `https://wa.me/916369137468?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setActionNotice(
      "WhatsApp has been opened in a new tab with your pre-filled enquiry. Please click 'Send' in WhatsApp to deliver your message to La Vivante."
    );
  };

  const handleEmail = () => {
    if (!validate()) return;
    const text = generateEnquiryText();
    const subject = `Stay Enquiry - ${name.trim()} (${checkIn} to ${checkOut})`;
    const mailtoUrl = `mailto:stay@lavivantegroups.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoUrl;
    setActionNotice(
      "Your email client is opening with your pre-filled enquiry to stay@lavivantegroups.com. Please review and click 'Send' in your email app."
    );
  };

  /*
  const handleCopy = async () => {
    if (!validate()) return;
    const text = generateEnquiryText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setActionNotice("Enquiry details copied to clipboard! You can paste and send this via any messaging app.");
      setTimeout(() => setCopied(false), 4000);
    } catch {
      setActionNotice("Could not copy automatically. Please use the WhatsApp or Email button.");
    }
  };
  */

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
              Share your preferred dates and details with our team.
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

        {/* Prominent honesty banner 
        <div className="enquiry-notice-box" role="status">
          <span className="notice-icon" aria-hidden="true">ℹ</span>
          <div>
            <strong>This is an enquiry only. Your stay is not confirmed until La Vivante responds.</strong>
            <p>
              When you click WhatsApp or Email, your chosen app will open with your details pre-filled. You must click <em>Send</em> in that app to deliver your message.
            </p>
          </div>
        </div>*/}

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
              <span className="field-hint">Min 1 night after check-in</span>
              {errors.checkOut && <span className="field-error" role="alert">{errors.checkOut}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="enquiry-guests">
                Guests <span className="req">*</span>
              </label>
              <select
                id="enquiry-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1 guest">1 guest</option>
                <option value="2 guests">2 guests</option>
                <option value="3 guests">3 guests</option>
                <option value="4 guests">4 guests</option>
                <option value="5+ guests">5+ guests</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-room">
              Room Preference <span className="optional">(optional)</span>
            </label>
            <select
              id="enquiry-room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              {ROOM_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-notes">
              Special Requests / Questions <span className="optional">(optional)</span>
            </label>
            <textarea
              id="enquiry-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Estimated arrival time, dietary considerations, or room questions..."
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

            {/*<button
              type="button"
              className="btn-modal-copy"
              onClick={handleCopy}
              title="Copy enquiry text to paste anywhere"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                  <span>Enquiry Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  <span>Copy Enquiry Details</span>
                </>
              )}
            </button>*/}
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
      key={`${props.initialCheckIn}_${props.initialCheckOut}_${props.initialGuests}_${props.initialRoom}`}
      {...props}
    />
  );
}

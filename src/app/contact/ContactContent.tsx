"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  MapPinIcon,
  GlobeIcon,
  ArrowUpRightIcon,
  QrCodeIcon,
  ShareIcon,
  CheckIcon,
  CopyIcon,
} from "../Icons";

interface ActionButtonProps {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  highlight?: boolean;
  badge?: string;
}
const LATITUDE = "10.991159";
const LONGITUDE = "76.988070";
const COORDINATES = `${LATITUDE},${LONGITUDE}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDINATES}`;
function ActionButton({
  href,
  title,
  subtitle,
  icon,
  isExternal = true,
  highlight = false,
  badge,
}: ActionButtonProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group relative flex items-center justify-between gap-4 w-full p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
        highlight
          ? "bg-gradient-to-r from-[#17241d] to-[#121c16] border-2 border-[#c5a46a] shadow-[0_4px_28px_-4px_rgba(197,164,106,0.35)] hover:shadow-[0_8px_36px_-2px_rgba(197,164,106,0.55)] hover:-translate-y-1"
          : "bg-[#101512]/90 border border-[#c5a46a]/30 hover:border-[#c5a46a] hover:bg-[#151c18] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_28px_rgba(197,164,106,0.25)] hover:-translate-y-0.5"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-[#c5a46a] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0a0f0c] shadow-sm">
          {badge}
        </span>
      )}

      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div
          className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            highlight
              ? "bg-[#c5a46a] text-[#0a0f0c]"
              : "bg-[#18211c] text-[#c5a46a] border border-[#c5a46a]/30 group-hover:border-[#c5a46a] group-hover:bg-[#c5a46a] group-hover:text-[#0a0f0c]"
          }`}
        >
          {icon}
        </div>

        <div className="text-left min-w-0">
          <h2 className="text-sm sm:text-base font-semibold tracking-wide text-white group-hover:text-[#f8f2e6] transition-colors truncate">
            {title}
          </h2>
          <p className="text-xs text-[#b8b4a8] group-hover:text-[#dedad0] transition-colors truncate">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#c5a46a] transition-all duration-300 group-hover:bg-[#c5a46a] group-hover:text-[#0a0f0c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRightIcon className="w-4 h-4" />
      </div>
    </a>
  );
}

export default function ContactContent() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const contactUrl = "https://lavivantegroups.com/contact";
  const rawPhone = "+91 6369137468";
  const telHref = "tel:+916369137468";
  const addressText =
    "Old No. 15C-1, Srinagar 1st Street West Extension, Rupa Nagar, Ramanathapuram, Coimbatore – 641045, Tamil Nadu, India";

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(rawPhone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "La Vivante Homestay · Digital Contact",
          text: "Stay. Relax. Experience. Connect directly with La Vivante Homestay in Coimbatore.",
          url: contactUrl,
        });
        return;
      } catch {
        // user cancelled or share failed, fallback to copy
      }
    }
    try {
      await navigator.clipboard.writeText(contactUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleDownloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:La Vivante Homestay",
      "ORG:La Vivante Groups",
      "TITLE:Luxury Homestay & Retreat",
      "TEL;TYPE=CELL,VOICE:+916369137468",
      "EMAIL;TYPE=INTERNET:stay@lavivantegroups.com",
      "URL:https://lavivantegroups.com/",
      "ADR;TYPE=WORK:;;Old No. 15C-1, Srinagar 1st Street West Extension, Rupa Nagar, Ramanathapuram;Coimbatore;Tamil Nadu;641045;India",
      "NOTE:Stay. Relax. Experience. Luxury homestay in Coimbatore.",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "La-Vivante-Homestay.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-[#070b08] text-[#f8f6f0] selection:bg-[#c5a46a] selection:text-[#0a0f0c] overflow-x-hidden font-sans">
      {/* Ambient Luxury Lighting & Glows */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(197, 164, 106, 0.22), transparent 55%),
            radial-gradient(circle at 85% 60%, rgba(41, 75, 59, 0.2), transparent 45%),
            radial-gradient(circle at 15% 85%, rgba(197, 164, 106, 0.12), transparent 45%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle Luxury Pattern / Grid Accent */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(214, 194, 154, 0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-between px-4 py-8 sm:px-6 sm:py-12">
        {/* Top Section */}
        <div>
          {/* Quick Header Nav */}
          <nav
            className="mb-6 flex items-center justify-between text-xs tracking-wider"
            aria-label="Contact page navigation"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a46a]/30 bg-[#121915]/80 px-3.5 py-1.5 text-[#d4c5a9] backdrop-blur-md transition-all duration-300 hover:border-[#c5a46a] hover:text-white"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Home</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a46a]/30 bg-[#121915]/80 px-3.5 py-1.5 text-[#d4c5a9] backdrop-blur-md transition-all duration-300 hover:border-[#c5a46a] hover:text-white active:scale-95"
              aria-label="Share contact page"
            >
              {copiedLink ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <ShareIcon className="w-3.5 h-3.5 text-[#c5a46a]" />
                  <span>Share Card</span>
                </>
              )}
            </button>
          </nav>

          {/* Brand Profile Card */}
          <header className="mb-8 text-center sm:mb-10">
            {/* Logo container with luxury gold border & soft glow */}
            <div className="relative mx-auto mb-4 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9e7f45] via-[#e5c98d] to-[#c5a46a] opacity-80 blur-[6px] animate-pulse"
                style={{ animationDuration: "4s" }}
                aria-hidden="true"
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-[#c5a46a] bg-[#0c120e] p-3 shadow-2xl shadow-black">
                <Image
                  src="/images/lavivante-logo 1.png"
                  alt="La Vivante Homestay Emblem"
                  width={96}
                  height={96}
                  priority
                  className="h-full w-full object-contain filter drop-shadow-[0_2px_8px_rgba(197,164,106,0.3)]"
                />
              </div>
            </div>

            {/* Brand Eyebrow */}
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#c5a46a]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c5a46a]">
                HOMESTAY · COIMBATORE
              </span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#c5a46a]" />
            </div>

            {/* Brand Title */}
            <h1
              className="font-brand text-2xl sm:text-3xl font-bold tracking-wider text-white"
              style={{ fontFamily: "var(--font-cinzel-decorative), serif" }}
            >
              La Vivante
            </h1>

            {/* Tagline */}
            <p
              className="mt-2 text-base sm:text-lg italic text-[#e8e2d4] tracking-wide"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              &ldquo;Stay. Relax. Experience.&rdquo;
            </p>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm leading-relaxed text-[#a8a396]">
              Your luxury retreat in Ramanathapuram, Coimbatore. Connect with us instantly for stays, reservations & inquiries.
            </p>
          </header>

          {/* Six Core Action Buttons */}
          <section
            className="flex flex-col gap-3.5 sm:gap-4"
            aria-label="Direct contact options"
          >
            {/* 1. WhatsApp Button (Primary Concierge) */}
            <ActionButton
              href="https://wa.me/916369137468"
              title="Chat on WhatsApp"
              subtitle="Quick responses for stay enquiries"
              icon={<WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
              highlight={true}
              badge="Instant Chat"
            />

            {/* 2. Call Us Button (tel: link) */}
            <ActionButton
              href={telHref}
              isExternal={false}
              title="Call Us Directly"
              subtitle={`${rawPhone} · Direct Reservations`}
              icon={<PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />

            {/* 3. Find Us / Google Maps Button */}
            <ActionButton
              href={DIRECTIONS_URL}
              title="Find Us on Google Maps"
              subtitle="Ramanathapuram, Coimbatore · GPS Directions"
              icon={<MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />

            {/* 4. Official Website Button */}
            <ActionButton
              href="https://lavivantegroups.com/"
              title="Official Website"
              subtitle="Explore suites, amenities & property gallery"
              icon={<GlobeIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />

            {/* 5. Instagram Button */}
            <ActionButton
              href="https://www.instagram.com/la.vivante.homestay"
              title="Follow on Instagram"
              subtitle="@la.vivante.homestay · Stories & Moments"
              icon={<InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />

            {/* 6. Facebook Button */}
            <ActionButton
              href="https://www.facebook.com/profile.php?id=61595689151411"
              title="Connect on Facebook"
              subtitle="La Vivante Homestay · Community & Updates"
              icon={<FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            />
          </section>

          {/* Quick Tools & QR Code Section */}
          <section
            className="mt-6 rounded-2xl border border-[#c5a46a]/25 bg-[#0e1410]/80 p-5 backdrop-blur-md"
            aria-label="QR Code and Contact Actions"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#c5a46a]/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c5a46a]/40 bg-[#16211a] text-[#c5a46a]">
                  <QrCodeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Scan & Share Contact
                  </h3>
                  <p className="text-[11px] text-[#a6a092]">
                    High-resolution printable QR code
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrModal((prev) => !prev)}
                className="rounded-lg border border-[#c5a46a]/40 bg-[#16211a] px-3 py-1.5 text-xs font-medium text-[#e5c98d] transition-all hover:border-[#c5a46a] hover:bg-[#c5a46a] hover:text-[#0a0f0c] active:scale-95"
              >
                {showQrModal ? "Hide QR" : "View QR"}
              </button>
            </div>

            {/* Expandable QR Preview */}
            {showQrModal && (
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-[#070a08] p-5 text-center border border-[#c5a46a]/20">
                <div className="relative mb-3 overflow-hidden rounded-xl border-2 border-[#c5a46a] bg-white p-3 shadow-lg">
                  <Image
                    src="/images/la-vivante-contact-qr.png"
                    alt="La Vivante Luxury Contact QR Code pointing to https://lavivantegroups.com/contact"
                    width={220}
                    height={220}
                    className="h-auto w-44 sm:w-52"
                    priority
                  />
                </div>
                <p className="text-[11px] text-[#c5a46a] font-mono tracking-wider mb-3">
                  https://lavivantegroups.com/contact
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href="/images/la-vivante-contact-qr.png"
                    download="la-vivante-contact-qr.png"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#c5a46a]/40 bg-[#141d17] px-3 py-1.5 text-xs text-[#e8e2d4] transition-colors hover:border-[#c5a46a] hover:text-white"
                  >
                    <span>Download PNG</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href="/images/la-vivante-contact-qr.svg"
                    download="la-vivante-contact-qr.svg"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#c5a46a]/40 bg-[#141d17] px-3 py-1.5 text-xs text-[#e8e2d4] transition-colors hover:border-[#c5a46a] hover:text-white"
                  >
                    <span>Vector SVG</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#c5a46a]/25 bg-[#121914] px-3 py-2.5 text-xs font-medium text-[#ded8cb] transition-all hover:border-[#c5a46a] hover:text-white active:scale-95"
              >
                {copiedPhone ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Phone Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5 text-[#c5a46a]" />
                    <span>Copy Phone</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadVCard}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#c5a46a]/25 bg-[#121914] px-3 py-2.5 text-xs font-medium text-[#ded8cb] transition-all hover:border-[#c5a46a] hover:text-white active:scale-95"
              >
                <span className="text-[#c5a46a]">❖</span>
                <span>Save to Contacts</span>
              </button>
            </div>
          </section>

          {/* Location & Address Highlight */}
          <section
            className="mt-6 rounded-2xl border border-white/10 bg-[#0d120f]/60 p-5 text-left backdrop-blur-sm"
            aria-label="Property Address"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#18211b] text-[#c5a46a]">
                <MapPinIcon className="w-4 h-4" />
              </div>
              <div className="text-xs leading-relaxed text-[#b5b0a3]">
                <p className="font-semibold text-white mb-0.5">Property Location</p>
                <p>{addressText}</p>
                <div className="mt-2.5 flex items-center gap-3">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#c5a46a] hover:underline"
                  >
                    <span>Get Directions</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href="mailto:stay@lavivantegroups.com"
                    className="inline-flex items-center gap-1 font-medium text-[#c5a46a] hover:underline"
                  >
                    <span>stay@lavivantegroups.com</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-[#78746a]">
          <p className="tracking-widest uppercase font-medium text-[#a69e8f]">
            La Vivante Homestay · Luxury Stays
          </p>
          <p className="mt-1">
            © 2026 LA VIVANTE HOMESTAY · ALL RIGHTS RESERVED
          </p>
          <div className="mt-3">
            <Link
              href="/"
              className="text-[#c5a46a] transition-colors hover:text-[#e5c98d] hover:underline"
            >
              lavivantegroups.com
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

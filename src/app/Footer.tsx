import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, WhatsAppIcon, EmailIcon, InstagramIcon, FacebookIcon } from "./Icons";

export default function Footer({ currentPath = "/" }: { currentPath?: string }) {
  void currentPath;
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-top-row">
        <div className="footer-brand-wrap">
          <Link href="/" className="footer-brand" aria-label="La Vivante Homestay">
            <span className="flex items-center overflow-hidden rounded-lg p-1 shadow-xs transition-opacity hover:opacity-90">
              <Image
                src="/images/lavivante-logo 1.png"
                alt="La Vivante Homestay"
                width={44}
                height={42}
                className="h-10 w-auto object-contain"
              />
            </span>
            <span className="block font-brand font-bold text-base sm:text-xl md:text-2xl">La Vivante Homestay</span>
          </Link>
          <p className="footer-tagline">A place to pause, settle in and feel at home.</p>
        </div>

        <div className="footer-columns">
          {/* Quick Links 
          <div className="footer-col">
            <span className="footer-col-title">EXPLORE</span>
            <div className="footer-links-list">
              <Link href="/" className={currentPath === "/" ? "font-semibold" : ""}>
                Home
              </Link>
              <Link href="/rooms" className={currentPath === "/rooms" ? "font-semibold" : ""}>
                Rooms
              </Link>
              <Link href="/#experience">Experience</Link>
              <Link href="/#location">Location</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <span className="footer-col-title">CONTACT</span>
            <div className="footer-links-list">
              <a href="tel:6369137468" className="footer-contact-link">
                <PhoneIcon className="w-3.5 h-3.5 inline-block mr-1.5 opacity-75" />
                <span>6369137468</span>
              </a>
              <a
                href="https://wa.me/916369137468"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
                aria-label="Chat with La Vivante on WhatsApp at 916369137468"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 inline-block mr-1.5 text-emerald-600 opacity-90" />
                <span>WhatsApp: 916369137468</span>
              </a>
              <a href="mailto:stay@lavivantegroups.com" className="footer-contact-link">
                <EmailIcon className="w-3.5 h-3.5 inline-block mr-1.5 opacity-75" />
                <span>stay@lavivantegroups.com</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="footer-col">
            <span className="footer-col-title">CONNECT</span>
            <div className="footer-links-list">
              <a
                href="https://www.instagram.com/la.vivante.homestay?obrf=OHZ0eHg4MG5tazE5"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Follow La Vivante on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 inline-block mr-1.5 text-[#E4405F]" />
                <span>Instagram ↗</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61595689151411"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Visit La Vivante on Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5 inline-block mr-1.5 text-[#1877F2]" />
                <span>Facebook ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        {/*<p className="footer-disclaimer-text">
          This is an enquiry only. Your stay is not confirmed until La Vivante responds.
        </p>*/}
        <span className="copyright-line">© 2026 LA VIVANTE HOMESTAY · ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}

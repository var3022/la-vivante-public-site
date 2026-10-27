import React from "react";
import { PhoneIcon, WhatsAppIcon, EmailIcon, InstagramIcon, FacebookIcon } from "./Icons";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-label="Contact La Vivante">
      <div className="contact-container">
        <div className="contact-header">
          <p className="eyebrow">REACH OUT TO US</p>
          <h2>
            Contact <em>La Vivante.</em>
          </h2>
          <p className="contact-intro">
            We would love to welcome you. Reach out directly with your dates, questions, or room enquiries.
          </p>
        </div>

        <div className="contact-cards-grid">
          {/* Phone */}
          <div className="contact-card">
            <div className="contact-card-icon" aria-hidden="true">
              <PhoneIcon className="w-5 h-5 text-[#294b3b]" />
            </div>
            <h3>Phone</h3>
            <p className="contact-card-desc">Direct line for stay enquiries and questions.</p>
            <a
              href="tel:6369137468"
              className="contact-card-link"
              aria-label="Call La Vivante at 6369137468"
            >
              <span>6369137468</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="contact-card">
            <div className="contact-card-icon" aria-hidden="true">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3>WhatsApp</h3>
            <p className="contact-card-desc">Message us for quick assistance and stay details.</p>
            <a
              href="https://wa.me/916369137468"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link"
              aria-label="Chat with La Vivante on WhatsApp at 916369137468"
            >
              <span>6369137468</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="contact-card-icon" aria-hidden="true">
              <EmailIcon className="w-5 h-5 text-[#294b3b]" />
            </div>
            <h3>Email</h3>
            <p className="contact-card-desc">Send us your detailed enquiries and requirements.</p>
            <a
              href="mailto:stay@lavivantegroups.com"
              className="contact-card-link"
              aria-label="Email La Vivante at stay@lavivantegroups.com"
            >
              <span>stay@lavivantegroups.com</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Social */}
          <div className="contact-card">
            <div className="contact-card-icon" aria-hidden="true">
              <InstagramIcon className="w-5 h-5 text-[#E4405F]" />
            </div>
            <h3>Social Media</h3>
            <p className="contact-card-desc">Follow our latest updates and homestay stories.</p>
            <div className="contact-social-buttons">
              <a
                href="https://www.instagram.com/la.vivante.homestay?obrf=OHZ0eHg4MG5tazE5"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Visit La Vivante on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61595689151411"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Visit La Vivante on Facebook"
              >
                <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* <div className="contact-disclaimer-banner">
          <p>
            This is an enquiry only. Your stay is not confirmed until La Vivante responds.
          </p>
        </div> */}
      </div>
    </section>
  );
}

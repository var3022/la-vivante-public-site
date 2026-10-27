import React from "react";
import Link from "next/link";
import { MapPinIcon, DirectionsIcon } from "./Icons";

const LATITUDE = "10.991159";
const LONGITUDE = "76.988070";
const COORDINATES = `${LATITUDE},${LONGITUDE}`;

const PROPERTY_ADDRESS =
  "Old No. 15C-1, Srinagar 1st Street West Extension, Rupa Nagar, Ramanathapuram, Coimbatore – 641045, Tamil Nadu, India.";

// Responsive Google Maps embed centered on the exact coordinates (no API key required)
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${COORDINATES}&hl=en&z=17&t=&ie=UTF8&iwloc=&output=embed`;

// Directions URL linking to Google Maps directions for these exact coordinates
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDINATES}`;

export default function LocationSection() {
  return (
    <section className="location-section" id="location" aria-label="Location and directions to La Vivante">
      <div className="location-container">
        <div className="location-grid">
          {/* Information Column */}
          <div className="location-info">
            <p className="eyebrow light-eyebrow">
              <span aria-hidden="true" /> FIND YOUR WAY
            </p>
            <h2 className="location-title">
              Find Your Way to <br></br><em>La Vivante.</em>
            </h2>
            <p className="location-description">
              Tucked into the calm residential enclave of Ramanathapuram, Coimbatore,
              La Vivante offers a peaceful homestay retreat while keeping you comfortably
              connected to the city, transit hubs, and local amenities.
            </p>

            <div className="location-address-card">
              <div className="location-address-header">
                <div className="location-pin-wrap" aria-hidden="true">
                  <MapPinIcon className="w-4 h-4 text-[#c5a46a]" />
                </div>
                <div>
                  <span className="location-address-tag">PROPERTY ADDRESS</span>
                  <address className="location-address-text">
                    {PROPERTY_ADDRESS}
                  </address>
                </div>
              </div>

              <div className="location-actions">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-directions-btn"
                  aria-label="Get directions to La Vivante on Google Maps (opens in a new tab)"
                >
                  <DirectionsIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Get Directions</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <Link href="#booking" className="location-enquire-btn">
                  <span>Ask About Your Stay</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/*<p className="location-navigation-note">
                <strong>Note:</strong> Tap &ldquo;Get Directions&rdquo; to open Google Maps for turn-by-turn navigation directly to our homestay coordinates ({COORDINATES}).
              </p>*/}
            </div>
          </div>

          {/* Map Embed Column */}
          <div className="location-map-wrap">
            <div className="location-map-frame">
              <iframe
                title="Google Maps showing exact location of La Vivante Homestay at 10.991159, 76.988070 in Coimbatore"
                src={MAP_EMBED_URL}
                className="location-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="location-map-caption">
              <span>COIMBATORE, TAMIL NADU</span>
              {/*<span>10.991159, 76.988070</span>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

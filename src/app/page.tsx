import Image from "next/image";
import BookingSection from "./BookingSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import Header from "./Header";
import LocationSection from "./LocationSection";
import HeroCarousel from "./HeroCarousel";
import HomeRoomsShowcase from "./HomeRoomsShowcase";
import PropertyGallerySection from "./PropertyGallerySection";

const amenities = [
  ["01", "A comfortable stay", "Air-conditioned rooms and considered essentials"],
  ["02", "Room to arrive", "Parking options and lift access"],
  ["03", "Little pleasures", "Books, board games and time to unwind"],
  ["04", "Everyday ease", "Laundry facilities available on request"],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        A place to pause, settle in and feel at home.
      </div>

      <Header currentPath="/" />

      {/* Auto-playing Hero Carousel with Wide Exterior & Common Areas */}
      <HeroCarousel />

      <BookingSection />

      <section className="intro-section" id="experience">
        <div className="intro-label">
          <span className="section-index">01 / THE PHILOSOPHY</span>
          <span className="small-line" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">MORE THAN A ROOM</p>
          <h2>
            Some places give you
            <br />
            a bed. <em>Some give you a feeling.</em>
          </h2>
          <p className="intro-description">
            We believe the best stays are the ones that let you be yourself.
            No fuss, no formality—just welcoming spaces, considered comforts
            and room for your own kind of journey.
          </p>
          <a className="text-link" href="#stay">
            Get to know the stay <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="intro-stamp" aria-hidden="true">
          <Image
            src="/images/lavivante-logo 1.png"
            alt="La Vivante Homestay"
            width={100}
            height={98}
            priority
            className="h-20 w-auto object-contain"
          />
        </div>
      </section>

      {/* Five Room Categories with Auto-playing Carousel & Lightbox */}
      <section className="rooms-section" id="stay">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SPACE, YOUR PACE</p>
            <h2>Find your <em>place.</em></h2>
          </div>
          <p className="section-aside">
            Five thoughtful room categories.
            <br />
            Four transparent stay packages.
          </p>
        </div>

        <HomeRoomsShowcase />
      </section>

      {/* Dedicated Property Architecture, Grounds & Common Areas Gallery */}
      <PropertyGallerySection />

      <section className="amenities-section">
        <div className="amenities-heading">
          <p className="eyebrow">THE LITTLE THINGS MATTER</p>
          <h2>Comfort, without <em>compromise.</em></h2>
          <p>
            Everything you need for an easy stay, with a few thoughtful extras
            along the way.
          </p>
        </div>

        <div className="amenities-list">
          {amenities.map((amenity) => (
            <div className="amenity-row" key={amenity[0]}>
              <span className="amenity-number">{amenity[0]}</span>
              <h3>{amenity[1]}</h3>
              <p>{amenity[2]}</p>
              <span className="amenity-arrow" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>

      <LocationSection />

      <ContactSection />

      <Footer currentPath="/" />
    </main>
  );
}

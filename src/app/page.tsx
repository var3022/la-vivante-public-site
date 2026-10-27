import Image from "next/image";
import BookingSection from "./BookingSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import Header from "./Header";
import LocationSection from "./LocationSection";
import RoomEnquireButton from "./RoomEnquireButton";

const rooms = [
  {
    number: "01",
    name: "The Deluxe Room",
    detail: "A quiet retreat with thoughtful comforts.",
    features: "Queen beds · Air conditioning · Ensuite bathroom",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    name: "The Balcony Room",
    detail: "Slow mornings and a little more breathing room.",
    features: "Private balcony · Air conditioning · Ensuite bathroom",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    name: "The Family Room",
    detail: "Space to settle in, reconnect and feel at home.",
    features: "Flexible sleeping · Shared moments · Modern comforts",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85",
  },
];

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

      <section className="hero">
        <div className="hero-image" role="img" aria-label="An inviting, sunlit homestay bedroom" />
        <div className="hero-shade" />

        <div className="hero-content">
          <p className="eyebrow light-eyebrow">
            <span /> A STAY THAT FEELS DIFFERENT
          </p>
          <h1>
            Come as you are.
            <br />
            <em>Feel at home.</em>
          </h1>
          <p className="hero-description">
            Thoughtful spaces, unhurried mornings and the comfort of feeling
            like you belong somewhere.
          </p>
          <a className="hero-button" href="#booking">
            Find your kind of stay <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-caption">
          <span>YOUR OWN LITTLE CORNER OF COMFORT</span>
          <span>A PLACE TO BELONG</span>
        </div>
      </section>

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
          {/* <span>STAY AWHILE</span>
          <strong>H.</strong>
          <span>FEEL AT HOME</span> */}
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

      <section className="rooms-section" id="stay">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SPACE, YOUR PACE</p>
            <h2>Find your <em>place.</em></h2>
          </div>
          <p className="section-aside">
            Different ways to stay.
            <br />
            The same feeling of home.
          </p>
        </div>

        <div className="room-grid">
          {rooms.map((room) => (
            <article className="room-card" key={room.number}>
              <div className="room-image-wrap">
                <div
                  className="room-image"
                  role="img"
                  aria-label={room.name}
                  style={{ backgroundImage: `url("${room.image}")` }}
                />
                <span className="room-number">{room.number}</span>
                <span className="room-image-label">YOUR SPACE TO UNWIND</span>
              </div>
              <div className="room-card-content">
                <h3>{room.name}</h3>
                <p>{room.detail}</p>
                <span className="room-features">{room.features}</span>
                <RoomEnquireButton roomName={room.name} />
              </div>
            </article>
          ))}
        </div>
        <p className="room-disclaimer">
          Room categories and imagery are illustrative for this first design
          preview. Live room details and rates will be shared after raising enquiry.
        </p>
      </section>

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
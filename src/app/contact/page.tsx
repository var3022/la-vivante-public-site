import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://lavivantegroups.com"),
  title: "Contact & Connect | La Vivante Homestay Coimbatore",
  description:
    "Direct luxury contact page for La Vivante Homestay. Connect via WhatsApp, phone, Google Maps navigation, official website, and social channels.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "La Vivante Homestay | Stay. Relax. Experience.",
    description:
      "Connect with La Vivante Homestay in Coimbatore. Instant WhatsApp enquiry, phone call, directions, and official channels.",
    url: "/contact",
    siteName: "La Vivante Homestay",
    type: "website",
    images: [
      {
        url: "/images/lavivante-logo 1.png",
        width: 800,
        height: 800,
        alt: "La Vivante Homestay Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "La Vivante Homestay | Digital Contact Page",
    description:
      "Stay. Relax. Experience. Connect directly with La Vivante Homestay in Coimbatore.",
    images: ["/images/lavivante-logo 1.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

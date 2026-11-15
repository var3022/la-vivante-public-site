import type { Metadata } from "next";
import Header from "../Header";
import Footer from "../Footer";
import RoomsExplorer from "./RoomsExplorer";

export const metadata: Metadata = {
  title: "Rooms & Accommodation | La Vivante Homestay Coimbatore",
  description:
    "Explore five comfortable room categories at La Vivante Homestay in Ramanathapuram, Coimbatore. Standard, Deluxe, Premier, Premier Balcony, and Family rooms.",
  alternates: {
    canonical: "/rooms",
  },
};

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f0] text-[#263c32]">
      <Header currentPath="/rooms" />
      <RoomsExplorer />
      <Footer currentPath="/rooms" />
    </main>
  );
}

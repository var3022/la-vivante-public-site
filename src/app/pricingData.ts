/**
 * La Vivante Homestay - Canonical Room Categories and Pricing Matrix
 * Single source of truth shared across rooms page, homepage, and enquiry UI.
 *
 * ALL 113 original photographs are preserved, categorized, and viewable.
 */

export type RoomCategoryId =
  | "standard"
  | "deluxe"
  | "premier"
  | "premier-balcony"
  | "family";

export type PackageId =
  | "non-ac-no-breakfast"
  | "non-ac-breakfast"
  | "ac-no-breakfast"
  | "ac-breakfast";

export interface RoomGalleryImage {
  id: string;
  url: string;
  heroUrl: string;
  thumbUrl: string;
  caption: string;
  roomTag: string;
  alt: string;
}

export interface RoomCategory {
  id: RoomCategoryId;
  number: string;
  name: string;
  categoryTag: string;
  totalUnits: number;
  baseGuests: number;
  maxGuests: number;
  description: string;
  features: string;
  bedConfig: string;
  image: string;
  imageAlt: string;
  photographedRoomsNote?: string;
  gallery: RoomGalleryImage[];
}

export interface PackagePricing {
  original: number;
  discounted: number;
}

export interface PackageOption {
  id: PackageId;
  name: string;
  shortLabel: string;
  hasAc: boolean;
  hasBreakfast: boolean;
  extraPersonCharge: number;
  description: string;
  prices: Record<RoomCategoryId, PackagePricing>;
}

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "standard",
    number: "01",
    name: "Standard Room",
    categoryTag: "ESSENTIAL COMFORT",
    totalUnits: 1,
    baseGuests: 2,
    maxGuests: 2,
    description: "A cozy and peaceful room with thoughtful essentials for a quiet stay.",
    features: "Queen bed · Ensuite bathroom · Work desk · Garden view",
    bedConfig: "Queen bed",
    image: "/images/property/rooms/room-003/room003bathroom-1--jpeg-card.webp",
    imageAlt: "Standard Room (Room 003) bedroom with queen bed at La Vivante Homestay",
    //photographedRoomsNote: "Photographed from Room 003 (10 original photos; 1 of 1 room in category)",
    gallery: [
      {
            "id": "room003bathroom-1--jpeg",
            "url": "/images/property/rooms/room-003/room003bathroom-1--jpeg-card.webp",
            "heroUrl": "/images/property/rooms/room-003/room003bathroom-1--jpeg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/room003bathroom-1--jpeg-thumb.webp",
            "caption": "Room 003 · Bathroom",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 ensuite modern bathroom with shower at La Vivante Homestay"
      },
      {
            "id": "standardroom003-1--heic",
            "url": "/images/property/rooms/room-003/standardroom003-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-1--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(1)"
      },
      {
            "id": "standardroom003-2--heic",
            "url": "/images/property/rooms/room-003/standardroom003-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-2--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(2)"
      },
      {
            "id": "standardroom003-3--heic",
            "url": "/images/property/rooms/room-003/standardroom003-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-3--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(3)"
      },
      {
            "id": "standardroom003-4--heic",
            "url": "/images/property/rooms/room-003/standardroom003-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-4--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(4)"
      },
      {
            "id": "standardroom003-5--heic",
            "url": "/images/property/rooms/room-003/standardroom003-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-5--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(5)"
      },
      {
            "id": "standardroom003-6--heic",
            "url": "/images/property/rooms/room-003/standardroom003-6--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-6--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-6--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(6)"
      },
      {
            "id": "standardroom003-7--heic",
            "url": "/images/property/rooms/room-003/standardroom003-7--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-7--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-7--heic-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(7)"
      },
      {
            "id": "standardroom003-8--jpg",
            "url": "/images/property/rooms/room-003/standardroom003-8--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-8--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-8--jpg-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(8)"
      },
      {
            "id": "standardroom003-9--jpg",
            "url": "/images/property/rooms/room-003/standardroom003-9--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-003/standardroom003-9--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-003/standardroom003-9--jpg-thumb.webp",
            "caption": "Room 003 · Bedroom View",
            "roomTag": "Room 003",
            "alt": "Standard Room 003 bedroom interior view at La Vivante Homestay - StandardRoom003(9)"
      }
]
  },
  {
    id: "deluxe",
    number: "02",
    name: "Deluxe Room",
    categoryTag: "PRIVATE ACCOMMODATION",
    totalUnits: 4,
    baseGuests: 2,
    maxGuests: 3,
    description: "A spacious private room crafted for relaxation with extra space for a third guest.",
    features: "Queen bed + extra cot option · Ensuite bathroom · Air conditioning option · Wardrobe",
    bedConfig: "Queen bed + optional cot",
    image: "/images/property/rooms/room-102/deluxeroom102-1--heic-card.webp",
    imageAlt: "Deluxe Room (Room 102) with queen bed at La Vivante Homestay",
    //photographedRoomsNote: "Photographed from Room 102 (8 photos), Room 201 (13 photos), and Room 202 (9 photos) — 30 total photos across 3 units. 4th deluxe room shares identical layout and is not yet photographed.",
    gallery: [
      {
            "id": "deluxeroom102-1--heic",
            "url": "/images/property/rooms/room-102/deluxeroom102-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-102/deluxeroom102-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/deluxeroom102-1--heic-thumb.webp",
            "caption": "Room 102 · Deluxe Bedroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 spacious bedroom with queen bed at La Vivante Homestay"
      },
      {
            "id": "deluxeroom102-2--heic",
            "url": "/images/property/rooms/room-102/deluxeroom102-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-102/deluxeroom102-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/deluxeroom102-2--heic-thumb.webp",
            "caption": "Room 102 · Deluxe Bedroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 spacious bedroom with queen bed at La Vivante Homestay"
      },
      {
            "id": "deluxeroom102-3--heic",
            "url": "/images/property/rooms/room-102/deluxeroom102-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-102/deluxeroom102-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/deluxeroom102-3--heic-thumb.webp",
            "caption": "Room 102 · Deluxe Bedroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 spacious bedroom with queen bed at La Vivante Homestay"
      },
      {
            "id": "deluxeroom102-4--heic",
            "url": "/images/property/rooms/room-102/deluxeroom102-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-102/deluxeroom102-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/deluxeroom102-4--heic-thumb.webp",
            "caption": "Room 102 · Deluxe Bedroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 spacious bedroom with queen bed at La Vivante Homestay"
      },
      {
            "id": "deluxeroom102-5--heic",
            "url": "/images/property/rooms/room-102/deluxeroom102-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-102/deluxeroom102-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/deluxeroom102-5--heic-thumb.webp",
            "caption": "Room 102 · Deluxe Bedroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 spacious bedroom with queen bed at La Vivante Homestay"
      },
      {
            "id": "room102bathroom-1--jpg",
            "url": "/images/property/rooms/room-102/room102bathroom-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-102/room102bathroom-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/room102bathroom-1--jpg-thumb.webp",
            "caption": "Room 102 · Ensuite Bathroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 ensuite tiled bathroom at La Vivante Homestay"
      },
      {
            "id": "room102bathroom-2--jpg",
            "url": "/images/property/rooms/room-102/room102bathroom-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-102/room102bathroom-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/room102bathroom-2--jpg-thumb.webp",
            "caption": "Room 102 · Bathroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 ensuite tiled bathroom at La Vivante Homestay"
      },
      {
            "id": "room102bathroom-3--jpg",
            "url": "/images/property/rooms/room-102/room102bathroom-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-102/room102bathroom-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-102/room102bathroom-3--jpg-thumb.webp",
            "caption": "Room 102 · Bathroom",
            "roomTag": "Room 102",
            "alt": "Deluxe Room 102 ensuite tiled bathroom at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-1--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-1--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-1--jpg",
            "url": "/images/property/rooms/room-201/deluxeroom201-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-1--jpg-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-2--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-2--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-2--jpg",
            "url": "/images/property/rooms/room-201/deluxeroom201-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-2--jpg-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-3--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-3--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-4--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-4--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-5--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-5--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-6--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-6--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-6--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-6--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-7--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-7--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-7--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-7--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "deluxeroom201-8--heic",
            "url": "/images/property/rooms/room-201/deluxeroom201-8--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/deluxeroom201-8--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/deluxeroom201-8--heic-thumb.webp",
            "caption": "Room 201 · Deluxe Bedroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 spacious bedroom interior at La Vivante Homestay"
      },
      {
            "id": "room201bathroom-1--jpg",
            "url": "/images/property/rooms/room-201/room201bathroom-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-201/room201bathroom-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/room201bathroom-1--jpg-thumb.webp",
            "caption": "Room 201 · Bathroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room201bathroom-2--jpg",
            "url": "/images/property/rooms/room-201/room201bathroom-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-201/room201bathroom-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/room201bathroom-2--jpg-thumb.webp",
            "caption": "Room 201 · Bathroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room201bathroom-3--heic",
            "url": "/images/property/rooms/room-201/room201bathroom-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-201/room201bathroom-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-201/room201bathroom-3--heic-thumb.webp",
            "caption": "Room 201 · Bathroom",
            "roomTag": "Room 201",
            "alt": "Deluxe Room 201 private bathroom at La Vivante Homestay"
      },
      {
            "id": "deluxeroom202-1--heic",
            "url": "/images/property/rooms/room-202/deluxeroom202-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-202/deluxeroom202-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/deluxeroom202-1--heic-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "deluxeroom202-2--heic",
            "url": "/images/property/rooms/room-202/deluxeroom202-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-202/deluxeroom202-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/deluxeroom202-2--heic-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "deluxeroom202-3--heic",
            "url": "/images/property/rooms/room-202/deluxeroom202-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-202/deluxeroom202-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/deluxeroom202-3--heic-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "deluxeroom202-4--heic",
            "url": "/images/property/rooms/room-202/deluxeroom202-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-202/deluxeroom202-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/deluxeroom202-4--heic-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "deluxeroom202-5--heic",
            "url": "/images/property/rooms/room-202/deluxeroom202-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-202/deluxeroom202-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/deluxeroom202-5--heic-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "room202-1--jpg",
            "url": "/images/property/rooms/room-202/room202-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-202/room202-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/room202-1--jpg-thumb.webp",
            "caption": "Room 202 · Deluxe Bedroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 comfortable bedroom setup at La Vivante Homestay"
      },
      {
            "id": "room202bathroom-1--jpg",
            "url": "/images/property/rooms/room-202/room202bathroom-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-202/room202bathroom-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/room202bathroom-1--jpg-thumb.webp",
            "caption": "Room 202 · Bathroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 modern ensuite bathroom at La Vivante Homestay"
      },
      {
            "id": "room202bathroom-2--jpg",
            "url": "/images/property/rooms/room-202/room202bathroom-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-202/room202bathroom-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/room202bathroom-2--jpg-thumb.webp",
            "caption": "Room 202 · Bathroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 modern ensuite bathroom at La Vivante Homestay"
      },
      {
            "id": "room202bathroom-3--jpg",
            "url": "/images/property/rooms/room-202/room202bathroom-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-202/room202bathroom-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-202/room202bathroom-3--jpg-thumb.webp",
            "caption": "Room 202 · Bathroom",
            "roomTag": "Room 202",
            "alt": "Deluxe Room 202 modern ensuite bathroom at La Vivante Homestay"
      }
]
  },
  {
    id: "premier",
    number: "03",
    name: "Premier Room",
    categoryTag: "PREMIER RETREAT",
    totalUnits: 2,
    baseGuests: 2,
    maxGuests: 4,
    description: "Generously proportioned room featuring refined amenities for small families or groups.",
    features: "King / Twin flexible beds · Ensuite bathroom · Seating area · Ample natural light",
    bedConfig: "King or Twin beds",
    image: "/images/property/rooms/room-203/premierroom203-1--heic-card.webp",
    imageAlt: "Premier Room (Room 203) with king bed at La Vivante Homestay",
    //photographedRoomsNote: "Photographed from Room 203 (15 original photos; 1 of 2 rooms photographed). 2nd premier room shares identical layout.",
    gallery: [
      {
            "id": "premierroom203-1--heic",
            "url": "/images/property/rooms/room-203/premierroom203-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-1--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-2--heic",
            "url": "/images/property/rooms/room-203/premierroom203-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-2--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-3--heic",
            "url": "/images/property/rooms/room-203/premierroom203-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-3--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-4--heic",
            "url": "/images/property/rooms/room-203/premierroom203-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-4--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-5--heic",
            "url": "/images/property/rooms/room-203/premierroom203-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-5--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-6--heic",
            "url": "/images/property/rooms/room-203/premierroom203-6--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-6--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-6--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-7--heic",
            "url": "/images/property/rooms/room-203/premierroom203-7--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-7--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-7--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-8--heic",
            "url": "/images/property/rooms/room-203/premierroom203-8--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-8--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-8--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "premierroom203-9--heic",
            "url": "/images/property/rooms/room-203/premierroom203-9--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/premierroom203-9--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/premierroom203-9--heic-thumb.webp",
            "caption": "Room 203 · Premier Bedroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 generous bedroom accommodation at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-1--heic",
            "url": "/images/property/rooms/room-203/room203bathroom-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-1--heic-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-1--jpg",
            "url": "/images/property/rooms/room-203/room203bathroom-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-1--jpg-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-2--heic",
            "url": "/images/property/rooms/room-203/room203bathroom-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-2--heic-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-2--jpg",
            "url": "/images/property/rooms/room-203/room203bathroom-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-2--jpg-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-3--jpg",
            "url": "/images/property/rooms/room-203/room203bathroom-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-3--jpg-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      },
      {
            "id": "room203bathroom-4--jpg",
            "url": "/images/property/rooms/room-203/room203bathroom-4--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-203/room203bathroom-4--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-203/room203bathroom-4--jpg-thumb.webp",
            "caption": "Room 203 · Bathroom",
            "roomTag": "Room 203",
            "alt": "Premier Room 203 private bathroom at La Vivante Homestay"
      }
]
  },
  {
    id: "premier-balcony",
    number: "04",
    name: "Premier with Balcony",
    categoryTag: "BALCONY SUITE",
    totalUnits: 1,
    baseGuests: 2,
    maxGuests: 4,
    description: "Exclusive premier room with a private outdoor balcony for unhurried morning tea.",
    features: "Private open-air balcony · King bed · Ensuite bathroom · City / greenery outlook",
    bedConfig: "King bed + balcony",
    image: "/images/property/rooms/room-101/premierwithbalconyroom101-1--jpg-card.webp",
    imageAlt: "Premier Room with Balcony (Room 101) at La Vivante Homestay",
    //photographedRoomsNote: "Photographed from Room 101 (16 original photos including private balcony and bathroom; 1 of 1 room in category)",
    gallery: [
      {
            "id": "premierwithbalconyroom101-1--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-1--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-2--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-2--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-3--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-3--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-4--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-4--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-4--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-4--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-5--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-5--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-5--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-5--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-6--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-6--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-6--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-6--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-7--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-7--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-7--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-7--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-8--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-8--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-8--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-8--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-9--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-9--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-9--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-9--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "premierwithbalconyroom101-10--jpg",
            "url": "/images/property/rooms/room-101/premierwithbalconyroom101-10--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-10--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/premierwithbalconyroom101-10--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "room101bathroom-1--jpg",
            "url": "/images/property/rooms/room-101/room101bathroom-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101bathroom-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101bathroom-1--jpg-thumb.webp",
            "caption": "Room 101 · Bathroom",
            "roomTag": "Room 101",
            "alt": "Premier with Balcony Room 101 ensuite bathroom with walk-in shower at La Vivante Homestay"
      },
      {
            "id": "room101bathroom-2--jpg",
            "url": "/images/property/rooms/room-101/room101bathroom-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101bathroom-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101bathroom-2--jpg-thumb.webp",
            "caption": "Room 101 · Bathroom",
            "roomTag": "Room 101",
            "alt": "Premier with Balcony Room 101 ensuite bathroom with walk-in shower at La Vivante Homestay"
      },
      {
            "id": "room101bathroom-3--jpg",
            "url": "/images/property/rooms/room-101/room101bathroom-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101bathroom-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101bathroom-3--jpg-thumb.webp",
            "caption": "Room 101 · Bathroom",
            "roomTag": "Room 101",
            "alt": "Premier with Balcony Room 101 ensuite bathroom with walk-in shower at La Vivante Homestay"
      },
      {
            "id": "room101privatebalcony-1--jpg",
            "url": "/images/property/rooms/room-101/room101privatebalcony-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101privatebalcony-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101privatebalcony-1--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "room101privatebalcony-2--jpg",
            "url": "/images/property/rooms/room-101/room101privatebalcony-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101privatebalcony-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101privatebalcony-2--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      },
      {
            "id": "room101privatebalcony-3--jpg",
            "url": "/images/property/rooms/room-101/room101privatebalcony-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-101/room101privatebalcony-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-101/room101privatebalcony-3--jpg-thumb.webp",
            "caption": "Room 101 · Private Balcony",
            "roomTag": "Room 101",
            "alt": "Premier Room 101 dedicated outdoor balcony overlooking neighborhood greenery"
      }
]
  },
  {
    id: "family",
    number: "05",
    name: "Family Room",
    categoryTag: "FOR FAMILIES",
    totalUnits: 1,
    baseGuests: 3,
    maxGuests: 4,
    description: "Expansive family accommodation designed for parents and children travelling together.",
    features: "Multiple sleeping arrangements · Ensuite bathroom · Spacious lounge area · Comfort essentials",
    bedConfig: "Multiple beds for families",
    image: "/images/property/rooms/room-103/familyroom103-1--heic-card.webp",
    imageAlt: "Family Room (Room 103) suite at La Vivante Homestay",
    //photographedRoomsNote: "Photographed from Room 103 (13 original photos including multi-bed setup, lounge and 2 bathrooms; 1 of 1 room in category)",
    gallery: [
      {
            "id": "familyroom103-1--heic",
            "url": "/images/property/rooms/room-103/familyroom103-1--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-1--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-1--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-2--heic",
            "url": "/images/property/rooms/room-103/familyroom103-2--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-2--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-2--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-3--heic",
            "url": "/images/property/rooms/room-103/familyroom103-3--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-3--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-3--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-4--heic",
            "url": "/images/property/rooms/room-103/familyroom103-4--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-4--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-4--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-5--heic",
            "url": "/images/property/rooms/room-103/familyroom103-5--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-5--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-5--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-6--heic",
            "url": "/images/property/rooms/room-103/familyroom103-6--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-6--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-6--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-7--heic",
            "url": "/images/property/rooms/room-103/familyroom103-7--heic-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-7--heic-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-7--heic-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "familyroom103-8--jpg",
            "url": "/images/property/rooms/room-103/familyroom103-8--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/familyroom103-8--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/familyroom103-8--jpg-thumb.webp",
            "caption": "Room 103 · Family Suite",
            "roomTag": "Room 103",
            "alt": "Family Room 103 expansive suite accommodation at La Vivante Homestay"
      },
      {
            "id": "room103bathroom1-1--jpg",
            "url": "/images/property/rooms/room-103/room103bathroom1-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/room103bathroom1-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/room103bathroom1-1--jpg-thumb.webp",
            "caption": "Room 103 · Bathroom 1",
            "roomTag": "Room 103",
            "alt": "Family Room 103 ensuite bathroom facility at La Vivante Homestay"
      },
      {
            "id": "room103bathroom1-2--jpg",
            "url": "/images/property/rooms/room-103/room103bathroom1-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/room103bathroom1-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/room103bathroom1-2--jpg-thumb.webp",
            "caption": "Room 103 · Bathroom 1",
            "roomTag": "Room 103",
            "alt": "Family Room 103 ensuite bathroom facility at La Vivante Homestay"
      },
      {
            "id": "room103bathroom2-1--jpg",
            "url": "/images/property/rooms/room-103/room103bathroom2-1--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/room103bathroom2-1--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/room103bathroom2-1--jpg-thumb.webp",
            "caption": "Room 103 · Bathroom 2",
            "roomTag": "Room 103",
            "alt": "Family Room 103 ensuite bathroom facility at La Vivante Homestay"
      },
      {
            "id": "room103bathroom2-2--jpg",
            "url": "/images/property/rooms/room-103/room103bathroom2-2--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/room103bathroom2-2--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/room103bathroom2-2--jpg-thumb.webp",
            "caption": "Room 103 · Bathroom 2",
            "roomTag": "Room 103",
            "alt": "Family Room 103 ensuite bathroom facility at La Vivante Homestay"
      },
      {
            "id": "room103bathroom2-3--jpg",
            "url": "/images/property/rooms/room-103/room103bathroom2-3--jpg-card.webp",
            "heroUrl": "/images/property/rooms/room-103/room103bathroom2-3--jpg-hero.webp",
            "thumbUrl": "/images/property/rooms/room-103/room103bathroom2-3--jpg-thumb.webp",
            "caption": "Room 103 · Bathroom 2",
            "roomTag": "Room 103",
            "alt": "Family Room 103 ensuite bathroom facility at La Vivante Homestay"
      }
]
  }
];

export const PACKAGES: PackageOption[] = [
  {
    id: "non-ac-no-breakfast",
    name: "Non-AC / Without Breakfast",
    shortLabel: "Non-AC · Room Only",
    hasAc: false,
    hasBreakfast: false,
    extraPersonCharge: 500,
    description: "Essential stay for budget-conscious travellers seeking simple comfort.",
    prices: {
      standard: { original: 1500, discounted: 990 },
      deluxe: { original: 2000, discounted: 1490 },
      premier: { original: 2500, discounted: 1990 },
      "premier-balcony": { original: 3000, discounted: 2490 },
      family: { original: 5000, discounted: 4490 },
    },
  },
  {
    id: "non-ac-breakfast",
    name: "Non-AC / With Breakfast",
    shortLabel: "Non-AC · Breakfast",
    hasAc: false,
    hasBreakfast: true,
    extraPersonCharge: 750,
    description: "Relaxed mornings with freshly prepared local breakfast included.",
    prices: {
      standard: { original: 2000, discounted: 1490 },
      deluxe: { original: 2500, discounted: 1990 },
      premier: { original: 3000, discounted: 2490 },
      "premier-balcony": { original: 3500, discounted: 2990 },
      family: { original: 5500, discounted: 4990 },
    },
  },
  {
    id: "ac-no-breakfast",
    name: "AC / Without Breakfast",
    shortLabel: "AC · Room Only",
    hasAc: true,
    hasBreakfast: false,
    extraPersonCharge: 1000,
    description: "Cool comfort with air-conditioning for restful afternoons and evenings.",
    prices: {
      standard: { original: 2500, discounted: 1990 },
      deluxe: { original: 3000, discounted: 2490 },
      premier: { original: 3500, discounted: 2990 },
      "premier-balcony": { original: 4000, discounted: 3490 },
      family: { original: 6000, discounted: 5490 },
    },
  },
  {
    id: "ac-breakfast",
    name: "AC / With Breakfast",
    shortLabel: "AC · Breakfast",
    hasAc: true,
    hasBreakfast: true,
    extraPersonCharge: 1250,
    description: "Complete homestay indulgence with full climate comfort and breakfast.",
    prices: {
      standard: { original: 3000, discounted: 2490 },
      deluxe: { original: 3500, discounted: 2990 },
      premier: { original: 4000, discounted: 3490 },
      "premier-balcony": { original: 4500, discounted: 3990 },
      family: { original: 6500, discounted: 5990 },
    },
  },
];

export const DEFAULT_PACKAGE_ID: PackageId = "non-ac-no-breakfast";

export function calculateDiscountPercent(original: number, discounted: number): string {
  if (original <= 0) return "0.0";
  const pct = ((original - discounted) / original) * 100;
  return pct.toFixed(1);
}

export function formatCurrency(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export function getRoomById(id: RoomCategoryId | string): RoomCategory | undefined {
  return ROOM_CATEGORIES.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase());
}

export function getPackageById(id: PackageId | string): PackageOption {
  const found = PACKAGES.find((p) => p.id === id);
  return found || PACKAGES[0];
}

export function calculateNightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = dOut.getTime() - dIn.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export interface PricingCalculationResult {
  room?: RoomCategory;
  package: PackageOption;
  nights: number;
  guestCount: number;
  baseGuests: number;
  extraGuests: number;
  baseOriginalPrice: number;
  baseDiscountedPrice: number;
  extraPersonRatePerNight: number;
  totalExtraPersonPerNight: number;
  effectiveNightlyRate: number;
  estimatedTotal: number;
  discountPercent: string;
}

export function calculateStayEstimate(params: {
  roomId?: RoomCategoryId | string;
  packageId?: PackageId;
  guestsCount?: number;
  checkIn?: string;
  checkOut?: string;
}): PricingCalculationResult {
  const pkg = getPackageById(params.packageId || DEFAULT_PACKAGE_ID);
  const room = params.roomId ? getRoomById(params.roomId) : undefined;
  const nights = params.checkIn && params.checkOut ? calculateNightsBetween(params.checkIn, params.checkOut) : 1;
  const safeNights = nights > 0 ? nights : 1;

  if (!room) {
    return {
      package: pkg,
      nights: safeNights,
      guestCount: params.guestsCount || 2,
      baseGuests: 2,
      extraGuests: 0,
      baseOriginalPrice: 0,
      baseDiscountedPrice: 0,
      extraPersonRatePerNight: pkg.extraPersonCharge,
      totalExtraPersonPerNight: 0,
      effectiveNightlyRate: 0,
      estimatedTotal: 0,
      discountPercent: "0.0",
    };
  }

  const basePricing = pkg.prices[room.id];
  const guests = params.guestsCount || room.baseGuests;
  const extraGuests = Math.max(0, guests - room.baseGuests);
  const extraPersonRate = pkg.extraPersonCharge;
  const totalExtraPerNight = extraGuests * extraPersonRate;
  const effectiveNightly = basePricing.discounted + totalExtraPerNight;
  const estimatedTotal = effectiveNightly * safeNights;
  const discountPct = calculateDiscountPercent(basePricing.original, basePricing.discounted);

  return {
    room,
    package: pkg,
    nights: safeNights,
    guestCount: guests,
    baseGuests: room.baseGuests,
    extraGuests,
    baseOriginalPrice: basePricing.original,
    baseDiscountedPrice: basePricing.discounted,
    extraPersonRatePerNight: extraPersonRate,
    totalExtraPersonPerNight: totalExtraPerNight,
    effectiveNightlyRate: effectiveNightly,
    estimatedTotal,
    discountPercent: discountPct,
  };
}

export interface PropertyGalleryItem {
  id: string;
  title: string;
  category: "Exterior" | "Lounge & Reception" | "Grounds & Parking" | "Outdoor Terraces" | "Operations & Dining" | "Interior Circulation";
  caption: string;
  tag: string;
  url: string;
  heroUrl: string;
  thumbUrl: string;
  alt: string;
  orientation: "landscape" | "portrait";
}

export const PROPERTY_GALLERY_ITEMS: PropertyGalleryItem[] = [
  {
    "id": "2ndfloorhallway-1--heic",
    "title": "Guest Corridor Hallway",
    "category": "Interior Circulation",
    "caption": "Guest Room Hallway",
    "tag": "Corridor",
    "url": "/images/property/common-areas/2ndfloorhallway-1--heic-card.webp",
    "heroUrl": "/images/property/common-areas/2ndfloorhallway-1--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/2ndfloorhallway-1--heic-thumb.webp",
    "alt": "Clean and well-lit guest room access corridor at La Vivante Homestay",
    "orientation": "portrait"
  },
  {
    "id": "2ndfloorhallway-2--heic",
    "title": "Guest Corridor Hallway",
    "category": "Interior Circulation",
    "caption": "Guest Room Hallway",
    "tag": "Corridor",
    "url": "/images/property/common-areas/2ndfloorhallway-2--heic-card.webp",
    "heroUrl": "/images/property/common-areas/2ndfloorhallway-2--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/2ndfloorhallway-2--heic-thumb.webp",
    "alt": "Clean and well-lit guest room access corridor at La Vivante Homestay",
    "orientation": "portrait"
  },
  {
    "id": "2ndfloorhallway-3--heic",
    "title": "Guest Corridor Hallway",
    "category": "Interior Circulation",
    "caption": "Guest Room Hallway",
    "tag": "Corridor",
    "url": "/images/property/common-areas/2ndfloorhallway-3--heic-card.webp",
    "heroUrl": "/images/property/common-areas/2ndfloorhallway-3--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/2ndfloorhallway-3--heic-thumb.webp",
    "alt": "Clean and well-lit guest room access corridor at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "backyard-jpg",
    "title": "Backyard Garden Lawn",
    "category": "Grounds & Parking",
    "caption": "Backyard",
    "tag": "Garden",
    "url": "/images/property/common-areas/backyard-jpg-card.webp",
    "heroUrl": "/images/property/common-areas/backyard-jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/backyard-jpg-thumb.webp",
    "alt": "Open-air backyard space at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "commanbalcony-1--jpg",
    "title": "Common Balcony Terrace",
    "category": "Outdoor Terraces",
    "caption": "Common Balcony Terrace",
    "tag": "Balcony",
    "url": "/images/property/common-areas/commanbalcony-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/commanbalcony-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/commanbalcony-1--jpg-thumb.webp",
    "alt": "Shared outdoor balcony terrace with neighborhood greenery at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "commanbalcony-2--jpg",
    "title": "Common Balcony Terrace",
    "category": "Outdoor Terraces",
    "caption": "Common Balcony Terrace",
    "tag": "Balcony",
    "url": "/images/property/common-areas/commanbalcony-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/commanbalcony-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/commanbalcony-2--jpg-thumb.webp",
    "alt": "Shared outdoor balcony terrace with neighborhood greenery at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "commanbalcony-3--jpg",
    "title": "Common Balcony Terrace",
    "category": "Outdoor Terraces",
    "caption": "Common Balcony Terrace",
    "tag": "Balcony",
    "url": "/images/property/common-areas/commanbalcony-3--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/commanbalcony-3--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/commanbalcony-3--jpg-thumb.webp",
    "alt": "Shared outdoor balcony terrace with neighborhood greenery at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "entrance-heic",
    "title": "Gated Entrance",
    "category": "Exterior",
    "caption": "Property Entrance & Gate",
    "tag": "Entrance",
    "url": "/images/property/common-areas/entrance-heic-card.webp",
    "heroUrl": "/images/property/common-areas/entrance-heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/entrance-heic-thumb.webp",
    "alt": "Secure entrance gate and entryway at La Vivante Homestay",
    "orientation": "portrait"
  },
  {
    "id": "firstfloorhallway-jpg",
    "title": "Guest Corridor Hallway",
    "category": "Interior Circulation",
    "caption": "Guest Room Hallway",
    "tag": "Corridor",
    "url": "/images/property/common-areas/firstfloorhallway-jpg-card.webp",
    "heroUrl": "/images/property/common-areas/firstfloorhallway-jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/firstfloorhallway-jpg-thumb.webp",
    "alt": "Clean and well-lit guest room access corridor at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "kitchen-1--jpg",
    "title": "Staff Service Kitchen & Dining",
    "category": "Operations & Dining",
    "caption": "Staff Service Kitchen & Dining",
    "tag": "Service Area",
    "url": "/images/property/common-areas/kitchen-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/kitchen-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/kitchen-1--jpg-thumb.webp",
    "alt": "Operational staff meal preparation kitchen facility at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "kitchen-2--jpg",
    "title": "Staff Service Kitchen & Dining",
    "category": "Operations & Dining",
    "caption": "Staff Service Kitchen & Dining",
    "tag": "Service Area",
    "url": "/images/property/common-areas/kitchen-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/kitchen-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/kitchen-2--jpg-thumb.webp",
    "alt": "Operational staff meal preparation kitchen facility at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-1--jpg",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-1--jpg-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-2--jpg",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-2--jpg-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-3--jpg",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-3--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-3--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-3--jpg-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-4--heic",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-4--heic-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-4--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-4--heic-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-5--heic",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-5--heic-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-5--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-5--heic-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertyfrontview-6--heic",
    "title": "Building Front View",
    "category": "Exterior",
    "caption": "Main Building Facade",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertyfrontview-6--heic-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertyfrontview-6--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertyfrontview-6--heic-thumb.webp",
    "alt": "La Vivante Homestay architectural front elevation view in Ramanathapuram, Coimbatore",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertysideview-1--jpg",
    "title": "Side View & Approach",
    "category": "Exterior",
    "caption": "Side Building Elevation",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertysideview-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertysideview-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertysideview-1--jpg-thumb.webp",
    "alt": "La Vivante Homestay side elevation and parking entrance view",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertysideview-2--jpg",
    "title": "Side View & Approach",
    "category": "Exterior",
    "caption": "Side Building Elevation",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertysideview-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertysideview-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertysideview-2--jpg-thumb.webp",
    "alt": "La Vivante Homestay side elevation and parking entrance view",
    "orientation": "landscape"
  },
  {
    "id": "mainpropertysideview-3--jpg",
    "title": "Side View & Approach",
    "category": "Exterior",
    "caption": "Side Building Elevation",
    "tag": "Exterior",
    "url": "/images/property/common-areas/mainpropertysideview-3--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/mainpropertysideview-3--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/mainpropertysideview-3--jpg-thumb.webp",
    "alt": "La Vivante Homestay side elevation and parking entrance view",
    "orientation": "landscape"
  },
  {
    "id": "parking-1--jpg",
    "title": "On-Premise Parking",
    "category": "Grounds & Parking",
    "caption": "On-Premise Parking",
    "tag": "Parking",
    "url": "/images/property/common-areas/parking-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/parking-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/parking-1--jpg-thumb.webp",
    "alt": "Secure covered vehicle parking area inside La Vivante Homestay compound",
    "orientation": "landscape"
  },
  {
    "id": "parking-2--jpg",
    "title": "On-Premise Parking",
    "category": "Grounds & Parking",
    "caption": "On-Premise Parking",
    "tag": "Parking",
    "url": "/images/property/common-areas/parking-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/parking-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/parking-2--jpg-thumb.webp",
    "alt": "Secure covered vehicle parking area inside La Vivante Homestay compound",
    "orientation": "landscape"
  },
  {
    "id": "reception-1--heic",
    "title": "Reception & Lounge",
    "category": "Lounge & Reception",
    "caption": "Reception & Lounge",
    "tag": "Reception",
    "url": "/images/property/common-areas/reception-1--heic-card.webp",
    "heroUrl": "/images/property/common-areas/reception-1--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/reception-1--heic-thumb.webp",
    "alt": "Welcoming reception desk and guest arrival lobby at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "reception-2--heic",
    "title": "Reception & Lounge",
    "category": "Lounge & Reception",
    "caption": "Reception & Lounge",
    "tag": "Reception",
    "url": "/images/property/common-areas/reception-2--heic-card.webp",
    "heroUrl": "/images/property/common-areas/reception-2--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/reception-2--heic-thumb.webp",
    "alt": "Welcoming reception desk and guest arrival lobby at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "reception-3--heic",
    "title": "Reception & Lounge",
    "category": "Lounge & Reception",
    "caption": "Reception & Lounge",
    "tag": "Reception",
    "url": "/images/property/common-areas/reception-3--heic-card.webp",
    "heroUrl": "/images/property/common-areas/reception-3--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/reception-3--heic-thumb.webp",
    "alt": "Welcoming reception desk and guest arrival lobby at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "starirstofirstfloor-1--jpg",
    "title": "Interior Staircase",
    "category": "Interior Circulation",
    "caption": "Interior Staircase",
    "tag": "Staircase",
    "url": "/images/property/common-areas/starirstofirstfloor-1--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/starirstofirstfloor-1--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/starirstofirstfloor-1--jpg-thumb.webp",
    "alt": "Architectural interior stairway connecting floors at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "starirstofirstfloor-2--jpg",
    "title": "Interior Staircase",
    "category": "Interior Circulation",
    "caption": "Interior Staircase",
    "tag": "Staircase",
    "url": "/images/property/common-areas/starirstofirstfloor-2--jpg-card.webp",
    "heroUrl": "/images/property/common-areas/starirstofirstfloor-2--jpg-hero.webp",
    "thumbUrl": "/images/property/common-areas/starirstofirstfloor-2--jpg-thumb.webp",
    "alt": "Architectural interior stairway connecting floors at La Vivante Homestay",
    "orientation": "landscape"
  },
  {
    "id": "starirstofirstfloor-3--heic",
    "title": "Interior Staircase",
    "category": "Interior Circulation",
    "caption": "Interior Staircase",
    "tag": "Staircase",
    "url": "/images/property/common-areas/starirstofirstfloor-3--heic-card.webp",
    "heroUrl": "/images/property/common-areas/starirstofirstfloor-3--heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/starirstofirstfloor-3--heic-thumb.webp",
    "alt": "Architectural interior stairway connecting floors at La Vivante Homestay",
    "orientation": "portrait"
  },
  {
    "id": "strairsto2ndfloor-heic",
    "title": "Property Space",
    "category": "Interior Circulation",
    "caption": "Property Space",
    "tag": "Common Space",
    "url": "/images/property/common-areas/strairsto2ndfloor-heic-card.webp",
    "heroUrl": "/images/property/common-areas/strairsto2ndfloor-heic-hero.webp",
    "thumbUrl": "/images/property/common-areas/strairsto2ndfloor-heic-thumb.webp",
    "alt": "La Vivante Homestay property space - StrairsTo2ndFloor",
    "orientation": "portrait"
  }
];

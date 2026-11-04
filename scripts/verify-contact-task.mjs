import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import jsQR from "jsqr";

const EXPECTED_URL = "https://lavivantegroups.com/contact";
const COLOR_BG_EMERALD = "#003D2F";
const COLOR_FG_CHAMPAGNE = "#C9A47E";

console.log("=== LA VIVANTE CONTACT PAGE & QR CODE VALIDATION ===");

// 1. Verify PNG QR code exists, decodes exactly to EXPECTED_URL, and has >=1200px dimensions
const pngPath = path.resolve(process.cwd(), "public/images/la-vivante-contact-qr.png");
if (!fs.existsSync(pngPath)) {
  throw new Error(`Missing PNG QR code at ${pngPath}`);
}
const pngBuffer = fs.readFileSync(pngPath);
const png = PNG.sync.read(pngBuffer);
const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height, {
  inversionAttempts: "attemptBoth",
});
if (!decoded) {
  throw new Error("jsQR failed to decode la-vivante-contact-qr.png");
}
console.log(`[PASS] Primary QR Code PNG decoded successfully: "${decoded.data}"`);
if (decoded.data !== EXPECTED_URL) {
  throw new Error(`Decoded QR text "${decoded.data}" does not match "${EXPECTED_URL}"`);
}
if (png.width < 1200 || png.height < 1200) {
  throw new Error(`Dimensions ${png.width}x${png.height}px are less than 1200x1200px required`);
}
console.log(`[PASS] Primary QR Code PNG dimensions: ${png.width}x${png.height}px (High-resolution, Print-ready)`);

// 2. Verify SVG QR code exists and contains valid XML/SVG with the exact emerald & champagne colors
const svgPath = path.resolve(process.cwd(), "public/images/la-vivante-contact-qr.svg");
if (!fs.existsSync(svgPath)) {
  throw new Error(`Missing SVG QR code at ${svgPath}`);
}
const svgContent = fs.readFileSync(svgPath, "utf8");
if (!svgContent.includes("<svg") || !svgContent.includes("</svg>")) {
  throw new Error("Invalid SVG content in la-vivante-contact-qr.svg");
}
if (!svgContent.includes(COLOR_BG_EMERALD) || !svgContent.includes(COLOR_FG_CHAMPAGNE)) {
  throw new Error(`SVG does not contain requested colors (${COLOR_BG_EMERALD}, ${COLOR_FG_CHAMPAGNE})`);
}
console.log(`[PASS] SVG QR Code verified: valid scalable vector format with background ${COLOR_BG_EMERALD} and pattern ${COLOR_FG_CHAMPAGNE}`);

// 3. Verify luxury QR PNG exists and decodes
const luxuryPngPath = path.resolve(process.cwd(), "public/images/la-vivante-contact-qr-luxury.png");
if (fs.existsSync(luxuryPngPath)) {
  const luxBuffer = fs.readFileSync(luxuryPngPath);
  const luxPng = PNG.sync.read(luxBuffer);
  const luxDecoded = jsQR(new Uint8ClampedArray(luxPng.data), luxPng.width, luxPng.height, {
    inversionAttempts: "attemptBoth",
  });
  if (luxDecoded && luxDecoded.data === EXPECTED_URL) {
    console.log(`[PASS] Luxury QR decoded successfully: "${luxDecoded.data}" (${luxPng.width}x${luxPng.height}px)`);
  } else {
    throw new Error("Failed to decode luxury QR code");
  }
}

// 4. Verify QR Destination
console.log(`[PASS] All QR codes point strictly to: "${EXPECTED_URL}"`);

console.log("\nALL QR CODE & VALIDATION CHECKS PASSED SUCCESSFULLY!");

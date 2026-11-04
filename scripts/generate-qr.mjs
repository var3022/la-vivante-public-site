import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import jsQR from "jsqr";

const TARGET_URL = "https://lavivantegroups.com/contact";
const outputDir = path.resolve(process.cwd(), "public/images");

// Reference colors specified by user
const COLOR_BG_EMERALD = "#003D2F"; // Deep emerald green
const COLOR_FG_CHAMPAGNE = "#C9A47E"; // Warm champagne gold

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAndVerify() {
  console.log(`Generating QR codes for: ${TARGET_URL}`);
  console.log(`Colors: Background = ${COLOR_BG_EMERALD}, Pattern = ${COLOR_FG_CHAMPAGNE}`);

  const qrOptionsPng = {
    errorCorrectionLevel: "H",
    type: "png",
    width: 1200,
    margin: 4,
    color: {
      dark: COLOR_FG_CHAMPAGNE, // QR pattern and positioning squares
      light: COLOR_BG_EMERALD, // Deep emerald green background
    },
  };

  const qrOptionsSvg = {
    errorCorrectionLevel: "H",
    type: "svg",
    margin: 4,
    color: {
      dark: COLOR_FG_CHAMPAGNE, // QR pattern and positioning squares
      light: COLOR_BG_EMERALD, // Deep emerald green background
    },
  };

  // 1. Primary PNG
  const pngPath = path.join(outputDir, "la-vivante-contact-qr.png");
  await QRCode.toFile(pngPath, TARGET_URL, qrOptionsPng);
  console.log(`[OK] Generated: ${pngPath}`);

  // 2. Vector SVG
  const svgPath = path.join(outputDir, "la-vivante-contact-qr.svg");
  const svgString = await QRCode.toString(TARGET_URL, qrOptionsSvg);
  fs.writeFileSync(svgPath, svgString, "utf8");
  console.log(`[OK] Generated: ${svgPath}`);

  // 3. Luxury PNG variant (matching palette)
  const luxuryPngPath = path.join(outputDir, "la-vivante-contact-qr-luxury.png");
  await QRCode.toFile(luxuryPngPath, TARGET_URL, qrOptionsPng);
  console.log(`[OK] Generated: ${luxuryPngPath}`);

  // Verification helper using jsQR
  function verifyPng(filePath, label) {
    const fileBuffer = fs.readFileSync(filePath);
    const pngData = PNG.sync.read(fileBuffer);

    if (pngData.width < 1200 || pngData.height < 1200) {
      throw new Error(`${label} resolution ${pngData.width}x${pngData.height} is under 1200x1200px`);
    }

    const code = jsQR(new Uint8ClampedArray(pngData.data), pngData.width, pngData.height, {
      inversionAttempts: "attemptBoth",
    });

    if (!code) {
      throw new Error(`Failed to decode ${label} with jsQR!`);
    }

    if (code.data !== TARGET_URL) {
      throw new Error(`Decoded ${label} URL "${code.data}" !== "${TARGET_URL}"`);
    }

    console.log(`[VERIFIED] ${label} successfully decoded: "${code.data}" (${pngData.width}x${pngData.height}px)`);
  }

  verifyPng(pngPath, "la-vivante-contact-qr.png");
  verifyPng(luxuryPngPath, "la-vivante-contact-qr-luxury.png");

  // Verify SVG structure and color attributes
  const svgContent = fs.readFileSync(svgPath, "utf8");
  if (!svgContent.includes(COLOR_BG_EMERALD) || !svgContent.includes(COLOR_FG_CHAMPAGNE)) {
    throw new Error("SVG does not contain expected color hex codes!");
  }
  console.log(`[VERIFIED] la-vivante-contact-qr.svg contains background ${COLOR_BG_EMERALD} and pattern ${COLOR_FG_CHAMPAGNE}`);

  console.log("\nAll QR code variants generated and verified successfully!");
}

generateAndVerify().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Downloads Instagram profile pictures from the scraper dataset into public/avatars/.
// Instagram's CDN blocks cross-origin image loads and its URLs expire, so avatars must be self-hosted.
// Images are resized to 2x the large avatar size (48px) for high-DPI screens.
// Usage: npm run avatars
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DATASET = new URL("../src/helpers/dataset_instagram-scraper.json", import.meta.url);
const OUT_DIR = new URL("../public/avatars/", import.meta.url);
const USERNAME = /^[a-z0-9._]+$/;
const SIZE = 96;

const profiles = JSON.parse(await readFile(DATASET, "utf8"));
await mkdir(OUT_DIR, { recursive: true });

let saved = 0;
const failed = [];

for (const { username, profilePicUrlHD, private: isPrivate } of profiles) {
  const name = username?.toLowerCase();
  if (!name || !USERNAME.test(name) || !profilePicUrlHD || isPrivate) continue;

  try {
    const res = await fetch(profilePicUrlHD);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await sharp(Buffer.from(await res.arrayBuffer()))
      .resize(SIZE, SIZE, { fit: "cover" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(fileURLToPath(new URL(`${name}.jpg`, OUT_DIR)));
    saved++;
  } catch (err) {
    failed.push(`${name}: ${err.message}`);
  }
}

console.log(`Saved ${saved} avatars to public/avatars/`);
if (failed.length) console.log(`Failed (${failed.length}):\n  ${failed.join("\n  ")}`);

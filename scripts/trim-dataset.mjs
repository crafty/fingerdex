// Trims the raw Instagram scraper export down to the fields the site uses.
// The raw export is tens of MB (mostly latestPosts), and anything imported by the app gets bundled.
// Usage: npm run trim-dataset
import { readFile, writeFile } from "node:fs/promises";

const RAW = new URL("../src/helpers/dataset_instagram-scraper.json", import.meta.url);
const OUT = new URL("../src/helpers/instagram-profiles.json", import.meta.url);

const profiles = JSON.parse(await readFile(RAW, "utf8"));

const trimmed = profiles
  // Failed scrapes come back with only a username
  .filter((profile) => profile.username && profile.followersCount !== undefined)
  .map((profile) => ({
    username: profile.username.toLowerCase(),
    private: Boolean(profile.private),
    followersCount: profile.followersCount,
    // Pinned posts are listed first, so find the newest timestamp across all posts
    latestPostTimestamp:
      (profile.latestPosts ?? [])
        .map((post) => post.timestamp)
        .filter(Boolean)
        .sort()
        .at(-1) ?? null,
  }));

await writeFile(OUT, JSON.stringify(trimmed, null, 2) + "\n");

console.log(
  `Wrote ${trimmed.length} profiles to src/helpers/instagram-profiles.json ` +
    `(skipped ${profiles.length - trimmed.length} with no profile data)`,
);

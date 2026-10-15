import type { Creator, SortKey } from "./constants";
import instagramProfiles from "./instagram-profiles.json";

export const sortCreators = (creators: Creator[]): Creator[] => {
  const priority = (creator: Creator): number => {
    if (creator.promoted === true) return 0;
    if (creator.name === "Null FB") return 1;

    const hasProducts = (creator.products?.length ?? 0) > 0;
    const hasWebsite = Boolean(creator.website?.trim());

    if (hasWebsite && hasProducts) return 2;
    if (hasProducts) return 3;
    return 4;
  };

  return [...creators].sort((a, b) => priority(a) - priority(b));
};

export const trackBrandClick = (brandName: string) => {
  // @ts-expect-error gtag is injected by Google Analytics
  window.gtag?.("event", "brand_click", {
    brand_name: brandName,
  });
};

export const copyToClipboardCreatorsInstaUrls = async (creators: Creator[]) => {
  const urls = [
    ...new Set(
      creators
        .filter((creator) => creator.instagram?.trim())
        .map(
          (creator) =>
            `https://instagram.com/${creator.instagram!.trim().replace(/^@/, "").toLowerCase()}`,
        ),
    ),
  ].join("\n");

  await navigator.clipboard.writeText(urls);
};

export const mergeInstagramData = (creators: Creator[]): Creator[] => {
  const profilesByUsername = new Map(
    instagramProfiles.map((profile) => [profile.username, profile]),
  );

  return creators.map((creator) => {
    const username = creator.instagram?.trim().replace(/^@/, "").toLowerCase();
    const profile = username && profilesByUsername.get(username);
    if (!profile) return creator;

    return {
      ...creator,
      // Self-hosted copy saved by `npm run avatars`; Instagram's CDN blocks cross-origin loads
      profilePicUrlHD: `/avatars/${username}.jpg`,
      private: profile.private,
      followersCount: profile.followersCount,
      latestPostTimestamp: profile.latestPostTimestamp ?? undefined,
    };
  });
};

// Up to two initials, e.g. "Null FB" → "NF", "@_decentbit_" → "D"
export const getCreatorInitials = (creator: Creator): string =>
  (creator.name || creator.instagram || "?")
    .replace(/^@/, "")
    .split(/[\s._]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Posted within the last week
export const isRecentPost = (timestamp: string): boolean =>
  Date.now() - new Date(timestamp).getTime() < WEEK_MS;

// Featured keeps the priority order from sortCreators. Stat sorts keep promoted
// creators first, then order by the stat, pushing creators with no data (or a
// private profile) to the end.
export const applySort = (creators: Creator[], sort: SortKey): Creator[] => {
  if (sort === "featured") return creators;

  const [key, direction] = sort.split("-") as [
    "followers" | "lastPost",
    "asc" | "desc",
  ];
  const value = (creator: Creator): number | undefined => {
    if (creator.private) return undefined;
    if (key === "followers") return creator.followersCount;
    return creator.latestPostTimestamp
      ? new Date(creator.latestPostTimestamp).getTime()
      : undefined;
  };

  return [...creators].sort((a, b) => {
    // Promoted creators stay pinned to the top under every sort
    if (a.promoted !== b.promoted) return a.promoted ? -1 : 1;

    const aValue = value(a);
    const bValue = value(b);
    if (aValue === undefined) return bValue === undefined ? 0 : 1;
    if (bValue === undefined) return -1;
    return direction === "desc" ? bValue - aValue : aValue - bValue;
  });
};

export const formatWeeksAgo = (timestamp: string): string => {
  const weeks = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / WEEK_MS,
  );
  if (weeks < 1) return "This week";
  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
};

// Toggle-chip styling shared by the filter and sort sheets
export const optionClass = (selected: boolean) =>
  selected
    ? "border-accent! bg-accent-900! text-accent-200!"
    : "border-neutral-800! bg-transparent! text-neutral-200! hover:bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)]!";

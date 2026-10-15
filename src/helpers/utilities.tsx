import type { Creator } from "./constants";
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

export const getCreatorInitial = (creator: Creator): string =>
  (creator.name?.trim() || creator.instagram?.trim().replace(/^@/, "") || "?")
    .charAt(0)
    .toUpperCase();

export const formatWeeksAgo = (timestamp: string): string => {
  const weeks = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  if (weeks < 1) return "This week";
  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
};

import type { Creator } from "./constants";

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

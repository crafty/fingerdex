import { useEffect } from "react";
import { Instagram, Times } from "@primeicons/react";
import { NavigationMenu } from "@primereact/ui/navigationmenu";
import { Menu } from "@primereact/ui/menu";
import { Button } from "@primereact/ui/button";
import { Chip } from "@primereact/ui/chip";
import { toast } from "@primereact/ui/toaster";

import { CreatorCard } from "./components/creatorCard";
import { SearchCreators } from "./components/searchCreators";
import { FilterCreators } from "./components/filterCreators";
import { SortCreators } from "./components/sortCreators";
import { AppToaster } from "./components/toaster";
import { AddCreator } from "./components/addCreator";
import { HelpPopover } from "./components/helpPopover";
import { SupportUsPopover } from "./components/supportUsPopover";

import {
  sortCreators,
  mergeInstagramData,
  applySort,
} from "./helpers/utilities";
import Logo from "./assets/fingerdex-v2-logo-light.svg";
import { BRANDS_CREATORS, PAGES, type Product } from "./helpers/constants";
import { useFilters } from "./store/filtersStore";

const sortedCreators = sortCreators(mergeInstagramData(BRANDS_CREATORS));

function App() {
  const {
    searchQuery,
    selectedTags,
    sort,
    addTag,
    removeTag,
    setSelectedTags,
    resetFilters,
  } = useFilters();

  const query = searchQuery.trim().toLowerCase().replace(/^@/, "");

  const filteredCreators = applySort(
    sortedCreators.filter((creator) => {
      const matchesSearch =
        !query ||
        (creator.name || "").toLowerCase().includes(query) ||
        (creator.instagram || "").toLowerCase().includes(query);

      const products = creator.products.filter(Boolean);

      const matchesTags =
        selectedTags.length === 0 ||
        (products.length > 0 &&
          selectedTags.every((tag) => products.includes(tag as Product)));

      return matchesSearch && matchesTags;
    }),
    sort,
  );

  const highlightedStat =
    sort === "featured"
      ? undefined
      : sort.startsWith("followers")
        ? "followers"
        : "lastPost";

  if (import.meta.env.DEV) {
    console.log(
      "Updated Creators: ",
      filteredCreators.filter(
        (creator) => creator.products.filter(Boolean).length > 0,
      ).length,
    );
    console.log(
      "Creators to Update: ",
      filteredCreators.filter(
        (creator) => creator.products.filter(Boolean).length === 0,
      ).length,
    );
  }

  useEffect(() => {
    toast.info({
      title: "Under Construction",
      description:
        "The website is currently under construction. If you see a creator/brand with missing products or other information, it may be due to ongoing updates. Your patience is appreciated.",
      duration: 9000,
    });
  }, []);

  const resultCount = filteredCreators.length;

  return (
    <>
      <AppToaster />
      <header className="flex items-center justify-between pt-3 pb-2.5">
        <img src={Logo} alt="Fingerdex Logo" className="h-6.5 w-auto" />

        <NavigationMenu className="hidden! md:flex!">
          {PAGES.map((s) => (
            <Menu.Root key={s.label}>
              <Menu.Trigger disabled={s.value !== "creators"}>
                {s.label}
              </Menu.Trigger>
            </Menu.Root>
          ))}
        </NavigationMenu>

        <div className="flex items-center gap-0.5">
          <Button
            as="a"
            href="https://www.instagram.com/crafty.fb/"
            target="_blank"
            rel="noopener"
            rounded
            variant="text"
            aria-label="Instagram"
            iconOnly
            className="size-11"
          >
            <Instagram size={20} />
          </Button>
          <SupportUsPopover />
          <HelpPopover />
        </div>
      </header>

      <main>
        <div className="flex items-center justify-between pt-2 pb-3.5">
          <h1 className="text-2xl font-medium tracking-[-0.01em]">
            Brands &amp; Creators
          </h1>
          <AddCreator />
        </div>

        <div className="sticky top-0 z-10 flex flex-col gap-2 bg-bg pt-1 pb-3">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="md:flex-1">
              <SearchCreators />
            </div>
            <div className="grid grid-cols-2 gap-2 md:w-104">
              <FilterCreators resultCount={resultCount} />
              <SortCreators />
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedTags.map((tag) => (
                <Chip.Root
                  key={tag}
                  className="h-7.5 rounded-full! border border-accent-700 bg-accent-900! px-2.5! text-[13px] font-medium text-accent-200!"
                  onRemove={() => removeTag(tag)}
                >
                  <Chip.Label>{tag}</Chip.Label>
                  <Chip.Remove aria-label={`Remove ${tag}`}>
                    <Times size={12} />
                  </Chip.Remove>
                </Chip.Root>
              ))}
              <Button
                variant="text"
                severity="secondary"
                className="h-7.5 px-1.5! text-[13px]!"
                onClick={() => setSelectedTags([])}
              >
                Clear
              </Button>
            </div>
          )}

          <div className="text-xs text-neutral-400">
            {resultCount} {resultCount === 1 ? "creator" : "creators"}
          </div>
        </div>

        {resultCount === 0 ? (
          <div className="flex flex-col items-start gap-2.5 px-2 py-10">
            <span className="text-[17px] font-medium">No creators match</span>
            <span className="text-sm text-neutral-400">
              Try a different name or remove a product filter.
            </span>
            <Button
              severity="secondary"
              variant="outlined"
              className="h-11"
              onClick={resetFilters}
            >
              Reset search
            </Button>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={`${creator.name}|${creator.instagram}`}
                creator={creator}
                highlightedStat={highlightedStat}
                onTagClick={addTag}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

export default App;

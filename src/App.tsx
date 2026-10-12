import { useEffect, useRef } from "react";
import { Instagram } from "@primeicons/react";
import { type AutoCompleteValueChangeEvent } from "@primereact/ui/autocomplete";
import { Divider } from "@primereact/ui/divider";
import { NavigationMenu } from "@primereact/ui/navigationmenu";
import { Menu } from "@primereact/ui/menu";
import { Button } from "@primereact/ui/button";

import { CreatorCard } from "./components/creatorCard";
import { SearchCreators } from "./components/searchCreators";
import { FilterCreators } from "./components/filterCreators";
import { AppToaster } from "./components/toaster";
import { AddCreator } from "./components/addCreator";
import { HelpPopover } from "./components/helpPopover";
import { SupportUsPopover } from "./components/supportUsPopover";

import { sortCreators } from "./helpers/utilities";
import Logo from "./assets/fingerdex-v2-logo-light.svg";
import {
  BRANDS_CREATORS,
  PAGES,
  type Creator,
  type Product,
} from "./helpers/constants";
import { useFilters } from "./store/filtersStore";
import { toast } from "@primereact/ui/toaster";

const sortedCreators = sortCreators(BRANDS_CREATORS);

function App() {
  const { searchQuery, selectedTags, setSelectedTags } = useFilters();

  const justSelectedRef = useRef(false);

  const onValueChange = (event: AutoCompleteValueChangeEvent | string) => {
    const value = typeof event === "string" ? event : (event.value as string);
    if (value) {
      const next = selectedTags.includes(value)
        ? selectedTags
        : [...selectedTags, value];
      setSelectedTags(next);
      justSelectedRef.current = true;
    }
  };

  const filteredCreators = sortedCreators.filter((creator) => {
    const matchesSearch = (creator.name || creator.instagram || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const products = creator.products.filter(Boolean);

    const matchesTags =
      selectedTags.length === 0 ||
      (products.length > 0 &&
        selectedTags.every((tag) => products.includes(tag as Product)));

    return matchesSearch && matchesTags;
  });

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

  return (
    <>
      <AppToaster />
      <section id="header" className="flex flex-col items-start gap-4">
        <div className="w-full">
          <div className="flex justify-between">
            <img src={Logo} alt="Fingerdex Logo" className="w-42 h-auto" />

            <NavigationMenu className="hidden! md:flex!">
              {PAGES.map((s) => (
                <Menu.Root key={s.label}>
                  <Menu.Trigger disabled={s.value !== "creators"}>
                    {s.label}
                  </Menu.Trigger>
                </Menu.Root>
              ))}
            </NavigationMenu>

            <div className="flex items-center gap-3">
              <Button
                as="a"
                href="https://www.instagram.com/crafty.fb/"
                target="_blank"
                rel="noopener"
                severity="contrast"
                rounded
                variant="text"
                aria-label="Instagram Icon"
                size={"small"}
                iconOnly
              >
                <Instagram size={18} />
              </Button>
              <SupportUsPopover />

              <HelpPopover />
            </div>
          </div>
          <Divider />
        </div>

        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Brands & Creators</h1>
          <AddCreator />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full">
          <div className="grow pt-2">
            <SearchCreators filteredCreators={filteredCreators} />
          </div>
          <div className="grow-3">
            <FilterCreators />
          </div>
        </div>
      </section>

      <section id="content" className="flex flex-wrap gap-4 w-full">
        {filteredCreators.map((creator: Creator, i: number) => (
          <CreatorCard
            key={creator.name || creator.instagram || i}
            creator={creator}
            onTagClick={(tag: string) => onValueChange(tag)}
          />
        ))}
      </section>

      <section id="footer"></section>
    </>
  );
}

export default App;

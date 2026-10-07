import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
} from "@primereact/ui/autocomplete";
import { IconField } from "@primereact/ui/iconfield";
import { InputText } from "@primereact/ui/inputtext";
import { Search as SearchIcon } from "@primeicons/react";
import type { Creator } from "../helpers/constants";
import { useFilters } from "../store/filtersStore";

export const SearchCreators = ({
  filteredCreators,
}: {
  filteredCreators: Creator[];
}) => {
  const { setSearchQuery } = useFilters();

  const search = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <AutoComplete.Root
      options={filteredCreators}
      optionLabel="name"
      onComplete={search}
      className="w-full"
    >
      <IconField.Root>
        <IconField.Inset>
          <SearchIcon />
        </IconField.Inset>
      </IconField.Root>
      <AutoComplete.Input
        as={InputText}
        placeholder="Search"
        className="w-full p-2"
        style={{ paddingLeft: "2rem" }}
      />
      <AutoComplete.Portal>
        <AutoComplete.Positioner>
          <AutoComplete.Popup>
            <AutoComplete.List style={{ maxHeight: "14rem" }}>
              {filteredCreators.map((cmd, index) => (
                <AutoComplete.Option
                  key={`cmd.name-${index}`}
                  index={index}
                  uKey={cmd.name}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{cmd.name || "Name Unavailable"}</span>
                  </div>
                </AutoComplete.Option>
              ))}
              <AutoComplete.Empty className="text-sm">
                No Brands or Creators found
              </AutoComplete.Empty>
            </AutoComplete.List>
          </AutoComplete.Popup>
        </AutoComplete.Positioner>
      </AutoComplete.Portal>
    </AutoComplete.Root>
  );
};

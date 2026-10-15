import { IconField } from "@primereact/ui/iconfield";
import { InputText } from "@primereact/ui/inputtext";
import { Search as SearchIcon } from "@primeicons/react";
import { useFilters } from "../store/filtersStore";

export const SearchCreators = () => {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <IconField.Root className="w-full">
      <IconField.Inset>
        <SearchIcon className="text-neutral-400" />
      </IconField.Inset>
      <InputText
        type="search"
        aria-label="Search creators"
        placeholder="Search name or @handle"
        value={searchQuery}
        onInput={(e: React.FormEvent<HTMLInputElement>) =>
          setSearchQuery(e.currentTarget.value)
        }
        className="h-11 w-full text-[15px]!"
      />
    </IconField.Root>
  );
};

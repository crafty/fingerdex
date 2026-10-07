import { useRef, useState } from "react";
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteInputValueChangeEvent,
  type AutoCompleteRootInstance,
  type AutoCompleteValueChangeEvent,
} from "@primereact/ui/autocomplete";
import { Times } from "@primeicons/react";
import { Chip, type ChipRootRemoveEvent } from "@primereact/ui/chip";
import { PRODUCTS } from "../helpers/constants";
import { useFilters } from "../store/filtersStore";

export const FilterCreators = () => {
  const { selectedTags, setSelectedTags } = useFilters();
  const [inputValue, setInputValue] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<string[]>(PRODUCTS);
  const autoCompleteRef = useRef<AutoCompleteRootInstance>(null);
  const justSelectedRef = useRef(false);

  const searchTags = (event: AutoCompleteCompleteEvent) => {
    const query = (event.query || "").toLowerCase();
    setTagOptions(
      PRODUCTS.filter(
        (tag: string) =>
          tag.toLowerCase().includes(query) && !selectedTags.includes(tag),
      ),
    );
  };

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

  const onInputValueChange = (event: AutoCompleteInputValueChangeEvent) => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      setInputValue("");
      return;
    }
    setInputValue(event.query);
  };

  const removeTag = (e: ChipRootRemoveEvent, tag: string) => {
    e.originalEvent.stopPropagation();
    const currentIndex = selectedTags.indexOf(tag);
    const next = selectedTags.filter((t) => t !== tag);

    setSelectedTags(next);

    requestAnimationFrame(() => {
      if (currentIndex > 0) {
        const rootElement = autoCompleteRef.current?.elementRef?.current;
        const removeButtons = rootElement?.querySelectorAll<HTMLElement>(
          '[data-scope="chip"][data-part="remove"]',
        );
        removeButtons?.[currentIndex - 1]?.focus();
      } else {
        autoCompleteRef?.current?.focus();
      }
    });
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Backspace" && !inputValue && selectedTags.length > 0) {
      const next = selectedTags.slice(0, -1);
      setSelectedTags(next);
    }
  };

  return (
    <AutoComplete.Root
      ref={autoCompleteRef}
      options={tagOptions}
      onComplete={searchTags}
      value={null}
      inputValue={inputValue}
      onValueChange={onValueChange}
      onInputValueChange={onInputValueChange}
      className=" w-full p-inputtext focus-within:border-primary"
    >
      <AutoComplete.Trigger as="div" className="flex-wrap gap-1">
        <AutoComplete.Value placeholder="Add a tag...">
          <div className="flex flex-wrap gap-1">
            {selectedTags?.map((tag) => (
              <Chip.Root
                key={tag}
                className="py-0.5"
                onRemove={(e: ChipRootRemoveEvent) => removeTag(e, tag)}
              >
                <Chip.Label className="text-xs">{tag}</Chip.Label>
                <Chip.Remove>
                  <Times className="text-[0.5rem]!" />
                </Chip.Remove>
              </Chip.Root>
            ))}
            <AutoComplete.Input
              placeholder="Filter by products..."
              className="text-sm px-2 py-0.5 outline-none"
              onKeyDown={onInputKeyDown}
            />
          </div>
        </AutoComplete.Value>
      </AutoComplete.Trigger>
      <AutoComplete.Portal>
        <AutoComplete.Positioner>
          <AutoComplete.Popup>
            <AutoComplete.List style={{ maxHeight: "14rem" }} />
            <AutoComplete.Empty className="text-sm">
              No product types found
            </AutoComplete.Empty>
          </AutoComplete.Popup>
        </AutoComplete.Positioner>
      </AutoComplete.Portal>
    </AutoComplete.Root>
  );
};

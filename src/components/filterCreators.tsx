import { useState } from "react";
import { Button } from "@primereact/ui/button";
import { Tag } from "@primereact/ui/tag";
import { Filter } from "@primeicons/react";
import { PRODUCTS } from "../helpers/constants";
import { useFilters } from "../store/filtersStore";
import { optionClass } from "../helpers/utilities";
import { BottomSheet } from "./bottomSheet";

export const FilterCreators = ({ resultCount }: { resultCount: number }) => {
  const [open, setOpen] = useState(false);
  const { selectedTags, setSelectedTags, addTag, removeTag } = useFilters();

  const clearButton = (
    <Button variant="text" className="h-11" onClick={() => setSelectedTags([])}>
      Clear
    </Button>
  );

  return (
    <>
      <Button
        severity="secondary"
        variant="outlined"
        className="h-11 w-full justify-between! px-3!"
        onClick={() => setOpen(true)}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Filter size={16} />
          Products
        </span>
        {selectedTags.length > 0 && (
          <Tag className="bg-accent-800! text-accent-100! text-[11px]!">
            {selectedTags.length}
          </Tag>
        )}
      </Button>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Products"
        headerAction={clearButton}
      >
        <div className="flex flex-wrap gap-2 overflow-y-auto">
          {PRODUCTS.map((product) => {
            const selected = selectedTags.includes(product);
            return (
              <Button
                key={product}
                rounded
                variant="outlined"
                aria-pressed={selected}
                className={`h-9.5 px-3.5! text-sm! ${optionClass(selected)}`}
                onClick={() =>
                  selected ? removeTag(product) : addTag(product)
                }
              >
                {product}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outlined"
          className="mt-1 h-12 w-full text-[15px]!"
          onClick={() => setOpen(false)}
        >
          Show {resultCount} {resultCount === 1 ? "creator" : "creators"}
        </Button>
      </BottomSheet>
    </>
  );
};

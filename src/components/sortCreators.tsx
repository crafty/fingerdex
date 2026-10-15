import { useState } from "react";
import { Button } from "@primereact/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  History,
  Sparkles,
  SortAlt,
  Star,
  Users,
} from "@primeicons/react";
import { SORT_LABELS, type SortKey } from "../helpers/constants";
import { useFilters } from "../store/filtersStore";
import { BottomSheet } from "./bottomSheet";
import { optionClass } from "../helpers/utilities";

const SORT_GROUPS: {
  label: string;
  icon: React.ReactNode;
  options: { key: SortKey; label: string; icon: React.ReactNode }[];
}[] = [
  {
    label: "Curated",
    icon: <Star size={13} />,
    options: [{ key: "featured", label: "Featured", icon: <Sparkles size={15} /> }],
  },
  {
    label: "Followers",
    icon: <Users size={13} />,
    options: [
      { key: "followers-desc", label: "Most", icon: <ArrowDown size={15} /> },
      { key: "followers-asc", label: "Fewest", icon: <ArrowUp size={15} /> },
    ],
  },
  {
    label: "Last post",
    icon: <History size={13} />,
    options: [
      { key: "lastPost-desc", label: "Newest", icon: <ArrowDown size={15} /> },
      { key: "lastPost-asc", label: "Oldest", icon: <ArrowUp size={15} /> },
    ],
  },
];

export const SortCreators = () => {
  const [open, setOpen] = useState(false);
  const { sort, setSort } = useFilters();

  return (
    <>
      <Button
        severity="secondary"
        variant="outlined"
        className="h-11 w-full justify-between! px-3!"
        onClick={() => setOpen(true)}
      >
        <span className="flex min-w-0 items-center gap-2">
          <SortAlt size={16} className="shrink-0" />
          <span className="truncate">{SORT_LABELS[sort]}</span>
        </span>
        <ChevronDown size={14} className="shrink-0 text-neutral-400" />
      </Button>

      <BottomSheet open={open} onOpenChange={setOpen} title="Sort by">
        <div className="flex flex-col gap-3.5">
          {SORT_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-neutral-400">
                {group.icon}
                {group.label}
              </span>
              <div
                className={`grid gap-1.5 ${group.options.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {group.options.map((option) => (
                  <Button
                    key={option.key}
                    variant="outlined"
                    aria-pressed={sort === option.key}
                    className={`h-12 text-sm! ${optionClass(sort === option.key)}`}
                    onClick={() => {
                      setSort(option.key);
                      setOpen(false);
                    }}
                  >
                    {option.icon}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};

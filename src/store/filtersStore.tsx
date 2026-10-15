import { create } from "zustand";
import type { SortKey } from "../helpers/constants";

type FiltersStore = {
  searchQuery: string;
  selectedTags: string[];
  sort: SortKey;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setSort: (sort: SortKey) => void;
  resetFilters: () => void;
};

export const useFilters = create<FiltersStore>((set) => ({
  searchQuery: "",
  selectedTags: [],
  sort: "followers-desc",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedTags: (tags: string[]) => set({ selectedTags: tags }),
  addTag: (tag: string) =>
    set((state) =>
      state.selectedTags.includes(tag)
        ? state
        : { selectedTags: [...state.selectedTags, tag] },
    ),
  removeTag: (tag: string) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    })),
  setSort: (sort: SortKey) => set({ sort }),
  resetFilters: () => set({ searchQuery: "", selectedTags: [] }),
}));

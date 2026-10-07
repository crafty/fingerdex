import { create } from "zustand";

type FiltersStore = {
  searchQuery: string;
  selectedTags: string[];
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
};

export const useFilters = create<FiltersStore>((set) => ({
  searchQuery: "",
  selectedTags: [],
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedTags: (tags: string[]) => set({ selectedTags: tags }),
}));

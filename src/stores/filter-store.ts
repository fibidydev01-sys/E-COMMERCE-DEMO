import { create } from "zustand";

interface FilterState {
  search: string;
  category: string | null;
  priceRange: [number, number];
  rating: number | null;
  sortBy: string;
  sortOrder: "asc" | "desc";
  inStock: boolean;
}

interface FilterActions {
  setSearch: (search: string) => void;
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRating: (rating: number | null) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setInStock: (inStock: boolean) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  search: "",
  category: null,
  priceRange: [0, 10000000],
  rating: null,
  sortBy: "newest",
  sortOrder: "desc",
  inStock: false,
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setRating: (rating) => set({ rating }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setInStock: (inStock) => set({ inStock }),
  resetFilters: () => set(initialState),
}));
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  isLoading: boolean;
}

interface WishlistActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setLoading: (loading: boolean) => void;
}

export const useWishlistStore = create<WishlistState & WishlistActions>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (product) => {
        if (!get().items.find((item) => item.id === product.id)) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter((item) => item.id !== productId) }),
      toggleItem: (product) => {
        if (get().items.find((item) => item.id === product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => get().items.some((item) => item.id === productId),
      clearWishlist: () => set({ items: [] }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
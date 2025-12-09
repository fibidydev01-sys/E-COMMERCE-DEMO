import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types";

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

interface CartActions {
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  setLoading: (loading: boolean) => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (product, quantity = 1, variant) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.productId === product.id && item.variantId === (variant?.id || null)
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || "default"}-${Date.now()}`,
            productId: product.id,
            variantId: variant?.id || null,
            quantity,
            product,
            variant: variant || null,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (itemId) => set({ items: get().items.filter((item) => item.id !== itemId) }),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({ items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)) });
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => get().items.reduce((total, item) => {
        const price = item.variant?.price || item.product.price;
        return total + price * item.quantity;
      }, 0),

      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
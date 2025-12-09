"use client";

import { useRouter } from "next/navigation";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { useWishlistStore } from "@/stores/wishlist-store";

export default function WishlistPage() {
  const router = useRouter();
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="flex-1">
        <h1 className="text-2xl font-heading font-bold mb-6">Wishlist</h1>
        <EmptyState
          icon={Heart}
          title="Wishlist Kosong"
          description="Simpan produk favoritmu di sini"
          action={{
            label: "Jelajahi Produk",
            onClick: () => router.push("/products"),
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">
          Wishlist ({items.length})
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500"
          onClick={() => {
            clearWishlist();
            toast.success("Wishlist dikosongkan");
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus Semua
        </Button>
      </div>
      <ProductGrid products={items} columns={3} />
    </div>
  );
}
"use client";

import * as React from "react";
import {
  Heart,
  ShoppingCart,
  Share2,
  MessageCircle,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { StockIndicator } from "@/components/ui/stock-indicator";
import { Product, ProductVariant, Store } from "@/types";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { cn } from "@/lib/utils";

interface ProductWithStore extends Product {
  store: Store;
}

interface ProductInfoProps {
  product: ProductWithStore;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] =
    React.useState<ProductVariant | null>(null);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = selectedVariant?.price || product.price;
  const currentStock = selectedVariant?.stock ?? product.stock;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined);
    toast.success("Produk ditambahkan ke keranjang");
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant || undefined);
    window.location.href = "/checkout";
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link produk disalin!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link produk disalin!");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
        {product.discount && product.discount > 0 && (
          <Badge variant="sale">-{product.discount}%</Badge>
        )}
        {currentStock <= 10 && currentStock > 0 && (
          <Badge variant="limited">Stok Terbatas</Badge>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-heading font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Rating value={product.rating} size="sm" />
            <span className="text-muted-foreground">
              ({product.ratingCount} ulasan)
            </span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            Terjual {product.soldCount}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="py-4 px-6 bg-muted/50 rounded-xl">
        <Price
          price={currentPrice}
          originalPrice={product.originalPrice}
          discount={product.discount}
          size="lg"
        />
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Pilih Varian:</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={variant.stock === 0}
                className={cn(
                  "px-4 py-2 border rounded-lg text-sm transition-all",
                  selectedVariant?.id === variant.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:border-muted-foreground/50",
                  variant.stock === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                {variant.name}
                {variant.stock === 0 && " (Habis)"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Jumlah:</span>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={currentStock}
        />
        <StockIndicator stock={currentStock} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={currentStock === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Tambah ke Keranjang
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="flex-1"
          onClick={handleBuyNow}
          disabled={currentStock === 0}
        >
          Beli Sekarang
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleItem(product)}
          className={cn(inWishlist && "text-red-500 border-red-500")}
        >
          <Heart className={cn("h-4 w-4 mr-2", inWishlist && "fill-current")} />
          {inWishlist ? "Hapus dari Wishlist" : "Wishlist"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Bagikan
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat Penjual
        </Button>
      </div>

      <Separator />

      {/* Store Info */}
      <div className="flex items-center gap-4 p-4 border rounded-xl">
        <div className="w-12 h-12 bg-muted rounded-full" />
        <div className="flex-1">
          <a
            href={`/stores/${product.store.slug}`}
            className="font-semibold hover:text-primary transition-colors"
          >
            {product.store.name}
          </a>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {product.store.isVerified && (
              <Badge variant="verified">Verified</Badge>
            )}
            <span>⭐ {product.store.rating}</span>
            <span>•</span>
            <span>{product.store.ratingCount} ulasan</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Kunjungi Toko
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-5 w-5 text-green-600" />
          <span>100% Original</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-5 w-5 text-blue-600" />
          <span>Gratis Ongkir</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="h-5 w-5 text-orange-600" />
          <span>7 Hari Retur</span>
        </div>
      </div>
    </div>
  );
}
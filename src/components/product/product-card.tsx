"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success("Produk ditambahkan ke keranjang");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(inWishlist ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist");
  };

  return (
    <motion.div
      className={cn("group relative flex flex-col h-full", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="flex flex-col h-full">
        <div className="bg-card rounded-xl border overflow-hidden transition-shadow hover:shadow-lg flex flex-col h-full">
          {/* Image Section - Fixed aspect ratio */}
          <div className="relative aspect-square bg-muted overflow-hidden flex-shrink-0">
            <Image
              src={product.images[0] || "/images/placeholder-product.png"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
              {product.stock <= 10 && product.stock > 0 && <Badge variant="limited">Stok Terbatas</Badge>}
              {product.stock === 0 && <Badge variant="destructive">Habis</Badge>}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={cn(
                "absolute top-2 right-2 p-2 rounded-full transition-all",
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white/80 hover:bg-white text-gray-600"
              )}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </button>

            {/* Add to Cart - Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              className="absolute bottom-2 left-2 right-2"
            >
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? "Stok Habis" : "Tambah"}
              </Button>
            </motion.div>
          </div>

          {/* Content Section - Flexible height */}
          <div className="p-3 md:p-4 space-y-2 flex flex-col flex-grow">
            {/* Product Name - Fixed 2 lines */}
            <h3 className="font-medium text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem] md:min-h-[3rem]">
              {product.name}
            </h3>

            {/* Price */}
            <div className="mt-auto">
              <Price price={product.price} comparePrice={product.comparePrice} />
            </div>

            {/* Rating & Sold Count */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount.toLocaleString()} terjual</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
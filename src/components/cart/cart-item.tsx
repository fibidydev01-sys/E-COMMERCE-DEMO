"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Price } from "@/components/ui/price";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/stores/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const price = item.variant?.price || item.product.price;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border">
      <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
        <Image src={item.product.images[0] || "/images/placeholder-product.png"} alt={item.product.name} fill className="object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product.slug}`} className="font-medium hover:text-primary line-clamp-2">{item.product.name}</Link>
        {item.variant && <p className="text-sm text-muted-foreground mt-1">Varian: {item.variant.value}</p>}
        <Price price={price} size="sm" className="mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
        <QuantitySelector value={item.quantity} onChange={(qty) => updateQuantity(item.id, qty)} min={1} max={item.product.stock} size="sm" />
      </div>
    </div>
  );
}
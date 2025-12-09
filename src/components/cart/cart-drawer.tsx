"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary-500 text-white text-xs flex items-center justify-center font-semibold">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Keranjang ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Keranjang kosong</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.variant?.price || item.product.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(qty) => updateQuantity(item.id, qty)}
                          size="sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/cart">Lihat Keranjang</Link>
                </Button>
                <Button onClick={() => setIsOpen(false)} asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
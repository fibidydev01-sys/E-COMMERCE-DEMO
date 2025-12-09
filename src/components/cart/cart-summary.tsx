"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const { items, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = subtotal > 100000 ? 0 : 15000;
  const total = subtotal + shipping;

  return (
    <div className="bg-card rounded-xl border p-6 sticky top-24">
      <h2 className="font-heading font-semibold text-lg mb-4">
        Ringkasan Belanja
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({items.length} item)
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ongkos Kirim</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Kode Promo" className="flex-1" />
        <Button variant="outline">Terapkan</Button>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold text-lg mb-4">
        <span>Total</span>
        <span className="text-primary">{formatPrice(total)}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg" disabled={items.length === 0}>
          <ShoppingBag className="h-5 w-5 mr-2" />
          Checkout
        </Button>
      </Link>

      {subtotal < 100000 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Belanja {formatPrice(100000 - subtotal)} lagi untuk gratis ongkir!
        </p>
      )}
    </div>
  );
}
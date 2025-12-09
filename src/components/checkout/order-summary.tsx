"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  shippingCost: number;
  discount?: number;
}

export function OrderSummary({ shippingCost, discount = 0 }: OrderSummaryProps) {
  const { items, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost - discount;

  return (
    <div className="bg-card rounded-xl border p-6 sticky top-24">
      <h3 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h3>

      <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
              {item.variant && <p className="text-xs text-muted-foreground">{item.variant.value}</p>}
              <p className="text-sm mt-1">{item.quantity} x {formatPrice(item.variant?.price || item.product.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Ongkos Kirim</span><span>{shippingCost === 0 ? <span className="text-green-600">Gratis</span> : formatPrice(shippingCost)}</span></div>
        {discount > 0 && <div className="flex justify-between text-green-600"><span>Diskon</span><span>-{formatPrice(discount)}</span></div>}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span><span className="text-primary">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
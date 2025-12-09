"use client";

import { Trash2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { CartEmpty } from "@/components/cart/cart-empty";
import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <Container className="py-6">
        <Breadcrumbs items={[{ label: "Keranjang" }]} className="mb-6" />
        <CartEmpty />
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <Breadcrumbs items={[{ label: "Keranjang" }]} className="mb-6" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Keranjang Belanja</h1>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={clearCart}>
          <Trash2 className="h-4 w-4 mr-2" />Hapus Semua
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
        <div><CartSummary /></div>
      </div>
    </Container>
  );
}
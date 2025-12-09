import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-heading font-semibold mb-2">Keranjang Kosong</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">Belum ada produk di keranjang kamu. Yuk mulai belanja!</p>
      <Button asChild><Link href="/products">Mulai Belanja</Link></Button>
    </div>
  );
}
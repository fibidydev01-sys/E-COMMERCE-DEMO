"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";

interface FlashDealsProps {
  products: Product[];
  endTime: Date;
}

// TimeBlock component moved OUTSIDE the main component
function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="bg-red-600 text-white font-mono font-bold text-xl px-3 py-2 rounded-lg min-w-[50px]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

export function FlashDeals({ products, endTime }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-white">Flash Sale</h2>
            <p className="text-white/80 text-sm">Diskon hingga 70%!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Berakhir dalam:</span>
          <div className="flex items-center gap-2">
            <TimeBlock value={timeLeft.hours} label="Jam" />
            <span className="text-white text-xl font-bold">:</span>
            <TimeBlock value={timeLeft.minutes} label="Menit" />
            <span className="text-white text-xl font-bold">:</span>
            <TimeBlock value={timeLeft.seconds} label="Detik" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-white/90" asChild>
          <Link href="/products?sale=true">
            Lihat Semua Promo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
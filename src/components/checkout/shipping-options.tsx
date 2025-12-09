"use client";

import { Truck, Zap, Clock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: typeof Truck;
}

const shippingOptions: ShippingOption[] = [
  { id: "regular", name: "Reguler", description: "Pengiriman standar", price: 15000, estimatedDays: "3-5 hari", icon: Truck },
  { id: "express", name: "Express", description: "Pengiriman cepat", price: 25000, estimatedDays: "1-2 hari", icon: Zap },
  { id: "sameday", name: "Same Day", description: "Sampai hari ini", price: 40000, estimatedDays: "Hari ini", icon: Clock },
];

interface ShippingOptionsProps {
  selectedId: string;
  onSelect: (id: string) => void;
  freeShipping?: boolean;
}

export function ShippingOptions({ selectedId, onSelect, freeShipping }: ShippingOptionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Metode Pengiriman</h3>
      <RadioGroup value={selectedId} onValueChange={onSelect} className="space-y-3">
        {shippingOptions.map((option) => {
          const price = freeShipping && option.id === "regular" ? 0 : option.price;
          return (
            <label key={option.id} className={cn("flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all", selectedId === option.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50")}>
              <RadioGroupItem value={option.id} />
              <option.icon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">({option.estimatedDays})</span>
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <span className="font-semibold">{price === 0 ? <span className="text-green-600">Gratis</span> : formatPrice(price)}</span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export { shippingOptions };
"use client";

import { CreditCard, Building2, Wallet, Banknote } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "BANK_TRANSFER", name: "Transfer Bank", description: "BCA, Mandiri, BNI, BRI", icon: Building2 },
  { id: "CREDIT_CARD", name: "Kartu Kredit", description: "Visa, Mastercard, JCB", icon: CreditCard },
  { id: "E_WALLET", name: "E-Wallet", description: "GoPay, OVO, DANA, ShopeePay", icon: Wallet },
  { id: "COD", name: "Bayar di Tempat", description: "Bayar saat barang diterima", icon: Banknote },
];

interface PaymentMethodsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PaymentMethods({ selectedId, onSelect }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Metode Pembayaran</h3>
      <RadioGroup value={selectedId} onValueChange={onSelect} className="space-y-3">
        {paymentMethods.map((method) => (
          <label key={method.id} className={cn("flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all", selectedId === method.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50")}>
            <RadioGroupItem value={method.id} />
            <method.icon className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <span className="font-medium">{method.name}</span>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

export { paymentMethods };
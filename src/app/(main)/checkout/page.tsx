"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { AddressSelector } from "@/components/checkout/address-selector";
import {
  ShippingOptions,
  shippingOptions,
} from "@/components/checkout/shipping-options";
import { PaymentMethods } from "@/components/checkout/payment-methods";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useCartStore } from "@/stores/cart-store";
import { mockAddresses } from "@/data/mock-addresses";
import { generateOrderNumber } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [step, setStep] = React.useState(1);
  const [selectedAddress, setSelectedAddress] = React.useState(
    mockAddresses[0]?.id || null
  );
  const [selectedShipping, setSelectedShipping] = React.useState("regular");
  const [selectedPayment, setSelectedPayment] = React.useState("BANK_TRANSFER");
  const [notes, setNotes] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getCartTotal();
  const shippingCost =
    subtotal > 100000 && selectedShipping === "regular"
      ? 0
      : shippingOptions.find((s) => s.id === selectedShipping)?.price || 0;

  const handleNext = () => {
    if (step === 1 && !selectedAddress) {
      toast.error("Pilih alamat pengiriman");
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const orderNumber = generateOrderNumber();
    clearCart();
    toast.success("Pesanan berhasil dibuat!");
    router.push(`/orders/${orderNumber}?success=true`);
  };

  // Redirect jika cart kosong (hanya setelah mounted)
  React.useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push("/cart");
    }
  }, [isMounted, items.length, router]);

  // Jangan render apapun sampai mounted
  if (!isMounted) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Container className="py-6">
      <Breadcrumbs
        items={[{ label: "Keranjang", href: "/cart" }, { label: "Checkout" }]}
        className="mb-6"
      />
      <CheckoutSteps currentStep={step} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <AddressSelector
              addresses={mockAddresses}
              selectedId={selectedAddress}
              onSelect={setSelectedAddress}
            />
          )}
          {step === 2 && (
            <ShippingOptions
              selectedId={selectedShipping}
              onSelect={setSelectedShipping}
              freeShipping={subtotal > 100000}
            />
          )}
          {step === 3 && (
            <PaymentMethods
              selectedId={selectedPayment}
              onSelect={setSelectedPayment}
            />
          )}
          {step === 4 && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">Alamat Pengiriman</h4>
                <p className="text-sm text-muted-foreground">
                  {mockAddresses.find((a) => a.id === selectedAddress)?.street}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Catatan (opsional)</Label>
                <Textarea
                  placeholder="Catatan untuk penjual..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Kembali
            </Button>
            {step < 4 ? (
              <Button onClick={handleNext}>Lanjutkan</Button>
            ) : (
              <Button onClick={handlePlaceOrder} isLoading={isLoading}>
                Buat Pesanan
              </Button>
            )}
          </div>
        </div>

        <div>
          <OrderSummary shippingCost={shippingCost} />
        </div>
      </div>
    </Container>
  );
}
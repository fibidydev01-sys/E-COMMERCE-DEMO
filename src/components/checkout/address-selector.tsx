"use client";

import * as React from "react";
import { MapPin, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Address } from "@/types";
import { AddressForm } from "./address-form";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
  addresses: Address[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew?: (address: Omit<Address, "id" | "userId">) => void;
}

export function AddressSelector({
  addresses,
  selectedId,
  onSelect,
  onAddNew,
}: AddressSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Alamat Pengiriman</h3>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Alamat
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Alamat Baru</DialogTitle>
          </DialogHeader>
          <AddressForm
            onSubmit={(data) => {
              onAddNew?.({
                ...data,
                country: "Indonesia",
                isDefault: data.isDefault ?? false,
              });
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <RadioGroup
        value={selectedId || ""}
        onValueChange={onSelect}
        className="space-y-3"
      >
        {addresses.map((address) => (
          <label
            key={address.id}
            className={cn(
              "flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all",
              selectedId === address.id
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground/50"
            )}
          >
            <RadioGroupItem value={address.id} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{address.label}</span>
                {address.isDefault && <Badge variant="secondary">Utama</Badge>}
              </div>
              <p className="font-semibold">{address.recipient}</p>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {address.street}, {address.city}, {address.province}{" "}
                {address.postalCode}
              </p>
            </div>
            {selectedId === address.id && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </label>
        ))}
      </RadioGroup>

      {addresses.length === 0 && (
        <div className="text-center py-8 border rounded-xl border-dashed">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Belum ada alamat tersimpan</p>
        </div>
      )}
    </div>
  );
}
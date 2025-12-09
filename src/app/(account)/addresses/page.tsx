"use client";

import * as React from "react";
import { MapPin, Plus, Trash2, Edit, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { AddressForm } from "@/components/checkout/address-form";
import { mockAddresses } from "@/data/mock-addresses";

export default function AddressesPage() {
  const [addresses, setAddresses] = React.useState(mockAddresses);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success("Alamat berhasil dihapus");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Alamat utama diperbarui");
  };

  const handleAddAddress = () => {
    setIsDialogOpen(false);
    toast.success("Alamat ditambahkan");
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Alamat Saya</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Alamat
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Alamat Baru</DialogTitle>
          </DialogHeader>
          <AddressForm onSubmit={handleAddAddress} />
        </DialogContent>
      </Dialog>

      {addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="Belum ada alamat"
          description="Tambahkan alamat pengiriman"
        />
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-card rounded-xl border p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{address.label}</span>
                  {address.isDefault && (
                    <Badge variant="secondary">Utama</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Jadikan Utama
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="font-medium">{address.recipient}</p>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {address.street}, {address.city}, {address.province}{" "}
                {address.postalCode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { addressSchema, AddressInput } from "@/lib/validations";
import { PROVINCES } from "@/lib/constants";
import * as React from "react";

interface AddressFormProps {
  defaultValues?: Partial<AddressInput>;
  onSubmit: (data: AddressInput) => void;
  isLoading?: boolean;
}

export function AddressForm({ defaultValues, onSubmit, isLoading }: AddressFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: { label: "", recipient: "", phone: "", street: "", city: "", province: "", postalCode: "", isDefault: false, ...defaultValues },
  });

  const [province, setProvince] = React.useState(defaultValues?.province || "");
  const [isDefault, setIsDefault] = React.useState(defaultValues?.isDefault || false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Label Alamat</Label>
          <Input placeholder="contoh: Rumah, Kantor" {...register("label")} error={!!errors.label} />
          {errors.label && <p className="text-sm text-red-500">{errors.label.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Nama Penerima</Label>
          <Input placeholder="Nama lengkap penerima" {...register("recipient")} error={!!errors.recipient} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nomor Telepon</Label>
        <Input placeholder="08xxxxxxxxxx" {...register("phone")} error={!!errors.phone} />
      </div>

      <div className="space-y-2">
        <Label>Alamat Lengkap</Label>
        <Textarea placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan" {...register("street")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Provinsi</Label>
          <Select value={province} onValueChange={(v) => { setProvince(v); setValue("province", v); }}>
            <SelectTrigger><SelectValue placeholder="Pilih provinsi" /></SelectTrigger>
            <SelectContent>{PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Kota</Label>
          <Input placeholder="Nama kota" {...register("city")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Kode Pos</Label>
        <Input placeholder="12345" {...register("postalCode")} className="w-32" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isDefault" checked={isDefault} onCheckedChange={(c) => { setIsDefault(c as boolean); setValue("isDefault", c as boolean); }} />
        <Label htmlFor="isDefault" className="font-normal">Jadikan alamat utama</Label>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>Simpan Alamat</Button>
    </form>
  );
}
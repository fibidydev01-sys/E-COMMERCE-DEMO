"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productSchema, ProductInput } from "@/lib/validations";
import { mockCategories } from "@/data/mock-categories";

interface ProductFormProps {
  defaultValues?: Partial<ProductInput>;
  onSubmit: (data: ProductInput) => void;
  isLoading?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      sku: "",
      weight: 0,
      ...defaultValues,
    },
  });

  const categoryId = useWatch({ control, name: "categoryId" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Produk</Label>
            <Input
              placeholder="Masukkan nama produk"
              {...register("name")}
              error={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={categoryId}
                onValueChange={(v) => setValue("categoryId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input placeholder="SKU-001" {...register("sku")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Harga (Rp)</Label>
              <Input
                type="number"
                placeholder="0"
                {...register("price", { valueAsNumber: true })}
                error={!!errors.price}
              />
            </div>
            <div className="space-y-2">
              <Label>Stok</Label>
              <Input
                type="number"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Berat (gram)</Label>
            <Input
              type="number"
              placeholder="0"
              {...register("weight", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              placeholder="Deskripsi produk..."
              className="min-h-[150px]"
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label>Foto Produk</Label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
              <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop atau klik untuk upload
              </p>
              <Button type="button" variant="outline" size="sm">
                Pilih File
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Batal
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Simpan Produk
        </Button>
      </div>
    </form>
  );
}
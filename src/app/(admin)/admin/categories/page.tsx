"use client";

import * as React from "react";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCategories } from "@/data/mock-categories";

export default function AdminCategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-white">
          Manajemen Kategori
        </h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kategori
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Kategori</Label>
              <Input placeholder="Masukkan nama" />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input placeholder="nama-kategori" />
            </div>
            <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-700">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-4 p-4">
              <GripVertical className="h-5 w-5 text-slate-500 cursor-grab" />
              <div className="flex-1">
                <p className="font-medium text-white">{category.name}</p>
                <p className="text-sm text-slate-400">/{category.slug}</p>
              </div>
              <Badge variant="secondary">{category.productCount} produk</Badge>
              <Badge variant={category.isActive ? "delivered" : "cancelled"}>
                {category.isActive ? "Aktif" : "Nonaktif"}
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4 text-slate-400" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
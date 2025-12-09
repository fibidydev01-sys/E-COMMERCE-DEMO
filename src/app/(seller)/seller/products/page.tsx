"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockProducts } from "@/data/mock-products";
import { formatPrice } from "@/lib/utils";

export default function SellerProductsPage() {
  const [search, setSearch] = React.useState("");
  const products = mockProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Produk Saya</h1>
        <Button asChild><Link href="/seller/products/new"><Plus className="h-4 w-4 mr-2" />Tambah Produk</Link></Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari produk..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terjual</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{formatPrice(product.price)}</TableCell>
                <TableCell><Badge variant={product.stock <= 10 ? "warning" : "secondary"}>{product.stock}</Badge></TableCell>
                <TableCell><Badge variant={product.isActive ? "delivered" : "cancelled"}>{product.isActive ? "Aktif" : "Nonaktif"}</Badge></TableCell>
                <TableCell>{product.soldCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Lihat</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600"><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
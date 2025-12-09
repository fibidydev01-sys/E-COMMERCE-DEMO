"use client";

import { Search, CheckCircle, XCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const stores = [
  {
    id: "1",
    name: "TechStore Official",
    owner: "John Doe",
    products: 156,
    rating: 4.8,
    isVerified: true,
    status: "active",
  },
  {
    id: "2",
    name: "Fashion Hub",
    owner: "Jane Smith",
    products: 89,
    rating: 4.5,
    isVerified: false,
    status: "pending",
  },
  {
    id: "3",
    name: "Home Decor Plus",
    owner: "Bob Wilson",
    products: 234,
    rating: 4.9,
    isVerified: true,
    status: "active",
  },
];

export default function AdminStoresPage() {
  const handleVerify = () => toast.success("Toko berhasil diverifikasi");
  const handleReject = () => toast.error("Toko ditolak");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-white">
        Manajemen Toko
      </h1>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari toko..."
          className="pl-9 bg-slate-800 border-slate-700 text-white"
        />
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Toko</TableHead>
              <TableHead className="text-slate-300">Owner</TableHead>
              <TableHead className="text-slate-300">Produk</TableHead>
              <TableHead className="text-slate-300">Rating</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id} className="border-slate-700">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <Store className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{store.name}</p>
                      {store.isVerified && (
                        <Badge variant="verified" className="mt-1">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">{store.owner}</TableCell>
                <TableCell className="text-slate-300">
                  {store.products}
                </TableCell>
                <TableCell className="text-slate-300">
                  ⭐ {store.rating}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={store.status === "active" ? "delivered" : "pending"}
                  >
                    {store.status === "active" ? "Aktif" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {store.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleReject}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={handleVerify}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
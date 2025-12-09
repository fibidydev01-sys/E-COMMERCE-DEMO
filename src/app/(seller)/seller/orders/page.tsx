"use client";

import * as React from "react";
import { Package, Eye, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockOrders } from "@/data/mock-orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";

export default function SellerOrdersPage() {
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredOrders = statusFilter === "all" ? mockOrders : mockOrders.filter((o) => o.status === statusFilter);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Status pesanan diperbarui ke ${ORDER_STATUS_LABELS[newStatus as keyof typeof ORDER_STATUS_LABELS]}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Pesanan</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="PENDING">Menunggu</SelectItem>
            <SelectItem value="PROCESSING">Diproses</SelectItem>
            <SelectItem value="SHIPPED">Dikirim</SelectItem>
            <SelectItem value="DELIVERED">Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Pesanan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{order.items.length} item</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
                <TableCell><Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    {order.status === "PROCESSING" && (
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order.id, "SHIPPED")}>
                        <Truck className="h-4 w-4 mr-1" />Kirim
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
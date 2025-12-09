import { Package, ShoppingBag, DollarSign, Star, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/seller/stats-card";
import { SalesChart } from "@/components/seller/sales-chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const recentOrders = [
  { id: "ord-1", orderNumber: "SV-ABC123", customer: "John Doe", total: 2699000, status: "PENDING" },
  { id: "ord-2", orderNumber: "SV-DEF456", customer: "Jane Smith", total: 4999000, status: "PROCESSING" },
  { id: "ord-3", orderNumber: "SV-GHI789", customer: "Bob Wilson", total: 799000, status: "SHIPPED" },
];

const lowStockProducts = [
  { id: "prod-1", name: "iPhone 15 Pro Max", stock: 3 },
  { id: "prod-2", name: "Nike Air Jordan 1", stock: 5 },
];

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali!</p>
        </div>
        <Button asChild><Link href="/seller/products/new">Tambah Produk</Link></Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Pendapatan" value={formatPrice(26550000)} change={{ value: 12, type: "increase" }} icon={DollarSign} iconColor="text-green-500" />
        <StatsCard title="Total Pesanan" value="156" change={{ value: 8, type: "increase" }} icon={ShoppingBag} iconColor="text-blue-500" />
        <StatsCard title="Total Produk" value="24" icon={Package} iconColor="text-purple-500" />
        <StatsCard title="Rating Toko" value="4.8" icon={Star} iconColor="text-yellow-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><SalesChart /></div>
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Stok Menipis</h3>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-sm">{product.name}</span>
                <Badge variant="warning">Sisa {product.stock}</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" asChild><Link href="/seller/products">Kelola Stok</Link></Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Pesanan Terbaru</h3>
          <Button variant="ghost" size="sm" asChild><Link href="/seller/orders">Lihat Semua</Link></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium text-muted-foreground">No. Pesanan</th>
                <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                <th className="pb-3 font-medium text-muted-foreground">Total</th>
                <th className="pb-3 font-medium text-muted-foreground">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3 font-mono text-sm">{order.orderNumber}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 font-semibold">{formatPrice(order.total)}</td>
                  <td className="py-3"><Badge variant={order.status === "PENDING" ? "pending" : order.status === "PROCESSING" ? "processing" : "shipped"}>{order.status}</Badge></td>
                  <td className="py-3"><Button variant="ghost" size="sm">Detail</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
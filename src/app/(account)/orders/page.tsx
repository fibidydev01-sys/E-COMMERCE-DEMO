"use client";

import * as React from "react";
import { Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderCard } from "@/components/order/order-card";
import { EmptyState } from "@/components/shared/empty-state";
import { mockOrders } from "@/data/mock-orders";

const tabs = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "processing", label: "Diproses" },
  { value: "shipped", label: "Dikirim" },
  { value: "delivered", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredOrders = activeTab === "all"
    ? mockOrders
    : mockOrders.filter((o) => o.status.toLowerCase() === activeTab || (activeTab === "pending" && ["PENDING", "CONFIRMED"].includes(o.status)));

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-heading font-bold mb-6">Pesanan Saya</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-6 overflow-x-auto">
          {tabs.map((tab) => <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>)}
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredOrders.length === 0 ? (
            <EmptyState icon={Package} title="Belum ada pesanan" description="Pesanan kamu akan muncul di sini" />
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
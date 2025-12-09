import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "DELIVERED": return "delivered";
      case "CANCELLED":
      case "REFUNDED": return "cancelled";
      case "SHIPPED": return "shipped";
      case "PROCESSING": return "processing";
      default: return "pending";
    }
  };

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
          <p className="font-mono text-sm">{order.orderNumber}</p>
        </div>
        <Badge variant={getStatusVariant(order.status)}>{statusLabel}</Badge>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded-lg bg-muted shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium line-clamp-1">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.quantity} x {formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-muted-foreground">+{order.items.length - 2} produk lainnya</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total Pesanan</p>
          <p className="font-semibold text-primary">{formatPrice(order.total)}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/orders/${order.id}`}>Detail <ChevronRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>
    </div>
  );
}
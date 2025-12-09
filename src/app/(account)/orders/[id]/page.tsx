"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  MapPin,
  CreditCard,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderTimeline } from "@/components/order/order-timeline";
import { mockOrders } from "@/data/mock-orders";
import { mockAddresses } from "@/data/mock-addresses";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/constants";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

function OrderDetailContent({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const order = mockOrders.find(
    (o) => o.id === orderId || o.orderNumber === orderId
  );

  if (!order) {
    return <div className="flex-1 text-center py-12">Pesanan tidak ditemukan</div>;
  }

  const address = mockAddresses.find((a) => a.id === order.addressId);
  const statusLabel = ORDER_STATUS_LABELS[order.status];

  return (
    <div className="flex-1 space-y-6">
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">
              Pesanan Berhasil Dibuat!
            </p>
            <p className="text-sm text-green-700">
              Silakan lakukan pembayaran sesuai metode yang dipilih.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">No. Pesanan</p>
          <p className="font-mono font-semibold">{order.orderNumber}</p>
        </div>
        <Badge
          variant={
            order.status === "DELIVERED"
              ? "delivered"
              : order.status === "CANCELLED"
                ? "cancelled"
                : order.status === "SHIPPED"
                  ? "shipped"
                  : order.status === "PROCESSING"
                    ? "processing"
                    : "pending"
          }
        >
          {statusLabel}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Status Pesanan</h3>
          <OrderTimeline
            status={order.status}
            createdAt={order.createdAt}
            shippedAt={order.shippedAt}
            deliveredAt={order.deliveredAt}
            cancelledAt={order.cancelledAt}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Alamat Pengiriman</span>
            </div>
            {address && (
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {address.recipient}
                </p>
                <p>{address.phone}</p>
                <p>
                  {address.street}, {address.city}, {address.province}{" "}
                  {address.postalCode}
                </p>
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl border p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Pembayaran</span>
            </div>
            <p className="text-sm">
              {PAYMENT_METHOD_LABELS[order.paymentMethod]}
            </p>
            <Badge
              variant={order.paymentStatus === "PAID" ? "delivered" : "pending"}
              className="mt-1"
            >
              {order.paymentStatus === "PAID"
                ? "Sudah Dibayar"
                : "Menunggu Pembayaran"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Produk Dipesan</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-muted shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>
              <p className="font-semibold">{formatPrice(item.subtotal)}</p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ongkos Kirim</span>
            <span>
              {order.shippingCost === 0 ? (
                <span className="text-green-600">Gratis</span>
              ) : (
                formatPrice(order.shippingCost)
              )}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {order.status === "PENDING" && order.paymentStatus === "PENDING" && (
          <Button>Bayar Sekarang</Button>
        )}
        {order.status === "DELIVERED" && <Button>Beri Ulasan</Button>}
        <Button variant="outline">
          <MessageCircle className="h-4 w-4 mr-2" />
          Hubungi Penjual
        </Button>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Cetak Invoice
        </Button>
      </div>
    </div>
  );
}

function OrderDetailSkeleton() {
  return (
    <div className="flex-1 space-y-6">
      <Skeleton className="h-20 w-full" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <div className="space-y-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    </div>
  );
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent orderId={id} />
    </Suspense>
  );
}
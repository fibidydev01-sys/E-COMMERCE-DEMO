import { Check, Clock, Package, Truck, Home, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { formatDate } from "@/lib/utils";

interface TimelineItem {
  status: OrderStatus;
  label: string;
  icon: typeof Check;
  date?: string;
}

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
}

export function OrderTimeline({ status, createdAt, shippedAt, deliveredAt, cancelledAt }: OrderTimelineProps) {
  const isCancelled = status === "CANCELLED" || status === "REFUNDED";

  const steps: TimelineItem[] = isCancelled
    ? [
      { status: "PENDING", label: "Pesanan Dibuat", icon: Clock, date: createdAt },
      { status: "CANCELLED", label: status === "REFUNDED" ? "Dikembalikan" : "Dibatalkan", icon: X, date: cancelledAt || undefined },
    ]
    : [
      { status: "PENDING", label: "Pesanan Dibuat", icon: Clock, date: createdAt },
      { status: "CONFIRMED", label: "Dikonfirmasi", icon: Check },
      { status: "PROCESSING", label: "Diproses", icon: Package },
      { status: "SHIPPED", label: "Dikirim", icon: Truck, date: shippedAt || undefined },
      { status: "DELIVERED", label: "Diterima", icon: Home, date: deliveredAt || undefined },
    ];

  const statusOrder = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];
  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="relative">
      {steps.map((step, index) => {
        const isCompleted = isCancelled ? index <= 1 : currentIndex >= statusOrder.indexOf(step.status);
        const isCurrent = step.status === status;

        return (
          <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isCompleted ? (isCancelled && index === 1 ? "bg-red-500" : "bg-primary") : "bg-muted",
                isCurrent && "ring-4 ring-primary/20"
              )}>
                <step.icon className={cn("h-5 w-5", isCompleted ? "text-white" : "text-muted-foreground")} />
              </div>
              {index < steps.length - 1 && (
                <div className={cn("w-0.5 flex-1 my-2", isCompleted ? "bg-primary" : "bg-muted")} />
              )}
            </div>
            <div className="pt-2">
              <p className={cn("font-medium", isCompleted ? "text-foreground" : "text-muted-foreground")}>{step.label}</p>
              {step.date && <p className="text-sm text-muted-foreground">{formatDate(step.date)}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
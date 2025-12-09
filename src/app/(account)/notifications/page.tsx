"use client";

import * as React from "react";
import {
  Bell,
  Package,
  CreditCard,
  Truck,
  Tag,
  Settings,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useNotificationStore } from "@/stores/notification-store";
import { formatDate, cn } from "@/lib/utils";
import { Notification } from "@/types";

const typeIcons: Record<Notification["type"], React.ElementType> = {
  ORDER: Package,
  PAYMENT: CreditCard,
  SHIPPING: Truck,
  PROMO: Tag,
  SYSTEM: Settings,
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Notifikasi</h1>
        {notifications.length > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Tidak ada notifikasi"
          description="Notifikasi akan muncul di sini"
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = typeIcons[notif.type] || Bell;
            const isUnread = !notif.isRead;

            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "flex gap-4 p-4 rounded-xl cursor-pointer transition-colors",
                  isUnread
                    ? "bg-primary/5 border border-primary/20"
                    : "bg-card"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full",
                    isUnread ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isUnread ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <p className={cn("font-medium", isUnread && "text-primary")}>
                    {notif.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
                {isUnread && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
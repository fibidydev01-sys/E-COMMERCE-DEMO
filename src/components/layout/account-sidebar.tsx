"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, MapPin, Heart, Bell, Settings, CreditCard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const menuItems = [
  {
    label: "Akun Saya",
    items: [
      { href: ROUTES.PROFILE, label: "Profil", icon: User },
      { href: ROUTES.ADDRESSES, label: "Alamat", icon: MapPin },
      { href: "/settings/payment", label: "Pembayaran", icon: CreditCard },
    ],
  },
  {
    label: "Aktivitas",
    items: [
      { href: ROUTES.ORDERS, label: "Pesanan", icon: Package },
      { href: ROUTES.WISHLIST, label: "Wishlist", icon: Heart },
      { href: ROUTES.NOTIFICATIONS, label: "Notifikasi", icon: Bell },
    ],
  },
  {
    label: "Pengaturan",
    items: [{ href: "/settings", label: "Pengaturan", icon: Settings }],
  },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card rounded-xl border p-6 sticky top-24">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user?.avatar || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {getInitials(user?.name || "User")}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="font-semibold truncate">{user?.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Navigation */}
        <nav className="space-y-6">
          {menuItems.map((section) => (
            <div key={section.label}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <Separator className="my-4" />

        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Keluar
        </Button>
      </div>
    </aside>
  );
}

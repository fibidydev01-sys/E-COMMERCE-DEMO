"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, Ticket, Star, BarChart3, Settings, Store, ChevronLeft, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

const menuItems = [
  { href: ROUTES.SELLER.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.SELLER.PRODUCTS, label: "Produk", icon: Package, badge: "12" },
  { href: ROUTES.SELLER.ORDERS, label: "Pesanan", icon: ShoppingBag, badge: "5" },
  { href: ROUTES.SELLER.COUPONS, label: "Kupon", icon: Ticket },
  { href: ROUTES.SELLER.REVIEWS, label: "Ulasan", icon: Star, badge: "3" },
  { href: ROUTES.SELLER.ANALYTICS, label: "Analitik", icon: BarChart3 },
  { href: ROUTES.SELLER.SETTINGS, label: "Pengaturan Toko", icon: Settings },
];

interface SellerSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function SellerSidebar({ collapsed = false, onCollapse }: SellerSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "bg-card border-r h-screen sticky top-0 flex flex-col transition-all duration-300",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && <Logo size="sm" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse?.(!collapsed)}
          className={cn(collapsed && "mx-auto")}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {!collapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate">Toko Saya</p>
              <Badge variant="verified" className="mt-1">Terverifikasi</Badge>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative group",
                isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          {!collapsed && <span>Kembali ke Toko</span>}
        </Link>
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Store, FolderTree, ShoppingBag, Image, Ticket, Settings, ChevronLeft, Menu, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const menuItems = [
  { href: ROUTES.ADMIN.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.ADMIN.USERS, label: "Pengguna", icon: Users },
  { href: ROUTES.ADMIN.STORES, label: "Toko", icon: Store },
  { href: ROUTES.ADMIN.CATEGORIES, label: "Kategori", icon: FolderTree },
  { href: ROUTES.ADMIN.ORDERS, label: "Pesanan", icon: ShoppingBag },
  { href: ROUTES.ADMIN.BANNERS, label: "Banner", icon: Image },
  { href: ROUTES.ADMIN.COUPONS, label: "Kupon", icon: Ticket },
  { href: ROUTES.ADMIN.SETTINGS, label: "Pengaturan", icon: Settings },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function AdminSidebar({ collapsed = false, onCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "bg-slate-900 text-white h-screen sticky top-0 flex flex-col transition-all duration-300",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold">Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse?.(!collapsed)}
          className={cn("text-white hover:bg-slate-800", collapsed && "mx-auto")}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative group",
                isActive ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-700 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          {!collapsed && <span>Kembali ke Website</span>}
        </Link>
      </div>
    </aside>
  );
}
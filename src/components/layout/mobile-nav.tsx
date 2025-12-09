"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: ROUTES.SEARCH, label: "Cari", icon: Search },
  { href: ROUTES.CART, label: "Keranjang", icon: ShoppingCart, showBadge: true },
  { href: ROUTES.WISHLIST, label: "Wishlist", icon: Heart },
  { href: ROUTES.PROFILE, label: "Akun", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.showBadge && cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
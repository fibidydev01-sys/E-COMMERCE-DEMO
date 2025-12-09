"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Store,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/ui/container";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

const navLinks = [
  { href: "/categories", label: "Kategori" },
  { href: "/products", label: "Produk" },
  { href: "/stores", label: "Toko" },
];

export function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-background"
      )}
    >
      <Container>
        {/* Top Bar - Desktop */}
        <div className="hidden lg:flex items-center justify-between py-2 text-sm border-b">
          <p className="text-muted-foreground">
            🎉 Gratis Ongkir untuk pembelian di atas Rp 100.000
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/seller/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mulai Berjualan
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="/help"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Bantuan
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <Logo size="sm" />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Logo className="flex-shrink-0" />

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Cari produk, toko, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-11 rounded-full bg-muted/50 border-0 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href={ROUTES.WISHLIST}>
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href={ROUTES.CART}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary-500 text-white text-xs flex items-center justify-center font-semibold">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Notifications */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href={ROUTES.NOTIFICATIONS}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                </Link>
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block text-sm font-medium max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.PROFILE}>
                      <User className="mr-2 h-4 w-4" />
                      Profil Saya
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.ORDERS}>
                      <Package className="mr-2 h-4 w-4" />
                      Pesanan Saya
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.WISHLIST}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "SELLER" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.SELLER.DASHBOARD}>
                          <Store className="mr-2 h-4 w-4" />
                          Toko Saya
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.ADMIN.DASHBOARD}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Pengaturan
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={ROUTES.LOGIN}>Masuk</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={ROUTES.REGISTER}>Daftar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
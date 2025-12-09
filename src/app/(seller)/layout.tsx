"use client";

import * as React from "react";
import { SellerSidebar } from "@/components/layout/seller-sidebar";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-muted/30">
      <SellerSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
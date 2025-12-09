"use client";

import * as React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex">
      <AdminSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <main className="flex-1 p-6 bg-muted/30 overflow-auto">{children}</main>
    </div>
  );
}
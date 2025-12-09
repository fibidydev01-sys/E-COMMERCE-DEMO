import { Users, Store, ShoppingBag, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: typeof Users;
  trend: "up" | "down";
}

function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-700 rounded-lg"><Icon className="h-5 w-5 text-slate-300" /></div>
        <div className={cn("flex items-center gap-1 text-sm", trend === "up" ? "text-green-400" : "text-red-400")}>
          {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {change}%
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

export function AdminStats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Users" value="12,458" change={12} icon={Users} trend="up" />
      <StatCard title="Total Stores" value="1,234" change={8} icon={Store} trend="up" />
      <StatCard title="Total Orders" value="45,678" change={-3} icon={ShoppingBag} trend="down" />
      <StatCard title="Revenue" value={formatPrice(1250000000)} change={15} icon={DollarSign} trend="up" />
    </div>
  );
}
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: { value: number; type: "increase" | "decrease" };
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, change, icon: Icon, iconColor = "text-primary" }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className={cn("p-2 rounded-lg bg-primary/10", iconColor.replace("text-", "bg-").replace("500", "100"))}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {change && (
        <p className={cn("text-sm mt-2", change.type === "increase" ? "text-green-600" : "text-red-600")}>
          {change.type === "increase" ? "↑" : "↓"} {Math.abs(change.value)}% dari bulan lalu
        </p>
      )}
    </div>
  );
}
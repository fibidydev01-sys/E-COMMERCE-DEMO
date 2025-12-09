import { cn } from "@/lib/utils";

interface StockIndicatorProps {
  stock: number;
  threshold?: number;
  showCount?: boolean;
  className?: string;
}

export function StockIndicator({
  stock,
  threshold = 10,
  showCount = false,
  className,
}: StockIndicatorProps) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= threshold;
  const isInStock = stock > threshold;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex h-2 w-2 rounded-full",
          isOutOfStock && "bg-red-500",
          isLowStock && "bg-yellow-500",
          isInStock && "bg-green-500"
        )}
      />
      <span
        className={cn(
          "text-sm",
          isOutOfStock && "text-red-600",
          isLowStock && "text-yellow-600",
          isInStock && "text-green-600"
        )}
      >
        {isOutOfStock
          ? "Stok Habis"
          : isLowStock
            ? showCount
              ? `Sisa ${stock} item`
              : "Stok Terbatas"
            : showCount
              ? `${stock} tersedia`
              : "Tersedia"}
      </span>
    </div>
  );
}
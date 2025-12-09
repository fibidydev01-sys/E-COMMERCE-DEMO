import { cn, formatPrice } from "@/lib/utils";

export interface PriceProps {
  price: number;
  originalPrice?: number | null;
  comparePrice?: number | null;
  discount?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Price({
  price,
  originalPrice,
  comparePrice,
  discount,
  size = "md",
  className,
}: PriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl md:text-3xl",
  };

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const displayOriginalPrice = originalPrice ?? comparePrice;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className={cn("font-bold text-primary", sizeClasses[size])}>
        {formatPrice(price)}
      </span>
      {displayOriginalPrice && displayOriginalPrice > price && (
        <span
          className={cn(
            "text-muted-foreground line-through",
            originalSizeClasses[size]
          )}
        >
          {formatPrice(displayOriginalPrice)}
        </span>
      )}
      {discount && discount > 0 && (
        <span
          className={cn(
            "bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-medium",
            originalSizeClasses[size]
          )}
        >
          -{discount}%
        </span>
      )}
    </div>
  );
}
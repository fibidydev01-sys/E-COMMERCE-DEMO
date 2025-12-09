"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;
          const isHalfFilled =
            !isFilled && starValue - 0.5 <= displayValue;

          return (
            <button
              key={index}
              type="button"
              className={cn(
                "relative transition-transform",
                interactive && "hover:scale-110 cursor-pointer",
                !interactive && "cursor-default"
              )}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverValue(starValue)}
              onMouseLeave={() => interactive && setHoverValue(null)}
              disabled={!interactive}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors",
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : isHalfFilled
                      ? "fill-yellow-400/50 text-yellow-400"
                      : "fill-transparent text-gray-300"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
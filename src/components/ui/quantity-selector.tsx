"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    button: "h-7 w-7",
    input: "h-7 w-10 text-sm",
    icon: "h-3 w-3",
  },
  md: {
    button: "h-9 w-9",
    input: "h-9 w-14 text-base",
    icon: "h-4 w-4",
  },
  lg: {
    button: "h-11 w-11",
    input: "h-11 w-16 text-lg",
    icon: "h-5 w-5",
  },
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const config = sizeConfig[size];

  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(config.button, "rounded-r-none")}
        onClick={decrease}
        disabled={disabled || value <= min}
      >
        <Minus className={config.icon} />
      </Button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className={cn(
          config.input,
          "border-y border-input bg-background text-center font-mono focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        )}
        min={min}
        max={max}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(config.button, "rounded-l-none")}
        onClick={increase}
        disabled={disabled || value >= max}
      >
        <Plus className={config.icon} />
      </Button>
    </div>
  );
}
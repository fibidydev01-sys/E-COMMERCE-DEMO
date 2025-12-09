import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: "h-6 w-6",
    text: "text-lg",
  },
  md: {
    icon: "h-8 w-8",
    text: "text-xl",
  },
  lg: {
    icon: "h-10 w-10",
    text: "text-2xl",
  },
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 hover:opacity-90 transition-opacity", className)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-primary-700 text-white p-2 rounded-xl">
          <ShoppingBag className={config.icon} />
        </div>
      </div>
      {showText && (
        <span className={cn("font-heading font-bold text-primary-700", config.text)}>
          ShopVerse
        </span>
      )}
    </Link>
  );
}

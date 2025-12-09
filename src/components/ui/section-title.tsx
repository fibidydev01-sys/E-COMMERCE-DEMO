import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  action?: React.ReactNode;
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  className,
  action,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 mb-6",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        action && "sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="mt-2 sm:mt-0">{action}</div>}
    </div>
  );
}
import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
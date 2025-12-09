import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export function FeaturedProducts({
  products,
  title = "Produk Unggulan",
  subtitle = "Pilihan terbaik untuk kamu",
  viewAllLink = "/products?featured=true",
}: FeaturedProductsProps) {
  return (
    <section>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        action={
          <Button variant="ghost" asChild>
            <Link href={viewAllLink}>
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
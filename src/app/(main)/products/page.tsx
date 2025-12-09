"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { SortDropdown } from "@/components/search/sort-dropdown";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Package } from "lucide-react";
import { mockProducts } from "@/data/mock-products";
import { useFilterStore } from "@/stores/filter-store";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const { category, priceRange, rating, inStock, sortBy } = useFilterStore();

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams, category, priceRange, rating, inStock, sortBy]);

  // Filter products
  let filteredProducts = [...mockProducts];

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.categoryId === category);
  }
  if (priceRange[0] > 0 || priceRange[1] < 50000000) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }
  if (rating) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= rating);
  }
  if (inStock) {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  }

  // Sort
  switch (sortBy) {
    case "price_asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold">Semua Produk</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} produk ditemukan
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SortDropdown />
          </div>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Tidak ada produk"
            description="Coba ubah filter atau kata kunci pencarian"
          />
        ) : (
          <>
            <ProductGrid products={filteredProducts} columns={4} />
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Container className="py-6">
      <Breadcrumbs items={[{ label: "Produk" }]} className="mb-6" />
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <ProductsContent />
      </Suspense>
    </Container>
  );
}
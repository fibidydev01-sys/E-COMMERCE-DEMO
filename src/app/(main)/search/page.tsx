"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { SortDropdown } from "@/components/search/sort-dropdown";
import { EmptyState } from "@/components/shared/empty-state";
import { mockProducts } from "@/data/mock-products";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">
          Hasil pencarian &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} produk ditemukan
        </p>
      </div>

      <div className="flex gap-6">
        <FilterSidebar />
        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <SortDropdown />
          </div>
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Tidak ditemukan"
              description={`Tidak ada produk yang cocok dengan "${query}"`}
            />
          ) : (
            <ProductGrid products={filteredProducts} columns={4} />
          )}
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Container className="py-6">
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <SearchContent />
      </Suspense>
    </Container>
  );
}
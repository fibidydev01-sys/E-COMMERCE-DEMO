"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Rating } from "@/components/ui/rating";
import { useFilterStore } from "@/stores/filter-store";
import { mockCategories } from "@/data/mock-categories";
import { formatPrice } from "@/lib/utils";

// FilterContent as a separate component that receives props
interface FilterContentProps {
  category: string | null;
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRating: (rating: number | null) => void;
  setInStock: (inStock: boolean) => void;
  resetFilters: () => void;
}

function FilterContent({
  category,
  priceRange,
  rating,
  inStock,
  setCategory,
  setPriceRange,
  setRating,
  setInStock,
  resetFilters,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filter</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "rating"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Kategori</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {mockCategories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox id={cat.id} checked={category === cat.id} onCheckedChange={(checked) => setCategory(checked ? cat.id : null)} />
                  <Label htmlFor={cat.id} className="text-sm font-normal cursor-pointer flex-1">
                    {cat.name}
                    <span className="text-muted-foreground ml-1">({cat.productCount})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Harga</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={50000000} step={100000} onValueChange={(value) => setPriceRange(value as [number, number])} />
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${r}`} checked={rating === r} onCheckedChange={(checked) => setRating(checked ? r : null)} />
                  <Label htmlFor={`rating-${r}`} className="flex items-center gap-1 cursor-pointer">
                    <Rating value={r} size="sm" /> <span className="text-sm">& ke atas</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Ketersediaan</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="inStock" checked={inStock} onCheckedChange={(checked) => setInStock(checked as boolean)} />
              <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">Hanya yang tersedia</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function FilterSidebar() {
  const { category, priceRange, rating, inStock, setCategory, setPriceRange, setRating, setInStock, resetFilters } = useFilterStore();

  const filterProps = {
    category,
    priceRange,
    rating,
    inStock,
    setCategory,
    setPriceRange,
    setRating,
    setInStock,
    resetFilters,
  };

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border p-4">
          <FilterContent {...filterProps} />
        </div>
      </aside>

      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader><SheetTitle>Filter</SheetTitle></SheetHeader>
          <div className="mt-6"><FilterContent {...filterProps} /></div>
        </SheetContent>
      </Sheet>
    </>
  );
}
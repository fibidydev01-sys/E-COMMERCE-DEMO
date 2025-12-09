"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, History, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trendingSearches = ["iPhone 15", "Nike Air Jordan", "MacBook Pro", "Samsung Galaxy", "Dyson"];
const recentSearches = ["Laptop Gaming", "Sepatu Running"];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsFocused(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Cari produk, toko, atau kategori..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="pl-4 pr-12 h-11 rounded-full bg-muted/50 border-0"
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border shadow-lg z-50 p-4">
          {recentSearches.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Pencarian Terakhir</p>
              <div className="space-y-1">
                {recentSearches.map((term) => (
                  <button key={term} onClick={() => handleSearch(term)} className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors">
                    <History className="h-4 w-4 text-muted-foreground" />{term}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Trending</p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button key={term} onClick={() => handleSearch(term)} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors">
                  <TrendingUp className="h-3 w-3 text-orange-500" />{term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
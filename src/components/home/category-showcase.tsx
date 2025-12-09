"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/types";
import { SectionTitle } from "@/components/ui/section-title";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section>
      <SectionTitle
        title="Kategori Populer"
        subtitle="Temukan produk berdasarkan kategori favoritmu"
        action={<Link href="/categories" className="text-primary hover:underline text-sm font-medium">Lihat Semua</Link>}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Link href={`/categories/${category.slug}`} className="group block">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-3">
                {category.image && <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors line-clamp-1">{category.name}</h3>
              {category.productCount && <p className="text-xs text-muted-foreground text-center">{category.productCount.toLocaleString()} produk</p>}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
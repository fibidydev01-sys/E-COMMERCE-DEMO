"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Banner } from "@/types";

interface HeroBannerProps {
  banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <a href={banners[currentIndex].link || "#"}>
            <Image src={banners[currentIndex].image} alt={banners[currentIndex].title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">{banners[currentIndex].title}</h2>
              <Button size="lg" className="bg-white text-black hover:bg-white/90">Lihat Promo</Button>
            </div>
          </a>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn("w-2 h-2 rounded-full transition-all", index === currentIndex ? "w-8 bg-white" : "bg-white/50")}
          />
        ))}
      </div>
    </div>
  );
}
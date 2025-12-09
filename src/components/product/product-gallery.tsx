"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const goToPrevious = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setSelectedIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image src={images[selectedIndex]} alt={`${name} - ${selectedIndex + 1}`} fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <Image src={images[selectedIndex]} alt={name} width={1200} height={1200} className="w-full h-auto" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                index === selectedIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <Image src={image} alt={`${name} thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
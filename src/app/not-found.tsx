// app/not-found.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Construction, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Construction Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Construction className="h-32 w-32 text-orange-500" strokeWidth={1.5} />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold"
            >
              404
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4"
        >
          Halaman Dalam Pembangunan
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
        >
          Maaf, halaman yang Anda cari sedang dalam tahap pengembangan atau tidak ditemukan.
          Kami akan segera menyelesaikannya! 🚧
        </motion.p>

        {/* Construction Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Progress: 65%</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </Button>

          <Button size="lg" variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Halaman Sebelumnya
          </Button>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          <p>💡 Sementara itu, jelajahi produk-produk menarik kami!</p>
        </motion.div>
      </div>
    </div>
  );
}
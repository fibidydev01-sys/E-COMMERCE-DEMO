"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/seller/product-form";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Produk berhasil ditambahkan");
    router.push("/seller/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/seller/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-heading font-bold">Tambah Produk</h1>
      </div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
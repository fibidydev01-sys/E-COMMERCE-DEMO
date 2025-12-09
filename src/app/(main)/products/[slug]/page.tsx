import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductReviews } from "@/components/product/product-reviews";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts } from "@/data/mock-products";
import { mockCategories } from "@/data/mock-categories";
import { mockReviews } from "@/data/mock-reviews";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const category = mockCategories.find((c) => c.id === product.categoryId);
  const reviews = mockReviews.filter((r) => r.productId === product.id);
  const relatedProducts = mockProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <Container className="py-6">
      <Breadcrumbs items={[{ label: "Produk", href: "/products" }, { label: category?.name || "Kategori", href: `/categories/${category?.slug}` }, { label: product.name }]} className="mb-6" />

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={{ ...product, store: { id: "store-1", ownerId: "user-2", name: "TechStore Official", slug: "techstore-official", isVerified: true, isActive: true, rating: 4.8, ratingCount: 1250, createdAt: "", updatedAt: "" } }} />
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Deskripsi</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan ({reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <h3>Spesifikasi:</h3>
            <ul>
              <li>SKU: {product.sku}</li>
              <li>Berat: {product.weight}g</li>
              <li>Stok: {product.stock} unit</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ProductReviews product={product} reviews={reviews} />
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <FeaturedProducts products={relatedProducts} title="Produk Terkait" subtitle="Mungkin kamu juga suka" viewAllLink={`/categories/${category?.slug}`} />
      )}
    </Container>
  );
}
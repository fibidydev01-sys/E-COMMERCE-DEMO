import { Container } from "@/components/ui/container";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FlashDeals } from "@/components/home/flash-deals";
import { Newsletter } from "@/components/home/newsletter";
import { mockBanners } from "@/data/mock-banners";
import { mockCategories } from "@/data/mock-categories";
import { featuredProducts, newArrivals, bestSellers } from "@/data/mock-products";

export default function HomePage() {
  const flashDealEndTime = new Date();
  flashDealEndTime.setHours(flashDealEndTime.getHours() + 8);

  return (
    <div className="space-y-12 py-6">
      <Container>
        <HeroBanner banners={mockBanners} />
      </Container>

      <Container>
        <CategoryShowcase categories={mockCategories} />
      </Container>

      <Container>
        <FlashDeals products={bestSellers} endTime={flashDealEndTime} />
      </Container>

      <Container>
        <FeaturedProducts products={featuredProducts} title="Produk Unggulan" subtitle="Pilihan terbaik untuk kamu" />
      </Container>

      <Container>
        <FeaturedProducts products={newArrivals} title="Produk Terbaru" subtitle="Baru datang minggu ini" viewAllLink="/products?sort=newest" />
      </Container>

      <Container>
        <FeaturedProducts products={bestSellers} title="Terlaris" subtitle="Paling banyak dibeli" viewAllLink="/products?sort=bestseller" />
      </Container>

      <Container>
        <Newsletter />
      </Container>
    </div>
  );
}
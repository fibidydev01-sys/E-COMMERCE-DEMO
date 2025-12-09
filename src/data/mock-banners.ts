import { Banner } from "@/types";

export const mockBanners: Banner[] = [
  { id: "banner-1", title: "Flash Sale 12.12", image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=400&fit=crop", link: "/products?sale=true", isActive: true, sortOrder: 1 },
  { id: "banner-2", title: "New Year Collection", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop", link: "/categories/fashion", isActive: true, sortOrder: 2 },
  { id: "banner-3", title: "Tech Deals", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop", link: "/categories/elektronik", isActive: true, sortOrder: 3 },
];
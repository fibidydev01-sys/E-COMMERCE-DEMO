import { Category } from "@/types";

export const mockCategories: Category[] = [
  { id: "cat-1", parentId: null, name: "Elektronik", slug: "elektronik", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400", description: "Smartphone, laptop, dan perangkat elektronik", isActive: true, sortOrder: 1, productCount: 1250 },
  { id: "cat-2", parentId: null, name: "Fashion Pria", slug: "fashion-pria", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400", description: "Pakaian dan aksesoris pria", isActive: true, sortOrder: 2, productCount: 3400 },
  { id: "cat-3", parentId: null, name: "Fashion Wanita", slug: "fashion-wanita", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400", description: "Pakaian dan aksesoris wanita", isActive: true, sortOrder: 3, productCount: 4500 },
  { id: "cat-4", parentId: null, name: "Komputer", slug: "komputer-laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400", description: "Laptop, PC, dan aksesoris", isActive: true, sortOrder: 4, productCount: 890 },
  { id: "cat-5", parentId: null, name: "Rumah Tangga", slug: "rumah-tangga", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", description: "Peralatan rumah tangga", isActive: true, sortOrder: 5, productCount: 2100 },
  { id: "cat-6", parentId: null, name: "Kecantikan", slug: "kecantikan", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", description: "Skincare dan makeup", isActive: true, sortOrder: 6, productCount: 3200 },
  { id: "cat-7", parentId: null, name: "Olahraga", slug: "olahraga", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400", description: "Peralatan olahraga", isActive: true, sortOrder: 7, productCount: 1800 },
  { id: "cat-8", parentId: null, name: "Makanan", slug: "makanan-minuman", image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400", description: "Makanan dan minuman", isActive: true, sortOrder: 8, productCount: 5600 },
];
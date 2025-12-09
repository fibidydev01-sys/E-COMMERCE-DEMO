// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  phone?: string | null;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  originalPrice?: number | null;  // TAMBAH INI
  discount?: number | null;        // TAMBAH INI
  sku?: string | null;
  stock: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  isBestseller?: boolean;          // TAMBAH INI
  rating: number;
  ratingCount: number;
  soldCount: number;
  viewCount: number;
  weight?: number | null;
  createdAt: string;
  updatedAt: string;
  store?: Store;
  category?: Category;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  price?: number | null;
  stock: number;
  sku?: string | null;
  image?: string | null;
}

// Category Types
export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
  productCount?: number;
}

// Store Types
export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  isVerified: boolean;
  isActive: boolean;
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

// Address Types
export interface Address {
  id: string;
  userId: string;
  label: string;
  recipient: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  addressId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  couponCode?: string | null;
  notes?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  address?: Address;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  storeId: string;
  name: string;
  sku?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  status: OrderStatus;
  product?: Product;
  store?: Store;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentMethod = "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET" | "COD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  comment?: string | null;
  images: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
  product?: Product;
}

// Coupon Types
export interface Coupon {
  id: string;
  storeId?: string | null;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minPurchase?: number | null;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "ORDER" | "PAYMENT" | "SHIPPING" | "PROMO" | "SYSTEM";
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  isRead: boolean;
  createdAt: string;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string | null;
  isActive: boolean;
  sortOrder: number;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}
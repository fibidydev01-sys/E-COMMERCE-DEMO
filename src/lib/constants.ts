export const APP_NAME = "ShopVerse";
export const APP_DESCRIPTION = "Discover. Shop. Repeat.";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  STORES: "/stores",
  SEARCH: "/search",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  ADDRESSES: "/addresses",
  WISHLIST: "/wishlist",
  NOTIFICATIONS: "/notifications",
  SELLER: {
    DASHBOARD: "/seller/dashboard",
    PRODUCTS: "/seller/products",
    ORDERS: "/seller/orders",
    COUPONS: "/seller/coupons",
    REVIEWS: "/seller/reviews",
    ANALYTICS: "/seller/analytics",
    SETTINGS: "/seller/settings",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    STORES: "/admin/stores",
    CATEGORIES: "/admin/categories",
    ORDERS: "/admin/orders",
    BANNERS: "/admin/banners",
    COUPONS: "/admin/coupons",
    SETTINGS: "/admin/settings",
  },
} as const;

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu Konfirmasi",
  CONFIRMED: "Dikonfirmasi",
  PROCESSING: "Diproses",
  SHIPPED: "Dikirim",
  DELIVERED: "Selesai",
  CANCELLED: "Dibatalkan",
  REFUNDED: "Dikembalikan",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export const PAYMENT_METHODS = {
  BANK_TRANSFER: "BANK_TRANSFER",
  CREDIT_CARD: "CREDIT_CARD",
  E_WALLET: "E_WALLET",
  COD: "COD",
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "Transfer Bank",
  CREDIT_CARD: "Kartu Kredit",
  E_WALLET: "E-Wallet",
  COD: "Bayar di Tempat (COD)",
};

export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export const ITEMS_PER_PAGE = 12;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SORT_OPTIONS = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga: Rendah ke Tinggi", value: "price_asc" },
  { label: "Harga: Tinggi ke Rendah", value: "price_desc" },
  { label: "Terpopuler", value: "popular" },
  { label: "Rating Tertinggi", value: "rating" },
] as const;

export const PROVINCES = [
  "Aceh",
  "Bali",
  "Banten",
  "Bengkulu",
  "DI Yogyakarta",
  "DKI Jakarta",
  "Gorontalo",
  "Jambi",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Kalimantan Barat",
  "Kalimantan Selatan",
  "Kalimantan Tengah",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "Lampung",
  "Maluku",
  "Maluku Utara",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Papua",
  "Papua Barat",
  "Riau",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Sumatera Utara",
] as const;
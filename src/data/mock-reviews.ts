import { Review } from "@/types";

export const mockReviews: Review[] = [
  { id: "rev-1", userId: "user-1", productId: "prod-1", orderId: "ord-1", rating: 5, comment: "Produk sangat bagus! Pengiriman cepat dan packaging rapi.", images: [], isVerified: true, createdAt: "2024-01-20T00:00:00.000Z", updatedAt: "2024-01-20T00:00:00.000Z", user: { id: "user-1", email: "john@example.com", name: "John D.", avatar: null, role: "CUSTOMER", isVerified: true, createdAt: "", updatedAt: "" } },
  { id: "rev-2", userId: "user-4", productId: "prod-1", orderId: "ord-2", rating: 4, comment: "Kualitas sesuai harga. Recommended!", images: [], isVerified: true, createdAt: "2024-01-18T00:00:00.000Z", updatedAt: "2024-01-18T00:00:00.000Z", user: { id: "user-4", email: "jane@example.com", name: "Jane S.", avatar: null, role: "CUSTOMER", isVerified: true, createdAt: "", updatedAt: "" } },
];
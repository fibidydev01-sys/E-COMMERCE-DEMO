import { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "customer@example.com",
    name: "John Customer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    phone: "081234567890",
    role: "CUSTOMER",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "user-2",
    email: "seller@example.com",
    name: "Jane Seller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    phone: "081234567891",
    role: "SELLER",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "user-3",
    email: "admin@example.com",
    name: "Admin User",
    avatar: null,
    phone: "081234567892",
    role: "ADMIN",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").min(2, "Nama minimal 2 karakter"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(8, "Password minimal 8 karakter")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password harus mengandung huruf besar, huruf kecil, dan angka"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  phone: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, { message: "Anda harus menyetujui syarat dan ketentuan" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(1, "Password wajib diisi").min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").min(2, "Nama minimal 2 karakter"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi"),
  recipient: z.string().min(1, "Nama penerima wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  street: z.string().min(1, "Alamat lengkap wajib diisi"),
  city: z.string().min(1, "Kota wajib diisi"),
  province: z.string().min(1, "Provinsi wajib diisi"),
  postalCode: z.string().min(1, "Kode pos wajib diisi"),
  isDefault: z.boolean().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating wajib diisi").max(5),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  price: z.number().min(1, "Harga wajib diisi"),
  comparePrice: z.number().optional(),
  sku: z.string().optional(),
  stock: z.number().min(0, "Stok tidak boleh negatif"),
  weight: z.number().optional(),
  images: z.array(z.string()).min(1, "Minimal 1 gambar produk"),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ProductInput = z.infer<typeof productSchema>;
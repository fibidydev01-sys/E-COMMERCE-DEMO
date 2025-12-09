import { Address } from "@/types";

export const mockAddresses: Address[] = [
  { id: "addr-1", userId: "user-1", label: "Rumah", recipient: "John Doe", phone: "081234567890", street: "Jl. Sudirman No. 123, RT 01/RW 02, Kelurahan Menteng", city: "Jakarta Pusat", province: "DKI Jakarta", postalCode: "10310", country: "Indonesia", isDefault: true },
  { id: "addr-2", userId: "user-1", label: "Kantor", recipient: "John Doe", phone: "081234567891", street: "Jl. Gatot Subroto Kav. 42, Gedung ABC Lt. 5", city: "Jakarta Selatan", province: "DKI Jakarta", postalCode: "12930", country: "Indonesia", isDefault: false },
];
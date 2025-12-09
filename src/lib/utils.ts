import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  options: {
    currency?: "IDR" | "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "IDR", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    ...options,
  }).format(new Date(date));
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SV-${timestamp}-${random}`;
}

export function calculateDiscount(price: number, comparePrice: number) {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
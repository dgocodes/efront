// hooks/useCart.ts
"use client";
import { useCart as useCartFromContext } from "@/context/CartContext";

export function useCart() {
  return useCartFromContext();
}
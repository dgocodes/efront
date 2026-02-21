"use client";


import { useUI } from "@/context/UIContext";
import CartDrawer from "./CartDrawer";

export default function CartDrawerWrapper() {
  const { isCartOpen, closeCart } = useUI();

  // Só renderiza o CartDrawer se o estado for aberto
  return <CartDrawer isOpen={isCartOpen} onClose={closeCart} />;
}
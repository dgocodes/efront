"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-storage");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Suporta tanto o formato antigo do Zustand quanto o novo array puro
        const data = parsed.state?.items || (Array.isArray(parsed) ? parsed : []);
        setItems(data);
      } catch (e) {
        setItems([]);
      }
    }
  }, []);

  // FUNÇÃO: Adicionar ao carrinho
  const addToCart = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.skuId === product.skuId);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((i) =>
          i.skuId === product.skuId ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart-storage", JSON.stringify(newItems));
      return newItems;
    });
  };

  // FUNÇÃO: Atualizar quantidade (Aumentar/Diminuir no Drawer)
  const updateQuantity = (skuId: string, newQty: number) => {
    if (newQty < 1) return; // Evita quantidade zero ou negativa

    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.skuId === skuId ? { ...item, quantity: newQty } : item
      );
      localStorage.setItem("cart-storage", JSON.stringify(newItems));
      return newItems;
    });
  };

  // FUNÇÃO: Remover item
  const removeFromCart = (skuId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.skuId !== skuId);
      localStorage.setItem("cart-storage", JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart-storage");
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
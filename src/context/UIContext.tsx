"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Definimos a interface para o TypeScript
interface UIContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// 2. Criamos o contexto
const UIContext = createContext<UIContextType | undefined>(undefined);

// 3. Exportamos o Provider (O que o seu layout está procurando)
export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <UIContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </UIContext.Provider>
  );
}

// 4. Exportamos o Hook personalizado
export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI deve ser usado dentro de um UIProvider");
  }
  return context;
}
"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Check } from "lucide-react"; 
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Produto } from "@/types/Produto";

interface AddToCartProps {
  product: Produto;
  isLarge?: boolean; 
}

export default function ProductViewAddToCart({ product, isLarge = false }: AddToCartProps) {
  const { isAuthenticated, loading } = useAuth();
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  if (!mounted || loading || !isAuthenticated) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      skuId: product.id,
      name: product.nome,
      price: product.preco,
    });
    setIsAdded(true);
  };

  return (
    <div className={`${isLarge ? "mt-8" : "mt-5"} w-full`}> 
      {/* Container com margem superior para desgrudar do preço */}
      
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`
          w-full flex items-center justify-center gap-2 transition-all duration-300
          font-bold uppercase tracking-widest relative overflow-hidden
          ${isLarge ? "h-14 rounded-xl text-xs" : "h-11 rounded-lg text-[10px]"}
          ${isAdded 
            ? "bg-emerald-600 text-white shadow-none" 
            : "bg-slate-800 hover:bg-blue-700 text-white shadow-md active:scale-95"}
        `}
      >
        {isAdded ? (
          <>
            <Check size={isLarge ? 18 : 14} strokeWidth={3} className="animate-in zoom-in" />
            <span className="animate-in fade-in duration-300">
              {isLarge ? "ADICIONADO AO CARRINHO" : "ADICIONADO!"}
            </span>
          </>
        ) : (
          <>
            <ShoppingBag size={isLarge ? 18 : 14} strokeWidth={2.5} />
            <span>
              {isLarge ? "ADICIONAR AO CARRINHO" : "ADICIONAR"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
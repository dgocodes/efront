"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth"; // Sem as chaves
import { useCart } from "../../hooks/useCart";
import { Produto } from "../../types/Produto";




interface AddToCartButtonProps {
    product: Produto;
}

export default function AddToCartButton({ product }: { product: Produto }) {
  const router = useRouter();
  
  // 1. Chamada dos hooks (verifique se o caminho @/hooks/useAuth está correto)
  const auth = useAuth();
  const cart = useCart();

  // 2. Garantia de que os valores existem para evitar erro de "undefined" no render
  const isAuthenticated = auth?.isAuthenticated ?? false;
  const addToCart = cart?.addToCart;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated && addToCart) {
      addToCart({
        skuId: product.id,
        name: product.nome,
        price: product.preco,
      });
    } else {
      // Slugs amigáveis
      const safeName = product.nome?.toLowerCase().replace(/\s+/g, "-") || "produto";
      router.push(`/p/${product.id}/${safeName}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAction}
      className={`mt-5 w-full h-11 rounded-xl flex items-center justify-center text-[11px] font-black uppercase transition-all duration-200 ${
        isAuthenticated
          ? "bg-gray-900 text-white hover:bg-blue-600 shadow-md active:scale-95"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {isAuthenticated ? (
        <div className="flex items-center">
          <ShoppingCart size={14} className="mr-2" />
          <span>Adicionar</span>
        </div>
      ) : (
        <span>Ver Detalhes</span>
      )}
    </button>
  );
}
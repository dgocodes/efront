"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProductViewPrice({ preco }: { preco: number }) {
  const { isAuthenticated, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // useEffect só roda no cliente, garantindo que o mounted mude para true
  useEffect(() => {
    setMounted(true);
  }, []);

  // Se ainda não montou (está no servidor), renderiza um placeholder neutro
  // Isso evita que o servidor renderize "Faça login" e o cliente "R$ 44,90"
  if (!mounted || loading) {
    return <div className="h-7 w-24 bg-gray-100 animate-pulse rounded" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="py-1">
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">
          Login para ver preço
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xs font-bold text-blue-600">R$</span>
      <span className="text-xl font-black text-blue-600">
        {preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
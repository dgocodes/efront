"use client";

import React from "react";
import { LockKeyhole } from "lucide-react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProductPriceProps {
  preco: number | string;
}

export default function ProductViewPrice({ preco }: ProductPriceProps) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (isAuthenticated) {
    return (
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-bold text-blue-600">R$</span>
        <span className="text-xl font-black text-blue-600">
          {Number(preco).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    );
  }

  return (
    <div className="py-1">
      <a
        href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
        className="inline-flex items-center gap-1.5 text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-tight hover:bg-blue-100 transition-colors cursor-pointer"
      >
        <LockKeyhole size={10} />
        Preço sob consulta
      </a>
    </div>
  );
}
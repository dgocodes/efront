"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Facet } from "@/types/Produto";
import SearchFiltersSideBar from "../filters/SearchFiltersSideBar";

interface Props {
  facets: Facet[];
  activeFilters: string[];
}

export default function MobileFilters({ facets, activeFilters }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Impede o scroll do fundo quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* Botão Flutuante ou Fixo que abre o Filtro */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-xl shadow-sm font-bold text-gray-700 text-sm mb-4"
      >
        <Filter size={16} />
        Filtrar e Ordenar
        {activeFilters.length > 0 && (
          <span className="flex items-center justify-center bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full">
            {activeFilters.length}
          </span>
        )}
      </button>

      {/* Overlay e Modal */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Fundo escuro */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />

        {/* Conteúdo do Drawer (Sobe de baixo ou vem do lado) */}
        <div
          className={`absolute right-0 bottom-0 top-0 w-[90%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto`}
        >
          <SearchFiltersSideBar 
            facets={facets} 
            activeFilters={activeFilters} 
            onClose={() => setIsOpen(false)} 
          />
        </div>
      </div>
    </>
  );
}
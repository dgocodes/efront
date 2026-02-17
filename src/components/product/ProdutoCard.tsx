'use client';

import { useState } from 'react';
import { Item } from '@/types/Produto';
import { ShoppingCart, ArrowRight } from 'lucide-react'; // Instale lucide-react

export default function ProdutoCard({ produto }: { produto: Item }) {

  const CDN_URL = "https://cdn.jsdelivr.net/gh/dgocodes/images@master";


  const [imgSrc, setImgSrc] = useState(`${CDN_URL}/${produto.id}.jpg`);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-3 transition-all duration-300 hover:shadow-xl hover:border-blue-100 flex flex-col h-full">
      {/* Container da Imagem */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
        <img
          src={imgSrc}
          alt={produto.nome}
          className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgSrc('/placeholder.png')}
        />
        
        {/* Badge de Marca (Opcional) */}
        <span className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100">
          {produto.marca}
        </span>
      </div>

      {/* Informações */}
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-gray-800 text-sm font-medium leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {produto.nome}
        </h3>
        
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">A partir de</span>
            <span className="text-xl font-black text-gray-900">
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>

          {/* Botão de Ação Rápida */}
          <button className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
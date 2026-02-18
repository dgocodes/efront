'use client'

import { SearchResponse } from '@/types/Produto';
import ProdutoCard from './ProdutoCard';
import ProdutoCardSkeleton from './ProdutoCardSkeleton';

export default function ProdutoList({ data, loading }: { data: SearchResponse | null, loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {[...Array(8)].map((_, i) => <ProdutoCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[40px] shadow-sm border border-gray-100">
        <span className="text-4xl mb-4 opacity-20">📦</span>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nenhum produto por aqui</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {data.items.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import Filters from '@/components/filters/Filters';
import ProdutoCard from '@/components/product/ProdutoCard';
import ProdutoCardSkeleton from '@/components/product/ProdutoCardSkeleton';
import { SearchResponse } from '@/types/Produto';

interface ProdutoListProps {
  data: SearchResponse | null;
  title?: string;
  loading?: boolean;
  children?: React.ReactNode; 
}
export default function ProdutoList({ data, title, loading, children }: ProdutoListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtém o valor de ordenação atual da URL ou define 'relevancia' como padrão
  const currentSort = searchParams.get('sort') || 'relevancia';

  // Função para atualizar a URL com o novo parâmetro de ordenação
  const handleSortChange = (novoValor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (novoValor === 'relevancia') {
      params.delete('sort');
    } else {
      params.set('sort', novoValor);
    }

    // Empurra a nova URL. O useEffect na page.tsx detectará a mudança e chamará a API
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* BARRA LATERAL (FILTROS) */}
      <aside className="w-72 flex-shrink-0 hidden lg:block">
        {loading || !data ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded w-full" />
            ))}
          </div>
        ) : (
          <Filters filtros={data.facets} />
        )}
      </aside>

      {/* ÁREA PRINCIPAL DOS PRODUTOS */}
      <div className="flex-1">
        {/* CABEÇALHO: Título e Ordenação */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
              {title || "Produtos"}
            </h2>
            {!loading && data && (
              <p className="text-xs text-gray-400 font-bold mt-1 tracking-wider uppercase">
                {data.totalCount} produtos encontrados
              </p>
            )}
          </div>

          {/* SELECT DE ORDENAÇÃO */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Ordenar por
            </span>
            <select 
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-50 border-none text-sm font-bold rounded-xl px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-600 cursor-pointer outline-none transition-all hover:bg-gray-100 shadow-sm"
            >
              <option value="relevancia">Destaques</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="mais-vendidos">Mais Vendidos</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {loading ? (
            // Exibe Skeletons enquanto carrega
            Array.from({ length: 6 }).map((_, i) => (
              <ProdutoCardSkeleton key={i} />
            ))
          ) : data && data.items.length > 0 ? (
            // Exibe os produtos reais
            data.items.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))
          ) : (
            // Estado vazio (Empty State)
            <div className="col-span-full text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <div className="text-5xl mb-4">🔍</div>
               <h3 className="text-lg font-bold text-gray-800">Nenhum resultado encontrado</h3>
               <p className="text-gray-500 text-sm mt-1">Tente ajustar seus filtros ou termos de busca.</p>
            </div>
          )}

          {/* PAGINAÇÃO APARECE AQUI */}
        {!loading && data && data.totalCount > 1 && (
          <div className="mt-12 border-t border-gray-100 pt-6">
            {children}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
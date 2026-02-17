'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { getProdutos } from '@/lib/api';
import ProductListing from '@/components/product/ProdutoList';
import { SearchResponse } from '@/types/Produto';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const searchTerm = searchParams.get('query') || '';

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);

      // Dentro do seu useEffect na page.tsx
      const slugs = params.slug as string[] || [];

      // 1. Pegamos os outros filtros da URL (marcas, tags, etc)
      const otherFilters = Object.fromEntries(searchParams.entries());

      // 2. Montamos o objeto garantindo que 'categoria' seja o array de slugs
      const paramsObj = {
        ...otherFilters,
        categoria: slugs.length > 0 ? slugs : undefined
      };

      try {
        const resultado = await getProdutos(paramsObj);
        setData(resultado);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }

    carregarDados();
  }, [searchParams, params.slug]);

  const getTitle = () => {
    const slugs = params.slug as string[] || [];

    if (searchTerm) {
      return `Você buscou por "${searchTerm}"`;
    }

    if (slugs.length > 0) {
      const nomeCategoria = decodeURIComponent(slugs[slugs.length - 1]);
      return nomeCategoria.charAt(0).toUpperCase() + nomeCategoria.slice(1).replace(/-/g, ' ');
    }

    return "Todos os Produtos";
  };

  return (
    <main className="container mx-auto p-6 md:p-10">
      <ProductListing
        data={data}
        loading={loading}
        title={getTitle()}
      />
    </main>
  );
}
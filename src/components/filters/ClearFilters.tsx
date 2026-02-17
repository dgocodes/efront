'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react'; // Instale lucide-react se não tiver

export default function ClearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

   const slugsAtuais = params.slug as string[] || [];

  // Só mostra o botão se houver algum filtro além da busca (q)
  const hasFilters = Array.from(searchParams.keys()).some(key => key !== 'query' && key !== 'sort') || slugsAtuais.length > 0;

  if (!hasFilters) return null;

  const handleClear = () => {
    const q = searchParams.get('query');
    params.slug = undefined; // Limpa os slugs da URL
    // Mantém apenas o termo de busca, remove marca, categoria, sort, etc.
    router.push(q ? `?query=${q}` : window.location.pathname);
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-100">
      <button
        onClick={handleClear}
        className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
      >
        <XCircle size={14} className="text-gray-300 group-hover:text-red-500 transition-colors" />
        Limpar Filtros
      </button>
    </div>
  );
}
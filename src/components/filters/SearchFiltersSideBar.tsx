"use client";

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react'; // Adicionei o X
import { Facet, FacetOption } from '@/types/Produto';

interface Props {
  facets: Facet[];
  activeFilters: string[];
  onClose?: () => void; // Prop nova para fechar o modal no mobile
}

export default function SearchFiltersSideBar({ facets, activeFilters, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [expanded, setExpanded] = useState<string[]>(facets.map(f => f.facet));

  const toggleExpanded = (facetName: string) => {
    setExpanded(prev => 
      prev.includes(facetName) ? prev.filter(i => i !== facetName) : [...prev, facetName]
    );
  };

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const filtersString = params.get('filters') || "";
    let currentFilters = filtersString ? filtersString.split('_') : [];

    if (currentFilters.includes(value)) {
      currentFilters = currentFilters.filter(f => f !== value);
    } else {
      currentFilters.push(value);
    }

    if (currentFilters.length > 0) {
      params.set('filters', currentFilters.join('_'));
    } else {
      params.delete('filters');
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Se estiver no mobile, você pode escolher fechar ou não. 
    // Geralmente em filtros de checkbox, deixamos aberto pro usuário marcar vários.
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('filters');
    // params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    if (onClose) onClose(); // Fecha ao limpar
  };

  const renderOption = (option: FacetOption, level: number = 0) => {
    const hasChildren = option.subLevels && option.subLevels.length > 0;
    const isChecked = activeFilters.includes(option.applyLink);

    return (
      <div key={option.applyLink} className="w-full">
        {hasChildren ? (
          <div className="mt-7 first:mt-0 mb-3">
            <span className="text-[11px] font-black text-gray-900 uppercase tracking-wider block mb-4">
              {option.description}
            </span>
            <div className="ml-1 pl-4 border-l border-gray-100 space-y-3.5">
              {option.subLevels.map(child => renderOption(child, level + 1))}
            </div>
          </div>
        ) : (
          <label className="flex items-center justify-between group cursor-pointer py-0.5">
            <div className="flex items-center gap-3">
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleFilterChange(option.applyLink)}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all shadow-sm"
                />
              <span className={`text-[13px] font-medium transition-colors ${isChecked ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {option.description}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-300">{option.quantity}</span>
          </label>
        )}
      </div>
    );
  };

  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between lg:mb-8">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          Filtros
        </h2>
        {/* Botão de fechar visível apenas se onClose existir (Mobile) */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-gray-500">
            <X size={24} />
          </button>
        )}
      </div>
      
      {facets?.map((facet) => {
        const isExpanded = expanded.includes(facet.facet);
        return (
          <div key={facet.facet} className="border-b border-gray-100 pb-6 last:border-0">
            <button onClick={() => toggleExpanded(facet.facet)} className="w-full flex items-center justify-between py-2">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{facet.facet}</h3>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[2000px] opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
              <div className="max-h-80 overflow-y-auto pr-2 space-y-3.5">
                {facet.options.map((option) => renderOption(option))}
              </div>
            </div>
          </div>
        );
      })}
      
      {activeFilters.length > 0 && (
        <button onClick={handleClearFilters} className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 rounded-xl border border-red-100">
          Limpar Filtros ({activeFilters.length})
        </button>
      )}

      {/* Botão de "Ver Resultados" apenas no mobile para fechar o drawer */}
      {onClose && (
         <button onClick={onClose} className="lg:hidden w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest mt-4">
            Ver Resultados
         </button>
      )}
    </aside>
  );
}
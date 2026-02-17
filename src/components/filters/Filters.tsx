'use client'

import { Facet } from '@/types/Produto';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import ClearFilters from './ClearFilters';
import FilterItem from './FilterItem';

export default function Filters({ filtros = [] }: { filtros: Facet[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  // O slug agora vem de b/[[...slug]], então é um array de strings
  const slugsAtuais = params.slug as string[] || [];
  const activeSlug = slugsAtuais.length > 0 ? slugsAtuais[slugsAtuais.length - 1] : null;

console.log('Filtros atuais:', filtros);

  // Separa o grupo de Categorias dos demais filtros (Marcas, Tags, etc)
  const grupoCategorias = filtros.find(f => f.facet === "Categorias");
  const outrosFiltros = filtros.filter(f => f.facet !== "Categorias");

  /**
   * Gerencia o clique em categorias e subcategorias
   * @param categorySlug - O slug da categoria clicada
   * @param isSubLevel - Se true, adiciona ao caminho atual. Se false, limpa e cria um novo.
   */
  const handleCategoryClick = (categorySlug: string, isSubLevel = false) => {
    const currentParams = [searchParams.toString()];
    let novoCaminho = '';

    if (isSubLevel) {
      // Adiciona a subcategoria ao caminho existente: /b/categoria/subcategoria
      novoCaminho = `/b/${slugsAtuais.join('/')}/${categorySlug}`;
    } else {
      // Inicia um novo caminho de categoria: /b/categoria
      novoCaminho = `/b/${categorySlug}`;
    }

console.log('Caminho antes de limpar:', currentParams);

    // Limpa barras duplicadas e navega mantendo os query params (?q=...)
    const urlFinal = `${novoCaminho.replace(/\/+/g, '/')}${currentParams ? `?${currentParams}` : ''}`;
    router.push(urlFinal);
  };

  const handleGenericFilterClick = (groupName: string, slug: string) => {
    const paramName = groupName.toLowerCase();
    const newParams = new URLSearchParams(searchParams.toString());

    if (newParams.get(paramName) === slug) {
      newParams.delete(paramName);
    } else {
      newParams.set(paramName, slug);
    }

    // Mantém a categoria atual na URL e só altera os Query Params
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block border-r pr-6">
      <div className="sticky top-4 space-y-8">
        <ClearFilters />

        {/* --- SEÇÃO DE CATEGORIAS --- */}
        {grupoCategorias && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              {grupoCategorias.facet}
            </h3>
            <div className="space-y-1">
              {grupoCategorias.options.map((cat) => (
                <div key={cat.applyLink} className="space-y-1">
                  <button
                    onClick={() => handleCategoryClick(cat.applyLink, false)}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                      activeSlug === cat.applyLink
                        ? 'bg-blue-600 text-white font-bold shadow-md'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cat.description}
                    <span className={`float-right text-[10px] ${
                      activeSlug === cat.applyLink ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {cat.quantity}
                    </span>
                  </button>

                  {/* Subcategorias (só aparecem se a categoria pai estiver no caminho) */}
                  {cat.subLevels && cat.subLevels.length > 0 && slugsAtuais.includes(cat.applyLink) && (
                    <div className="ml-4 space-y-1 border-l pl-2 border-gray-200">
                      {cat.subLevels.map(sub => (
                        <button
                          key={sub.applyLink}
                          onClick={() => handleCategoryClick(sub.applyLink, true)}
                          className={`w-full text-left p-1.5 text-xs transition-colors ${
                            activeSlug === sub.applyLink 
                              ? 'text-blue-600 font-bold' 
                              : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          {sub.description}
                          <span className="float-right text-[9px] text-gray-300">{sub.quantity}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- DEMAIS FILTROS (Marcas, etc) --- */}
        {outrosFiltros.map((grupo) => (
          <section key={grupo.facet}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              {grupo.facet}
            </h3>
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
              {grupo.options.map((opcao) => (
                <FilterItem
                  key={opcao.description}
                  id={`${grupo.facet}-${opcao.applyLink}`}
                  label={opcao.description}
                  count={opcao.quantity}
                  checked={searchParams.get(grupo.facet.toLowerCase()) === opcao.applyLink}
                  onChange={() => handleGenericFilterClick(grupo.facet, opcao.applyLink)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
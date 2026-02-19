import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import MobileFilters from "@/components/layout/MobileFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { getProdutos } from "@/lib/api";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // 1. Aguarda os parâmetros da URL
    const params = await searchParams;
    const query = (params.q as string) || '';
    const currentPage = Number(params.page) || 1;
    const currentSort = (params.sort as string) || 'mais-vendidos';

    // 2. TRATAMENTO DOS FILTROS (String com Underline _)
    const filtersRaw = params.filters;

    // Para o Componente de Sidebar (Checkbox): Precisa ser um Array
    const activeFilters = typeof filtersRaw === 'string'
        ? filtersRaw.split('_')
        : [];

    // 3. CHAMADA À API
    const response = await getProdutos({
        query: query,
        page: currentPage,
        sort: currentSort,
        limit: 20,
        filters: typeof filtersRaw === 'string' ? filtersRaw : undefined
    });

    // 4. Converte para objeto simples
    const sanitizedFacets = JSON.parse(JSON.stringify(response.facets || []));
    const sanitizedProducts = JSON.parse(JSON.stringify(response.items || []));

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Cabeçalho da Busca */}
            <div className="mb-8">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                    {query ? `Você buscou por "${query}"` : 'Explorar produtos'}
                </p>
            </div>

            {/* BOTÃO FILTRAR (Visível apenas no MOBILE) */}
            <div className="lg:hidden mb-6">
                <MobileFilters
                    facets={sanitizedFacets}
                    activeFilters={activeFilters}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* SIDEBAR (Visível apenas no DESKTOP) */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <SearchFiltersSideBar
                        facets={sanitizedFacets}
                        activeFilters={activeFilters}
                    />
                </aside>

                {/* GRID DE PRODUTOS */}
                <section className="flex-1">
                    {sanitizedProducts.length > 0 ? (
                        <ProductGrid
                            products={sanitizedProducts}
                            totalItems={response.totalCount}
                            showSort={true}
                            showTotal={true}
                            enabletitle={false}
                            title={""}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <span className="text-5xl mb-4">🔍</span>
                            <h2 className="text-xl font-bold text-gray-900">Nenhum produto encontrado</h2>
                            <p className="text-gray-500 text-center max-w-xs">
                                Tente buscar por termos mais genéricos ou remova os filtros aplicados.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
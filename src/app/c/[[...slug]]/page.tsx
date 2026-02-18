import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import MobileFilters from "@/components/layout/MobileFilters";
import ProductGrid from "@/components/product/ProductHomeGrid";
import { getProdutos } from "@/lib/api";
import Link from "next/link";
export default async function CategoriaPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const slugs = resolvedParams.slug || [];
    const categoriaSlug = slugs.join('/');
    const isLastLevel = slugs.length >= 2; // Define se é o último nível (ajuste se tiver 3 níveis)

    const filtersRaw = resolvedSearchParams.filters;
    const activeFilters = typeof filtersRaw === 'string' ? filtersRaw.split('_') : [];
    const currentSort = (resolvedSearchParams.sort as string) || 'mais-vendidos';
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const pageSize = 40;

    const response = await getProdutos({
        page: currentPage,
        limit: pageSize,
        sort: currentSort,
        filters: typeof filtersRaw === 'string' ? filtersRaw : undefined
    });

    const sanitizedFacets = JSON.parse(JSON.stringify(response.facets || []));
    const sanitizedProducts = JSON.parse(JSON.stringify(response.items || []));

    // LÓGICA DE EXIBIÇÃO DA FACETA DE CATEGORIA
    const finalFacets = sanitizedFacets.filter((f: any) => {
        if (f.facet.toLowerCase() === 'categoria') {
            // Só mantém a faceta de categoria se NÃO for o último nível
            return !isLastLevel;
        }
        return true;
    });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>

                    {slugs.map((s, index) => {
                        const routeTo = `/c/${slugs.slice(0, index + 1).join("/")}`;
                        const isLast = index === slugs.length - 1;

                        return (
                            <div key={routeTo} className="flex items-center gap-2">
                                <span className="text-gray-300 font-light">/</span>
                                {isLast ? (
                                    <span className="text-gray-900">{s.replace(/-/g, ' ')}</span>
                                ) : (
                                    <Link href={routeTo} className="hover:text-blue-600 transition-colors capitalize">
                                        {s.replace(/-/g, ' ')}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>              
       
            </div>

            {/* Filtros Mobile */}
            <div className="lg:hidden mb-6">
                <MobileFilters
                    facets={finalFacets}
                    activeFilters={activeFilters}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <SearchFiltersSideBar
                        facets={finalFacets}
                        activeFilters={activeFilters}
                    />
                </aside>

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
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                            <span className="text-5xl mb-4">📦</span>
                            <h2 className="text-xl font-bold text-gray-900">Nenhum produto</h2>
                            <p className="text-gray-500 mt-2">Remova os filtros para ver mais resultados.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
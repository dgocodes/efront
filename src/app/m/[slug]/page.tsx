// app/marca/[slug]/page.tsx

import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import BrandBanner from "@/components/layout/BrandBanner";
import ProductGrid from "@/components/product/ProductHomeGrid";
import { getProdutos } from "@/lib/api";

export default async function MarcaPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // 1. RESOLVENDO AS PROMISES
    const { slug: marcaNome } = await params;
    const resolvedSearchParams = await searchParams;

    // 2. TRATANDO OS FILTROS DA URL (Lógica do underline _)
    const filtersRaw = resolvedSearchParams.filters;
    
    // Se filtersRaw for string "foroni_caderno", vira ["foroni", "caderno"]
    // Se for undefined, vira []
    const activeFilters = typeof filtersRaw === 'string' 
        ? filtersRaw.split('_') 
        : [];

    const currentSort = (resolvedSearchParams.sort as string) || 'mais-vendidos';
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const pageSize = 40;

    // 3. CHAMADA À API
    // Passamos a string bruta de filtros para o service, que já sabe lidar com o split
    const response = await getProdutos({
        page: currentPage,
        limit: pageSize,
        sort: currentSort,
        filters: typeof filtersRaw === 'string' ? filtersRaw : undefined // Passa a string pro service
    });

    // 4. LIMPANDO OS DADOS (Plain Objects)
    // Dica: Se os dados vêm de um banco/API padrão, o JSON.parse/stringify resolve, 
    // mas certifique-se que o SearchResponse não tenha métodos de classe (functions) que se percam.
    const plainProducts = JSON.parse(JSON.stringify(response.items || []));
    const plainFacets = JSON.parse(JSON.stringify(response.facets || []));

    // Remove a faceta da própria marca, já que o usuário já está na página da marca
    const plainFacetsWithoutMarca = plainFacets.filter(
        (item: any) => item.facet.toLowerCase() !== 'marca'
    );

    // Cálculo para a paginação
    const totalPages = Math.ceil(response.totalCount / pageSize);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BrandBanner slug={marcaNome} />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* SIDEBAR DE FILTROS */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <SearchFiltersSideBar
                        facets={plainFacetsWithoutMarca ?? []}
                        activeFilters={activeFilters} // Agora passa o array limpo [ "foroni", "10-materias" ]
                    />
                </div>

                {/* GRID DE PRODUTOS */}
                <div className="flex-1">
                    <ProductGrid
                        products={plainProducts}
                        title={marcaNome}
                        sliceInitial={0}
                        sliceEnd={pageSize}
                        enabletitle={false}
                        showTotal={true}
                        totalItems={response.totalCount}
                        showSort={true}
                    />

                    {/* PAGINAÇÃO */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                                    Página {currentPage} de {totalPages}
                                </p>
                                {/* Aqui você pode inserir seu <Pagination /> component futuramente */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
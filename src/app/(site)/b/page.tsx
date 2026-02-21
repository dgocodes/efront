import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import MobileFilters from "@/components/layout/MobileFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { productService } from "@/lib/productService";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = (params.q as string) || "";
  const currentPage = Number(params.page) || 1;
  const currentSort = (params.sort as string) || "mais-vendidos";
  const filtersRaw = params.filters;

  const activeFilters =
    typeof filtersRaw === "string" ? filtersRaw.split("_") : [];

  const response = await productService.getProdutos({
    query: query,
    page: currentPage,
    sort: currentSort,
    limit: 20,
    filters: typeof filtersRaw === "string" ? filtersRaw : undefined,
  });

  const sanitizedFacets = JSON.parse(JSON.stringify(response.facets || []));
  const sanitizedProducts = JSON.parse(JSON.stringify(response.items || []));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. CABEÇALHO DE BUSCA (H1 de Impacto) */}
      <div className="mb-10">
        <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-300 font-light">/</span>
          <span>Busca</span>
        </nav>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-6 uppercase">
            {query ? `Você buscou por: ${query}` : "Todos os produtos"}
          </h1>
        </div>
      </div>

      {/* 2. FILTROS MOBILE */}
      <div className="lg:hidden mb-6">
        <MobileFilters facets={sanitizedFacets} activeFilters={activeFilters} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 3. SIDEBAR FIXA (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <SearchFiltersSideBar
              facets={sanitizedFacets}
              activeFilters={activeFilters}
            />
          </div>
        </aside>

        {/* 4. RESULTADOS */}
        <section className="flex-1 min-w-0">
          {sanitizedProducts.length > 0 ? (
            <ProductGrid
              products={sanitizedProducts}
              totalItems={response.totalCount}
              sliceEnd={20}
              showSort={true}
              showTotal={true}
              enabletitle={false}
              title={""}
            />
          ) : (
            /* ESTADO VAZIO REFINADO */
            <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center px-4">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                Sem resultados para "{query}"
              </h2>
              <p className="text-gray-500 mt-3 max-w-sm mx-auto text-sm leading-relaxed">
                Verifique a ortografia ou tente usar palavras-chave mais
                simples. Você também pode navegar pelas nossas categorias
                principais.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="px-8 py-3 bg-gray-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md"
                >
                  Voltar para Home
                </Link>
                <Link
                  href="/c"
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
                >
                  Ver Categorias
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

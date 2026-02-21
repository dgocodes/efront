import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import MobileFilters from "@/components/layout/MobileFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { productService } from "@/lib/productService";
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
  const isLastLevel = slugs.length >= 2;

  const filtersRaw = resolvedSearchParams.filters;
  const filterslug = slugs.join("_");
  const activeFilters =
    typeof filtersRaw === "string" ? filtersRaw.split("_") : [];
  const currentSort = (resolvedSearchParams.sort as string) || "mais-vendidos";
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const pageSize = 40;

  const response = await productService.getProdutos({
    page: currentPage,
    limit: pageSize,
    sort: currentSort,
    filters: typeof filtersRaw === "string" ? filtersRaw : undefined,
    slug: filterslug || undefined,
  });

  const sanitizedFacets = JSON.parse(JSON.stringify(response.facets || []));
  const sanitizedProducts = JSON.parse(JSON.stringify(response.items || []));

  // LÓGICA DE EXIBIÇÃO DA FACETA DE CATEGORIA
  const finalFacets = sanitizedFacets.filter((f: any) => {
    if (f.facet.toLowerCase() === "categoria") {
      return !isLastLevel;
    }
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* --- CABEÇALHO DA PÁGINA (SEO & BREADCRUMB) --- */}
      <div className="mb-10">
        <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4 flex items-center gap-2 flex-wrap">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors shrink-0"
          >
            Home
          </Link>
          {slugs.map((s, index) => (
            <div
              key={`bc-${index}`}
              className="flex items-center gap-2 shrink-0"
            >
              <span className="text-gray-300 font-light">/</span>
              <Link
                href={`/c/${slugs.slice(0, index + 1).join("/")}`}
                className={`${index === slugs.length - 1 ? "text-gray-900" : "hover:text-blue-600"} transition-colors capitalize`}
              >
                {s.replace(/-/g, " ")}
              </Link>
            </div>
          ))}
        </nav>

        {/* H1 mais imponente e sem distrações */}
        {/* <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
          {slugs.length > 0
            ? slugs[slugs.length - 1].replace(/-/g, " ")
            : "Produtos"}
        </h1> */}

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-6 uppercase">
          {slugs.length > 0
            ? slugs[slugs.length - 1].replace(/-/g, " ")
            : "Produtos"}
        </h1>
      </div>

      {/* --- FILTROS MOBILE (Visível apenas em telas pequenas) --- */}
      <div className="lg:hidden mb-6">
        <MobileFilters facets={finalFacets} activeFilters={activeFilters} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- SIDEBAR DE FILTROS (Desktop) --- */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <SearchFiltersSideBar
              facets={finalFacets}
              activeFilters={activeFilters}
            />
          </div>
        </aside>

        {/* --- GRID DE PRODUTOS --- */}
        <section className="flex-1 min-w-0">
          {sanitizedProducts.length > 0 ? (
            <ProductGrid
              products={sanitizedProducts}
              totalItems={response.totalCount}
              sliceEnd={20}
              showSort={true}
              showTotal={true}
              enabletitle={false} // Desativado porque já temos o H1 acima
              title={""}
            />
          ) : (
            /* --- FEEDBACK PARA LISTA VAZIA --- */
            <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-xl font-bold text-gray-900">
                Nenhum resultado encontrado
              </h2>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
                Tente remover alguns filtros ou buscar por um termo diferente.
              </p>
              <Link
                href={slugs.length > 0 ? `/c/${slugs[0]}` : "/"}
                className="mt-8 px-8 py-3 bg-white border border-gray-200 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-sm"
              >
                Limpar Todos os Filtros
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

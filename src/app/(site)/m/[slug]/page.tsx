import SearchFiltersSideBar from "@/components/filters/SearchFiltersSideBar";
import BrandBanner from "@/components/brand/BrandBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { productService } from "@/lib/productService";
import Link from "next/link";

export default async function MarcaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug: marcaNome } = await params;
  const resolvedSearchParams = await searchParams;

  const filtersRaw = resolvedSearchParams.filters;
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
    slug: marcaNome,
  });

  const plainProducts = JSON.parse(JSON.stringify(response.items || []));
  const plainFacets = JSON.parse(JSON.stringify(response.facets || []));

  // Remove a faceta da própria marca
  const plainFacetsWithoutMarca = plainFacets.filter(
    (item: any) => item.facet.toLowerCase() !== "marca",
  );

  const totalPages = Math.ceil(response.totalCount / pageSize);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. BREADCRUMB - Importante para navegação e SEO */}
      <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span className="text-gray-300 font-light">/</span>
        <span className="text-gray-900">{marcaNome.replace(/-/g, " ")}</span>
      </nav>

      {/* 2. BANNER OU TÍTULO H1 */}
      <div className="mb-12">
        <BrandBanner slug={marcaNome} />

        {/* O H1: Se o BrandBanner não tiver um H1 interno, coloque aqui */}
        <div className="mt-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-6 uppercase">
            {marcaNome.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Explore a linha completa de produtos {marcaNome.replace(/-/g, " ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 3. SIDEBAR FIXA */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <SearchFiltersSideBar
              facets={plainFacetsWithoutMarca}
              activeFilters={activeFilters}
            />
          </div>
        </aside>

        {/* 4. GRID DE PRODUTOS */}
        <section className="flex-1 min-w-0">
          <ProductGrid
            products={plainProducts}
            sliceEnd={20}
            totalItems={response.totalCount}
            showSort={true}
            showTotal={true}
            enabletitle={false} // H1 já está no topo
            title={""}
          />

          {/* PAGINAÇÃO */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center border-t border-gray-100 pt-10">
              <p className="text-gray-400 text-[10px] uppercase font-black tracking-[0.2em] mb-4">
                Página {currentPage} de {totalPages}
              </p>
              {/* Componente de paginação aqui */}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

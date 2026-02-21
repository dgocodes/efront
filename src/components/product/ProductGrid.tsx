// "use client";

// import React from "react";
// import { ShoppingCart, ChevronDown } from "lucide-react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Produto } from "@/types/Produto";
// import ProductImage from "./ProductImage";
// import { useCart } from "@/hooks/useCart";
// import { useAuth } from "@/hooks/useAuth";

// interface ProductGridProps {
//   products: Produto[];
//   title: string;
//   sliceInitial?: number;
//   sliceEnd?: number;
//   enabletitle?: boolean;
//   totalItems?: number;
//   showTotal?: boolean;
//   showSort?: boolean;
// }

// export default function ProductGrid({
//   products,
//   title,
//   sliceInitial = 0,
//   sliceEnd = 8,
//   enabletitle = true,
//   totalItems,
//   showTotal = true,
//   showSort = true,
// }: ProductGridProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Função para atualizar a URL e disparar a nova busca
//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("sort", e.target.value); // Atualiza o parâmetro 'sort'
//     params.set("page", "1"); // Reseta para a página 1 ao mudar a ordem

//     router.push(`${pathname}?${params.toString()}`, { scroll: false });
//   };

//   const currentSort = searchParams.get("sort") || "mais-vendidos";

//   const { addToCart } = useCart();

//   const { user, isAuthenticated, logout } = useAuth();

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Cabeçalho com Ordenação Funcional */}
//       {(enabletitle || (showTotal && totalItems !== undefined)) && (
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-100 pb-4 gap-4">
//           <div className="flex items-baseline gap-3">
//             {enabletitle && (
//               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
//                 {title}
//               </h2>
//             )}

//             {showTotal && totalItems !== undefined && (
//               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none bg-gray-50 px-2 py-1 rounded-md">
//                 {totalItems} itens encontrados.
//               </span>
//             )}
//           </div>

//           {/* Ordenação Parametrizada */}
//           {showSort && (
//             <div className="flex items-center gap-2">
//               <label
//                 htmlFor="sort"
//                 className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
//               >
//                 Ordenar por:
//               </label>
//               <div className="relative">
//                 <select
//                   id="sort"
//                   value={currentSort}
//                   onChange={handleSortChange}
//                   className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-xs font-bold text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
//                 >
//                   <option value="mais-vendidos">Mais Vendidos</option>
//                   <option value="menor-preco">Menor Preço</option>
//                   <option value="maior-preco">Maior Preço</option>
//                   <option value="novidades">Novidades</option>
//                 </select>
//                 <ChevronDown
//                   size={14}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Grid de Produtos */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//         {products.slice(sliceInitial, sliceEnd).map((product) => (
//           <div
//             key={product.id}
//             className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
//           >
//             <div className="relative w-full h-40 md:h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
//               <ProductImage productId={product.id} alt={product.nome} />
//             </div>

//             <div className="flex-1 flex flex-col">
//               <h3 className="text-[13px] font-bold text-gray-700 line-clamp-2 leading-tight mb-2">
//                 {product.nome}
//               </h3>
//               {isAuthenticated ? (
//                 // Se está logado, mostra o preço
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-xs font-bold text-blue-600">R$</span>
//                   <span className="text-xl font-black text-blue-600">
//                     {Number(product.preco).toLocaleString("pt-BR", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </span>
//                 </div>
//               ) : (
//                 // Se não está logado (user é null)
//                 <div className="py-1">
//                   <a
//                     href="/login"
//                     className="text-[11px] font-bold text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded transition-colors uppercase"
//                   >
//                     Faça login para ver
//                   </a>
//                 </div>
//               )}
//             </div>
//             {isAuthenticated ? (
//               <button
//                 onClick={() =>
//                   addToCart({
//                     skuId: product.id,
//                     name: product.nome,
//                     price: product.preco,
//                   })
//                 }
//                 className="mt-4 w-full h-10 bg-[#0f172a] text-white rounded-lg flex items-center justify-center text-[11px] font-bold uppercase hover:bg-blue-600 transition-all"
//               >
//                 <ShoppingCart size={14} className="mr-2" />
//                 Adicionar
//               </button>
//             ) : (
//               ""
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { ShoppingCart, ChevronDown, LockKeyhole } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Produto } from "@/types/Produto";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import ProductViewPrice from "./ProductViewPrice";
import ProductViewAddToCart from "./ProductViewAddToCart";
import Link from "next/link";

interface ProductGridProps {
  products: Produto[];
  title: string;
  sliceInitial?: number;
  sliceEnd?: number;
  enabletitle?: boolean;
  totalItems?: number;
  showTotal?: boolean;
  showSort?: boolean;
}

export default function ProductGrid({
  products,
  title,
  sliceInitial = 0,
  sliceEnd = 8,
  enabletitle = true,
  totalItems,
  showTotal = true,
  showSort = true,
}: ProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addToCart } = useCart();
  const { isAuthenticated, loading } = useAuth(); // Se não tiver loading no seu hook, remova-o daqui

  const currentSort = searchParams.get("sort") || "mais-vendidos";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* --- CABEÇALHO --- */}
      {(enabletitle || (showTotal && totalItems !== undefined)) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-100 pb-4 gap-4">
          <div className="flex items-baseline gap-3">
            {enabletitle && (
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                {title}
              </h2>
            )}

            {showTotal && totalItems !== undefined && (
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none bg-gray-50 px-2 py-1 rounded-md">
                {totalItems} itens encontrados
              </span>
            )}
          </div>

          {showSort && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                Ordenar por:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={currentSort}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-xs font-bold text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
                >
                  <option value="mais-vendidos">Mais Vendidos</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="novidades">Novidades</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- GRID DE PRODUTOS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(sliceInitial, sliceEnd).map((product) => {
          const safeName =
            product.nome
              ?.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-") || "produto";

          const productHref = `/p/${product.id}/${safeName}`;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Usando o Link do Next.js (importado corretamente agora) */}
              <Link
                href={productHref}
                className="relative w-full h-40 md:h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <ProductImage productId={product.id} alt={product.nome} />

                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-black bg-white/90 backdrop-blur-sm text-gray-500 px-2 py-1 rounded shadow-sm uppercase">
                    {product.marca || "Original"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </Link>

              <div className="flex-1 flex flex-col">
                <Link
                  href={productHref}
                  className="block group-hover:text-blue-600 transition-colors"
                >
                  <h3 className="text-[13px] font-bold text-gray-700 line-clamp-2 leading-tight mb-3 min-h-[32px]">
                    {product.nome}
                  </h3>
                </Link>

                <div className="mt-auto">
                  {/* O ProductViewPrice deve ter o "if (!mounted) return null" que fizemos */}
                  <ProductViewPrice preco={product.preco} />
                </div>
              </div>

              {/* O botão fica FORA de qualquer link para não dar erro de nesting */}
              <ProductViewAddToCart product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

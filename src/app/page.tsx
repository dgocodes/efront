// import SearchBar from "@/components/SearchBar";

import { getProdutos, getProdutosPorTag } from "@/lib/api";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
//       <div className="w-full max-w-2xl text-center space-y-8">
//         <h1 className="text-6xl font-black text-gray-900 tracking-tighter">
//           CATÁLOGO <span className="text-blue-600">PRO</span>
//         </h1>
//         <p className="text-gray-500 text-lg">Milhares de produtos a um clique de distância.</p>
//         {/* Passamos uma prop para o SearchBar saber que deve ir para /b */}
//         <SearchBar isHome={true} />
//       </div>
//     </main>
//   );
// }

export default async function HomePage() {
  // Chamadas simultâneas para carregar a home rápido
  const [maisVendidos, ofertas, fofuras] = await Promise.all([
    // getProdutosPorTag("mais-procurados"),
    // getProdutosPorTag("melhores-ofertas"),
    [],
    [],
    [],
    []
  ]);

  return (
   <main className="w-full">
      
      {/* 1. Banner fora do container = Largura Total */}
      {/* <MainBanner /> */}
      
      {/* 2. Agora sim, o conteúdo que precisa de margem entra no container */}
      {/* <div className="container mx-auto px-6 space-y-8 mt-8">
        <ProductCarousel titulo="Os Queridinhos 🔥" produtos={maisVendidos.items} />
         */}
        {/* <BannerMeioPagina /> */}
        
        {/* <ProductCarousel titulo="Melhores Ofertas ✨" produtos={ofertas.items} />
      </div> */}

    </main>
  )
}
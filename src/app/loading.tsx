export default function Loading() {
  // Criamos um array de 8 itens para simular os cards carregando
  const skeletons = Array.from({ length: 8 });

  return (
    <main className="container mx-auto min-h-screen p-8">
      {/* Skeleton do Header */}
      <header className="mb-12 text-center animate-pulse">
        <div className="mx-auto h-10 w-64 rounded-lg bg-gray-200 mb-4"></div>
        <div className="mx-auto h-4 w-96 rounded-lg bg-gray-200"></div>
      </header>

      {/* Grid de Skeletons */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skeletons.map((_, i) => (
          <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
            {/* Imagem Placeholder */}
            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200"></div>
            
            <div className="mt-4 space-y-3">
              {/* Marca */}
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
              {/* Nome do Produto */}
              <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
              {/* Preço */}
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
              {/* Botão */}
              <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-gray-100"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
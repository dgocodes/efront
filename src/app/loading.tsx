export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Skeleton do Banner Principal */}
      <div className="w-full h-[300px] md:h-[450px] bg-gray-200 animate-pulse rounded-3xl mb-10" />

      {/* Grid de Produtos (Skeleton) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Foto do produto */}
            <div className="aspect-square w-full bg-gray-200 animate-pulse rounded-2xl" />
            {/* Linha de título */}
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            {/* Linha de preço */}
            <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default function ProdutoCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col h-full animate-pulse">
      {/* Espaço da Imagem */}
      <div className="aspect-square bg-gray-200 rounded-xl mb-4" />

      {/* Linhas de Texto (Nome do Produto) */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Rodapé (Preço e Botão) */}
      <div className="mt-auto flex items-end justify-between">
        <div className="space-y-1">
          <div className="h-2 bg-gray-100 rounded w-10" />
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
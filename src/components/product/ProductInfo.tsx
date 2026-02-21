// components/product/ProductInfo.tsx
import { Produto } from "@/types/Produto";
import ProductViewPrice from "./ProductViewPrice";
import ProductViewAddToCart from "./ProductViewAddToCart";

export default function ProductInfo({ product }: { product: Produto }) {
  return (
    <div className="flex flex-col">
      {/* Marca com tipografia refinada */}
      <span className="text-blue-600 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-3">
        {product.marca || "Original"}
      </span>

      {/* Título: Reduzi de font-black para font-bold para evitar o aspecto "borrado" */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
        {product.nome}
      </h1>

      <div className="mb-8 pb-8 border-b border-gray-100">
        {/* Preço: O componente já cuida do Hydration e Login */}
        <div className="scale-125 origin-left">
          <ProductViewPrice preco={product.preco} />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            SKU: {product.id}
          </span>
          <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider">
            ● Em estoque
          </span>
        </div>
      </div>

      {/* Seção de Compra */}
      <div className="space-y-6">

        <div className="w-full mt-8">
          <ProductViewAddToCart product={product} isLarge={true} />
        </div>

        {/* Benefícios de compra */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xs font-medium uppercase tracking-tighter">
              Compra 100% Segura
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

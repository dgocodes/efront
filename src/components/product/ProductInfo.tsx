// components/product/ProductInfo.tsx
import { Produto } from '@/types/Produto';
import { ShoppingCart, Truck, ShieldCheck } from 'lucide-react';

export default function ProductInfo({ product }: { product: Produto }) {
    return (
        <div className="flex flex-col">
            {/* Marca e Título */}
            <span className="text-blue-600 text-xs font-black uppercase tracking-widest mb-2">
                {product.marca}
            </span>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-none">
                {product.nome}
            </h1>

            {/* Avaliações Simples */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <div className="flex text-yellow-400">★★★★★</div>
                <span>(4.8 de 5)</span>
            </div>

            {/* Preços */}
            <div className="bg-gray-50 p-6 rounded-3xl mb-8">
                <span className="text-gray-400 line-through text-sm">De: R$ {product.preco}</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-900">R$</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">
                        {product.preco}
                    </span>
                </div>
                <p className="text-green-600 text-sm font-bold mt-1">
                    No PIX com 10% de desconto
                </p>
                <p className="text-gray-500 text-xs mt-1">
                    Ou em até 10x de R$ {(product.preco / 10).toFixed(2)} sem juros
                </p>
            </div>

            {/* Botão de Compra */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-100 mb-6">
                <ShoppingCart size={24} />
                ADICIONAR AO CARRINHO
            </button>

            {/* Benefícios Rápidos */}
            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck size={18} className="text-blue-600" />
                    <span>Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck size={18} className="text-blue-600" />
                    <span>Garantia oficial de 12 meses</span>
                </div>
            </div>
        </div>
    );
}
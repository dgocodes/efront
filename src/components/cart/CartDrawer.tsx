"use client";

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import ProductImage from "../product/ProductImage";
import { useMemo } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity } = useCart();

  // 1. Normalização dos dados: Garante que 'list' seja SEMPRE um array
  const list = useMemo(() => {
    if (!items) return [];
    if (Array.isArray(items)) return items;
    return (items as any).state?.items || [];
  }, [items]);

  // 2. Cálculo do total usando a lista normalizada
  const total = useMemo(() => {
    return list.reduce((acc: number, item: any) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }, [list]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
        {/* HEADER */}
        <div className="shrink-0 p-6 border-b border-gray-100 flex items-center justify-between bg-white z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-900">
              <ShoppingBag size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Meu Carrinho
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
          >
            <X size={22} />
          </button>
        </div>

        {/* LISTA DE PRODUTOS */}
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4 space-y-8 bg-white">
          {list.length > 0 ? (
            list.map((item: any, index: number) => (
              <div
                key={item.skuId || index}
                className="flex gap-5 pb-6 border-b border-slate-50 last:border-0"
              >
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative">
                  <ProductImage
                    productId={item.id || item.skuId}
                    alt={item.name}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-[14px] font-semibold text-slate-800 leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.skuId)}
                      className="text-slate-300 hover:text-red-500 transition-colors shrink-0 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.skuId, (item.quantity || 1) - 1)}
                        className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 transition-colors"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.skuId, (item.quantity || 1) + 1)}
                        className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 transition-colors"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>

                    <span className="font-bold text-base text-slate-900 tracking-tight">
                      {formatPrice((item.price || 0) * (item.quantity || 1))}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <p className="text-sm font-medium text-slate-400">
                Seu carrinho está vazio
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {list.length > 0 && (
          <div className="shrink-0 p-6 bg-white border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Subtotal
              </span>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                {formatPrice(total)}
              </span>
            </div>
            <button className="w-full h-14 bg-slate-900 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px] transition-all">
              Finalizar Pedido
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
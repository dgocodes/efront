"use client";

import React, { useId, useEffect, useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Produto } from "@/types/Produto";
import ProductImage from './ProductImage';

// Import essencial para evitar o layout quebrado no load
import 'swiper/css';
import ProductViewPrice from './ProductViewPrice';
import ProductViewAddToCart from './ProductViewAddToCart';

interface ProductCarouselProps {
  products: Produto[];
  title?: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const id = useId().replace(/:/g, "");
  const [isMounted, setIsMounted] = useState(false);

  // Garante que o swiper só renderize após o JS carregar no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextClass = `next-${id}`;
  const prevClass = `prev-${id}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
          {title || "Sugestões para você"}
        </h2>
        
        <div className="flex gap-2">
          <button className={`${prevClass} p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20`}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${nextClass} p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20`}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Se ainda não montou, mostramos um estado de carregamento simples ou nada 
          para evitar que as imagens apareçam empilhadas */}
      {!isMounted ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          // Melhora a performance de renderização
          observer={true}
          observeParents={true}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id} className="pb-4">
              <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-xl transition-all flex flex-col h-full">
                
                {/* Altura Fixa e Aspect Ratio garantem que o layout não pule */}
                <div className="relative w-full h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                  <ProductImage productId={product.id} alt={product.nome} />
                </div>

                <div className="flex-1">
                  <h3 className="text-[13px] font-bold text-gray-700 line-clamp-2 mb-2 leading-tight">
                    {product.nome}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-auto">
                    {/* <span className="text-xs font-bold text-blue-600">R$</span>
                    <span className="text-xl font-black text-blue-600">
                      {Number(product.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span> */}
                    <ProductViewPrice preco={product.preco}  />
                  </div>
                </div>

                <ProductViewAddToCart product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
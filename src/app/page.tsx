import React from 'react';
import HeroCarousel from '@/components/layout/HeroCarousel';
import { getHomeProducts } from '@/lib/api'; // Sua função que já tem o cache de 10min
import ProductCarousel from '@/components/product/ProductHomeCarousel';
import ProductGrid from '@/components/product/ProductGrid';
import BrandCarousel from '@/components/brand/BrandCarousel';

export default async function HomePage() {
  // 1. Busca os dados diretamente no servidor (Server Component)
  // O Next.js vai cachear isso conforme o revalidate: 600 que você definiu na api.ts
  const destaquesResult = await getHomeProducts();
  const tilibraResult = await getHomeProducts(undefined, undefined, ['tilibra']);

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroCarousel />

      <BrandCarousel title="Marcas Relevantes" />


      {/* 1. GRADE FIXA: Impacto imediato, sem espera de JS */}
      <ProductGrid
        products={destaquesResult?.items || []}
        title="Destaques da Semana"
        enabletitle={true}
        showTotal={false}
        showSort={false}
      />

      {/* 2. BANNER DE MEIO (Opcional, mas ajuda muito na UX) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="group relative w-full h-48 md:h-[450px] overflow-hidden rounded-[2rem] shadow-xl transition-transform duration-500 hover:scale-[1.005]">
          <img
            src="https://www.reval.net/imagem/banner/home/15.jpg"
            alt="Promoção Tilibra"
            className="w-full h-full object-cover object-center"
          />

          {/* Overlay para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

          {/* Link opcional cobrindo todo o banner */}
          <a href="/tilibra" className="absolute inset-0 z-10" aria-label="Ver produtos Tilibra"></a>
        </div>
      </div>


      {/* 3. CARROSSEL: Ótimo para explorar coleções grandes */}
      <ProductCarousel
        products={tilibraResult?.items || []}
        title="Exclusivos Tilibra"
      />


      {/* 2. BANNER FINAL (Opcional, mas ajuda muito na UX) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="group relative w-full h-48 md:h-[450px] overflow-hidden rounded-[2rem] shadow-xl transition-transform duration-500 hover:scale-[1.005]">
          <img
            src="https://www.reval.net/imagem/banner/home/12.jpg"
            alt="Instagram Mundo Reval"
            className="w-full h-full object-cover object-center"
          />

          {/* Overlay para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

          {/* Link opcional cobrindo todo o banner */}
          <a href="https://www.instagram.com/mundoreval/" target='blank' className="absolute inset-0 z-10" aria-label="Visitar Instagram do Mundo Reval"></a>
        </div>
      </div>

    </main>
  );
}
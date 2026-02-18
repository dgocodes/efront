"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import marcasData from '@/data/marcas-relevantes.json';

interface Marca {
  id: string;
  nome: string;
  logo: string;
  link: string;
}

export default function BrandCarousel({ title }: { title?: string }) {
  // Configurações do Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true 
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const marcas: Marca[] = marcasData;

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com Título e Setas de Navegação */}

        
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            {/* <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span> */}
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
              {title} 
            </h2>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Viewport do Carrossel - overflow-hidden impede que as marcas vazem a tela */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {marcas.map((marca) => (
              <div key={marca.id} className="embla__slide flex-none w-44">
                <Link href={marca.link} className="group block">
                  <div className="relative aspect-square bg-white rounded-3xl border border-gray-100 flex items-center justify-center p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:border-transparent group-hover:-translate-y-2">
                    
                    <div className="relative w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                      <Image
                        src={marca.logo}
                        alt={marca.nome}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="absolute -bottom-2 bg-blue-600 text-[9px] text-white font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg whitespace-nowrap">
                      LOJA OFICIAL
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                      {marca.nome}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
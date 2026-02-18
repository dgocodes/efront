"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importação dos estilos obrigatórios do Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bannersData from '../../data/banners.json';

export default function HeroCarousel() {
  const [mounted, setMounted] = useState(false);

  // Garante que o Swiper só renderize no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[300px] md:h-[450px] lg:h-[500px] bg-gray-100 animate-pulse" />;
  }

  if (!bannersData || bannersData.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 overflow-hidden relative z-0"> 
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[300px] md:h-[450px] lg:h-[500px]"
      >
        {bannersData.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* O link agora envolve todo o conteúdo e tem a classe 'group' */}
            <a href={banner.link} className="relative block w-full h-full group outline-none">
              
              {/* Imagem de Fundo com efeito de zoom no hover do grupo */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay para escurecer a imagem */}
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/30" />

              {/* Conteúdo Centralizado */}
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-start text-white">
                <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-700">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" />
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Customização via CSS Global */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.2);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          transform: scale(0.6);
          transition: all 0.3s;
          z-index: 20;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px;
          border-radius: 5px;
        }
        /* Garante que o carrossel não fique na frente dos submenus da Navbar */
        .swiper {
            z-index: 0 !important;
        }
      `}</style>
    </section>
  );
}
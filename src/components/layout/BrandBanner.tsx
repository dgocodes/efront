"use client";

import React, { useState } from 'react';

interface BrandBannerProps {
  slug: string;
}

export default function BrandBanner({ slug }: BrandBannerProps) {
  const [error, setError] = useState(false);

  const bannerUrl = '/banners/' + slug + '.jpg';

  if (error) return null;

  return (
    <div className="w-full mb-10 overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
      {/* Retiramos a altura fixa (h-72) e usamos aspect-ratio ou deixamos a imagem ditar a altura.
          Isso garante que o banner apareça completo.
      */}
      <div className="relative w-full">
        <img 
          src={bannerUrl} 
          alt={`Banner Promocional ${slug}`} 
          // Troquei 'object-cover' por 'w-full h-auto block'
          // Isso faz a imagem ocupar a largura total e ajustar a altura proporcionalmente
          className="w-full h-auto block"
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}
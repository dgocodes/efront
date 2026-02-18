// "use client";

// import React, { useState } from 'react';

// interface ProductImageProps {
//   productId: string;
//   alt: string;
// }

// export default function ProductImage({ productId, alt }: ProductImageProps) {
//   const CDN_URL = "https://cdn.jsdelivr.net/gh/dgocodes/images@master";
//   // Iniciamos com a URL do seu CDN
//   const [imgSrc, setImgSrc] = useState(`${CDN_URL}/${productId}.jpg`);

//   return (
//     <img
//       src={imgSrc}
//       alt={alt}
//       // Se a imagem não existir no CDN (404), cai no placeholder
//       onError={() => setImgSrc(`https://placehold.co/400x400/f3f4f6/2563eb?text=${encodeURIComponent(alt.substring(0, 10))}`)}
//       className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
//     />
//   );
// }

"use client";
import React, { useState } from 'react';

export default function ProductImage({ productId, alt }: { productId: string; alt: string }) {
  const CDN_URL = "https://cdn.jsdelivr.net/gh/dgocodes/images@master";
  const [imgSrc, setImgSrc] = useState(`${CDN_URL}/${productId}.jpg`);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(`https://placehold.co/400x400/f3f4f6/2563eb?text=SEM+FOTO`)}
      // object-contain faz a imagem caber no box sem esticar
      // p-4 dá um respiro para a imagem não tocar as bordas do card
      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
    />
  );
}
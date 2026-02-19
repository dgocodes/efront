"use client";

import React, { useState, useEffect } from 'react';
import ProductImage from './ProductImage'; // Importe seu componente aqui

interface ProductGalleryProps {
    productId: string; // Precisamos do ID para o seu componente funcionar
    alt: string;
    // Caso você tenha ids de variações (ex: 123_1, 123_2), pode passar um array
    additionalImages?: string[]; 
}

export default function ProductGallery({ productId, alt, additionalImages = [] }: ProductGalleryProps) {
    // 1. Criamos a lista de IDs de imagem (o principal + adicionais)
    const allImageIds = [productId, ...additionalImages];

    console.log('IDs de Imagem para a Galeria:', allImageIds); // Debug: Verifique os IDs que estão sendo usados
    console.log('Produto ID:', productId); // Debug: Verifique o ID principal do produto
    
    // 2. Estado para controlar qual ID de imagem está em destaque
    const [activeImageId, setActiveImageId] = useState(productId);

    // Sincroniza se o produto mudar
    useEffect(() => {
        setActiveImageId(productId);
    }, [productId]);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-4">
            {/* BOX DA IMAGEM PRINCIPAL */}
            <div className="flex-1 relative aspect-square bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group">
                <ProductImage 
                    productId={activeImageId} 
                    alt={alt} 
                />
            </div>

            {/* LISTA DE MINIATURAS (Só aparece se houver mais de uma imagem) */}
            {allImageIds.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide">
                    {allImageIds.map((id, idx) => (
                        <button
                            key={idx}
                            onMouseEnter={() => setActiveImageId(id)}
                            onClick={() => setActiveImageId(id)}
                            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 transition-all overflow-hidden bg-white ${
                                activeImageId === id ? 'border-blue-600 shadow-md' : 'border-gray-100 hover:border-blue-200'
                            }`}
                        >
                            {/* Reutilizamos seu componente nas miniaturas também! */}
                            <ProductImage productId={id} alt={`Miniatura ${idx}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
"use client";

import React, { useState, useEffect } from 'react';
import ProductImage from './ProductImage';

interface ProductGalleryProps {
    productId: string;
    alt: string;
    additionalImages?: string[]; 
}

export default function ProductGallery({ productId, alt, additionalImages = [] }: ProductGalleryProps) {
    const allImageIds = [productId, ...additionalImages];
    
    const [activeImageId, setActiveImageId] = useState(productId);
    const [mounted, setMounted] = useState(false);

    // 1. Proteção de Hydration: Garante que o estado inicial coincida com o servidor
    useEffect(() => {
        setMounted(true);
        setActiveImageId(productId);
    }, [productId]);

    // Enquanto não monta, renderizamos um esqueleto (ou apenas a imagem principal sem interatividade)
    if (!mounted) {
        return (
            <div className="flex flex-col md:flex-row-reverse gap-4 animate-pulse">
                <div className="flex-1 aspect-square bg-gray-50 rounded-3xl border border-gray-100" />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row-reverse gap-4">
            {/* BOX DA IMAGEM PRINCIPAL */}
            <div className="flex-1 relative aspect-square bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group">
                {/* O componente ProductImage já tem o tratamento de erro e loading que fizemos */}
                <ProductImage 
                    productId={activeImageId} 
                    alt={alt} 
                />
            </div>

            {/* LISTA DE MINIATURAS */}
            {allImageIds.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide max-h-[500px]">
                    {allImageIds.map((id, idx) => (
                        <button
                            key={`${id}-${idx}`}
                            onMouseEnter={() => setActiveImageId(id)}
                            onClick={() => setActiveImageId(id)}
                            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 transition-all duration-300 overflow-hidden bg-white shadow-sm ${
                                activeImageId === id 
                                    ? 'border-blue-600 ring-2 ring-blue-50' 
                                    : 'border-transparent hover:border-blue-200 opacity-70 hover:opacity-100'
                            }`}
                        >
                            {/* Miniaturas com preenchimento ajustado */}
                            <div className="w-full h-full p-1">
                                <ProductImage productId={id} alt={`Miniatura ${idx}`} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
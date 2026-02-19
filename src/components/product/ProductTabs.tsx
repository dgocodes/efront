// components/product/ProductTabs.tsx
"use client";

import React, { useState } from 'react';

interface ProductTabsProps {
    description: string;
    specs: { label: string; value: string }[]; // Array de objetos para especificações
}

export default function ProductTabs({ description, specs }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            {/* Cabeçalho das Abas */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Descrição
                </button>
                <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'specs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Especificações
                </button>
            </div>

            {/* Conteúdo das Abas */}
            <div className="py-4">
                {activeTab === 'description' && (
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                )}
                {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        {specs.length > 0 ? (
                            specs.map((spec, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{spec.label}:</span>
                                    <span className="text-gray-700">{spec.value}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2">Nenhuma especificação técnica disponível.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
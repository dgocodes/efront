'use client'

import React from 'react';

interface FilterItemProps {
  id: string;
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}

export default function FilterItem({ id, label, count, checked, onChange }: FilterItemProps) {
  return (
    <div 
      className="group flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
      onClick={onChange}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox Customizado */}
        <div className="relative flex items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all focus:ring-2 focus:ring-blue-500/20"
          />
          {/* Ícone de Check (SVG) que aparece quando selecionado */}
          <svg
            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Label do Filtro */}
        <label
          htmlFor={id}
          className={`cursor-pointer text-sm transition-colors ${
            checked ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900 font-medium'
          }`}
        >
          {label}
        </label>
      </div>

      {/* Contador (Badge) */}
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-all ${
        checked 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-500'
      }`}>
        {count}
      </span>
    </div>
  );
}
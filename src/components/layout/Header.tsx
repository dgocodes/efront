'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'

export default function Header() {
  const router = useRouter()

  // Função que processa a pesquisa
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const termo = formData.get('query')?.toString()

    if (termo && termo.trim() !== '') {
      // Redireciona para sua página de busca passando o que o usuário digitou
      router.push(`/b?query=${encodeURIComponent(termo.trim())}`)
    }
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* 1. BARRA SUPERIOR / MAIN HEADER */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 md:gap-8">
        
        {/* LOGO (Igual ao que você enviou, mas com ajuste de tamanho) */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <div className="w-32 md:w-44">
            <img 
              src="" 
              alt="Logo da DGOCODES" 
              className="w-full h-auto"
            />
          </div>
        </Link>

        {/* BARRA DE PESQUISA CENTRAL (A Lógica que estava faltando) */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex flex-1 max-w-2xl relative group"
        >
          <input
            name="query" // Identificador para o FormData
            type="text"
            placeholder="O que você está procurando hoje?"
            className="w-full bg-gray-100 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-xl py-2.5 pl-5 pr-12 outline-none transition-all text-sm font-medium text-gray-800"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search size={18} />
          </button>
        </form>

        {/* AÇÕES (Conta e Carrinho) */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Botão de Menu Mobile */}
          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>

          <Link href="/conta" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <User size={24} className="text-gray-700" />
            <div className="hidden lg:block leading-tight text-left">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Entrar</p>
              <p className="text-sm font-black text-gray-900">Minha Conta</p>
            </div>
          </Link>

          <Link href="/carrinho" className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ShoppingCart size={24} className="text-gray-700" />
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* 2. PESQUISA MOBILE (Visível apenas em telas pequenas) */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            name="q"
            type="text"
            placeholder="Pesquisar produtos..."
            className="w-full bg-gray-100 rounded-lg py-2 pl-4 pr-10 outline-none text-sm"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  )
}
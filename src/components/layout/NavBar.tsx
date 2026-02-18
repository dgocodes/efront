// "use client";

// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown, ChevronRight, Search, ShoppingCart, User } from 'lucide-react';
// import DynamicIcon from './DynamicIcon';

// // Definindo a interface para garantir que o TS reconheça os campos
// interface Category {
//     label: string;
//     slug: string;
//     icon: string;
//     ordem: number;
//     children?: { label: string; slug: string }[];
// }

// export default function Navbar({ categoriesData = [] }: { categoriesData: Category[] }) {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     // Iniciamos o activeTab como nulo ou o primeiro item se existir
//     const [activeTab, setActiveTab] = useState<string | undefined>(categoriesData[0]?.slug);
//     const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

//     // Atualiza a aba ativa quando os dados carregarem
//     useEffect(() => {
//         if (categoriesData.length > 0 && !activeTab) {
//             setActiveTab(categoriesData[0].slug);
//         }
//     }, [categoriesData, activeTab]);

//     const mainCategories = [...categoriesData]
//         .sort((a, b) => a.ordem - b.ordem)
//         .slice(0, 6);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Se não houver dados ainda, evitamos renderizar partes que dependem de iteração
//     if (!categoriesData || categoriesData.length === 0) return null;

//     return (
//         <header className="bg-white border-b border-gray-200 sticky top-0 z-[999] w-full shadow-sm">
//             {/* --- LINHA SUPERIOR --- */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-30 bg-white">
//                 <div className="flex justify-between items-center h-16 lg:h-20 gap-4">
//                     <div className="flex-shrink-0">
//                         <a href="/" className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter uppercase">
//                             Ecommerce
//                         </a>
//                     </div>

//                     <div className="hidden md:flex flex-1 max-w-xl relative">
//                         <input
//                             type="text"
//                             placeholder="O que você está procurando hoje?"
//                             className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 px-5 pl-12 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                         />
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     </div>

//                     <div className="flex items-center gap-2 sm:gap-5 text-gray-600">
//                         <button className="hidden sm:flex items-center gap-2 hover:text-blue-600 transition-colors">
//                             <User size={20} />
//                             <div className="flex flex-col items-start leading-none text-left">
//                                 <span className="text-[10px] uppercase font-bold text-gray-400">Entrar</span>
//                                 <span className="text-xs font-bold">Minha Conta</span>
//                             </div>
//                         </button>
//                         <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
//                             <ShoppingCart size={24} />
//                             <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">0</span>
//                         </button>
//                         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* --- BUSCA MOBILE --- */}
//             <div className="md:hidden px-4 pb-4 relative z-20 bg-white">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Pesquisar produtos..."
//                         className="w-full bg-gray-100 border border-transparent rounded-xl py-2.5 px-4 pl-11 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                     />
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//             </div>

//             {/* --- NAVEGAÇÃO DESKTOP --- */}
//             <nav className="hidden lg:block border-t border-gray-100 bg-white relative z-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
                    
//                     {/* MEGA MENU */}
//                     <div className="group static">
//                         <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
//                             <Menu size={18} />
//                             Todas Categorias
//                         </button>

//                         <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000] h-[500px]">
//                             <div className="absolute -top-2 left-0 w-full h-2 bg-transparent" />
//                             <div className="max-w-7xl mx-auto h-full flex border-x border-gray-100 bg-white shadow-2xl">
//                                 <div className="w-1/4 bg-gray-50 border-r border-gray-100 overflow-y-auto">
//                                     {categoriesData.map((cat) => (
//                                         <div
//                                             key={cat.slug}
//                                             onMouseEnter={() => setActiveTab(cat.slug)}
//                                             className={`flex items-center justify-between px-6 py-3.5 cursor-pointer transition-colors ${activeTab === cat.slug ? 'bg-white text-blue-600 border-l-4 border-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
//                                         >
//                                             <div className="flex items-center gap-3 text-sm">
//                                                 <DynamicIcon name={cat.icon} size={18} />
//                                                 {cat.label}
//                                             </div>
//                                             <ChevronRight size={14} className={activeTab === cat.slug ? 'opacity-100' : 'opacity-30'} />
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="w-3/4 p-8 overflow-y-auto bg-white">
//                                     {categoriesData.map((cat) => (
//                                         <div key={cat.slug} className={activeTab === cat.slug ? 'block animate-in fade-in duration-300' : 'hidden'}>
//                                             <div className="flex justify-between items-center mb-6 border-b pb-4">
//                                                 <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
//                                                     <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
//                                                         <DynamicIcon name={cat.icon} size={24} />
//                                                     </div>
//                                                     {cat.label}
//                                                 </h3>
//                                             </div>
//                                             <div className="grid grid-cols-3 gap-x-8 gap-y-1">
//                                                 {cat.children?.map((sub) => (
//                                                     <a key={sub.slug} href={`/categoria/${cat.slug}/${sub.slug}`} className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all">
//                                                         <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                                                         {sub.label}
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* CATEGORIAS FIXAS */}
//                     <div className="flex items-center ml-2">
//                         {mainCategories.map((cat) => (
//                             <div key={cat.slug} className="group static">
//                                 <button className="relative flex items-center gap-2 px-4 py-4 text-gray-600 hover:text-blue-600 font-medium transition-all text-sm border-b-2 border-transparent hover:border-blue-600 z-[1001]">
//                                     <DynamicIcon name={cat.icon} size={18} />
//                                     <span>{cat.label}</span>
//                                     <ChevronDown size={14} className="group-hover:rotate-180 transition-transform opacity-40" />
//                                 </button>

//                                 <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000]">
//                                     <div className="absolute -top-2 left-0 w-full h-2 bg-transparent" />
//                                     <div className="bg-white shadow-2xl border-t border-gray-100">
//                                         <div className="max-w-7xl mx-auto p-8 flex gap-10">
//                                             <div className="w-64 flex-shrink-0 border-r border-gray-100 pr-10 flex flex-col items-center text-center">
//                                                 <div className="mb-4 p-5 bg-blue-50 rounded-2xl text-blue-600">
//                                                     <DynamicIcon name={cat.icon} size={48} />
//                                                 </div>
//                                                 <h3 className="text-xl font-black text-gray-900 mb-1">{cat.label}</h3>
//                                                 <a href={`/categoria/${cat.slug}`} className="mt-4 w-full bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">Ver Tudo</a>
//                                             </div>
//                                             <div className="flex-1 grid grid-cols-4 gap-x-6 gap-y-1 self-start">
//                                                 {cat.children?.map((sub) => (
//                                                     <a key={sub.slug} href={`/categoria/${cat.slug}/${sub.slug}`} className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all hover:pl-1">
//                                                         <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                                                         {sub.label}
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </nav>

//             {/* --- ASIDE MOBILE --- */}
//             <aside className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white z-[1000] transform transition-transform duration-300 lg:hidden overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//                 <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//                     <span className="text-xl font-black text-blue-600">MENU</span>
//                     <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
//                 </div>
//                 <div className="p-4">
//                     {categoriesData.map((cat) => (
//                         <div key={cat.slug} className="border-b border-gray-50">
//                             <button onClick={() => setActiveMobileCategory(activeMobileCategory === cat.slug ? null : cat.slug)} className={`flex items-center justify-between w-full p-4 rounded-xl transition-all ${activeMobileCategory === cat.slug ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}>
//                                 <div className="flex items-center gap-3 font-bold text-sm">
//                                     <DynamicIcon name={cat.icon} size={20} />
//                                     {cat.label}
//                                 </div>
//                                 <ChevronRight size={18} className={activeMobileCategory === cat.slug ? 'rotate-90' : ''} />
//                             </button>
//                             {activeMobileCategory === cat.slug && (
//                                 <div className="bg-gray-50 flex flex-col py-2 rounded-b-xl">
//                                     {cat.children?.map((sub) => (
//                                         <a key={sub.slug} href={`/categoria/${cat.slug}/${sub.slug}`} className="px-12 py-3 text-sm text-gray-500 hover:text-blue-600">{sub.label}</a>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </aside>
//         </header>
//     );
// }

"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Search, ShoppingCart, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import DynamicIcon from './DynamicIcon';

// Interface para garantir a tipagem correta das categorias vindas da API/JSON
interface Category {
    label: string;
    slug: string;
    icon: string;
    ordem: number;
    children?: { label: string; slug: string }[];
}

export default function Navbar({ categoriesData = [] }: { categoriesData: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Estados de Controle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [activeTab, setActiveTab] = useState<string | undefined>(categoriesData[0]?.slug);
    const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

    // Sincroniza o campo de busca se o parâmetro "q" na URL mudar
    useEffect(() => {
        setSearchTerm(searchParams.get('q') || '');
    }, [searchParams]);

    // Atualiza a aba ativa do Mega Menu quando os dados carregarem
    useEffect(() => {
        if (categoriesData.length > 0 && !activeTab) {
            setActiveTab(categoriesData[0].slug);
        }
    }, [categoriesData, activeTab]);

    // Lógica de Busca: dispara ao dar Enter ou clicar na lupa
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        
        if (searchTerm.trim()) {
            params.set('q', searchTerm.trim());
        } else {
            params.delete('q');
        }
        
        params.set('page', '1'); // Sempre volta para a primeira página na busca
        router.push(`/b?${params.toString()}`);
        setIsMobileMenuOpen(false);
    };

    // Ordenação e limite de categorias na barra principal
    const mainCategories = [...categoriesData]
        .sort((a, b) => a.ordem - b.ordem)
        .slice(0, 6);

    // Fecha o menu mobile se a tela for redimensionada para desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!categoriesData || categoriesData.length === 0) return null;

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-[999] w-full shadow-sm">
            {/* --- LINHA SUPERIOR (Logo, Busca Desktop, User) --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-30 bg-white">
                <div className="flex justify-between items-center h-16 lg:h-20 gap-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter uppercase">
                            Ecommerce
                        </a>
                    </div>

                    {/* BUSCA DESKTOP */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="O que você está procurando hoje?"
                            className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 px-5 pl-12 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        />
                        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Search size={18} />
                        </button>
                    </form>

                    <div className="flex items-center gap-2 sm:gap-5 text-gray-600">
                        <button className="hidden sm:flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <User size={20} />
                            <div className="flex flex-col items-start leading-none text-left">
                                <span className="text-[10px] uppercase font-bold text-gray-400">Entrar</span>
                                <span className="text-xs font-bold">Minha Conta</span>
                            </div>
                        </button>
                        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">0</span>
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- BUSCA MOBILE --- */}
            <div className="md:hidden px-4 pb-4 relative z-20 bg-white">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar produtos..."
                        className="w-full bg-gray-100 border border-transparent rounded-xl py-2.5 px-4 pl-11 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                    <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </button>
                </form>
            </div>

            {/* --- NAVEGAÇÃO DESKTOP & MEGA MENU --- */}
            <nav className="hidden lg:block border-t border-gray-100 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
                    
                    {/* BOTÃO TODAS CATEGORIAS (Mega Menu Lateral) */}
                    <div className="group static">
                        <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
                            <Menu size={18} />
                            Todas Categorias
                        </button>

                        <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000] h-[500px]">
                            <div className="max-w-7xl mx-auto h-full flex border-x border-gray-100 bg-white shadow-2xl">
                                {/* Coluna Esquerda: Lista de Categorias */}
                                <div className="w-1/4 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                                    {categoriesData.map((cat) => (
                                        <div
                                            key={cat.slug}
                                            onMouseEnter={() => setActiveTab(cat.slug)}
                                            className={`flex items-center justify-between px-6 py-3.5 cursor-pointer transition-colors ${activeTab === cat.slug ? 'bg-white text-blue-600 border-l-4 border-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            <div className="flex items-center gap-3 text-sm">
                                                <DynamicIcon name={cat.icon} size={18} />
                                                {cat.label}
                                            </div>
                                            <ChevronRight size={14} className={activeTab === cat.slug ? 'opacity-100' : 'opacity-30'} />
                                        </div>
                                    ))}
                                </div>
                                {/* Coluna Direita: Subcategorias do Ativo */}
                                <div className="w-3/4 p-8 overflow-y-auto bg-white">
                                    {categoriesData.map((cat) => (
                                        <div key={cat.slug} className={activeTab === cat.slug ? 'block animate-in fade-in duration-300' : 'hidden'}>
                                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                        <DynamicIcon name={cat.icon} size={24} />
                                                    </div>
                                                    {cat.label}
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                                                {cat.children?.map((sub) => (
                                                    <a key={sub.slug} href={`/c/${cat.slug}/${sub.slug}`} className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all">
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CATEGORIAS EM DESTAQUE (Links diretos) */}
                    <div className="flex items-center ml-2">
                        {mainCategories.map((cat) => (
                            <div key={cat.slug} className="group static">
                                <button className="relative flex items-center gap-2 px-4 py-4 text-gray-600 hover:text-blue-600 font-medium transition-all text-sm border-b-2 border-transparent hover:border-blue-600 z-[1001]">
                                    <DynamicIcon name={cat.icon} size={18} />
                                    <span>{cat.label}</span>
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform opacity-40" />
                                </button>

                                {/* Dropdown Individual das Categorias de Destaque */}
                                <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000]">
                                    <div className="bg-white shadow-2xl border-t border-gray-100">
                                        <div className="max-w-7xl mx-auto p-8 flex gap-10">
                                            <div className="w-64 flex-shrink-0 border-r border-gray-100 pr-10 flex flex-col items-center text-center">
                                                <div className="mb-4 p-5 bg-blue-50 rounded-2xl text-blue-600">
                                                    <DynamicIcon name={cat.icon} size={48} />
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 mb-1">{cat.label}</h3>
                                                <a href={`/c/${cat.slug}`} className="mt-4 w-full bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">Ver Tudo</a>
                                            </div>
                                            <div className="flex-1 grid grid-cols-4 gap-x-6 gap-y-1 self-start">
                                                {cat.children?.map((sub) => (
                                                    <a key={sub.slug} href={`/c/${cat.slug}/${sub.slug}`} className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all hover:pl-1">
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* --- MENU LATERAL MOBILE --- */}
            <div 
                className={`fixed inset-0 bg-black/50 z-[999] transition-opacity lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white z-[1000] transform transition-transform duration-300 lg:hidden overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <span className="text-xl font-black text-blue-600">MENU</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
                </div>
                <div className="p-4">
                    {categoriesData.map((cat) => (
                        <div key={cat.slug} className="border-b border-gray-50">
                            <button 
                                onClick={() => setActiveMobileCategory(activeMobileCategory === cat.slug ? null : cat.slug)} 
                                className={`flex items-center justify-between w-full p-4 rounded-xl transition-all ${activeMobileCategory === cat.slug ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                            >
                                <div className="flex items-center gap-3 font-bold text-sm">
                                    <DynamicIcon name={cat.icon} size={20} />
                                    {cat.label}
                                </div>
                                <ChevronRight size={18} className={activeMobileCategory === cat.slug ? 'rotate-90' : ''} />
                            </button>
                            {activeMobileCategory === cat.slug && (
                                <div className="bg-gray-50 flex flex-col py-2 rounded-b-xl animate-in slide-in-from-top-2">
                                    {cat.children?.map((sub) => (
                                        <a key={sub.slug} href={`/c/${cat.slug}/${sub.slug}`} className="px-12 py-3 text-sm text-gray-500 hover:text-blue-600">{sub.label}</a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
        </header>
    );
}
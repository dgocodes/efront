"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import dynamic from "next/dynamic";
import DynamicIcon from "./DynamicIcon";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

const SearchForm = dynamic(() => import("./SearchForm"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-10 bg-gray-100 rounded-full animate-pulse" />
  ),
});

interface Category {
  label: string;
  slug: string;
  icon: string;
  ordem: number;
  children?: { label: string; slug: string }[];
}

export default function Navbar({
  categoriesData = [],
}: {
  categoriesData: Category[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(
    categoriesData[0]?.slug,
  );
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    string | null
  >(null);

  // ESTADO PARA HIDRATAÇÃO
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const { openCart } = useUI();
  const pathname = usePathname();

  // EFEITO PARA MARCAR COMO MONTADO
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = useMemo(() => {
    const actualItems = Array.isArray(items)
      ? items
      : (items as any)?.state?.items || [];

    return actualItems.reduce((total: number, item: any) => {
      const quantity = Number(item?.quantity) || 0;
      return total + quantity;
    }, 0);
  }, [items]);

  const mainCategories = [...categoriesData]
    .sort((a, b) => a.ordem - b.ordem)
    .slice(0, 6);

  if (!categoriesData || categoriesData.length === 0) return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[999] w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-30 bg-white">
        <div className="flex justify-between items-center h-16 lg:h-20 gap-4">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl md:text-2xl font-black text-blue-600 uppercase tracking-tighter"
            >
              Ecommerce
            </Link>
          </div>

          {/* BUSCA DESKTOP */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchForm />
          </div>

          {/* AÇÕES DA DIREITA */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* PERFIL DO USUÁRIO */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 border-r pr-4 border-gray-100">
                  <div className="hidden sm:flex flex-col text-right leading-tight">
                    <span className="text-[11px] font-bold text-gray-900 truncate max-w-[120px]">
                      {user?.name}
                    </span>
                    <span className="text-[9px] text-blue-600 font-black uppercase tracking-tighter">
                      {user?.type}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Sair"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
                >
                  <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <User size={20} />
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-none text-left">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      Entrar
                    </span>
                    <span className="text-xs font-black text-gray-700">
                      Minha Conta
                    </span>
                  </div>
                </Link>
              )}
            </div>

            {/* CARRINHO (SÓ APARECE SE LOGADO E MONTADO) */}
            {mounted && isAuthenticated && (
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-all active:scale-90 group"
              >
                <ShoppingCart
                  size={24}
                  className="group-hover:text-blue-600 transition-colors"
                />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* HAMBURGUER (MOBILE) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* BUSCA MOBILE */}
      <div className="md:hidden px-4 pb-4 relative z-20 bg-white">
        <SearchForm isMobile closeMenu={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* NAVEGAÇÃO DESKTOP & MEGA MENU */}
      <nav className="hidden lg:block border-t border-gray-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="group static">
            <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
              <Menu size={18} />
              Todas Categorias
            </button>

            <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000] h-[500px]">
              <div className="max-w-7xl mx-auto h-full flex border-x border-gray-100 bg-white shadow-2xl">
                <div className="w-1/4 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                  {categoriesData.map((cat) => (
                    <div
                      key={cat.slug}
                      onMouseEnter={() => setActiveTab(cat.slug)}
                      className={`flex items-center justify-between px-6 py-3.5 cursor-pointer transition-colors ${
                        activeTab === cat.slug
                          ? "bg-white text-blue-600 border-l-4 border-blue-600 font-bold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm">
                        <DynamicIcon name={cat.icon} size={18} />
                        {cat.label}
                      </div>
                      <ChevronRight
                        size={14}
                        className={
                          activeTab === cat.slug ? "opacity-100" : "opacity-30"
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="w-3/4 p-8 overflow-y-auto bg-white">
                  {categoriesData.map((cat) => (
                    <div
                      key={cat.slug}
                      className={
                        activeTab === cat.slug
                          ? "block animate-in fade-in duration-300"
                          : "hidden"
                      }
                    >
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
                          <Link
                            key={sub.slug}
                            href={`/c/${cat.slug}/${sub.slug}`}
                            className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all"
                          >
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center ml-2">
            {mainCategories.map((cat) => (
              <div key={cat.slug} className="group static">
                <button className="relative flex items-center gap-2 px-4 py-4 text-gray-600 hover:text-blue-600 font-medium transition-all text-sm border-b-2 border-transparent hover:border-blue-600 z-[1001]">
                  <DynamicIcon name={cat.icon} size={18} />
                  <span>{cat.label}</span>
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform opacity-40"
                  />
                </button>

                <div className="absolute top-full left-0 w-full hidden group-hover:block animate-in fade-in duration-200 z-[1000]">
                  <div className="bg-white shadow-2xl border-t border-gray-100">
                    <div className="max-w-7xl mx-auto p-8 flex gap-10">
                      <div className="w-64 flex-shrink-0 border-r border-gray-100 pr-10 flex flex-col items-center text-center">
                        <div className="mb-4 p-5 bg-blue-50 rounded-2xl text-blue-600">
                          <DynamicIcon name={cat.icon} size={48} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-1">
                          {cat.label}
                        </h3>
                        <Link
                          href={`/c/${cat.slug}`}
                          className="mt-4 w-full bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold py-3 rounded-xl hover:bg-blue-700 transition-all text-center"
                        >
                          Ver Tudo
                        </Link>
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-x-6 gap-y-1 self-start">
                        {cat.children?.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/c/${cat.slug}/${sub.slug}`}
                            className="text-gray-500 hover:text-blue-600 text-[13px] py-1 flex items-center gap-2 transition-all hover:pl-1"
                          >
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            {sub.label}
                          </Link>
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

      {/* MENU LATERAL MOBILE */}
      <div
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white z-[1000] transform transition-transform duration-300 lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <span className="text-xl font-black text-blue-600">MENU</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="p-4">
          {categoriesData.map((cat) => (
            <div key={cat.slug} className="border-b border-gray-50">
              <button
                onClick={() =>
                  setActiveMobileCategory(
                    activeMobileCategory === cat.slug ? null : cat.slug,
                  )
                }
                className={`flex items-center justify-between w-full p-4 rounded-xl transition-all ${
                  activeMobileCategory === cat.slug
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 font-bold text-sm">
                  <DynamicIcon name={cat.icon} size={20} />
                  {cat.label}
                </div>
                <ChevronRight
                  size={18}
                  className={
                    activeMobileCategory === cat.slug ? "rotate-90" : ""
                  }
                />
              </button>
              {activeMobileCategory === cat.slug && (
                <div className="bg-gray-50 flex flex-col py-2 rounded-b-xl animate-in slide-in-from-top-2">
                  {cat.children?.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/c/${cat.slug}/${sub.slug}`}
                      className="px-12 py-3 text-sm text-gray-500 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
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

"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Importe o usePathname
import Link from "next/link"; // Use o Link do Next.js
import Cookies from "js-cookie";
import { LayoutDashboard, Users, ShoppingBag, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Pega a rota atual (ex: /admin/usuarios)

  const handleLogout = () => {
    // 1. Remove o cookie
    Cookies.remove("token", { path: "/" });

    // 2. Limpa o cache de rotas do Next.js
    router.push("/");

    // 3. Força um refresh total da janela para limpar a memória do navegador
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="font-black text-xl">N</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden lg:block">
            NexusOS
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {/* O active agora é dinâmico comparando com o pathname */}
          <NavItem
            href="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={pathname === "/admin"}
          />
          <NavItem
            href="/admin/usuarios"
            icon={<Users size={20} />}
            label="Usuários"
            active={pathname.startsWith("/admin/usuarios")}
          />
          <NavItem
            href="/admin/produtos"
            icon={<ShoppingBag size={20} />}
            label="Produtos"
            active={pathname.startsWith("/admin/produtos")}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 p-3 flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium hidden lg:block">Sair</span>
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-end px-8 gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-md" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

// Componente NavItem atualizado com Link e lógica de Active
function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: any;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
      flex items-center gap-3 p-3.5 rounded-xl transition-all group
      ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }
    `}
    >
      {icon}
      <span className="font-medium hidden lg:block">{label}</span>
    </Link>
  );
}

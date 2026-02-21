import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import categoriesData from "@/data/categorias.json";
import { Suspense } from "react";
// Importe o CartProvider que gerencia os itens
import { CartProvider } from "@/context/CartContext"; 
import { UIProvider } from "@/context/UIContext";
import CartDrawerWrapper from "@/components/cart/CartDrawerWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 1. O CartProvider envolve tudo para que todos saibam quantos itens existem */
    <CartProvider>
      <UIProvider>
        
        <CartDrawerWrapper />

        <Suspense fallback={<div className="h-20 bg-white border-b" />}>
          <Navbar categoriesData={categoriesData} />
        </Suspense>

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        
      </UIProvider>
    </CartProvider>
  );
}
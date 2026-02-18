import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
// Importe o JSON aqui no Layout
import categoriesData from "@/data/categorias.json";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Ecommerce | Papelaria e Informática",
  description: "A melhor loja de variedades com entrega rápida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {/* A Navbar é colocada aqui para aparecer em TODAS as páginas */}
        <Suspense fallback={<div className="h-20 bg-white border-b" />}>
          <Navbar categoriesData={categoriesData} />
        </Suspense>

        {/* O 'main' recebe as páginas específicas. 
            O padding-bottom opcional ajuda a não encostar no rodapé */}
        <main className="min-h-screen">
          {children}
        </main>


        <Footer /> {/* O Footer é colocado aqui para aparecer em TODAS as páginas */}
      </body>
    </html>
  );
}
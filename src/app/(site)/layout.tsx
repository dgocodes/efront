// src/app/(site)/layout.tsx
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import categoriesData from "@/data/categorias.json";
import { Suspense } from "react";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-white border-b" />}>
        <Navbar categoriesData={categoriesData} />
      </Suspense>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
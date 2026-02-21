// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css"; // Ajuste o caminho se necessário

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meu Ecommerce",
  description: "Loja de variedades",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* Aqui as classes devem bater EXATAMENTE com o que o navegador espera */}
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}

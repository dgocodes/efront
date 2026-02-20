// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Agora 'data' já vem tipado como LoginResponse
      const data = await loginRequest(email, senha);

      // Cookies.set("token", data.token, { expires: 1, path: "/" });
      // Cookies.set("refreshToken", data.refreshToken, { expires: 7, path: "/" }); 
      // Cookies.set("userType", data.tipo, { expires: 1, path: "/" });

      // Redirecionamento
      if (data.tipo === "Admin") {
        router.push("/admin");
      } else if (data.tipo === "Rca" || data.tipo === "Televendas") {
        router.push("/vendedor");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      // O erro lançado pelo 'throw new Error' lá no serviço cai aqui
      alert(error.message);
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">ECOMMERCE</h1>
          <p className="text-slate-500 text-sm mt-2">
            Entre com suas credenciais
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-blue-200 transition-all transform active:scale-[0.98]"
          >
            Acessar Painel
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/lib/authService"; // Importe o serviço padronizado

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Chama o serviço. A API C# já vai setar os Cookies HttpOnly automaticamente
      const data = await authService.login(email, senha);

      // 2. Redirecionamento baseado no tipo retornado
      // Dica: Use letras minúsculas ou enums para evitar erros de case-sensitive
      if (data.tipo === "Admin" && !callbackUrl) {
        router.push("/admin");
      } else if (callbackUrl) {
        // Em vez de sempre mandar para a home, manda para a URL de origem
        router.push(callbackUrl);
      }

      // Força um refresh para garantir que o middleware do Next perceba os novos cookies
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
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
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
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
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              placeholder="••••••••"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all transform active:scale-[0.98] disabled:bg-slate-400"
          >
            {loading ? "Autenticando..." : "Acessar Painel"}
          </button>
        </form>
      </div>
    </div>
  );
}

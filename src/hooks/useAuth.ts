import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { cartService } from '@/lib/cart';

// 1. Definição da Interface do Usuário
export interface AuthUser {
  name: string;
  type: string;
  erpId: string;
  initials: string;
}


export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndSync = async () => {
      // Lemos os cookies configurados pelo C#
      const userType = Cookies.get('userType');
      const userName = Cookies.get('username');
      const erpId = Cookies.get('erpId');
      const token = Cookies.get('token');

      if (userName && userType) {
        const name = userName || "Usuário";

        setUser({
          name: name,
          type: userType,
          erpId: erpId || "",
          initials: name.substring(0, 1).toUpperCase()
        });

        // --- LÓGICA DE SINCRONIZAÇÃO DO CARRINHO ---
        try {
          const localCartRaw = localStorage.getItem('cart-storage');

          if (localCartRaw) {
            const parsedCart = JSON.parse(localCartRaw);

            // Tenta pegar os itens (ajustado para suportar array puro ou Zustand persist)
            const items = parsedCart.state?.items || (Array.isArray(parsedCart) ? parsedCart : null);

            if (items && items.length > 0 && token) {
              await cartService.syncCart(items, token);
              // Limpa o storage após o sucesso para evitar loops de sincronização
              localStorage.removeItem('cart-storage');
              console.log("🛒 Carrinho sincronizado com sucesso!");
            }
          }
        } catch (error) {
          console.error("❌ Erro na sincronização do carrinho:", error);
        }
        // -------------------------------------------

      } else {
        setUser(null);
      }
      setLoading(false);
    };

    loadUserAndSync();
  }, []);

  // Função para Logout
  const logout = () => {
    // 1. Define quais caminhos EXIGEM login (ex: painel administrativo)
    const rotasRestritas = ['/admin', '/dashboard', '/minha-conta', '/checkout'];

    // 2. Verifica se a página onde ele está agora é uma dessas rotas
    const estaEmRotaRestrita = rotasRestritas.some(rota =>
      window.location.pathname.startsWith(rota)
    );

    // 3. Limpa todos os cookies
    const options = { path: '/' };
    Cookies.remove('token', options);
    Cookies.remove('refreshToken', options);
    Cookies.remove('userType', options);
    Cookies.remove('username', options);
    Cookies.remove('erpId', options);

    setUser(null);

    // 4. Decisão de redirecionamento
    if (estaEmRotaRestrita) {
      // Se ele deslogou dentro do painel, ele TEM que ir para o login
      window.location.href = '/login';
    } else {
      // Se ele está na home ou vendo um produto, apenas recarrega a página
      // Isso vai esconder os preços e mudar a Navbar para "Minha Conta"
      window.location.reload();
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.type === 'Admin',
    loading,
    logout
  };
}
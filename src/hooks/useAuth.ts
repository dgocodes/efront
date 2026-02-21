import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { cartService } from '@/lib/cartService';

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

    // Evita execução no server-side
    if (typeof window === 'undefined') return;

    const loadUserAndSync = async () => {
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

        // --- LÓGICA DE SINCRONIZAÇÃO REFATORADA ---
        try {
          const localCartRaw = localStorage.getItem('cart-storage');

          if (localCartRaw) {
            const parsedCart = JSON.parse(localCartRaw);
            // Suporta Zustand persist ou Array puro
            const items = parsedCart.state?.items || (Array.isArray(parsedCart) ? parsedCart : null);

            // Verificamos o token aqui apenas para garantir que a API não retorne 401 à toa
            if (items && items.length > 0 && token) {
              // ✅ Chamada limpa: o service usa a api.ts que já tem o token
              await cartService.syncCart(items);

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

  const logout = () => {
    const rotasRestritas = ['/admin', '/dashboard', '/minha-conta', '/checkout'];
    const estaEmRotaRestrita = rotasRestritas.some(rota =>
      window.location.pathname.startsWith(rota)
    );

    const options = { path: '/' };
    Cookies.remove('token', options);
    Cookies.remove('refreshToken', options);
    Cookies.remove('userType', options);
    Cookies.remove('username', options);
    Cookies.remove('erpId', options);

    setUser(null);

    if (estaEmRotaRestrita) {
      window.location.href = '/login';
    } else {
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
// services/authService.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5080/api";
const API_URL = `${BASE_URL}/usuarios`; // Ajuste se o seu endpoint de login for diferente

export interface LoginResponse {
  token: string;
  tipo: string;
  refreshToken: string;
}

export const authService = {
  // Realizar Login
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Credenciais inválidas ou erro no servidor');
    }

    return response.json();
  },

  // Realizar Refresh do Token (Gera novos cookies de acesso)
  refresh: async (cookieHeader?: string): Promise<Response> => {
    console.log("🔄 Tentando renovar token via authService.refresh() com cookieHeader:", cookieHeader);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Se o cookieHeader vier (chamada do Middleware), nós o injetamos
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }

    return await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: headers,
      credentials: 'include', // Necessário para o Navegador
    });
  },

  // Logout
  logout: async () => {
    // É boa prática avisar a API para invalidar o RefreshToken no banco
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).catch(() => { }); // Ignora erro se falhar o aviso

    // O redirecionamento e limpeza de estado ficam no componente
    return true;
  }
};
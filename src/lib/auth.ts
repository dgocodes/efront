const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginResponse {
  token: string;
  tipo: string;
  refreshToken: string;
}

export async function loginRequest(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: senha }),
    credentials: 'include' // Garante que cookies sejam enviados/recebidos mesmo em domínios diferentes
  });

  // Se a resposta não for 200...
  if (!response.ok) {
    // Tenta pegar a mensagem de erro da API .NET
    const errorData = await response.json().catch(() => ({})); 
    throw new Error(errorData.message || 'Credenciais inválidas ou erro no servidor');
  }

  // Se chegou aqui, o retorno é o JSON com token, tipo, etc.
  return response.json();
}
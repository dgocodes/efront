// lib/api.ts
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7000';

export const api = {
  async post(endpoint: string, body: any) {
    const token = Cookies.get('token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Injeta o token se ele existir
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Sessão expirada!");
      }
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    return response.json();
  },

  async get<T>(endpoint: string): Promise<T> {
    const token = Cookies.get('token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json(); // No fetch, o .json() já devolve o objeto T
  },

  async getById<T>(endpoint: string, id: string): Promise<T> {
    return this.get<T>(`${endpoint}/${id}`);
  },
};
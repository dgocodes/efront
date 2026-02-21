// // services/usuarioService.ts

// // Dica: Mantenha a URL base no env e o recurso (/usuarios) fixo no serviço
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5080/api";
// const API_URL = `${BASE_URL}/usuarios`;

// export interface UserFilters {
//   search?: string;
//   page?: number;
//   pageSize?: number;
// }

// export enum EUserType {
//   Admin = 0,
//   User = 1,
//   Guest = 2
// }

// export interface RegisterUserCommand {
//   email: string;
//   password: string;
//   nome: string;
//   erpId: string;
//   tipo: EUserType;
//   sessionActive?: boolean; // Opcional para controle de sessão
// }

// export const usuarioService = {
//   // Listar com busca e paginação
//   getAll: async ({ search = '', page = 1, pageSize = 3 }: UserFilters) => {
//     const params = new URLSearchParams({
//       search,
//       page: String(page),
//       pageSize: String(pageSize)
//     });
    
//     const res = await fetch(`${API_URL}?${params.toString()}`, { 
//       method: 'GET',
//       credentials: "include" 
//     });
    
//     if (!res.ok) throw new Error("Erro ao carregar usuários");
//     return res.json();
//   },

//   // Criar Novo
//   create: async (userData: RegisterUserCommand) => {
//     const res = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//       credentials: "include"
//     });
    
//     if (!res.ok) throw new Error("Erro ao criar usuário");
//     return res.json();
//   },

//   // Atualizar Existente
//   update: async (id: string | number, userData: any) => {
//     const res = await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//       credentials: "include"
//     });
    
//     if (!res.ok) throw new Error("Erro ao atualizar usuário");
//     return res.json();
//   },

//   // Deletar
//   delete: async (id: string | number) => {
//     const res = await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//       credentials: "include"
//     });
    
//     if (!res.ok) throw new Error("Erro ao deletar usuário");
//     return true;
//   }
// };

// services/usuarioService.ts
import { api } from '@/lib/api';

export interface UserFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export enum EUserType {
  Admin = 0,
  User = 1,
  Guest = 2
}

export interface RegisterUserCommand {
  email: string;
  password: string;
  nome: string;
  erpId: string;
  tipo: EUserType;
  sessionActive?: boolean;
}

export const userService = {
  getAll: async ({ search = '', page = 1, pageSize = 3 }: UserFilters) => {
    const params = new URLSearchParams({
      search,
      page: String(page),
      pageSize: String(pageSize)
    });
    return api.get<any>(`/usuarios?${params.toString()}`, { credentials: 'include' });
  },

  create: async (userData: RegisterUserCommand) => {
    return api.post<any>('/usuarios', userData, { credentials: 'include' });
  },

  update: async (id: string | number, userData: any) => {
    return api.put<any>(`/usuarios/${id}`, userData, { credentials: 'include' });
  },

  delete: async (id: string | number) => {
    return api.delete<boolean>(`/usuarios/${id}`, { credentials: 'include' });
  }
};
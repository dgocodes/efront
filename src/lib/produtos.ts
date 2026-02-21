import { Produto, SearchResponse } from '@/types/Produto';
import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetcher genérico com tratamento de erro e suporte a cache do Next.js
 */
async function fetchFromApi<T>(
  endpoint: string, 
  params?: URLSearchParams, 
  options: RequestInit = {}
): Promise<T> {
  // Garante que não haja barras duplas na URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${API_URL}${cleanEndpoint}`);
  
  if (params) {
    url.search = params.toString();
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Debug] ${options.method || 'GET'}: ${url.toString()}`);
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: { 
      'Content-Type': 'application/json', 
      ...options.headers 
    },
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'Sem corpo de erro');
    throw new Error(`Erro na API (${res.status}): ${res.statusText} - ${errorBody}`);
  }

  return res.json();
}

export interface SearchFilters {
  query?: string;
  filters?: string | string[]; 
  sort?: string;
  page?: number;
  limit?: number;
  slug?: string;
}

/**
 * Busca principal de produtos com suporte a filtros complexos
 */
export async function getProdutos(filters: SearchFilters): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();

  // Paginação e Ordenação
  if (filters.limit) urlParams.append('pageSize', String(filters.limit));
  if (filters.page) urlParams.append('page', String(filters.page));
  if (filters.sort) urlParams.append('sort', filters.sort);
  if (filters.query) urlParams.append('query', filters.query);

  // Lógica de Filtros Únicos (evita duplicidade na URL)
  const filterSet = new Set<string>();
  
  const processFilterValue = (val: string | string[]) => {
    const items = Array.isArray(val) ? val : val.split('_');
    items.forEach(f => {
      if (f && f.trim()) filterSet.add(f.trim());
    });
  };

  if (filters.slug) processFilterValue(filters.slug);
  if (filters.filters) processFilterValue(filters.filters);

  filterSet.forEach(f => urlParams.append('filters', f));

  // Retornamos o JSON direto (objeto plano), sem instanciar classes
  return fetchFromApi<SearchResponse>('/produtos', urlParams, { 
    cache: 'no-store' 
  });
}

export async function getProdutoById(id: string): Promise<Produto> {
  return api.get<Produto>(`/produtos/${id}`); 
}

/**
 * Atalho para buscar produtos da Home (Mais Vendidos, etc)
 */
export async function getHomeProducts(
  sort = 'mais-vendidos',
  pageSize = 10,
  filters: string[] = []
): Promise<SearchResponse> {
  return getProdutos({
    sort,
    limit: pageSize,
    filters
  });
}

/**
 * Busca produtos por uma Tag específica
 */
export async function getProdutosPorTag(tag: string): Promise<SearchResponse> {
  const urlParams = new URLSearchParams({ tag });
  return fetchFromApi<SearchResponse>('/produtos', urlParams);
}
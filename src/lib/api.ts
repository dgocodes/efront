import { SearchResponse } from '@/types/Produto';
import { Console } from 'console';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchFromApi<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
  const url = `${API_URL}${endpoint}${params ? `?${params.toString()}` : ''}`;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Debug] Fetching: ${url}`);
  }

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'No body');
    throw new Error(`Erro na API: ${res.statusText} - ${errorBody}`);
  }

  return res.json();
}

export interface SearchFilters {
  query?: string;
  filters?: string; // Agora recebemos a string "valor1_valor2"
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getProdutos(filters: SearchFilters): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();

  // 1. Configura paginação e busca
  urlParams.append('pageSize', String(filters?.limit || 20));
  if (filters.query) urlParams.append('query', filters.query);
  if (filters.page) urlParams.append('page', String(filters.page));
  if (filters.sort) urlParams.append('sort', filters.sort);

  console.log('Parâmetros recebidos para busca:', filters);

  // 2. Trata a string de filtros com "_" e converte para múltiplos params de API
  if (filters.filters) {
    const filtersArray = filters.filters.split('_');
    filtersArray.forEach(f => {
      if (f) urlParams.append('filters', f);
    });
  }

  const data = await fetchFromApi<SearchResponse>('/products', urlParams);
  return new SearchResponse(data);
}

// Para a Home (mantendo suporte ao array se você chamar direto no código)
export async function getHomeProducts(
  sort: string = 'mais-vendidos', 
  pageSize: number = 10, 
  filters: string[] = [],
  cache: boolean = true,
  cacheDuration: number = 600
): Promise<SearchResponse> {
  
  const urlParams = new URLSearchParams({
    sort: sort,
    pageSize: pageSize.toString()
  });

  filters.forEach(filter => {
    if (filter) urlParams.append('filters', filter);
  });

  const fetchOptions: RequestInit = {
    method: 'GET',
    ...(cache ? { next: { revalidate: cacheDuration } } : { cache: 'no-store' })
  };

  const res = await fetch(`${API_URL}/products?${urlParams.toString()}`, fetchOptions);
  
  if (!res.ok) throw new Error("Erro ao buscar produtos da home");
  
  return res.json();
}

export async function getProdutosPorTag(tag: string): Promise<SearchResponse> {
  const urlParams = new URLSearchParams({ tag });
  return fetchFromApi<SearchResponse>('/products', urlParams);
}
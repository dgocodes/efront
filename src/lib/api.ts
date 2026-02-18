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
  filters?: string; 
  sort?: string;
  page?: number;
  limit?: number;
  slug?: string; // Novo campo para categoria
}

export async function getProdutos(filters: SearchFilters): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();

  // 1. Configura paginação e busca
  urlParams.append('pageSize', String(filters?.limit || 20));
  if (filters.query) urlParams.append('query', filters.query);
  if (filters.page) urlParams.append('page', String(filters.page));
  if (filters.sort) urlParams.append('sort', filters.sort);

  console.log('Parâmetros recebidos para busca:', filters);

// Criamos um Set para evitar filtros duplicados na URL
  const uniqueFilters = new Set<string>();

  // Adiciona o slug primeiro, se ele existir
  if (filters.slug) {
     filters.slug.split('_').forEach(f => {
      if (f) uniqueFilters.add(f);
    });
  }

  // Adiciona os outros filtros vindos da string separada por "_"
  if (filters.filters) {
    filters.filters.split('_').forEach(f => {
      if (f) uniqueFilters.add(f);
    });
  }

  // Joga tudo para o URLSearchParams como múltiplos parâmetros 'filters'
  uniqueFilters.forEach(f => {
    urlParams.append('filters', f);
  });

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
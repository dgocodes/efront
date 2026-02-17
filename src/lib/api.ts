import { SearchResponse } from '@/types/Produto';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper para evitar repetição de lógica de fetch
async function fetchFromApi<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
  const url = `${API_URL}${endpoint}${params ? `?${params.toString()}` : ''}`;
  
  // Log apenas em dev
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Debug] Fetching: ${url}`);
  }

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'No body');
    console.error(`[API Error] Status: ${res.status} em ${url}. Detalhe: ${errorBody}`);
    throw new Error(`Erro na API: ${res.statusText}`);
  }

  return res.json();
}

export interface SearchFilters {
  query?: string;
  marcas?: string;
  categoria?: string | string[];
  tags?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getProdutos(filters: SearchFilters): Promise<SearchResponse> {
  const urlParams = new URLSearchParams();

  // Campos que devem ser transformados em filters[]
  const arrayFields = ['marca', 'categoria', 'tags', 'embalagem'];

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (arrayFields.includes(key)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) urlParams.append('filters', item.toString());
        });
      } else {
        urlParams.append('filters', value.toString());
      }
    } else {
      // Campos normais: q, page, limit, sort
      urlParams.append(key, value.toString());
    }
  });

  console.log('URL Params construídos:', urlParams.toString());

  const data = await fetchFromApi<SearchResponse>('/products', urlParams);
  
  console.log('Resposta da API:', data);
  // A MÁGICA ACONTECE AQUI:
  // Agora garantimos que o objeto segue as regras do seu constructor
  return new SearchResponse(data);
}

export async function getProdutosPorTag(tag: string): Promise<SearchResponse> {
  const urlParams = new URLSearchParams({ tag });
  return fetchFromApi<SearchResponse>('/products', urlParams);
}
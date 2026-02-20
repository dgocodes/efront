export class SearchResponse {
  items: Produto[];
  facets: Facet[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  processingTimeMs: number;

  constructor(data?: Partial<SearchResponse>) {
    this.items = data?.items?.map(i => new Produto(i)) || [];
    this.facets = data?.facets?.map(f => new Facet(f)) || [];
    this.currentPage = data?.currentPage ?? 0;
    this.pageSize = data?.pageSize ?? 0;
    this.totalCount = data?.totalCount ?? 0;
    this.processingTimeMs = data?.processingTimeMs ?? 0;
  }
}

export class Produto {
  id: string;
  nome: string;
  codigo_barras: string;
  marca: string;
  preco: number;
  estoque: number;

  constructor(data?: Partial<Produto>) {
    this.id = data?.id ?? '';
    this.nome = data?.nome ?? '';
    this.codigo_barras = data?.codigo_barras ?? '';
    this.marca = data?.marca ?? '';
    this.preco = data?.preco ?? 0;
    this.estoque = data?.estoque ?? 0;
  }
}

export class Facet {
  facet: string;
  options: FacetOption[];

  constructor(data?: Partial<Facet>) {
    this.facet = data?.facet ?? '';
    this.options = data?.options?.map(o => new FacetOption(o)) || [];
  }
}

export class FacetOption {
  description: string;
  quantity: number;
  applyLink: string;
  selected: boolean;
  subLevels: FacetOption[];

  constructor(data?: Partial<FacetOption>) {
    this.description = data?.description ?? '';
    this.quantity = data?.quantity ?? 0;
    this.applyLink = data?.applyLink ?? '';
    this.selected = data?.selected ?? false;
    this.subLevels = data?.subLevels?.map(s => new FacetOption(s)) || [];
  }
}

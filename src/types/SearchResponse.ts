import { Facet } from "./Facet";
import { Produto } from "./Produto";

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



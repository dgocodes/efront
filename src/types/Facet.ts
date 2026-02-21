import { FacetOption } from "./FacetOption";


export class Facet {
  facet: string;
  options: FacetOption[];

  constructor(data?: Partial<Facet>) {
    this.facet = data?.facet ?? '';
    this.options = data?.options?.map(o => new FacetOption(o)) || [];
  }
}

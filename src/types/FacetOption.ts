
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

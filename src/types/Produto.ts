
export class Produto {
  id: string;
  nome: string;
  codigo_barras: string;
  marca: string;
  preco: number;
  estoque: number;
  InfAdicionais: string;
  descricao_html: string;

  constructor(data?: Partial<Produto>) {
    this.id = data?.id ?? '';
    this.nome = data?.nome ?? '';
    this.codigo_barras = data?.codigo_barras ?? '';
    this.marca = data?.marca ?? '';
    this.preco = data?.preco ?? 0;
    this.estoque = data?.estoque ?? 0;
    this.InfAdicionais = data?.InfAdicionais ?? '';
    this.descricao_html = data?.descricao_html ?? '';
  }
}

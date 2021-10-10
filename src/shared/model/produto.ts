export class Produto {
  id: string;
  nome: string;
  quantidade: number;
  detalhe: string;
  categoria: string;
  valor: number;
  valorFormatado: string;
  imagemURL: any;
  imagemSRC: String;
  CategoriaId: string;
}

export class Carrinho {
  id: string;
  nome: string;
  quantidade: number = 1;
  detalhe: string;
  valor: number;
  valorFormatado?: string;
  imagemURL: any;
  imagemSRC?: string;
  ValorTotalProdutosSelecionados?: number;
  ValorTotalTodosProdutosSelecionados: number;
  QdtTotalProdutosSelecionados?: number;
}

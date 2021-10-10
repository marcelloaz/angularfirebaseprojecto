import { Injectable, Input } from '@angular/core';
import { OrderRequest } from 'src/shared/model/wirecard/request/OrderRequest';
import { Constants} from 'src/environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from 'src/shared/model/wirecard/Item';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Carrinho } from 'src/shared/model/produto';

@Injectable({
providedIn: 'root'
})

export class CarrinhoService {

apiUrl = "";
private itens: Observable<Carrinho[]>;
private _compromissos: BehaviorSubject<Carrinho[]>;
private _dataStoreItemCarrinho: BehaviorSubject<Carrinho[]>;
@Input() private totalItem: number;
private item: Carrinho[];
@Input() itensx: Carrinho[];

private itemCarrinho: Carrinho;
private dataStore: {
  compromissos: Carrinho[]
}

private dataStoreItemCarrinho: {
  items: Array<Carrinho>
}

constructor(private http: HttpClient,
private _cookieService: CookieService) {
this.dataStore = { compromissos: [] };
this._compromissos = new BehaviorSubject<Carrinho[]>([]);

this.dataStoreItemCarrinho = { items: [] };
this._dataStoreItemCarrinho = new BehaviorSubject<Carrinho[]>([]);


}

get getCompromissos(): Observable<Carrinho[]> {
  return this._compromissos.asObservable();
}

get getCarrinhos(): Observable<Carrinho[]> {
  return this._dataStoreItemCarrinho.asObservable();
}

compromissoPorId(id: string){
  return this.dataStore.compromissos.find(x => x.id == id);
}

// adicionarNovoCompomissoMedico(compromisso: Carrinho): Promise<Carrinho> {
//   return new Promise((resolver, reject) => {
//     compromisso.id = (this.dataStore.compromissos.length + 1).toString();
//     compromisso = this.setObservacao(compromisso);
//     this.dataStore.compromissos.push(compromisso);
//     this._compromissos.next(Object.assign({}, this.dataStore).compromissos);
//     this._cookieService.set('','');
//     resolver(compromisso);
//   });
// }

adicionarNovoItemCarrinho(item: Carrinho): Promise<Carrinho> {
  return new Promise((resolver, reject) => {
    item.ValorTotalTodosProdutosSelecionados = item.valor;
    this.dataStoreItemCarrinho.items.push(item);
    this._cookieService.delete('items');
    this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
    this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
  resolver(item);
});
}

getItemCarrinho(): Promise<Carrinho[]> {

  return new Promise((resolver, reject) => {
  var items = this._cookieService.get('items');
  let itenArray = [];

  if(items != null)
  {
    itenArray = JSON.parse(items);
    this.dataStoreItemCarrinho.items = itenArray;
    this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
    resolver(itenArray);
  }
  else
  {
    this.dataStoreItemCarrinho.items = new Array<Carrinho>();
  }
});
}

removerrNovoItemCarrinho(item: Carrinho): Promise<Carrinho> {
  return new Promise((resolver, reject) => {
  let index = this.dataStoreItemCarrinho.items.indexOf(item);
  this.dataStoreItemCarrinho.items.splice(0, 1);
  this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
  this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
  resolver(item);
});
}

updateQdtCarrinho(item: Carrinho): Promise<Carrinho>{
  return new Promise((resolver, reject) => {
    this.itens.pipe(compromisso =>
    this.itens = compromisso
    ).subscribe(x => this.itensx = x.filter((value: Carrinho) => value.id === item.id));

  let index = this.dataStoreItemCarrinho.items.indexOf(this.itensx[0]);

  if(index == -1){
    this.adicionarNovoItemCarrinho(this.itensx[0]);
  }else{
    this.dataStoreItemCarrinho.items[index].quantidade = item.quantidade;
    this.dataStoreItemCarrinho.items[index].ValorTotalTodosProdutosSelecionados = (item.valor * item.quantidade);
    this._cookieService.delete('items');
    this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
    this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
  }
  });
}



updateSaveItemCarrinho(item: Carrinho): Promise<Carrinho>{
  return new Promise((resolver, reject) => {
    this.itens.pipe(compromisso =>
    this.itens = compromisso
    ).subscribe(x => this.itensx = x.filter((value: Carrinho) => value.id === item.id));

  let index = this.dataStoreItemCarrinho.items.indexOf(this.itensx[0]);

 // this.itensx[0].ValorTotalTodosProdutosSelecionados = this.itensx[0].valor * this.itensx[0].valor;


  this.itensx.forEach(element => {
    element.ValorTotalTodosProdutosSelecionados = element.valor * element.quantidade;
  });

  if(index == -1){
    this.adicionarNovoItemCarrinho(this.itensx[0]);
  }else{
    this.dataStoreItemCarrinho.items[index].quantidade += 1;
    this.dataStoreItemCarrinho.items[index].valor = (item.valor * item.quantidade);
    this.dataStoreItemCarrinho.items[index].ValorTotalTodosProdutosSelecionados = (item.valor * this.itensx.length);

    console.log(this.dataStoreItemCarrinho.items[index].ValorTotalTodosProdutosSelecionados);
    this._cookieService.delete('items');

    this.dataStoreItemCarrinho.items.forEach(element => {
      element.ValorTotalTodosProdutosSelecionados = element.valor * element.quantidade;
    });


    this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
    this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
  }
});
}

itemPorId(id: string){
  return this.dataStoreItemCarrinho.items.find(x => x.id == id);
}

getProjectByName(name: String) {
  return this.dataStore.compromissos.filter(x => x.nome === "Rocambole").map(x => console.log(x));
}

addCompromisso(AddCompromisso: Item): Observable<Item> {
  AddCompromisso = this.setObservacao(AddCompromisso);
  return this.http.post<Item>(`${this.apiUrl}/compromissos`, AddCompromisso);
}

UpdateCompromisso(UpdateCompromisso: Item): Observable<Item> {

  return this.http.put<Item>(`${this.apiUrl}/compromissos`, UpdateCompromisso);
}

setObservacao(compromisso: Item): Item
{
// var dtFinal = this.datePipe.transform(compromisso.Consulta.DataHoraFinal,"yyyy-MM-dd");
// var dtInicio = this.datePipe.transform(compromisso.Consulta.DataHoraIncial,"yyyy-MM-dd");
// var dataInicialFormat = dtInicio + 'T' + compromisso.Consulta.HoraInicio + ':00';
// var dataFinalFormat = dtFinal + 'T' + compromisso.Consulta.HoraFinal + ':00';

// compromisso.Consulta.DataHoraIncial = new Date(dataInicialFormat);
// compromisso.Consulta.DataHoraFinal = new Date(dataFinalFormat);

//    var observacao = " Data hora inicio tratamento " +
//                       compromisso.Consulta.DataHoraIncial +
//                      " e Data hora fim tratamento " +  compromisso.Consulta.DataHoraFinal;

//    compromisso.Observacao = observacao;
return compromisso;
}

VerificaCarrinhoVazio(): boolean{
  this.getItemCarrinho();
  this.getCarrinhos.pipe(result => this.itens = result).subscribe( x => this.itensx = x);
  if(this.itensx.length > 0){
  let valuesQdt = this.itensx.map(x =>  this.totalItem = x.quantidade);
  const accumulatorQdt = (acc, curr) => acc + curr;
  this.totalItem = valuesQdt.reduce(accumulatorQdt);
  if(this.totalItem == -1)
  return true;
  else
  return false;
  }else
  return true;
}

addProject(orderRequest: OrderRequest): Observable<OrderRequest> {
return this.http.post<OrderRequest>(Constants.apiRoot + 'itens', orderRequest);
}
}

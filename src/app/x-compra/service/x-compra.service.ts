import { Injectable } from '@angular/core';
import { environment, Constants } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from 'src/shared/model/wirecard/Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/shared/core/auth.service';
import { OrderRequest } from 'src/shared/model/wirecard/request/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class XCompraService {

  apiUrl = "environment.apiUrl";
  private _compromissos: BehaviorSubject<Item[]>;
  private _dataStoreItemCarrinho: BehaviorSubject<Item[]>;

  private dataStore: {
    compromissos: Item[]
  }

  private dataStoreItemCarrinho: {
    items: Array<Item>
  }

  constructor(private http: HttpClient, private _authService: AuthService){}

  // constructor(private http: HttpClient, private datePipe: DatePipe,  private _authService: AuthService, private _cookieService: CookieService) {
  //   this.dataStore = { compromissos: [] };
  //   this._compromissos = new BehaviorSubject<Item[]>([]);

  //   this.dataStoreItemCarrinho = { items: [] };
  //   this._dataStoreItemCarrinho = new BehaviorSubject<Item[]>([]);
  // }


  getCategorias(): Observable<Item[]> {

    var accessToken = this._authService.getAccessToken();
    var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Item[]>(Constants.apiRoot + 'Itens', { headers: headers });
}

getCategoriasMoidos(): Observable<Item[]> {

  var accessToken = this._authService.getAccessToken();
  var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  return this.http.get<Item[]>(Constants.apiRoot + 'Itens/' + '1', { headers: headers });
}

getCategoriasDefumados(): Observable<Item[]> {

  var accessToken = this._authService.getAccessToken();
  var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  return this.http.get<Item[]>(Constants.apiRoot + 'Itens/' + '2', { headers: headers });
}


get getCompromissos(): Observable<Item[]> {
    return this._compromissos.asObservable();
  }

get getCarrinhos(): Observable<Item[]> {
    return this._dataStoreItemCarrinho.asObservable();
  }

addProject(orderRequest: OrderRequest): Observable<OrderRequest> {
    return this.http.post<OrderRequest>(Constants.apiRoot + 'Projects', orderRequest);
  }

compromissoPorId(id: string){
    return this.dataStore.compromissos.find(x => x.id == id);
  }

carregarTodosCompromissos() {
    const usersUrl = 'http://marcello-001-site4.etempurl.com/api/compromissos';
    var accessToken = this._authService.getAccessToken();
    var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Item[]>(Constants.apiRoot + 'Itens', { headers: headers })
      .subscribe(data => {
        this.dataStore.compromissos = data;
        this._compromissos.next(Object.assign({}, this.dataStore).compromissos);
      }, error => {
        console.log('Falha ao carregar a agenda.');
      });


    // return this.http.get<Item[]>(usersUrl)
    //   .subscribe(data => {
    //     this.dataStore.compromissos = data;
    //     this._compromissos.next(Object.assign({}, this.dataStore).compromissos);
    //   }, error => {
    //     console.log('Falha ao carregar a agenda.');
    //   });
  }

  // filtrar(valor: string): Promise<Item[]>{
  //   // return new Promise((resolver, reject) => {
  //   //   let item = this.dataStore.compromissos.filter(x => x.Product.indexOf('Ro') !== -1);
  //   //   resolver(item);
  //   // });
  // }

adicionarNovoCompomissoMedico(compromisso: Item): Promise<Item> {
    return new Promise((resolver, reject) => {
      compromisso.id = (this.dataStore.compromissos.length + 1).toString();
      compromisso = this.setObservacao(compromisso);
      this.dataStore.compromissos.push(compromisso);
      this._compromissos.next(Object.assign({}, this.dataStore).compromissos);
      resolver(compromisso);
    });
  }

adicionarNovoItemCarrinho(item: Item): Promise<Item> {
    return new Promise((resolver, reject) => {
      item.id = (this.dataStoreItemCarrinho.items.length + 1).toString();
      this.dataStoreItemCarrinho.items.push(item);
      this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      resolver(item);
    });
  }

removerrNovoItemCarrinho(item: Item): Promise<Item> {
    return new Promise((resolver, reject) => {
      let index = this.dataStoreItemCarrinho.items.indexOf(item);
      this.dataStoreItemCarrinho.items.splice(0, 1);
      this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      resolver(item);
    });
}

updateItemCarrinho(item: Item): Promise<Item>{
    return new Promise((resolver, reject) => {
      let index = this.dataStoreItemCarrinho.items.indexOf(item);
      //item.quantity += 1;
      item.price = ( item.price * item.quantity);
      this.dataStoreItemCarrinho.items[index] = item;
    });
}

itemPorId(id: string){
    return this.dataStoreItemCarrinho.items.find(x => x.id == id);
}

  // getProjectByName(name: String) {
  //   return this.dataStoreItemCarrinho.items.filter(x => x.Product === 'Rocombole').map(x => console.log(x));
  // }

getProjectByName(name: String) {
    return this.dataStore.compromissos.filter(x => x.product === "Rocambole").map(x => console.log(x));
}

  // itemPorNome(nome: string){
  //   return this.dataStore.compromissos.map(projects => projects.filter(proj => proj === name));
  //   //.filter( x => x.Product === nome);
  // }

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
    //    console.log(compromisso.Observacao);
       return compromisso;
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/wirecard/Item';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private itens: Observable<Item[]>;
  private _compromissos: BehaviorSubject<Item[]>;
  private _dataStoreItemCarrinho: BehaviorSubject<Item[]>;
  private itemCarrinho: Item;

  @Input() private totalItem: number;
  private item: Item[];
  @Input() itensx: Item[];

  private dataStore: {
    compromissos: Item[]
  }

  private dataStoreItemCarrinho: {
    items: Array<Item>
  }

  constructor(private http: HttpClient, private _cookieService: CookieService) {
    this.dataStore = { compromissos: [] };
    this._compromissos = new BehaviorSubject<Item[]>([]);

    this.dataStoreItemCarrinho = { items: [] };
    this._dataStoreItemCarrinho = new BehaviorSubject<Item[]>([]);
  }


  getItemCarrinho(): Promise<Item[]> {
    return new Promise((resolver, reject) => {
      let itenArray = JSON.parse(this._cookieService.get('items'));
      this.dataStoreItemCarrinho.items = itenArray;
      this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      resolver(itenArray);
    });
  }

  removerrNovoItemCarrinho(item: Item): Promise<Item> {
    return new Promise((resolver, reject) => {
      let index = this.dataStoreItemCarrinho.items.indexOf(item);
      this.dataStoreItemCarrinho.items.splice(0, 1);
      this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
      this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      resolver(item);
    });
  }

  updateQdtCarrinho(item: Item): Promise<Item>{
    return new Promise((resolver, reject) => {
      this.itens.pipe(compromisso =>
        this.itens = compromisso
    ).subscribe(x => this.itensx = x.filter((value: Item) => value.id === item.id));

      let index = this.dataStoreItemCarrinho.items.indexOf(this.itensx[0]);
      if(index == -1){
         this.adicionarNovoItemCarrinho(this.itensx[0]);
      }else{
          this.dataStoreItemCarrinho.items[index].quantity = item.quantity;
          this.dataStoreItemCarrinho.items[index].priceTotal = (item.price * item.quantity);
          this._cookieService.delete('items');
          this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
          this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      }
    });
  }

  updateSaveItemCarrinho(item: Item): Promise<Item>{
    return new Promise((resolver, reject) => {
      this.itens.pipe(compromisso =>
        this.itens = compromisso
    ).subscribe(x => this.itensx = x.filter((value: Item) => value.id === item.id));

      let index = this.dataStoreItemCarrinho.items.indexOf(this.itensx[0]);
      if(index == -1){
         this.adicionarNovoItemCarrinho(this.itensx[0]);
      }else{
          this.dataStoreItemCarrinho.items[index].quantity += 1;
          this.dataStoreItemCarrinho.items[index].priceTotal = (item.price * item.quantity + 1);

          this._cookieService.delete('items');
          this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
          this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      }
    });
  }

  itemPorId(id: string){
    return this.dataStoreItemCarrinho.items.find(x => x.id == id);
  }

  adicionarNovoItemCarrinho(item: Item): Promise<Item> {
    return new Promise((resolver, reject) => {
      this.dataStoreItemCarrinho.items.push(item);
      this._cookieService.delete('items');
      this._cookieService.set('items',JSON.stringify(this.dataStoreItemCarrinho.items));
      this._dataStoreItemCarrinho.next(Object.assign({}, this.dataStoreItemCarrinho).items);
      resolver(item);
    });
  }


}

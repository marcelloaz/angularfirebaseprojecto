import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Carrinho } from 'src/shared/model/produto';
import { Item } from 'src/shared/model/wirecard/Item';
import { CarrinhoService } from '../../service/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  public totalItem: number;
  private itens: Observable<Carrinho[]>;
  private itensCarrinho: Carrinho[];

  constructor(
    private _cookieService: CookieService,
    private _carrinhoService: CarrinhoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    
    this._carrinhoService.getItemCarrinho();
    this._carrinhoService.getCarrinhos.pipe(result => this.itens = result).subscribe( x => this.totalItem = x.length);
    this.itens.subscribe(x => this.totalItem = x.reduce((sum, current) => sum + current.quantidade, 0));
    
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });


}
}

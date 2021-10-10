import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Carrinho } from 'src/shared/model/produto';
import {
  ICreateOrderRequest,
  IPayPalConfig,
} from 'projects/ngx-paypal-lib/src/public_api';
import { CarrinhoService } from '../../service/carrinho.service';

declare var hljs: any;

@Component({
  selector: 'app-detalhe-carrinho',
  templateUrl: './detalhe-carrinho.component.html',
  styleUrls: ['./detalhe-carrinho.component.scss'],
})
export class DetalheCarrinhoComponent implements OnInit {
  public totalItem: number;
  public totalValorItem: number;
  public itens: Observable<Carrinho[]>;
  public itensCarrinho: Array<Carrinho>;
  public valorTotalAPagar: number;

  public _item: Carrinho;

  public totalAPagar: number;

  @Input()
  set item(value: Carrinho) {
    this._item = Object.create(value || null);
  }
  get item(): Carrinho {
    return this._item;
  }

  public defaultPrice: string = '9.99';
  public payPalConfig?: IPayPalConfig;

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public readonly npmCode = `npm install ngx-paypal --save`;

  public readonly moduleInstallation = `
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
imports: [
  NgxPayPalModule,
  ...
],
})
`;

  public readonly initPaypalCode = `this.payPalConfig = {
currency: 'BRL',
clientId: 'AUmP4X5D-JQqitEStD1aGhEDztlpVrYUnxZD4OOcQnSihJdcP0CLTcLI46JawdIrk6q_W8_T6E1648LK',
createOrderOnClient: (data) => <ICreateOrderRequest>{
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'BRL',
        value: '9.99',
        breakdown: {
          item_total: {
            currency_code: 'BRL',
            value: '9.99'
          }
        }
      },
      items: [
        {
          name: 'Enterprise Subscription',
          quantity: '1',
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: 'BRL',
            value: '9.99',
          },
        }
      ]
    }
  ]
},
advanced: {
  commit: 'true'
},
style: {
  label: 'paypal',
  layout: 'vertical'
},
onApprove: (data, actions) => {
  console.log('onApprove - transaction was approved, but not authorized', data, actions);
  actions.order.get().then(details => {
    console.log('onApprove - you can get full order details inside onApprove: ', details);
  });
},
onClientAuthorization: (data) => {
  console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  this.showSuccess = true;
},
onCancel: (data, actions) => {
  console.log('OnCancel', data, actions);
},
onError: err => {
  console.log('OnError', err);
},
onClick: (data, actions) => {
  console.log('onClick', data, actions);
},
};`;

  public readonly htmlCode = `<ngx-paypal [config]="payPalConfig"></ngx-paypal>`;

  public readonly usageCodeTs = `
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
templateUrl: './your.component.html',
})
export class YourComponent implements OnInit {

public payPalConfig?: IPayPalConfig;

ngOnInit(): void {
  this.initConfig();
}

private initConfig(): void {
  ${this.initPaypalCode}
}
}
`;

  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;
  @Output() onChange: EventEmitter<Carrinho> = new EventEmitter<Carrinho>();

  constructor(
    private _cookieService: CookieService,
    private _carrinhoService: CarrinhoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializa();
    this.openSnackBar('Suas delícias.', 'x');
    //this.initConfig('9.99');
  }

  ngAfterViewInit(): void {
    this.prettify();
  }

  changePrice(): void {
    if (this.priceElem) {
      this.initConfig(this.priceElem.nativeElement.value);
    }
  }

  private initConfig(price: string): void {
    this.payPalConfig = {
      currency: 'BRL',
      clientId:
        'AUmP4X5D-JQqitEStD1aGhEDztlpVrYUnxZD4OOcQnSihJdcP0CLTcLI46JawdIrk6q_W8_T6E1648LK',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'BRL',
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: 'BRL',
                    value: price,
                  },
                },
              },
              items: [
                {
                  name: 'SEU APP REALTIME ',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'BRL',
                    value: price,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data, actions) => {
        console.log('onInit', data, actions);
      },
    };
  }

  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  private prettify(): void {
    hljs.initHighlightingOnLoad();
  }

  inicializa(): void {
    this._carrinhoService.getItemCarrinho();
    this._carrinhoService.getCarrinhos
      .pipe((result) => (this.itens = result))
      .subscribe((x) => {
        (this.itensCarrinho = x), (this.totalItem = x.length);
      });
    this.calcularTotal();
  }

  calcularTotal(): void {
    let totalizador = Array<number>();
    this.itensCarrinho.forEach((element) => {
      totalizador.push(element.valor * element.quantidade);
      console.log('element.ValorTotalTodosProdutosSelecionados');
    });

    var sumNumber = totalizador.reduce((acc, cur) => acc + Number(cur), 0);
    this.totalAPagar = sumNumber;

    let valorTotaoCarrinho = sumNumber.toString();

    this.initConfig(valorTotaoCarrinho);

    this.openSnackBar('Carrinho atualizado!', 'x');
  }

  modelChanged(item) {
    this.calcularTotal();
    //this.inicializa();

    if (this._item.quantidade == 0) {
      this._carrinhoService.removerrNovoItemCarrinho(this._item);

      if (this._carrinhoService.VerificaCarrinhoVazio())
        this.router.navigate(['']);
    } else {
      this._carrinhoService.updateQdtCarrinho(this._item);
    }

    if (this._carrinhoService.VerificaCarrinhoVazio()) {
      this._carrinhoService.adicionarNovoItemCarrinho(this._item);
    } else {
      let item = this._carrinhoService.itemPorId(this._item.id);
      if (!item) this._carrinhoService.adicionarNovoItemCarrinho(this._item);
      else this._carrinhoService.updateSaveItemCarrinho(this._item);
    }

    this.openSnackBar('Carrinho atualizado!', 'x');
  }

  RemoverItemCarrinho(): void {
    this._carrinhoService.removerrNovoItemCarrinho(this.item);
    this.calcularTotal();
    if (this._carrinhoService.VerificaCarrinhoVazio())
      this.router.navigate(['']);

    this.openSnackBar('Produto removido do carrinho!', 'x');
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // AdicionarDialog(): void {
  //   let dialogRef = this.dialog.open(ItemAddComponent, {
  //     width: '970px'
  //   });
  // }
}

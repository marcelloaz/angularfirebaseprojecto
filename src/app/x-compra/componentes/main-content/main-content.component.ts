import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Item } from 'src/shared/model/wirecard/Item';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatDialog,
  SimpleSnackBar,
  MatSnackBarRef,
} from '@angular/material';
import { gsap } from 'gsap';

import {
  BehaviorSubject,
  Observable,
  pipe,
  from,
  interval,
  merge,
  range,
} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { Carrinho, Produto } from 'src/shared/model/produto';
import { formatNumber } from '@angular/common';
import { CarrinhoService } from '../../service/carrinho.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  imgSrc: any;
  tutorials: Array<Produto>;
  _items: Array<Item>;
  _item: Item;
  public itens: Observable<Produto[]>;
  private itensCarrinho: Item[];
  paramPesquisa: string;
  itemExistenteCarrinho: Item[];
  valorTotal: number;
  private itemCarrinho: Item;
  descricaoPage: string;
  private itensFilter: Produto[];
  private itensFilterOriginalValue: Carrinho[] = [];
  private carrinhoTemp: Carrinho;

  private tipo: number;

  @ViewChild('someVar') el: ElementRef;

  @ViewChild('divMouseOver', { static: false }) divOverEvents: ElementRef;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private tutorialService: FirebaseDbrtService
  ) {} // this.reset();}

  ngAfterViewInit() {
    this.StartText();
  }

  StartText(): void {
    const { nativeElement } = this.elementRef;
    // this.buttonIni.nativeElement.focus();
    const elements = nativeElement;
    var tl = gsap.timeline();
    //console.log(this.divOverEvents.nativeElement);

    tl.to(this.divOverEvents.nativeElement, {
      duration: 1.5,
      ease: 'back.out(1.7)',
      x: -1000,
    });
    tl.from(
      this.divOverEvents.nativeElement,
      {
        duration: 3.8,
        opacity: 0,
        scale: 0,
        x: 2100,
        rotationX: 190,
        ease: 'back',
        stagger: 1.01,
      },
      '+=0'
    );
  }

  ngOnInit(): void {
    this.carregaItens();

    this.openSnackBar('Seja muito bem vindo.', 'x');
  }

  carregaItens(): void {
    this.tutorialService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tutorials = data;
        this.tutorials.forEach((element) => {
          var teste = formatNumber(element.valor, 'pt-PT.d', '1.2-2');
        });
      });
  }

  title = 'Seu App';

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  iniAnime(): void {
    // const { nativeElement } = this.elementRef;
    // this.divTexto1View.nativeElement.focus();
    // const elements = nativeElement;
    // const firstImage = this.divTexto1View.nativeElement.focus();
    // const menu = gsap.timeline();
    // console.log('gsap teste');
    // console.log(this.divTexto1View.nativeElement.focus());
    // menu.from(firstImage, 2, { y: 550, duration: .25, opacity:'0', ease:"Expo.easeInOut"}, 1.5);
    // setTimeout(() => menu.pause(),5000);
    // const firstImage = elements.querySelector("a");
    // const menu = gsap.timeline();
    //  menu.from(firstImage, 2, {duration: .1,opacity:'100', rotation:'-180', ease:"Expo.easeInOut"},1.5);
    //  menu.from(firstImage, 2, { x: 0, ease:"Expo.easeInOut"},2.5);
  }

  iniAnimeMouseOver(): void {
    const { nativeElement } = this.elementRef;
    this.divOverEvents.nativeElement.focus();
    const elements = nativeElement;

    const firstImage = elements.querySelectorAll('a');
    const menu = gsap.timeline();

    menu.from(
      firstImage,
      2,
      { y: 550, duration: 0.25, opacity: '0', ease: 'Expo.easeInOut' },
      1.5
    );
    setTimeout(() => menu.pause(), 5000);
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  AdiciarItemCarrinho(id: string): void {
    //console.log('log');

    var totalIntem = 0;
    this.itens = of(this.tutorials);

    this.itens
      .pipe((compromisso) => (this.itens = compromisso))
      .subscribe(
        (x) =>
          (this.itensFilter = x.filter((value: Produto) => value.id === id))
      ); //itensFilter => filtra todos itens
    this.itensFilter.forEach((x) => {
      this.carrinhoTemp = new Carrinho();
      this.carrinhoTemp.id = x.id;
      this.carrinhoTemp.nome = x.nome;
      this.carrinhoTemp.quantidade = x.quantidade;
      this.carrinhoTemp.detalhe = x.detalhe;
      this.carrinhoTemp.valor = x.valor;
      this.carrinhoTemp.imagemURL = x.imagemURL;

      this.itensFilterOriginalValue.push(this.carrinhoTemp);
    });

    if (this._carrinhoService.VerificaCarrinhoVazio()) {
      this._carrinhoService.adicionarNovoItemCarrinho(this.carrinhoTemp);
    } else {
      let item = this._carrinhoService.itemPorId(id);
      if (!item)
        this._carrinhoService.adicionarNovoItemCarrinho(this.carrinhoTemp);
      else this._carrinhoService.updateSaveItemCarrinho(this.carrinhoTemp);
    }

    this.openSnackBar('Item adicionado ao carrinho.', 'x');
  }
}

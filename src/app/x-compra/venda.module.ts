import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { XCompraComponent } from './x-compra.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { MainContentComponent } from './componentes/main-content/main-content.component';
import { MaterialModule } from 'src/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { CarrinhoService } from './service/carrinho.service';
import { DetalheCarrinhoComponent } from './componentes/carrinho/detalhe-carrinho.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'projects/ngx-paypal-lib/src/public_api';
import { NotificaClienteComponent } from './componentes/notifica-cliente/notifica-cliente.component';

const routes: Routes = [
  {
    path: '', component: XCompraComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: 'carrinho', component: DetalheCarrinhoComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [XCompraComponent, ToolbarComponent, SidenavComponent, MainContentComponent, CarrinhoComponent, DetalheCarrinhoComponent, NotificaClienteComponent],
  providers: [FirebaseDbrtService, CarrinhoService,DatePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPayPalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VendaModule { }

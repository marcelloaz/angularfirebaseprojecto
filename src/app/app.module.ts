import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@angular/flex-layout';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';

import {
  registerLocaleData,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPayPalModule } from 'projects/ngx-paypal-lib/src/public_api';
import { MessagingService } from 'src/shared/core/messaging.service';
import { MaterialModule } from 'src/shared/material.module';
import { AngularFireStorage } from '@angular/fire/storage';

registerLocaleData(ptBr);

const routes: Routes = [
  {
    path: 'venda',
    loadChildren: () =>
      import('./x-compra/venda.module').then((m) => m.VendaModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./x-admin/x-admin.module').then((m) => m.XAdminModule),
  },
  { path: '**', redirectTo: 'venda' },
];

@NgModule({
  declarations: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT', useClass: PathLocationStrategy },
    CookieService,
    MessagingService,
    AngularFireStorage,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule, // for database
    NgxPayPalModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

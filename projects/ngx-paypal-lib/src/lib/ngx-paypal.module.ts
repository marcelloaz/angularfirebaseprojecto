import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgxPaypalComponent } from './components/paypal.component';
import { ScriptService } from './services/script.service';
import { PayPalScriptService } from './services/paypal-script.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxPaypalComponent,
  ],
  exports: [
    NgxPaypalComponent,
  ],
  providers: [
    ScriptService,
    PayPalScriptService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxPayPalModule {
}



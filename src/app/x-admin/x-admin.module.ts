import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { XAdminComponent } from './x-admin.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { MainContentComponent } from './componentes/main-content/main-content.component';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from 'src/shared/core/item.service';
import { ItemAddComponent } from './componentes/item-add/item-add.component';
import { FooterAdmComponent } from './componentes/footer-adm/footer-adm.component';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { ItemUpdateComponent } from './componentes/item-update/item-update.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { CadastroComponent } from './componentes/usuario/cadastro/cadastro.component';
import { CategoriaDbfireService } from 'src/shared/core/Categoria/categoria-dbfire.service';
const routes: Routes = [
  {
    path: '',
    component: XAdminComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
        canActivate: [FirebaseDbrtService],
      },
      {
        path: 'novo',
        component: ItemAddComponent,
        canActivate: [FirebaseDbrtService],
      },
      {
        path: 'categoria',
        component: CategoriaComponent,
        canActivate: [FirebaseDbrtService],
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    ItemAddComponent,
    XAdminComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    FooterAdmComponent,
    ItemUpdateComponent,
    CategoriaComponent,
    CadastroComponent,
  ],
  providers: [FirebaseDbrtService, CategoriaDbfireService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class XAdminModule {}

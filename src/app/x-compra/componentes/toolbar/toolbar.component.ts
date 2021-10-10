import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatDialog,
  MatSnackBar,
} from '@angular/material';
import { Item } from 'src/shared/model/wirecard/Item';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/core/auth.service';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  // @ViewChild("logo", {static:false }) divView: ElementRef;
  @Output() toggleSidenav = new EventEmitter<void>();
  private itens: Observable<Item[]>;
  private itensx: Item[];
  public userLogado: string;
  constructor(
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar,
    private router: Router,
    private blogAdminSVC: FirebaseDbrtService
  ) {
    this.userLogado = blogAdminSVC.obterPerfilUsarioLogado()?.email;
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  login() {
    this.router.navigate(['/admin/']);
    //this._authService.login();
  }

  home() {
    this.router.navigate(['/venda/']);
    //this._authService.login();
  }

  logout() {
    // this._authService.logout();
  }

  isLoggedIn() {
    // return this._authService.isLoggedIn();
  }

  abrirAdicionarNovoCompromissoDialog(): void {}

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

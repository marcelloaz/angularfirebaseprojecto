import { Injectable } from '@angular/core';
import { Categoria } from 'src/shared/model/categoria';

import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CategoriaDbfireService {
  private dbPath = '/categoria';
  userLoggedIn: boolean = false;
  loggedInUser: string;
  authUser: any;
  serviceRef: AngularFireList<Categoria> = null;
  tutorials: any;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.serviceRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Categoria> {
    return this.serviceRef;
  }

  create(tutorial: Categoria): any {
    let uuid = UUID.UUID();
    tutorial.id = uuid;
    // tutorial.valorFormatado = formatNumber(tutorial.valor, 'pt-PT.d', '1.2-2');
    return this.serviceRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.serviceRef.update(key, value);
  }

  setItem(key: string, produto: any): Promise<any> {
    return this.serviceRef.set(key, produto);
  }

  delete(key: string): Promise<void> {
    return this.serviceRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.serviceRef.remove();
  }

  setValue(key: string, value: any) {
    this.getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tutorials = data.find((x) => x.key == key);
        this.tutorials = this.setItem(key, value);
      });
  }

  // LOGIN TODO REFATORAR
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }

  register(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        this.alerta(`${error.message} Por favor, tente novamente!`);
      });
  }

  alerta(mensagem: string) {
    this._snackBar.open(mensagem, 'Dance', {
      duration: 2000,
    });
  }

  verifyUser() {
    this.authUser = firebase.auth().currentUser;
    if (this.authUser) {
      let mensagem = `Bem Vindo(a) ${this.authUser.email}`;
      this._snackBar.open(mensagem, 'Dance', {
        duration: 2000,
      });

      this.loggedInUser = this.authUser.email;
      this.userLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  login(loginEmail: string, loginPassword: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch(function (error) {
        console.log(`${error.message} Falha ao entrar. Tente novamente!`);
      });
  }

  logout() {
    this.userLoggedIn = false;
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          this.alerta(`Desconectado!`);
        },
        function (error) {
          this.alerta(`${error.message} Falha de sair. Tente novamente!!`);
        }
      );
  }
}

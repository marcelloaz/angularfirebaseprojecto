import { Injectable } from '@angular/core';
import { Produto } from 'src/shared/model/produto';

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
import { AngularFireFunctions } from '@angular/fire/functions';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDbrtService {
  private dbPath = '/produtos';
  userLoggedIn: boolean = false;
  loggedInUser: string;
  authUser: any;
  serviceRef: AngularFireList<Produto> = null;
  tutorials: any;
  fn: AngularFireFunctions;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fns: AngularFireFunctions
  ) {
    this.serviceRef = db.list(this.dbPath);
  }

  obterPerfilUsarioLogado(): any {
    return firebase.auth().currentUser;
  }

  getAll(): AngularFireList<Produto> {
    return this.serviceRef;
  }

  create(tutorial: Produto) {
    //let storageRef = firebase.storage().ref();
    let uuid = UUID.UUID();
    let uuidCategoria = UUID.UUID();

    const callable = this.fns
      .httpsCallable('addCard')({
        id: uuid,
        nome: tutorial.nome,
        quantidade: tutorial.quantidade,
        detalhe: tutorial.detalhe,
        categoria: tutorial.categoria,
        valor: tutorial.valor,
        valorFormata: tutorial.valorFormatado,
        imagemURL: tutorial.imagemURL,
        imagemSRC: tutorial.imagemSRC,
        categoriaId: uuidCategoria,
      })
      .subscribe((result) => {
        console.log(result);
      });

    // tutorial.id = uuid;
    // tutorial.CategoriaId = uuidCategoria;
    // tutorial.valorFormatado = formatNumber(tutorial.valor, 'pt-PT.d', '1.2-2');
    //return true; //this.serviceRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return null; //this.serviceRef.update(key, value);
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
    //console.log('verificar login');
    this.router.navigate(['/admin/login']);
    return false;
  }

  register(email: string, password: string, token: string) {

//console.log(token);
    const callableMsg = this.fns
    .httpsCallable('Notificar')({
      titulo: "Novo usuário cadastrado",
      mensagem: "Dê as boa vindas ao novo usuário:" + email,
      token: token
    })
    .subscribe((result) => {

    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>
      {


      },

      )
      .catch(function (error) {
        this.alerta(`${error.message} Por favor, tente novamente!`);


      });

      let uuid = UUID.UUID();
      let uuidCategoria = UUID.UUID();

      const callable = this.fns
        .httpsCallable('addUsuario')({
          id: uuid,
          nome: email,
          email: email,
          tokePush: token,
        })
        .subscribe((result) => {


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

  //login área adm
}

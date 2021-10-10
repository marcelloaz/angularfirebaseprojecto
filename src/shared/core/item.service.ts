import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { Produto } from '../model/compra/produto';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  fn: AngularFireFunctions;
  constructor(private fns: AngularFireFunctions) {
    this.fn = fns;
  }

  criarItem(item: Produto) {
    //const callable = this.fn.httpsCallable('addCard');
    let storageRef = firebase.storage().ref();

    // var result = callable({
    //   nome: 'marcello de souza azevedo',
    //   quantidade: '111',
    //   detalhe: 'sdasdasdasd',
    // });

    // console.log(result);

    storageRef
      .child('images/${item.tituloImagem}')
      .putString(item.imagem, 'base64')
      .then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];
        let dbRef = firebase.database().ref('itemPost');
        let newProduto = dbRef.push();
        newProduto.set({
          titulo: item.titulo,
          detalhe: item.detalhe,
          tituloImagem: item.tituloImagem,
          valor: item.valor,
          imagem: url,
          id: item.id,
        });
      })
      .catch((error) => {
        alert('falha upload: ${error}');
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  currentToken = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private _snackBar: MatSnackBar) {
    this.angularFireMessaging.messages.subscribe((_messaging) => {
      // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.currentToken.next(token);

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      //console.log('new message received. ', payload);
      var para = payload as any;
      console.log(payload);
      console.log(para.notification.title);
      this.alerta(para.notification.title)
      this.currentMessage.next(para.notification.title);
    });
  }

  alerta(mensagem: string) {
    this._snackBar.open(mensagem, 'Dance', {
      duration: 2000,
    });
  }
}

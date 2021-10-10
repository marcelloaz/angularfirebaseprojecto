import { Component } from '@angular/core';
import { MessagingService } from 'src/shared/core/messaging.service';
import { MatDialog } from '@angular/material';
import { NotificaClienteComponent } from './x-compra/componentes/notifica-cliente/notifica-cliente.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VendaFacil';
  message;
  constructor(
    private messagingService: MessagingService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    if (this.message.observers.length > 0) {
      this.AdicionarDialog();
    }
  }

  requestPermission() {
    this.messagingService.receiveMessage();
  }

  AdicionarDialog(): void {
    let dialogRef = this.dialog.open(NotificaClienteComponent, {
      width: '970px',
    });
  }
}

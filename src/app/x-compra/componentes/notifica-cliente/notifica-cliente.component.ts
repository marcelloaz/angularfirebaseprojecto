import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-notifica-cliente',
  templateUrl: './notifica-cliente.component.html',
  styleUrls: ['./notifica-cliente.component.scss'],
})
export class NotificaClienteComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<NotificaClienteComponent>) {}

  ngOnInit(): void {}

  fechar() {
    this.dialogRef.close(null);
  }
}

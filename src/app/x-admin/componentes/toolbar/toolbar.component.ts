import { Component, OnInit } from '@angular/core';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public userLogado: string;
  constructor(private blogAdminSVC: FirebaseDbrtService) {
    this.userLogado = blogAdminSVC.obterPerfilUsarioLogado()?.email;
  }

  ngOnInit(): void {}
}

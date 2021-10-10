import { Component, OnInit } from '@angular/core';
import { CategoriaDbfireService } from 'src/shared/core/Categoria/categoria-dbfire.service';
import { map } from 'rxjs/operators';
import { ItemAddComponent } from '../item-add/item-add.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  tutorials: any;
  constructor(
    private categoriaAdminSVC: CategoriaDbfireService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('categoria');
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.categoriaAdminSVC
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tutorials = data;
        this.tutorials.forEach((element) => {
          console.log(element);
        });
      });
  }

  AdicionarDialog(): void {
    let dialogRef = this.dialog.open(ItemAddComponent, {
      width: '970px',
    });
  }
}

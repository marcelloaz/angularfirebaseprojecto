import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ItemAddComponent } from '../item-add/item-add.component';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { Produto } from 'src/shared/model/produto';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { Observable } from 'rxjs';
import { ItemUpdateComponent } from '../item-update/item-update.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})

export class MainContentComponent implements OnInit {
  message = '';
  imgSrc: any;
  tutorials: any;
  @Input() tutorial: Produto;
  // @Output() refreshListProduto: EventEmitter<any> = new EventEmitter();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Produto = null;
  currentIndex = -1;
  title = '';
  displayedColumns: string[] = ['IMG', 'Titulo', 'Detalhe', 'Valor', 'Acao'];;

  constructor(private storage: AngularFireStorage, private tutorialService: FirebaseDbrtService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  // refreshList(): void {
  //   this.currentTutorial = null;
  //   this.currentIndex = -1;
  //   this.retrieveTutorials();
  // }

  getJobsLessThanPrice(key: string) {
    let dialogRef = this.dialog.open(ItemUpdateComponent, {
      width: '970px',
      data: {
        key: key
      }
    });
  }

  // retrieveTutorial(key: string): void {
  //   this.tutorialService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(_produto => _jobs.filter(job => job.price > price));

  //         c =>
  //         ({ key: c.payload.key, ...c.payload.val() })
  //       )
  //     )

  retrieveTutorials(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (
            { key: c.payload.key, ...c.payload.val() }
          )
        )
      )
      ).subscribe(data => {
        this.tutorials = data;
        this.tutorials.forEach(element => {
        });
      });
  }

  getImg(imgSrcRaw: string) {
    let ref = this.storage.ref(imgSrcRaw);
    this.imgSrc = ref.getDownloadURL();
    return this.imgSrc;
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }


  deleteTutorial(key: string): void {
    this.tutorialService.delete(key)
      .then(() => {
       this.refreshList.emit();
        this.message = 'Falha!';
      })
      .catch(err => console.log(err));
  }


  // removeAllTutorials(): void {
  //   this.tutorialService.deleteAll()
  //     .then(() => this.refreshList())
  //     .catch(err => console.log(err));
  // }


  AdicionarDialog(): void {
    let dialogRef = this.dialog.open(ItemAddComponent, {
      width: '970px'
    });
  }





}

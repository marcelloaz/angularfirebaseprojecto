import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { Produto } from 'src/shared/model/produto';
import { Signup } from 'src/shared/model/signup';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss'],
})
export class ItemUpdateComponent implements OnInit {
  tutorials: any;
  imgTitle: string;
  imageSRC: string;
  postTitle: string;
  content: string;
  produto: Produto;

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  passwordFail: boolean = false;
  signup: Signup;
  public signupForm: FormGroup;

  tutorial: Produto = new Produto();
  submitted = false;

  constructor(
    private storage: AngularFireStorage,
    private blogAdminSVC: FirebaseDbrtService,
    private router: Router,
    private dialogRef: MatDialogRef<ItemUpdateComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.tutorial.imagemURL = this.fb;
              let uuid = UUID.UUID();
              this.tutorial.id = uuid;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  ngOnInit() {
    this.blogAdminSVC
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tutorial = data.find((x) => x.key == this.data.key);
      });

    this.signupForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      detalhe: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      // senha: new FormControl('', [Validators.required,Validators.maxLength(7),Validators.minLength(4)])
    });

    // this.compromisso = this.agendaMedicaService.compromissoPorId(this.data.CompromissosId);

    // this.Compromisso = new Compromisso();
    // this.Compromisso.Consulta = this.compromisso.Consulta;
    // this.Compromisso.Paciente = this.compromisso.Paciente;

    // this.principalForm = new FormGroup({
    //   nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    //   datanascimento: new FormControl(new Date()),
    //   datainicio: new FormControl(new Date()),
    //   datafim: new FormControl(new Date()),
    //   horainicio: new FormControl('', [Validators.required]),
    //   horafim: new FormControl('', [Validators.required]),
    // });
  }

  Atualizar(): void {
    this.tutorial.quantidade = 1;
    this.blogAdminSVC.setValue(this.data.key, this.tutorial);
  }

  fechar() {
    this.dialogRef.close(null);
  }

  fileLoad($event: any) {
    let myReader: FileReader = new FileReader();
    let file: File = $event.target.files[0];
    this.imgTitle = file.name;
    myReader.readAsDataURL(file);

    myReader.onload = (e: any) => {
      this.imageSRC = e.target.result;
    };
  }

  saveTutorial(): void {
    this.blogAdminSVC.create(this.tutorial);
  }
}

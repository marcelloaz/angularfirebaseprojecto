import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/shared/model/produto';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Signup } from 'src/shared/model/signup';
import { UUID } from 'angular2-uuid';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss'],
})
export class ItemAddComponent implements OnInit {
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
    private dialogRef: MatDialogRef<ItemAddComponent>
  ) {}

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
    this.tutorial.quantidade = 1;
    // console.log(this.tutorial);
    this.blogAdminSVC.create(this.tutorial);
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Produto();
    this.tutorial.quantidade = 1;
  }

  public login = (ownerFormValue) => {
    if (this.signupForm.valid) {
      this.passwordFail = true;
      this.saveTutorial();
      //  this.userSVC.login(this.signup.Email, this.signup.Password1);
      //  this.userSVC.verifyUser();
    }
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  };

  cancel() {
    this.router.navigate(['/admin']);
  }

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

  fechar() {
    this.dialogRef.close(null);
  }

  ngOnInit() {
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
  }
}

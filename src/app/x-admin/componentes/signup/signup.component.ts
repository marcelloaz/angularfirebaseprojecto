import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';
import { MessagingService } from 'src/shared/core/messaging.service';
import { Signup } from 'src/shared/model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: Signup;


  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public signupForm: FormGroup;

  message;
  token;
  passwordFail: boolean = false;

  constructor(private _snackBar: MatSnackBar, private userSVC: FirebaseDbrtService, private router: Router,  private messagingService: MessagingService){}

  ngOnInit(): void {
    this.signup = new Signup();
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.signupForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      datanascimento: new FormControl(new Date()),
      email: new FormControl('', [Validators.required,Validators.email, Validators.maxLength(60)]),
      senha: new FormControl('', [Validators.required,Validators.maxLength(7),Validators.minLength(4)]),
      repitasenha: new FormControl('', [Validators.required,Validators.maxLength(7),Validators.minLength(4)]),
    });
  }



  public hasError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public cadastrar = (ownerFormValue) => {

    if (this.signupForm.valid) {

      if (this.signup.Password1 !== this.signup.Password2) {
        this.passwordFail = true;
      } else {
        this.passwordFail = false;
        this.messagingService.requestPermission();
        this.token = this.messagingService.currentToken;

        this.userSVC.register(
          this.signup.Email,
          this.signup.Password1,
          this.token._value
        );

        this.userSVC.verifyUser();
      }


      //this.agendaMedicaService.UpdateCompromisso(this.compromisso).subscribe();
      //this.dialogRef.close(EditCompromissoDialogComponent);
    }
  }

  cancel(){
    this.router.navigate(['/admin/']);
  }

  goHomeLoja(){
    this.router.navigate(['/vendas/']);
  }

}

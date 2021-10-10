import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Signup } from 'src/shared/model/signup';
import { MatSnackBar } from '@angular/material';
import { FirebaseDbrtService } from 'src/shared/core/firebase-dbrt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  passwordFail: boolean = false;
  signup: Signup;
  public signupForm: FormGroup;

  constructor(private _snackBar: MatSnackBar, private userSVC: FirebaseDbrtService, private router: Router){}

  public login = (ownerFormValue) => {
    if (this.signupForm.valid) {
      this.passwordFail = true;
       this.userSVC.login(this.signup.Email, this.signup.Password1);
       this.userSVC.verifyUser();
      }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  registrar(){
    this.router.navigate(['/admin/signup']);
  }

  cancel(){
    this.router.navigate(['/vendas/']);
  }

  ngOnInit(): void {
    this.signup = new Signup();
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email, Validators.maxLength(60)]),
      senha: new FormControl('', [Validators.required])
      // senha: new FormControl('', [Validators.required,Validators.maxLength(7),Validators.minLength(4)])
    });

    //this.userSVC.verifyUser();

  }

}

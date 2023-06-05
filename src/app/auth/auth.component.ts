import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) {
  }
  @ViewChild('authForm', { static: true }) formRef: NgForm;

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  private authObj: Observable<AuthResponseData>;

  switchModes() {
    this.isLoginMode = !this.isLoginMode;
    this.formRef.reset();

  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return
    }
    const email = authForm.value.email;
    const password = authForm.value.password
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authObj = this.authService.signUp(email, password);
    } else {

      this.authObj = this.authService.login(email, password);
    }


    this.authObj.subscribe(respData => {
      console.log(respData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);


    }, errorMessageResp => {
      this.isLoading = false;
      this.errorMessage = errorMessageResp;
      console.log(this.errorMessage);


    });

    authForm.reset();

  }
  removeError() {
    this.errorMessage = null;

  }
  ngOnInit(): void {
  }





}



import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showSpinner: boolean;
  constructor(private authSer: AuthenticationService, private routes: Router) { }

  ngOnInit() {
  }
  loginFacebook() {
    this.showSpinner = true;
    this.authSer.loginFacebook().then((resp) => {}).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
  loginGoogle() {
    this.showSpinner = true;
    this.authSer.loginWithGoogle().then((resp) => {
      console.log('login sucess', resp);
    }).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
  login(): void {
    this.showSpinner = true;
    this.authSer.loginWithEmailAndPass(this.email, this.password).then((resp) => {
      console.log('login sucess', resp);
    }).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
}

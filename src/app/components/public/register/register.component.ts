import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  showSpinner: boolean = false;
  email: string;
  password: string;
  constructor(private authSer: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  registerWithFacebook() {
    this.showSpinner = true;
    this.authSer.registerWithFacebook().then((resp) => {
      console.log('register sucess', resp);
    }).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
  registerWithGooogle() {
    this.showSpinner = true;
    this.authSer.registerWithGoogle().then((resp) => {
      console.log('register sucess', resp);
    }).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
  registerWithEmailAndPass(): void {
    this.showSpinner = true;
    this.authSer.registerWithEmailAndPass(this.email, this.password).then((resp) => {
      console.log('register sucess', resp);
    }).catch((err) => {}).finally(() => { this.showSpinner = false; });
  }
}

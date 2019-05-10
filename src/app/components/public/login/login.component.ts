import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private authSer: AuthenticationService,private routes: Router) { }

  ngOnInit() {
  }
  loginFacebook() {
    this.authSer.loginFacebook().then((resp) => { 
      console.log('login sucess', resp);
  }).catch((err) => {}).finally(() => { });
  }
}

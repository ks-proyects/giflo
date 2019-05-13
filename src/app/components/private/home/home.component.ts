import { Component, OnInit } from '@angular/core';
import { PushMessagingService } from 'src/app/services/push-messaging.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DaoUserService } from 'src/app/dao/dao-user.service';
import { User } from 'src/app/model/user';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  title = 'giflo';
  msg: any = {};
  isRegister:boolean = false;
  currentUser: any = {fullNames: ''};
  constructor(
    private auth: AuthenticationService,
    private fpm: PushMessagingService,
    private userDao: DaoUserService,
    private router: Router) {
      this.auth.authState().subscribe(
        (result) => {
          if ( result && result.uid) {
            this.userDao.findById(result.uid).then((doc) => {
              if (doc.exists) {
                this.currentUser = doc.data();
                this.isRegister = true;
                this.fpm.requestPermission();
                this.fpm.updateToken(doc.data().user);
                this.fpm.listen();
                this.msg = this.fpm.subject;
              } else {
                this.currentUser = {};
                this.isRegister = false;
              }
            }).catch((error) => {
              console.log('Error en el guardia:', error);
            });
          } else {
            this.currentUser = {};
            this.isRegister = false;
          }
        },
        (error) => {
          this.currentUser = {};
          this.isRegister = false;
          console.log('Error Home: ', error)
        });
  }

  ngOnInit() {
  }
  requestPermission() {
    this.fpm.requestPermission();
    this.fpm.listen();
    this.msg = this.fpm.subject;
  }
  
  requestPermission3() {
    this.fpm.requestPermission3();
  }
  requestPermission4() {
    this.fpm.listen();
  }
  logout() {
    this.auth.logout().then(() => { console.log('logout sucess'); }).catch((err) => {}).finally(() => { });
  }
}

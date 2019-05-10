import { Component, OnInit } from '@angular/core';
import { PushMessagingService } from 'src/app/services/push-messaging.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  title = 'giflo';
  msg: any = {};
  constructor(private authSer: AuthenticationService,private fpm: PushMessagingService ) { }

  ngOnInit() {
  }

  requestPermission() {
    this.fpm.requestPermission();
    this.fpm.listen();
    this.msg = this.fpm.subject;
  }
  requestPermission2() {
    this.fpm.requestPermission2();
  }
  requestPermission3() {
    this.fpm.requestPermission3();
  }
  requestPermission4() {
    this.fpm.listen();
  }
  logout(){
    this.authSer.logout().then(() => { console.log('logout sucess'); }).catch((err) => {}).finally(() => { });
  }
  

}

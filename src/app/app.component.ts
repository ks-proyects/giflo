import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { PushMessagingService } from './services/push-messaging.service';
import { SwUpdate } from '@angular/service-worker';
import { AuthenticationService } from './services/authentication.service';
import { MediaMatcher, BreakpointObserver } from '@angular/cdk/layout';
import { DaoUserService } from './dao/dao-user.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title: any = 'Giflo';
  isRegister: any = false;
  mobileQuery: MediaQueryList;
  currentUser: User;
  msg: any = {};
  isSmallScreen: any = false;
  fillerNav = [
    {
      url: 'home',
      label: 'Principal'
    },
    {
      url: 'about',
      label: 'Acerca de Nosotros'
    },
    {
      url: 'contact',
      label: 'Contacto'
    }
  ];
  fillerContent = Array.from({
          length: 1
      }, () =>
      `Esta es una aplicacion enfocada a los pequeños negociantes de flore.`);
  private mobileQueryListener: () => void;
  constructor(
      private swUpdate: SwUpdate,
      private auth: AuthenticationService,
      private fpm: PushMessagingService,
      private userDao: DaoUserService,
      private media: MediaMatcher,
      private changeDetectorRef: ChangeDetectorRef) {
      if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe(async () => {
              if (confirm('Existe una nueva versión desea actualizar?')) {
                  window.location.reload();
              }
          });
      }
      this.auth.authState().subscribe(
          (result) => {
              if (result && result.uid) {
                  this.userDao.findById(result.uid).then((doc) => {
                      if (doc.exists) {
                          this.currentUser = doc.data().user;
                          this.isRegister = true;
                          this.fpm.requestPermission();
                          this.fpm.updateToken(doc.data().user);
                          this.fpm.listen();
                          this.msg = this.fpm.subject;
                      } else {
                          this.currentUser = null;
                          this.isRegister = false;
                      }
                  }).catch((error) => {
                      console.log('app.component.ts ', error);
                  });
              } else {
                  this.currentUser = null;
                  this.isRegister = false;
              }
          },
          (error) => {
              this.currentUser = null;
              this.isRegister = false;
              console.log('app.component.ts: ', error);
          });
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
  logout() {
    this.auth.logout().then(() => {
        this.isRegister = false;
        console.log('logout sucess'); 
    }).catch((err) => {}).finally(() => { });
  }
}

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PushMessagingService } from 'src/app/services/push-messaging.service';
import { DaoUserService } from 'src/app/dao/dao-user.service';
import { Router } from '@angular/router';

/** @title Responsive sidenav */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnDestroy {

  title = 'giflo';
  msg: any = {};
  isRegister:boolean = false;
  currentUser: any = {fullNames: ''};

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

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


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
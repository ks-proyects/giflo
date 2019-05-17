import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PushMessagingService } from 'src/app/services/push-messaging.service';
import { DaoUserService } from 'src/app/dao/dao-user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

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
  currentUser: User;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from({length: 1}, () =>
      `Esta es una aplicacion enfocada a los pequeños negociantes de flore.`);

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    private auth: AuthenticationService,
    private fpm: PushMessagingService,
    private userDao: DaoUserService,
    private router: Router) {

      this.auth.authState().subscribe(
        (result) => {
          if ( result && result.uid) {
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
              console.log('Error en el guardia:', error);
            });
          } else {
            this.currentUser = null;
            this.isRegister = false;
          }
        },
        (error) => {
          this.currentUser = null;
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
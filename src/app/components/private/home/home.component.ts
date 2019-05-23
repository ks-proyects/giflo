import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { BaseComponent } from '../../base.component';

/** @title Responsive sidenav */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements OnInit {
  title: any = 'Giflo';
  msg: any = {};
  isSmallScreen: any = false;
  currentUser: User;
  fillerContent = Array.from({
          length: 1
      }, () =>
      `Esta es una aplicacion enfocada a los pequeños negociantes de flore.`);
  constructor(
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService,
    private router: Router) {
        super(med, cdr);
        this.currentUser = this.auth.user();
  }
  ngOnInit() {
  }
  logout() {
    this.auth.logout().then(() => {
    }).catch((err) => {}).finally(() => { });
  }
  
}
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { PushMessagingService } from 'src/app/shared/services/push-messaging.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements OnInit {
  
  msg: any = {};
  fillerContent = Array.from({
          length: 1
      }, () =>
      `Esta es una aplicacion enfocada a los pequeños negociantes de flores.`);
  constructor(
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fpm: PushMessagingService ) {
        super(med, cdr);
        this.msg = this.fpm.subject;
  }
  ngOnInit() {
  }
}
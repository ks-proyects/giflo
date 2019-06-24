import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../shared/services/auth.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements OnInit {
  fillerContent = Array.from({
          length: 1
      }, () =>
      `Esta es una aplicacion enfocada a los pequeños negociantes de flores.`);
  constructor(
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private auth: AuthService) {
        super(med, cdr);
  }
  ngOnInit() {
  }
}
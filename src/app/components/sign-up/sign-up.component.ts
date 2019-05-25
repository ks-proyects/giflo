import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef) {
      super(med, cdr);
  }

  ngOnInit() {
  }

}

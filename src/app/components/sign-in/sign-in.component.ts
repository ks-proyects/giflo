import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent extends BaseComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cgdr: ChangeDetectorRef) {
      super(med, cgdr);
  }

  ngOnInit() {
  }

}

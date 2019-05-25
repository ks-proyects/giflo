import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { BaseComponent } from '../base.component';

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

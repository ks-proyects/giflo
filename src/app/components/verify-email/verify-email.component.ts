import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.less']
})
export class VerifyEmailComponent extends BaseComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef) {
      super(med, cdr);
  }

  ngOnInit() {
  }

}

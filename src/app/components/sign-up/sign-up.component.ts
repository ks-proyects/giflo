import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../shared/services/auth.service';
import { UserDBService } from '../../shared/datasource/user.db.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public ds: UserDBService,
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef) {
      super(med, cdr);
  }

  ngOnInit() {
    this.ds.initFormUser();
  }

  registerByEmailPass() {
    if (this.ds.formRegister.valid) {
      this.authService.registerByEmailPass(this.ds.formRegister.value.email, this.ds.formRegister.value.pass);
    }
  }
}

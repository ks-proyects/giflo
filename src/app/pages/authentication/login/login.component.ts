import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  isMovile = false;
  public form: FormGroup;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private fb: FormBuilder, private router: Router,
    public authSer: AuthenticationService,
    private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.isMovile = result.matches ? true : false;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    try {
      this.authSer.loginWithEmailPass(this.form.value.email, this.form.value.password);
    } catch (error) {
      console.log(error);
    }
  }
}

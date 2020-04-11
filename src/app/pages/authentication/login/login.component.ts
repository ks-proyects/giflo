import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DeviceService } from 'src/app/shared/device.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  public form: FormGroup;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private fb: FormBuilder, private router: Router,
    public authSer: AuthenticationService,
    public device: DeviceService) {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public authSer: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }

  onSubmit() {
    try {
      this.authSer.resetPasswordInit(this.form.value.email).then(daa => this.router.navigate(['/authentication/login']));
    } catch (error) {
      console.log(error);
    }
  }
}

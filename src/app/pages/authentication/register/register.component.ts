import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';

const passwordForm = new FormControl('', Validators.required);
const confirmPasswordForm = new FormControl('', Validators.required);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router, public authSer: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: passwordForm,
      confirmPassword: confirmPasswordForm
    }, { validator: this.checkPasswords });
  }

  onSubmit() {
    try {
      this.authSer.registerByEmailPass(this.form.value.email, this.form.value.password);
    } catch (error) {
      console.log(error);
    }
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }
}

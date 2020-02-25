import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  implements OnInit {

  hide = true;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    public authSer: AuthenticationService) {
  }

  ngOnInit() {
    this.form.setValue({
      email: '',
      password: ''
    });
  }

  registerByEmailPass() {
    if (this.form.valid) {
      this.authSer.registerByEmailPass(this.form.value.email, this.form.value.password);
    }else{
      window.alert(this.form.errors);
    }
  }
}

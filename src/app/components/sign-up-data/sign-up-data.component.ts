import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/datasource/user.service';

@Component({
  selector: 'app-sign-up-data',
  templateUrl: './sign-up-data.component.html',
  styleUrls: ['./sign-up-data.component.less']
})
export class SignUpDataComponent extends BaseComponent implements OnInit {
  listSexo: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'Otro', viewValue: 'Otro'}
  ];
  listType: any[] = [
    {value: 'PERSON', viewValue: 'Personal'},
    {value: 'COMPANY', viewValue: 'Empresarial'}
  ];
  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef,
    public ds: UserService) {
      super(med, cdr);
    }

  ngOnInit() {
    this.ds.initFormUser();
  }
  onSubmit() {
    if (!this.ds.form.invalid) {
      this.ds.form.value.email = this.ds.formRegister.value.email;
      this.ds.form.value.status = 'INGRESADO';
      this.ds.form.value.fullName = this.ds.form.value.type === 'COMPANY'?
      this.ds.form.value.names  : this.ds.form.value.names + ' ' + this.ds.form.value.lastName;
      this.authService.finishSaveData(
        this.ds.form.value
      );
    } else {
      window.alert(this.ds.form.getError);
    }
  }
}

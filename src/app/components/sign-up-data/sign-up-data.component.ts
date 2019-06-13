import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/dao/company.service';
import { CompanyModel } from 'src/app/shared/model/company-model';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-sign-up-data',
  templateUrl: './sign-up-data.component.html',
  styleUrls: ['./sign-up-data.component.less']
})
export class SignUpDataComponent extends BaseComponent implements OnInit {
  userForm = this.fb.group({
    type: [null, Validators.required],
    company: null,
    names: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    identificacion: [null, Validators.required],
    birthDate: null,
    sexo: null,
    phone: [null, Validators.required],
    convetional: null
  });
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
    private fb: FormBuilder,
    private daoCom: CompanyService) {
      super(med, cdr);
    }

  ngOnInit() {
  }
  onSubmit() {
    if (!this.userForm.invalid) {
      if (this.userForm.controls.type.value === 'COMPANY' ) {
        const company: CompanyModel = {
          id : this.authService.afAuth.auth.currentUser.uid,
          name : this.userForm.controls.names.value,
          email: this.authService.afAuth.auth.currentUser.email,
          ruc: this.userForm.controls.identificacion.value,
          logo: '',
          status: 'INACTIVO',
          code: '',
          fechaRegistro: new Date(),
          address: this.userForm.controls.address.value,
          phone: this.userForm.controls.phone.value.toString(),
          convetional: this.userForm.controls.convetional.value.toString()
        };
        this.daoCom.create(company);
      }
      this.authService.finishSaveData(
        this.userForm.controls.identificacion.value,
        this.userForm.controls.names.value,
        this.userForm.controls.lastName.value,
        this.userForm.controls.birthDate.value,
        this.userForm.controls.sexo.value,
        this.userForm.controls.type.value,
        this.userForm.controls.phone.value,
        this.userForm.controls.convetional.value
      );
    }
  }
}

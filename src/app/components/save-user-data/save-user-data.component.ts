import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-user-data',
  templateUrl: './save-user-data.component.html',
  styleUrls: ['./save-user-data.component.less']
})
export class SaveUserDataComponent extends BaseComponent implements OnInit {

  userForm = this.fb.group({
    type: [null, Validators.required],
    company: null,
    names: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    identificacion: [null, Validators.required],
    birthDate: null,
    sexo: null
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
    private fb: FormBuilder) { 
    super(med, cdr);
  }

  ngOnInit() {
  }
  onSubmit() {
    this.authService.finishSaveData(
      this.userForm.controls.identificacion.value,
      this.userForm.controls.names.value,
      this.userForm.controls.lastName.value,
      this.userForm.controls.birthDate.value,
      this.userForm.controls.sexo.value,
      this.userForm.controls.type.value,
    );

  }

}

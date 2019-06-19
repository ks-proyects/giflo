import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CompanyModel } from '../shared/model/company-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    ruc: new FormControl('', [Validators.required, Validators.minLength(13)]),
    logo: new FormControl(''),
    status: new FormControl(''),
    code: new FormControl(''),
    fechaRegistro: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(),
    convetional: new FormControl()
  });
  list: AngularFirestoreCollection<CompanyModel>;
  constructor(
    private db: AngularFirestore,
    public authService: AuthService) {
    this.list = db.collection<CompanyModel>('companies');
  }
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      id: '',
      name: '',
      email: '',
      ruc: '',
      logo: '',
      status: '',
      code: '',
      fechaRegistro: '',
      address: '',
      phone: '',
      convetional: ''
    });
  }
  getEmployees() {
    return this.list.snapshotChanges();
  }

  insertCompany(compa) {
    const company: CompanyModel = {
      id : this.authService.afAuth.auth.currentUser.uid,
      name : compa.name,
      ruc: compa.ruc,
      fechaRegistro: compa.fechaRegistro,
      status: 'INACTIVO',
      address: compa.address,
      phone: compa.phone,
      convetional: compa.convetional
    };
    this.list.doc(company.id).set(company);
  }

  updateCompany(compa) {
    const company: CompanyModel = {
      id : compa.$key,
      name : compa.name,
      ruc: compa.ruc,
      fechaRegistro: compa.fechaRegistro,
      status: compa.status,
      address: compa.address,
      phone: compa.phone,
      convetional: compa.convetional,
      email: compa.email,
      logo: compa.logo,
      code: compa.code
    };
    return this.list.doc(company.id).set(company);
  }

  deleteCompany($key: string) {
    return this.list.doc($key).delete();
  }

  populateForm(company) {
    this.form.setValue(_.omit(company, 'companyName'));
  }

  create(companie: CompanyModel) {
    return this.list.doc(companie.id).set(companie);
  }
  update(user: CompanyModel) {
      return this.list.doc(user.id).set(user);
  }
  delete(user: CompanyModel) {
      return this.list.doc(user.id).delete();
  }
  findById(id) {
    return this.list.doc(id).ref.get();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    names: new FormControl('', [Validators.required, Validators.minLength(13)]),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    token: new FormControl(''),
    urlPhoto: new FormControl(null),
    sexo: new FormControl(''),
    type: new FormControl(),
    status: new FormControl(),
    address: new FormGroup({
      mainStreet: new FormControl(null),
      intersection: new FormControl(null),
      phone: new FormControl(null),
      convetional: new FormControl(null)
    })
  });
  listCompany: AngularFirestoreCollection<User>;
  constructor(
    private db: AngularFirestore,
    public authService: AuthService,
    public afAuth: AngularFireAuth) {
      this.listCompany = db.collection<User>('users', ref => ref.where('type', '==', 'COMPANY'));
  }
  initFormCompany() {
    this.form.setValue({
      $key: null,
      id: '',
      fullName: '',
      email: '',
      names: '',
      lastName: '',
      birthDate: '',
      token: '',
      urlPhoto: '',
      sexo: '',
      type: '',
      status: '',
      address: {
        mainStreet: '',
        intersection: '',
        phone: '',
        convetional: '',
      }
    });
  }
  /**
   * All List
   */
  getCompanies() {
    return this.listCompany.snapshotChanges();
  }
 
  /**
   * Actualiza
   * @param compa Form Data
   */
  updateCompanyForm(user: User, $key: string) {
    return this.createUpdateCompany(user, $key);
  }
  /**
   * Eliminar
   * @param $key Primary Key Form
   */
  deleteCompany($key: string) {
    return this.listCompany.doc($key).delete();
  }

  /**
   * Cargar Valor al formulario
   * @param company 
   */
  populateFormCompany(user) {
    this.form.setValue(_.omit(user, 'company'));
  }
  /**
   * Crear Compania
   * @param companie Company
   */
  createUpdateCompany(user: User, $key: string) {
    return this.listCompany.doc($key).set(user);
  }
  /**
   * Buscar por Id
   * @param id Primary Key
   */
  findByIdCompany(id) {
    return this.listCompany.doc(id).ref.get();
  }
}

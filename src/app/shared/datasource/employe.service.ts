import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemMenuService } from './item-menu.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

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
    rol: new FormControl(),
    address: new FormGroup({
      mainStreet: new FormControl(null),
      intersection: new FormControl(null),
      phone: new FormControl(null),
      convetional: new FormControl(null)
    })
  });
  listEmploye: AngularFirestoreCollection<User>;
  constructor(
    private db: AngularFirestore,
    public authService: AuthService,
    public afAuth: AngularFireAuth) {
      this.listEmploye = this.db.collection<User>('users', ref =>
      ref. where('type', '==', 'PERSON').where('company.id', '==', authService.userDB.id.toString()));
      this.listEmploye = db.collection<User>('users', ref => ref.where('type', '==', 'PERSON'));
  }
  initFormEmploye() {
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
      rol: '',
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
  getEmployes() {
    return this.listEmploye.snapshotChanges();
  }
 
  /**
   * Actualiza
   * @param compa Form Data
   */
  updateEmployeForm(user: User, $key: string) {
    return this.createUpdateEmploye(user, $key);
  }
  /**
   * Eliminar
   * @param $key Primary Key Form
   */
  deleteEmploye($key: string) {
    return this.listEmploye.doc($key).delete();
  }

  /**
   * Cargar Valor al formulario
   * @param company 
   */
  populateFormEmploye(user) {
    this.form.setValue(_.omit(user, 'company'));
  }
  /**
   * Crear Compania
   * @param companie Company
   */
  createUpdateEmploye(user: User, $key: string) {
    return this.listEmploye.doc($key).set(user);
  }
  /**
   * Buscar por Id
   * @param id Primary Key
   */
  findByIdEmploye(id) {
    return this.listEmploye.doc(id).ref.get();
  }
}

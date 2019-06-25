import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  form: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    fullName: new FormControl(''),
    email: new FormControl(''),
    names: new FormControl('', [Validators.required]),
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
      phone: new FormControl(''),
      convetional: new FormControl('')
    })
  });
  formRegister: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass:  new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  listUser: AngularFirestoreCollection<User>;
  listUserFilter: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth) {
    this.listUser = afs.collection<User>('users');
  }
  initFormUser() {
    this.form.setValue({
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
    this.formRegister.setValue({
      email: '',
      pass: ''
    });
  }

  /**
   * All List
   */
  getUsers() {
    return this.listUser.snapshotChanges();
  }
  /**
   * Crea
   * @param compa Form Data
   */
  insertCompanyForm(user, customId: string) {
    const userny: User = {
      names : user.name,
      id: user.ruc,
      birthDate: user.fechaRegistro,
      status: 'INACTIVO',
      address: user.address
    };
    userny.address = {
      phone: user.phone,
      convetional: user.convetional
    };
    return this.createUpdateUser(userny, customId);
  }
  
  
  /**
   * Eliminar
   * @param $key Primary Key Form
   */
  deleteUser($key: string) {
    return this.listUser.doc($key).delete();
  }

  /**
   * Cargar Valor al formulario
   * @param company 
   */
  populateFormUser(company) {
    this.form.setValue(_.omit(company, 'company'));
  }
  /**
   * Crear Compania
   * @param user Company
   */
  createUpdateUser(user: User, customId: string) {
    return this.listUser.doc(customId).set(user);
  }
  /**
   * Buscar por Id
   * @param id Primary Key
   */
  findByIdUser(id) {
    return this.listUser.doc(id).ref.get();
  }
  private findByIdRef(uid): AngularFirestoreDocument<User> {
    return this.listUser.doc(uid);
  }
  findByIdCompanySnapshoot(id) {
    return this.listUser.doc(id).snapshotChanges();
  }
  findById(id: string) {
    return this.afs.collection<User>('users', ref => 
    ref.where('status', '==', 'ACTIVO').where('type', '==', 'COMPANY').where('id', '==', id.toString())).snapshotChanges();
  }
  public updateToken = (user, tok) => {
    const userRef: AngularFirestoreDocument<any> = this.findByIdRef(user.id);
    const userData: User = {
      token: tok
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  public saveUserData = (user, userRegister: User) => {
    const userRef: AngularFirestoreDocument<User> = this.findByIdRef(user.uid);
    return userRef.set(userRegister, {
      merge: true
    });
  }
}
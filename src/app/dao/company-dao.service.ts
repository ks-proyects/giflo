import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CompanyModel } from '../shared/model/company-model';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyDaoService {
  list: AngularFirestoreCollection<CompanyModel>;
  constructor(private db: AngularFirestore) {
    this.list = db.collection<CompanyModel>('Companies');
  }
  create(companie: CompanyModel) {
    return this.list.doc(companie.id).set(companie);
  }
  findAll() {
      return this.list.snapshotChanges();
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

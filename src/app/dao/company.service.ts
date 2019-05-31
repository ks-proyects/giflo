import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CompanyModel } from '../shared/model/company-model';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  list: AngularFirestoreCollection<CompanyModel>;
  constructor(private db: AngularFirestore,public afAuth: AngularFireAuth) {
    this.list = db.collection<CompanyModel>('Companies');
  }
  create(companie: CompanyModel) {
    companie.id = this.afAuth.auth.currentUser.uid;
    return this.list.doc(companie.id).set(companie);
  }
  findAll() {
      return this.list.snapshotChanges().pipe(
        map(actions =>  actions.map(
          a => {
            const data = a.payload.doc.data() as CompanyModel;
            const id = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
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

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DaoUserService {
  collection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<User>('user');
  }
  create(user: User) {
      return this.collection.doc(user.id).set(user);
  }
  list() {
      return this.collection.snapshotChanges().pipe(
        map(actions =>  actions.map(
          a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
  }
  update(user: any) {
      return this.collection.doc(user.id).set(user);
  }
  delete(user: any) {
      return this.collection.doc(user.id).delete();
  }
  findById(id) {
    return this.collection.doc(id).ref.get();
  }
}
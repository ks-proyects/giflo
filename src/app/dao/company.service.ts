import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CompanyModel } from '../shared/model/company-model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  items: AngularFirestoreCollection<CompanyModel>;
  constructor(private db: AngularFirestore) {
    this.items = db.collection<CompanyModel>('Companies');
  }

  addItem(item: any) {
    this.items.add(item);
  }

  getData() {
    return this.items;
  }
}

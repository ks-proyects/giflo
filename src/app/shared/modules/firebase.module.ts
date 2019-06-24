import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
const firebaseConfig: any = {
  apiKey: 'AIzaSyDdCSeP_dUc-YM_cvaq9jxqhSKBvRMxLi0',
  authDomain: 'ksgiflo.firebaseapp.com',
  databaseURL: 'https://ksgiflo.firebaseio.com',
  projectId: 'ksgiflo',
  storageBucket: 'ksgiflo.appspot.com',
  messagingSenderId: '487738962539',
  appId: '1:487738962539:web:7581befd929e5ba5'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ]
})
export class FirebaseModule { }

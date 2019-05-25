import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import * as Rx from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PushMessagingService {

  subject = new Rx.BehaviorSubject({});
  constructor(private afm: AngularFireMessaging, private afs: AngularFirestore) { }
  requestPermission() {
    this.afm.requestPermission.subscribe(
      () => { console.log('Permission granted!'); },
      (error) => { console.error(error)});
  }
  updateToken(user) {
    this.afm.requestPermission
      .pipe(mergeMapTo(this.afm.tokenChanges))
      .subscribe(
        (token) => {
          user.token = token;
          this.afs.collection('user').doc(user.id).set({user});
        },
        (error) => { console.error(error); },
      );
  }
  listen() {
    this.afm.messages
      .subscribe((message) => {
        this.subject.next(message);
      });

    this.afm.messaging.subscribe((message) => {
        this.subject.next(message);
      });
  }
}

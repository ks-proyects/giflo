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
  constructor(private afm: AngularFireMessaging,private afs: AngularFirestore) { }
  requestPermission() {
    this.afm.requestPermission.subscribe(
      () => { console.log('Permission granted!'); }, 
      (error) => { console.error(error)});
  }
  requestPermission2() {
    this.afm.requestPermission
      .pipe(mergeMapTo(this.afm.tokenChanges))
      .subscribe(
        (token) => {
          console.log(token);
          this.afs.collection('push').add({toke: token});
        },
        (error) => { console.error(error); },
      );
  }
  requestPermission3() {
    this.afm.requestToken.subscribe(
        (token) => { console.log(token); },
        (error) => { console.error(error) },
      );
  }
  listen() {
    this.afm.messages
      .subscribe((message) => { 
        console.log(message);
        this.subject.next(message);
      });

    this.afm.messaging.subscribe((message) => { 
        console.log('metodo dos');
        console.log(message);
        this.subject.next(message);
      });
  }
}

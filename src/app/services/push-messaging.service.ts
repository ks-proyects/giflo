import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PushMessagingService {

  subject = new Rx.BehaviorSubject({});
  constructor(private afm: AngularFireMessaging) { }
  requestPermission() {
    this.afm.requestPermission.subscribe(
      () => { console.log('Permission granted!'); }, 
      (error) => { console.error(error)});
  }
  requestPermission2() {
    this.afm.requestPermission
      .pipe(mergeMapTo(this.afm.tokenChanges))
      .subscribe(
        (token) => { console.log(token); },
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

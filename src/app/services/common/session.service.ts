import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from '../user.service';
import { User } from '../../domain/giflo_db/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { BrowserInfo } from '../../domain/dto/beowser-info';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private browser: BrowserInfo;
  private token: string;
  private userLoguin: User;
  private user: BehaviorSubject<User>;
  private browserInfo: BehaviorSubject<BrowserInfo>;
  private NAME_BROWSER_INFO = 'browser_info';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
  ) {
    this.user = new BehaviorSubject<User>(this.userLoguin);
    this.browserInfo = new BehaviorSubject<BrowserInfo>(this.getFromSession(this.NAME_BROWSER_INFO));
    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.browserInfo.subscribe(browserInfo => {
      if (browserInfo) {
        this.browser = browserInfo;
      }
    });
    this.afAuth.user.subscribe(userLogin => {
      if (userLogin) {
        this.createUpdateUser(userLogin);
      }
    });
  }

  public createUpdateUser(userFire) {
    const userDoc: AngularFirestoreDocument<any> = this.userService.get(userFire.uid);
    userDoc.valueChanges().subscribe(user => {
      if (!user) {
        this.userLoguin = this.userService.buildObject(userFire, this.token, ['DEF']);
        this.userService.createCustom(this.userLoguin).then(() => {
          this.user.next(this.userLoguin);
        });
      } else {
        let tokens = user.token;
        tokens.push(this.token ? this.token : '');
        tokens = tokens.filter(this.onlyUnique);
        userDoc.set({
          token: tokens
        }, {
          merge: true
        }).then(() => {
          this.userLoguin = user;
          this.user.next(this.userLoguin);
        });
      }
    });
  }
  setUserRol(newValue: User): void {
    this.user.next(newValue);
  }
  getUser(): Observable<User> {
    return this.user.asObservable();
  }
  setBrowserInfo(newValue: BrowserInfo): void {
    this.saveInSession(this.NAME_BROWSER_INFO, newValue);
    this.browserInfo.next(newValue);
  }
  getBrowserInfo(): Observable<BrowserInfo> {
    return this.browserInfo.asObservable();
  }
  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  saveInSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getFromSession(key: string): any {
    const value: string = sessionStorage.getItem(key);
    return JSON.parse(value);
  }
  removeFromSession(key: string): any {
    sessionStorage.removeItem(key);
  }
}

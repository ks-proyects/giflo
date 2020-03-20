import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Rol } from '../domain/giflo_db/rol';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userDoc: AngularFirestoreDocument<any>;
  currentUser: User;
  idRolDefault: string;
  token: string;
  constructor(
    private afAuth: AngularFireAuth,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.createUpdateUser(user);
      }
    });
    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.rolService.get('DEF').valueChanges().subscribe(rol => {
      this.idRolDefault = rol.id;
    });
  }
  public createUpdateUser(userL) {
    this.userDoc = this.userService.get(userL.uid);
    this.userDoc.valueChanges().subscribe(user => {
      let userNew: User;
      if (!user) {
        userNew = {
          id: userL.uid,
          mail: userL.email,
          name: userL.displayName ? userL.displayName : userL.email.split('@')[0],
          username: userL.email.split('@')[0],
          password: '',
          roles: [this.idRolDefault],
          surname: '',
          token: [this.token ? this.token : '']
        };
        this.userService.createCustom(userNew).then(() => {
          this.currentUser = userNew;
        });
      } else {
        let tokens = user.token;
        tokens.push(this.token ? this.token : '');
        tokens = tokens.filter(this.onlyUnique);
        this.userDoc.set({
          token: tokens
        }, {
          merge: true
        }).then((res) => {
          this.currentUser = user;
        });
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}

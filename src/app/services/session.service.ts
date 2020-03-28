import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';
import { MenuItemService } from './menu-item.service';
import { leftJoinDocument } from './generic/leftJoin.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userDoc: AngularFirestoreDocument<any>;
  currentUser: User;
  idRolDefault: string;
  token: string;
  private lisMenuUser: Observable<any>;
  private menusItems: MenuItem[];
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService,
    private ms: MenuItemService) {
    this.lisMenuUser = new Observable<any>(observer => {
      observer.next([]);
    });
    this.afs.collection('menuitem').valueChanges().
      pipe(
        leftJoinDocument(this.afs, 'rol', 'rol'),
        leftJoinDocument(this.afs, 'pagina', 'pagina')
      ).subscribe(arrar => {
        this.menusItems = (arrar as MenuItem[]);
        this.updateMenu();
      });
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
          this.updateMenu();
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
          this.updateMenu();
        });
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  updateMenu() {
    this.lisMenuUser = new Observable<any>(observer => {
      const menuUser = this.menusItems.filter(mi => {
        return this.currentUser ? this.currentUser.roles.
          includes((mi.rol as Rol).id) || this.currentUser.roles.includes('SUPERADMIN') : false;
      });
      observer.next(menuUser);
    });
  }

  getMenuUser() {
    return this.lisMenuUser;
  }

}

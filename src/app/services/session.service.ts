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
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userDoc: AngularFirestoreDocument<any>;
  currentUser: User = { id: '' };
  private idRolDefault: string;
  private token: string;
  private listMenuItem: MenuItem[];
  private listMenuItemUser: MenuItem[];
  private optionCurrentUser: Observable<MenuItem[]>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService,
    private ms: MenuItemService) {
    this.optionCurrentUser = new Observable<MenuItem[]>((ob: any) => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.createUpdateUser(user, ob);
        } else {
          ob.next([]);
        }
      });
      this.afs.collection('menuitem').valueChanges().subscribe(arrar => {
        this.listMenuItem = (arrar as MenuItem[]);
        this.updateMenu(ob);
      });
    });

    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.rolService.get('DEF').valueChanges().subscribe(rol => {
      this.idRolDefault = rol.id;
    });
  }
  public createUpdateUser(userL, observer) {
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
          debugger;
          this.currentUser = userNew;
          this.updateMenu(observer);
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
          this.updateMenu(observer);
        });
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  updateMenu(observer) {
    if (this.currentUser.id > '') {
      this.listMenuItemUser = this.listMenuItem ? this.listMenuItem.filter(mi => {
        const pagina = mi.pagina as Pagina;
        const haveRol = this.currentUser.roles.includes((mi.rol as Rol).id);
        const isActive = mi.estado && pagina.estado === 'ACT';
        return isActive && haveRol;
      }) : [];
    } else {
      this.listMenuItemUser = [];
    }
    observer.next(this.listMenuItemUser);
  }
  getCurrentMenu() {
    return this.optionCurrentUser;
  }
}

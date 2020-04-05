import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';
import { MenuItemService } from './menu-item.service';
import { leftJoinDocument } from './generic/leftJoin.service';
import { Observable, Observer } from 'rxjs';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';
import { UserData } from '../domain/giflo_db/user-data';
import { Empresa } from '../domain/giflo_db/empresa';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userDoc: AngularFirestoreDocument<any>;
  private userLoguin: User;
  private idRolDefault: string;
  private token: string;
  private listMenuItem: MenuItem[];
  private obsUserData: Observable<UserData>;
  private userData: UserData;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService) {
    this.obsUserData = new Observable<UserData>((ob: any) => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.createUpdateUser(user, ob);
        } else {
          ob.next({});
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
          this.userLoguin = userNew;
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
          this.userLoguin = user;
          this.updateMenu(observer);
        });
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  updateMenu(observer) {
    this.userData = {};
    if (this.userLoguin) {
      let rolesUser: string[] = [];
      const listMenuItemUser: MenuItem[] = this.listMenuItem ? this.listMenuItem.filter(mi => {
        const pagina = mi.pagina as Pagina;
        const rol = mi.rol as Rol;
        const haveRol = this.userLoguin.roles.includes(rol.id);
        if (haveRol) {
          rolesUser.push(rol.nombre);
        }
        const isActive = mi.estado && pagina.estado === 'ACT';
        return isActive && haveRol;
      }) : [];
      let strRol = '';
      rolesUser = rolesUser.filter(this.onlyUnique);
      rolesUser.forEach(rol => { strRol += rol + ', '; });
      strRol = strRol > '' ? strRol.substr(0, strRol.length - 1) : '';
      this.userLoguin.rolesStr = strRol;
      this.userData.menu = listMenuItemUser;
      this.userData.user = this.userLoguin;
    }
    observer.next(this.userData);
  }
  getDataUser() {
    return this.obsUserData;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';
import { UserData } from '../domain/giflo_db/user-data';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userDoc: AngularFirestoreDocument<any>;
  private userLoguin: User;
  private idRolDefault: string;
  private token: string;
  private listMenuItem: MenuItem[];
  userData: UserData;
  public obsUserData: Subject<UserData> = new Subject<UserData>();
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService) {
    this.afAuth.user.subscribe(userLogin => {
      if (userLogin) {
        this.createUpdateUser(userLogin);
      } else {
        this.obsUserData.next({});
      }
    });
    this.afs.collection('menuitem').valueChanges().subscribe(arrar => {
      this.listMenuItem = (arrar as MenuItem[]);
      this.updateMenu();
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
        const splitName = userL.displayName ? userL.displayName.split(' ') : userL.email.split('@');
        const name = splitName.length > 0 ? splitName[0] : '';
        const surname = splitName.length > 0 ? splitName[1] : '';
        userNew = {
          id: userL.uid,
          email: userL.mail,
          nombres: name,
          roles: [this.idRolDefault],
          apellidos: surname,
          token: [this.token ? this.token : ''],
          urlFoto: userL.photoURL
        };
        this.userService.createCustom(userNew).then(() => {
          this.userLoguin = userNew;
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
          this.userLoguin = user;
          this.updateMenu();
        });
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  updateMenu() {
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
    this.obsUserData.next(this.userData);
  }
  getDataUser() {
    return this.obsUserData;
  }
}

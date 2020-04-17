import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';
import { Observable, Subject, Subscriber, BehaviorSubject } from 'rxjs';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';
import { UserInfo } from '../domain/dto/user-info';
import { Menu } from '../util/menu-items/menu-items';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private idRolDefault: string;
  private token: string;
  private userLoguin: User;
  private listMenuItem: MenuItem[];
  private user: BehaviorSubject<User>;
  private menuUser: BehaviorSubject<MenuItem[]>;
  private userInfo: BehaviorSubject<UserInfo>;
  private NAME_USER_INFO = 'user_info';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
    private rolService: RolService) {
    this.user = new BehaviorSubject<User>(null);
    this.menuUser = new BehaviorSubject<MenuItem[]>(null);
    this.userInfo = new BehaviorSubject<UserInfo>(JSON.parse(sessionStorage.getItem(this.NAME_USER_INFO)));
    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.rolService.get('DEF').valueChanges().subscribe(rol => {
      this.idRolDefault = rol.id;
    });
    this.afAuth.user.subscribe(userLogin => {
      if (userLogin) {
        this.afs.collection('menuitem').valueChanges().subscribe(arrar => {
          this.listMenuItem = (arrar as MenuItem[]);
          this.updateMenu();
        });
        this.createUpdateUser(userLogin);
      }
    });
  }
  public createUpdateUser(userL) {
    const userDoc: AngularFirestoreDocument<any> = this.userService.get(userL.uid);
    userDoc.valueChanges().subscribe(user => {
      let userNew: User;
      if (!user) {
        const splitName = userL.displayName ? userL.displayName.split(' ') : userL.email.split('@');
        const name = splitName.length > 0 ? splitName[0] : '';
        const surname = splitName.length > 0 ? splitName[1] : '';
        userNew = {
          id: userL.uid,
          email: userL.email,
          nombres: name,
          roles: [this.idRolDefault],
          apellidos: surname,
          token: [this.token ? this.token : ''],
          urlFoto: userL.photoURL
        };
        this.userService.createCustom(userNew).then((item) => {
          this.userLoguin = userNew;
          this.updateMenu();
        });
      } else {
        let tokens = user.token;
        tokens.push(this.token ? this.token : '');
        tokens = tokens.filter(this.onlyUnique);
        userDoc.set({
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
  private updateMenu() {
    if (this.userLoguin) {
      let rolesUser: string[] = [];
      const listMenuItemUser: MenuItem[] = this.listMenuItem ? this.listMenuItem.filter(mi => {
        const pagina = (mi.pagina as Pagina);
        const rol = (mi.rol as Rol);
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
      this.menuUser.next(listMenuItemUser);
      this.user.next(this.userLoguin);
    }
  }

  setUser(newValue: User): void {
    this.user.next(newValue);
  }
  getUser(): Observable<User> {
    return this.user.asObservable();
  }
  setMenu(newValue: MenuItem[]): void {
    this.menuUser.next(newValue);
  }
  getMenu(): Observable<MenuItem[]> {
    return this.menuUser.asObservable();
  }
  setUserInfo(newValue: UserInfo): void {
    this.saveInSession(this.NAME_USER_INFO, newValue);
    this.userInfo.next(newValue);
  }
  getUserInfo(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }
  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  saveInSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getFromSession(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
  removeFromSession(key: string): any {
    sessionStorage.removeItem(key);
  }
}

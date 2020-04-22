import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { User } from '../domain/giflo_db/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';
import { Empleado } from '../domain/giflo_db/empleado';
import { map } from 'rxjs/operators';
import { leftJoinDocument } from './generic/leftJoin.service';
import { BrowserInfo } from '../domain/dto/beowser-info';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private browser: BrowserInfo;
  private token: string;
  private userLoguin: User;
  private listMenuItem: MenuItem[];
  private listMenuItemByEmpresa: MenuItem[];
  private user: BehaviorSubject<User>;
  private menuUser: BehaviorSubject<MenuItem[]>;
  private browserInfo: BehaviorSubject<BrowserInfo>;
  private NAME_BROWSER_INFO = 'browser_info';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public afm: AngularFireMessaging,
    private userService: UserService,
  ) {
    this.user = new BehaviorSubject<User>(this.userLoguin);
    this.menuUser = new BehaviorSubject<MenuItem[]>(null);
    this.browserInfo = new BehaviorSubject<BrowserInfo>(this.getFromSession(this.NAME_BROWSER_INFO));
    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.browserInfo.subscribe(browserInfo => {
      if (browserInfo) {
        this.browser = browserInfo;
      }
    });
    this.afs.collection('menuitem', ref => ref.where('empresa', '==', null)).valueChanges().pipe(
      leftJoinDocument(this.afs, 'pagina', 'pagina'),
      leftJoinDocument(this.afs, 'rol', 'rol')
    ).subscribe(arrar => {
      this.listMenuItem = (arrar as MenuItem[]);
      this.updateMenu();
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
          this.findEmpleado();
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
          this.findEmpleado();
        });
      }
    });
  }

  public findEmpleado() {
    this.user.next(this.userLoguin);
    this.getMenuItemEmpresa();
  }
  getMenuItemEmpresa() {
    this.afs.collection('menuitem', ref => ref.where('empresa', '==', this.userLoguin.currentIdEmpresa)).valueChanges().pipe(
      leftJoinDocument(this.afs, 'pagina', 'pagina'),
      leftJoinDocument(this.afs, 'rol', 'rol')
    ).subscribe(arrar => {
      this.listMenuItemByEmpresa = (arrar as MenuItem[]);
      this.updateMenu();
    });
  }
  private updateMenu() {
    if (this.userLoguin && this.userLoguin.currentIdEmpresa && this.listMenuItem && this.listMenuItemByEmpresa) {
      let rolesUser: string[] = [];
      let listMenuItemUser: MenuItem[] = [];
      if (this.userLoguin.roles.includes('SUPERADMIN') || this.userLoguin.currentTipo === 'Empresario') {
        listMenuItemUser = this.listMenuItem.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          let haveRol = false;
          const rol = (mi.rol as Rol);
          if (this.userLoguin.roles.includes('SUPERADMIN')) {
            haveRol = true;
          } else if (this.userLoguin.currentTipo === 'Empresario' && rol) {
            haveRol = this.userLoguin.roles.includes(rol.id);
          }
          if (haveRol) {
            rolesUser.push(rol.nombre);
          }
          const isActive = mi.estado && pagina && pagina.estado === 'ACT';
          return isActive && haveRol;
        });
      } else if (this.userLoguin.currentTipo === 'Empleado') {
        listMenuItemUser = this.listMenuItemByEmpresa.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          const rol = (mi.rol as Rol);
          let haveRol = false;
          if (rol) {
            haveRol = (this.userLoguin.roles as string[]).includes(rol.id);
            if (haveRol) {
              rolesUser.push(rol.nombre);
            }
          }
          const isActive = mi.estado && pagina && pagina.estado === 'ACT';
          return isActive && haveRol;
        });
      }
      let strRol = '';
      rolesUser = rolesUser.filter(this.onlyUnique);
      rolesUser.forEach(rol => { strRol += rol + ', '; });
      strRol = strRol > '' ? strRol.substr(0, strRol.length - 1) : '';
      this.userLoguin.rolesStr = strRol;
      this.menuUser.next(listMenuItemUser);
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

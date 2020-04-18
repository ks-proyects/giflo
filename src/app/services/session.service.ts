import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';
import { RolService } from './rol.service';
import { User } from '../domain/giflo_db/user';
import { Observable, Subject, Subscriber, BehaviorSubject, Subscription } from 'rxjs';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';
import { UserInfo } from '../domain/dto/user-info';
import { Menu } from '../util/menu-items/menu-items';
import { Empleado } from '../domain/giflo_db/empleado';
import { EmpleadoService } from './empleado.service';
import { map } from 'rxjs/operators';
import { leftJoinDocument } from './generic/leftJoin.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private idRolDefault: string;
  private dataUserInfo: UserInfo;
  private empleado: Empleado;
  private token: string;
  private userLoguin: User;
  private listMenuItem: MenuItem[];
  private listMenuItemByEmpresa: MenuItem[];
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
    this.user = new BehaviorSubject<User>(this.userLoguin);
    this.menuUser = new BehaviorSubject<MenuItem[]>(null);
    this.userInfo = new BehaviorSubject<UserInfo>(this.getFromSession(this.NAME_USER_INFO));
    this.afm.requestToken.subscribe(newToken => {
      this.token = newToken;
    });
    this.rolService.get('DEF').valueChanges().subscribe(rol => {
      this.idRolDefault = rol.id;
    });
    this.userInfo.subscribe(userInfo => {
      if (userInfo) {
        this.dataUserInfo = userInfo;
        this.afs.collection('menuitem', ref => ref.where('empresa', '==', userInfo.idEmpresa)).valueChanges().pipe(
          leftJoinDocument(this.afs, 'pagina', 'pagina'),
          leftJoinDocument(this.afs, 'rol', 'rol')
        ).subscribe(arrar => {
          this.listMenuItemByEmpresa = (arrar as MenuItem[]);
          this.updateMenu();
        });
        this.findEmpleado();
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
          this.user.next(this.userLoguin);
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
        }).then((res) => {
          this.userLoguin = user;
          this.user.next(this.userLoguin);
          this.findEmpleado();
        });
      }
    });
  }
  public findEmpleado() {
    if (this.userLoguin && this.dataUserInfo) {
      this.afs.collection<Empleado>('empleado', ref =>
        ref.where('user', '==', this.userLoguin.id).where('empresa', '==', this.dataUserInfo.idEmpresa))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Empleado;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).subscribe(list => {
          this.empleado = list.length > 0 ? list[0] : null;
          this.updateMenu();
        });
    }
  }
  private updateMenu() {
    if (this.userLoguin && this.dataUserInfo && this.listMenuItem && this.listMenuItemByEmpresa) {
      let rolesUser: string[] = [];
      let listMenuItemUser: MenuItem[] = [];
      if (this.userLoguin.roles.includes('SUPERADMIN') || this.dataUserInfo.tipo === 'Empresario') {
        listMenuItemUser = this.listMenuItem.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          const rol = (mi.rol as Rol);
          let haveRol = false;
          if (this.userLoguin.roles.includes('SUPERADMIN')) {
            haveRol = true;
          } else if (this.dataUserInfo.tipo === 'Empresario') {
            haveRol = this.userLoguin.roles.includes(rol.id);
          }
          if (haveRol) {
            rolesUser.push(rol.nombre);
          }
          const isActive = mi.estado && pagina.estado === 'ACT';
          return isActive && haveRol;
        });
      } else if (this.dataUserInfo.tipo === 'Empleado') {
        listMenuItemUser = this.listMenuItemByEmpresa.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          const rol = (mi.rol as Rol);
          const haveRol = (this.empleado.roles as string[]).includes(rol.id);
          if (haveRol) {
            rolesUser.push(rol.nombre);
          }
          const isActive = mi.estado && pagina.estado === 'ACT';
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
    const value: string = sessionStorage.getItem(key);
    console.log(value);
    return JSON.parse(value);
  }
  removeFromSession(key: string): any {
    sessionStorage.removeItem(key);
  }
}

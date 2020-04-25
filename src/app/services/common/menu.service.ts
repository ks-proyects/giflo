import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/services/common/session.service';
import { MenuItem } from 'src/app/domain/giflo_db/menu-item';
import { Pagina } from 'src/app/domain/giflo_db/pagina';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { User } from 'src/app/domain/giflo_db/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from '../generic/leftJoin.service';
import { Rol } from 'src/app/domain/giflo_db/rol';
import { MenuItemService } from '../menu-item.service';
export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}
const SECTIONS: Menu[] = [{
  state: 'admin',
  name: 'Adminsitración',
  type: 'sub',
  icon: 'border_all',
  children: []
}, {
  state: 'catalog',
  name: 'Catálogo',
  type: 'sub',
  icon: 'widgets',
  children: []
}, {
  state: 'management',
  name: 'Gestión',
  type: 'sub',
  icon: 'star',
  children: []
},
{
  state: 'security',
  name: 'Permisos',
  type: 'sub',
  icon: 'apps',
  children: []
},
{
  state: 'home',
  name: 'Inicio',
  type: 'sub',
  icon: 'home',
  children: []
}
];

let MENUITEMS: Menu[] = [];

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private userCurrent: User;
  private listMenuItemByEmpresa: MenuItem[];
  private listMenuItem: MenuItem[];
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private menuItemService: MenuItemService
  ) {
    MENUITEMS = [];
    this.afAuth.user.subscribe(loginUser => {
      if (loginUser) {
        this.userService.get(loginUser.uid).valueChanges().subscribe(item => {
          if (item) {
            this.userCurrent = item;
            if (this.userCurrent.currentIdEmpresa) {
              this.menuItemService.listDefaultPorEmpresa(this.userCurrent.currentIdEmpresa).subscribe(arrar => {
                this.listMenuItemByEmpresa = (arrar as MenuItem[]);
                this.updateMenu();
              });
            }
          }
        });
      }
    });
    this.menuItemService.listAll().subscribe(arrar => {
      this.listMenuItem = (arrar as MenuItem[]);
      this.listMenuItem = this.listMenuItem.filter(item => item.empresa == undefined || item.empresa == null);
      this.updateMenu();
    });
  }
  private updateMenu() {
    let listMenuItemUser: MenuItem[] = [];
    if (this.userCurrent && this.userCurrent.currentIdEmpresa && this.listMenuItem && this.listMenuItemByEmpresa) {
      let rolesUser: string[] = [];
      if (this.userCurrent.roles.includes('SUPERADMIN') || this.userCurrent.currentTipo === 'Empresario') {
        listMenuItemUser = this.listMenuItem.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          let haveRol = false;
          const rol = (mi.rol as Rol);
          if (this.userCurrent.roles.includes('SUPERADMIN')) {
            haveRol = true;
          } else if (this.userCurrent.currentTipo === 'Empresario' && rol) {
            haveRol = this.userCurrent.roles.includes(rol.id);
          }
          if (haveRol) {
            rolesUser.push(rol.nombre);
          }
          const isActive = mi.estado && pagina && pagina.estado === 'ACT';
          return isActive && haveRol;
        });
      } else if (this.userCurrent.currentTipo === 'Empleado') {
        listMenuItemUser = this.listMenuItemByEmpresa.filter(mi => {
          const pagina = (mi.pagina as Pagina);
          const rol = (mi.rol as Rol);
          let haveRol = false;
          if (rol) {
            haveRol = (this.userCurrent.roles as string[]).includes(rol.id);
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
      this.userCurrent.rolesStr = strRol;
    }
    this.buildMenu(listMenuItemUser);
  }
  buildMenu(array: MenuItem[]) {
    if (array && array.length > 0) {
      array.map(menu => {
        const section = (menu.pagina as Pagina).seccion;
        const arraySection = SECTIONS.filter(current => current !== undefined && current.state === section);
        if (arraySection.length > 0) {
          MENUITEMS.push(arraySection[0]);
        }
      });
      MENUITEMS = MENUITEMS.filter(this.onlyUnique);
      MENUITEMS.map(section => {
        section.children = [];
        array.map(menu => {
          const pag = menu.pagina as Pagina;
          if (pag.seccion === section.state) {
            const opt: ChildrenItems = { state: pag.id, name: pag.component, type: 'link' };
            if (section.children.find(element => element.state === opt.state) === undefined) {
              section.children.push(opt);
            }
          }
        });
      });
    } else {
      MENUITEMS = [];
    }
  }
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}

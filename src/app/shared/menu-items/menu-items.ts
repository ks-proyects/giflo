import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuItemService } from '../../services/menu-item.service';
import { SessionService } from 'src/app/services/session.service';
import { MenuItem } from 'src/app/domain/giflo_db/menu-item';
import { Pagina } from 'src/app/domain/giflo_db/pagina';
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
}
];
let MENUITEMS_TEMP: Menu[] = [
  {
    state: 'admin',
    name: 'Adminsitración',
    type: 'sub',
    icon: 'border_all',
    children: [
      { state: 'bloques', name: 'Bloques', type: 'link' },
      { state: 'naves', name: 'Naves', type: 'link' },
      { state: 'camas', name: 'Camas', type: 'link' },
      { state: 'variedads', name: 'Variedades', type: 'link' },
    ]
  },
  {
    state: 'catalog',
    name: 'Catálogo',
    type: 'sub',
    icon: 'widgets',
    children: [
      { state: 'estados', name: 'Estados', type: 'link' },
      { state: 'estadocivils', name: 'Estados Civiles', type: 'link' }
    ]
  },
  {
    state: 'management',
    name: 'Gestión',
    type: 'sub',
    icon: 'star',
    children: [
      { state: 'empleados', name: 'Empleados', type: 'link' },
    ]
  },
  {
    state: 'security',
    name: 'Permisos',
    type: 'sub',
    icon: 'apps',
    children: [
      { state: 'empresas', name: 'Empresas', type: 'link' },
      { state: 'rols', name: 'Roles', type: 'link' },
      { state: 'paginas', name: 'Páginas', type: 'link' },
      { state: 'menuitems', name: 'Menu Items', type: 'link' },
    ]
  }
];
let MENUITEMS: Menu[] = [];

@Injectable()
export class MenuItems {

  constructor(private menuItem: SessionService) {
    menuItem.getDataUser().subscribe(obj => {
      this.buildMenu(obj.menu);
    });
  }
  buildMenu(array: MenuItem[]) {
    if (array) {
      MENUITEMS = [];
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

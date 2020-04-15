import { Injectable } from '@angular/core';
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

let MENUITEMS: Menu[] = [];

@Injectable()
export class MenuItems {
  constructor(private sessionService: SessionService) {
    this.sessionService.getMenu().subscribe(listMenu => {
      this.buildMenu(listMenu);
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

import { Injectable } from '@angular/core';

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

const MENUITEMS = [
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

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

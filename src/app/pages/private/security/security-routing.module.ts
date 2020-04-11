import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';

export const routesSecurity: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empresas/:id',
        component: EmpresaEditComponent,
        data: {
          title: 'Empresas',
          urls: [
            { title: 'Lista', url: '/security/empresas' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'empresas',
        component: EmpresaListComponent,
        data: {
          title: 'Empresas',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      },

      {
        path: 'menuitems/:id',
        component: MenuItemEditComponent,
        data: {
          title: 'Menú Ítems',
          urls: [
            { title: 'Lista', url: '/security/menuitems' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'menuitems',
        component: MenuItemListComponent,
        data: {
          title: 'Menú Ítems',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'paginas/:id',
        component: PaginaEditComponent,
        data: {
          title: 'Páginas',
          urls: [
            { title: 'Lista', url: '/security/paginas' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'paginas',
        component: PaginaListComponent,
        data: {
          title: 'Páginas',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'rols/:id',
        component: RolEditComponent,
        data: {
          title: 'Roles',
          urls: [
            { title: 'Lista', url: '/security/rols' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'rols',
        component: RolListComponent,
        data: {
          title: 'Roles',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      }
    ]
  }
];
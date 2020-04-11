import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';

export const routesCatalog: Routes = [
  {
    path: '',
    children: [
      {
        path: 'estadocivils/:id',
        component: EstadoCivilEditComponent,
        data: {
          title: 'Estados Civil',
          urls: [
            { title: 'Lista', url: '/catalog/estadocivils' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'estadocivils',
        component: EstadoCivilListComponent,
        data: {
          title: 'Estados Civil',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'estados/:id',
        component: EstadoEditComponent,
        data: {
          title: 'Estados',
          urls: [
            { title: 'Lista', url: '/catalog/estados' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'estados',
        component: EstadoListComponent,
        data: {
          title: 'Estados',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      }
    ]
  }
];

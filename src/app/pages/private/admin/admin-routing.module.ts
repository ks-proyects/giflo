import { Routes, RouterModule } from '@angular/router';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';

export const routesAdmin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bloques/:id',
        component: BloqueEditComponent,
        data: {
          title: 'Bloques',
          urls: [
            { title: 'Lista', url: '/admin/bloques' },
            { title: 'Edición' }
          ]
        }
      },
      {
        path: 'bloques',
        component: BloqueListComponent,
        data: {
          title: 'Bloques',
          urls: [
            { title: 'Inicio', url: '/home/index' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'camas/:id',
        component: CamaEditComponent,
        data: {
          title: 'Camas',
          urls: [
            { title: 'Lista', url: '/admin/camas' },
            { title: 'Edición' }
          ]
        }
      },
      {
        path: 'camas',
        component: CamaListComponent,
        data: {
          title: 'Camas',
          urls: [
            { title: 'Inicio', url: '/home/index' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'naves/:id',
        component: NaveEditComponent,
        data: {
          title: 'Naves',
          urls: [
            { title: 'Lista', url: '/admin/naves' },
            { title: 'Edición' }
          ]
        }
      },
      {
        path: 'naves',
        component: NaveListComponent,
        data: {
          title: 'Naves',
          urls: [
            { title: 'Inicio', url: '/home/index' },
            { title: 'Lista' }
          ]
        }
      },
      {
        path: 'variedads/:id',
        component: VariedadEditComponent,
        data: {
          title: 'Variedades',
          urls: [
            { title: 'Lista', url: '/admin/variedades' },
            { title: 'Edición' }
          ]
        }
      },
      {
        path: 'variedades',
        component: VariedadListComponent,
        data: {
          title: 'Variedades',
          urls: [
            { title: 'Inicio', url: '/home/index' },
            { title: 'Lista' }
          ]
        }
      }
    ]
  }
];
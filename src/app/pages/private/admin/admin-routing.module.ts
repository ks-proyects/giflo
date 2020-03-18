import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bloques/:id',
        component: BloqueEditComponent
      },
      {
        path: 'bloques',
        component: BloqueListComponent,
        data: {
          title: 'Bloques',
          urls: [
            { title: 'Bloques', url: '/dashboard' },
            { title: 'Bloques' }
          ]
        }
      },
      {
        path: 'camas/:id',
        component: CamaEditComponent
      },
      {
        path: 'camas',
        component: CamaListComponent
      },
      {
        path: 'naves/:id',
        component: NaveEditComponent
      },
      {
        path: 'naves',
        component: NaveListComponent
      },
      {
        path: 'variedads/:id',
        component: VariedadEditComponent
      },
      {
        path: 'variedads',
        component: VariedadListComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

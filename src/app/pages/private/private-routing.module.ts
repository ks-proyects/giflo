import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BloqueEditComponent
      },
      {
        path: 'bloques',
        component: BloqueListComponent
      },
      {
        path: '',
        component: CamaEditComponent
      },
      {
        path: '',
        component: CamaListComponent
      },
      {
        path: '',
        component: EmpleadoEditComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

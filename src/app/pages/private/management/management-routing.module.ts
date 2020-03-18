import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empleados/:id',
        component: EmpleadoEditComponent
      },
      {
        path: 'empleados',
        component: EmpleadoListComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }

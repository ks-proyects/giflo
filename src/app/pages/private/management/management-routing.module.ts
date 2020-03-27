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
        component: EmpleadoEditComponent,
        data: {
          title: 'Empleados',
          urls: [
            { title: 'Lista', url: '/management/empleados' },
            { title: 'Edisión' }
          ]
        }
      },
      {
        path: 'empleados',
        component: EmpleadoListComponent,
        data: {
          title: 'Empleados',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: 'Lista' }
          ]
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }

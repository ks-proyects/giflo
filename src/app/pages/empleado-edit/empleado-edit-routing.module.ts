import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoEditComponent } from './empleado-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoEditRoutingModule { }

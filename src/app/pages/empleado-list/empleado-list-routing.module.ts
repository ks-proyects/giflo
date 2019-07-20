import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoListComponent } from './empleado-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoListRoutingModule { }

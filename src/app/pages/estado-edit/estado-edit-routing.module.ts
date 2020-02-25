import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoEditComponent } from './estado-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EstadoEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoEditRoutingModule { }

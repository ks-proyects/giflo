import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoCivilEditComponent } from './estado-civil-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EstadoCivilEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoCivilEditRoutingModule { }

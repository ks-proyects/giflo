import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoCivilListComponent } from './estado-civil-list.component';

const routes: Routes = [
  {
    path: '',
    component: EstadoCivilListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoCivilListRoutingModule { }

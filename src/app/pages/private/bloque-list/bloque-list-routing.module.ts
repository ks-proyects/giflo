import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloqueListComponent } from './bloque-list.component';

const routes: Routes = [
  {
    path: '',
    component: BloqueListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloqueListRoutingModule { }

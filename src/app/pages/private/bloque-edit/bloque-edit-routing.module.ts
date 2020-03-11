import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloqueEditComponent } from './bloque-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BloqueEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloqueEditRoutingModule { }

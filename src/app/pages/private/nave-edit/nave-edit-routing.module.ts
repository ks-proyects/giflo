import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaveEditComponent } from './nave-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NaveEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaveEditRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariedadEditComponent } from './variedad-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VariedadEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariedadEditRoutingModule { }

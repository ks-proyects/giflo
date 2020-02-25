import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolEditComponent } from './rol-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RolEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolEditRoutingModule { }

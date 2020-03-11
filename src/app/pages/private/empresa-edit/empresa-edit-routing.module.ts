import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaEditComponent } from './empresa-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaEditRoutingModule { }

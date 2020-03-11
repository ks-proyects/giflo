import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaListComponent } from './empresa-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaListRoutingModule { }

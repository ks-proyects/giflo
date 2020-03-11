import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariedadListComponent } from './variedad-list.component';

const routes: Routes = [
  {
    path: '',
    component: VariedadListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariedadListRoutingModule { }

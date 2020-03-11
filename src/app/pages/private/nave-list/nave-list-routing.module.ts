import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaveListComponent } from './nave-list.component';

const routes: Routes = [
  {
    path: '',
    component: NaveListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaveListRoutingModule { }

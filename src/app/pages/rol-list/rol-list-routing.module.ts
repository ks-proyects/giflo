import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolListComponent } from './rol-list.component';

const routes: Routes = [
  {
    path: '',
    component: RolListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolListRoutingModule { }

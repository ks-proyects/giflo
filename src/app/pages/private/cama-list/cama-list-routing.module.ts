import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamaListComponent } from './cama-list.component';

const routes: Routes = [
  {
    path: '',
    component: CamaListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamaListRoutingModule { }

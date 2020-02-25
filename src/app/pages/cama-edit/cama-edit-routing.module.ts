import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamaEditComponent } from './cama-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CamaEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamaEditRoutingModule { }

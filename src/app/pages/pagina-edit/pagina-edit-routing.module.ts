import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaEditComponent } from './pagina-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaEditRoutingModule { }

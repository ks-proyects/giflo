import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaListComponent } from './pagina-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaListRoutingModule { }

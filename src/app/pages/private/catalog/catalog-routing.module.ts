import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'estadocivils/:id',
        component: EstadoCivilEditComponent
      },
      {
        path: 'estadocivils',
        component: EstadoCivilListComponent
      },
      {
        path: 'estados/:id',
        component: EstadoEditComponent
      },
      {
        path: 'estados',
        component: EstadoListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
